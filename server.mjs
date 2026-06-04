import { createServer } from "node:http"
import { appendFile, mkdir, readFile, stat } from "node:fs/promises"
import { createReadStream } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, "dist")
const port = Number(process.env.PORT || 10000)
const leadsFilePath = process.env.LEADS_FILE_PATH || path.join(__dirname, "data", "callback-leads.jsonl")
const quoteSubmitUrl = process.env.QUOTE_SUBMIT_URL || "https://shynlicleaningservice.com/api/quote/submit"
const leadWebhookUrl = process.env.LEAD_WEBHOOK_URL || ""
const maxBodyBytes = 64 * 1024

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
])

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  })
  response.end(JSON.stringify(body))
}

function normalizePhone(value = "") {
  const digits = String(value).replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`
  }

  if (digits.length === 10) {
    return `+1${digits}`
  }

  return String(value).trim()
}

function isValidPhone(value = "") {
  const digits = String(value).replace(/\D/g, "")
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
}

function splitName(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  }
}

async function readJsonBody(request) {
  const chunks = []
  let totalBytes = 0

  for await (const chunk of request) {
    totalBytes += chunk.length
    if (totalBytes > maxBodyBytes) {
      throw new Error("Request body is too large.")
    }

    chunks.push(chunk)
  }

  if (!chunks.length) {
    return {}
  }

  const text = Buffer.concat(chunks).toString("utf8")
  const contentType = String(request.headers["content-type"] || "")

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(text))
  }

  return JSON.parse(text)
}

function buildStoredLead(body, request) {
  const fullName = String(body.fullName || "").trim()
  const phone = normalizePhone(body.phone)
  const attribution = typeof body.attribution === "object" && body.attribution ? body.attribution : {}

  return {
    id: crypto.randomUUID(),
    type: "callback",
    source: "shynli.com callback form",
    fullName,
    phone,
    service: String(body.service || "home-cleaning").trim(),
    zip: String(body.zip || "").trim(),
    city: String(body.city || "").trim(),
    bedrooms: String(body.bedrooms || "").trim(),
    bathrooms: String(body.bathrooms || "").trim(),
    notes: String(body.notes || "").trim(),
    landingPageUrl: String(body.landingPageUrl || body.landing_page_url || "").trim(),
    sourcePage: String(body.sourcePage || body.source_page || "").trim(),
    referrer: String(body.referrer || "").trim(),
    attribution,
    userAgent: request.headers["user-agent"] || "",
    ip: request.headers["x-forwarded-for"] || request.socket.remoteAddress || "",
    submittedAt: new Date().toISOString(),
  }
}

function buildQuoteBackendPayload(lead) {
  const { firstName, lastName } = splitName(lead.fullName)

  return {
    requestType: "call_me",
    source: "Shynli.com Callback Request",
    sourcePagePath: lead.sourcePage || "/",
    returnPath: lead.sourcePage || "/",
    consent: true,
    contact: {
      fullName: lead.fullName,
      firstName,
      lastName,
      phone: lead.phone,
      email: "",
    },
    contactData: {
      fullName: lead.fullName,
      firstName,
      lastName,
      phone: lead.phone,
      email: "",
    },
    quote: {
      requestType: "call_me",
      serviceType: lead.service || "home-cleaning",
      frequency: "",
      rooms: lead.bedrooms || "0",
      bathrooms: lead.bathrooms || "0",
      squareMeters: "0",
      hasPets: "",
      basementCleaning: "no",
      services: [],
      quantityServices: {},
      additionalDetails: lead.notes || "Customer asked for a phone call to confirm details and receive the final quote.",
      totalPrice: 0,
      selectedDate: "",
      selectedTime: "",
      formattedDateTime: "",
      address: "",
      fullAddress: "",
      addressLine2: "",
      city: lead.city,
      state: "IL",
      zipCode: lead.zip,
    },
    calculatorData: {
      requestType: "call_me",
      serviceType: lead.service || "home-cleaning",
      frequency: "",
      rooms: lead.bedrooms || "0",
      bathrooms: lead.bathrooms || "0",
      squareMeters: "0",
      hasPets: "",
      basementCleaning: "no",
      services: [],
      quantityServices: {},
      additionalDetails: lead.notes || "Customer asked for a phone call to confirm details and receive the final quote.",
      totalPrice: 0,
      selectedDate: "",
      selectedTime: "",
      formattedDateTime: "",
      address: "",
      fullAddress: "",
      addressLine2: "",
      city: lead.city,
      state: "IL",
      zipCode: lead.zip,
    },
    fullName: lead.fullName,
    phone: lead.phone,
    email: "",
    serviceType: lead.service || "home-cleaning",
    totalPrice: 0,
    submittedAt: lead.submittedAt,
    landingPage: lead.landingPageUrl,
    landing_page_url: lead.landingPageUrl,
    source_page: lead.sourcePage,
    gclid: lead.attribution.gclid || "",
    gbraid: lead.attribution.gbraid || "",
    wbraid: lead.attribution.wbraid || "",
    fbclid: lead.attribution.fbclid || "",
    utm_source: lead.attribution.utm_source || "",
    utm_medium: lead.attribution.utm_medium || "",
    utm_campaign: lead.attribution.utm_campaign || "",
    utm_content: lead.attribution.utm_content || "",
    utm_term: lead.attribution.utm_term || "",
  }
}

async function postJson(url, payload) {
  if (!url) {
    return { skipped: true }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  let body = text
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    body = text
  }

  if (!response.ok || body?.success === false) {
    throw new Error(typeof body === "object" && body?.message ? body.message : `Lead forward failed with HTTP ${response.status}`)
  }

  return body
}

async function handleLeadRequest(request, response) {
  try {
    const body = await readJsonBody(request)
    const lead = buildStoredLead(body, request)

    if (!lead.fullName || lead.fullName.length < 2) {
      sendJson(response, 400, { success: false, message: "Name is required." })
      return
    }

    if (!isValidPhone(lead.phone)) {
      sendJson(response, 400, { success: false, message: "Valid U.S. phone number is required." })
      return
    }

    await mkdir(path.dirname(leadsFilePath), { recursive: true })
    await appendFile(leadsFilePath, `${JSON.stringify(lead)}\n`, "utf8")

    const forwardResults = {}
    const quotePayload = buildQuoteBackendPayload(lead)

    try {
      forwardResults.quoteBackend = await postJson(quoteSubmitUrl, quotePayload)
    } catch (error) {
      forwardResults.quoteBackendError = error instanceof Error ? error.message : "Unknown quote backend error"
      console.error("[callback-lead] quote backend forward failed", forwardResults.quoteBackendError)
    }

    if (leadWebhookUrl) {
      try {
        forwardResults.webhook = await postJson(leadWebhookUrl, lead)
      } catch (error) {
        forwardResults.webhookError = error instanceof Error ? error.message : "Unknown webhook error"
        console.error("[callback-lead] webhook forward failed", forwardResults.webhookError)
      }
    }

    sendJson(response, 200, {
      success: true,
      id: lead.id,
      stored: true,
      forwardedToQuoteBackend: Boolean(forwardResults.quoteBackend),
      forwardedToWebhook: Boolean(forwardResults.webhook),
    })
  } catch (error) {
    console.error("[callback-lead] submit failed", error)
    sendJson(response, 500, {
      success: false,
      message: "We could not send the request. Please call us instead.",
    })
  }
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url || "/", "http://localhost")
  const normalizedPath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "")
  const safePath = normalizedPath.split("/").filter((part) => part && part !== "..").join("/")
  const candidatePath = path.join(distDir, safePath || "index.html")
  const filePath = candidatePath.startsWith(distDir) ? candidatePath : path.join(distDir, "index.html")

  try {
    const fileStat = await stat(filePath)
    const finalPath = fileStat.isDirectory() ? path.join(filePath, "index.html") : filePath
    const extension = path.extname(finalPath)
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extension) || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    })
    createReadStream(finalPath).pipe(response)
  } catch {
    const indexHtml = await readFile(path.join(distDir, "index.html"), "utf8")
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    })
    response.end(indexHtml)
  }
}

createServer(async (request, response) => {
  if (request.method === "POST" && request.url?.startsWith("/api/leads/callback")) {
    await handleLeadRequest(request, response)
    return
  }

  if (request.url?.startsWith("/api/")) {
    sendJson(response, 404, { success: false, message: "Not found." })
    return
  }

  await serveStatic(request, response)
}).listen(port, () => {
  console.log(`Shynli site server listening on ${port}`)
})
