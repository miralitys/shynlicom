import { businessPhoneSchema, cityList, legalBusinessName, publicBusinessName } from "@/site/data"

export type GuideSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  note?: string
}

export type GuideArticleData = {
  slug: string
  path: string
  title: string
  keywords: string
  description: string
  eyebrow: string
  h1: string
  dek: string
  shortAnswer: string
  audienceQuestion: string
  updated: string
  readingTime: string
  serviceIntent: string
  sections: GuideSection[]
  faqs: [string, string][]
  links: [string, string][]
}

export const guideHub = {
  path: "/guides",
  title: "House Cleaning Guides | Shynli Cleaning",
  keywords: "house cleaning guides, professional cleaning questions, deep cleaning guide, move out cleaning guide, cleaning service tips",
  description: "Practical Shynli house cleaning guides that answer real questions about cleaners, quotes, deep cleaning, missed spots, move-out proof, and booking.",
  h1: "House cleaning guides for the questions people ask before they book.",
  dek: "These guides turn common homeowner, renter, and first-time-cleaner questions into plain-English answers. Use them before you request a quote, compare a service, or hand over keys.",
}

export const guideArticles: GuideArticleData[] = [
  {
    slug: "first-time-house-cleaner-etiquette",
    path: "/guides/first-time-house-cleaner-etiquette",
    title: "First-Time House Cleaner Etiquette | Shynli Cleaning",
    keywords: "first time house cleaner etiquette, what to do before cleaner comes, should I stay home during cleaning, house cleaner protocol, professional house cleaning etiquette",
    description: "First-time house cleaner etiquette: what to do before the cleaner arrives, whether to stay home, what to tidy, and how to set expectations.",
    eyebrow: "First cleaner visit",
    h1: "First-time house cleaner etiquette: what to do before, during, and after the visit.",
    dek: "If you have never hired a house cleaner before, the awkward part is not the cleaning. It is knowing what you are supposed to do, say, move, or leave alone before someone starts working in your home.",
    shortAnswer: "You do not need to clean the house before a professional cleaner arrives, but you should make the visit easy to understand. Pick up personal clutter where possible, share access notes, mention pets, point out priority rooms, and be reachable for the first visit. After that, the cleaner should have a routine and the notes should get easier.",
    audienceQuestion: "What am I supposed to do before my first house cleaner comes?",
    updated: "2026-06-08",
    readingTime: "6 min read",
    serviceIntent: "regular-cleaning",
    sections: [
      {
        title: "Tidy enough for cleaning to happen",
        paragraphs: [
          "The most useful rule is simple: do not scrub before the cleaner arrives, but do remove the things that stop cleaning from happening. A cleaner can clean a counter faster when mail, toys, dishes, makeup, and loose items are not covering the surface.",
          "This does not mean your home has to look perfect. It means the cleaner can spend paid time on kitchens, bathrooms, floors, dust, and surfaces instead of guessing where your personal belongings should go.",
        ],
        bullets: ["Clear counters when you can", "Pick up clothes, toys, and fragile items", "Put away important papers and valuables", "Empty sinks if you want the kitchen cleaned well", "Leave doors open for rooms that should be cleaned"],
      },
      {
        title: "Give a quick first-visit walkthrough",
        paragraphs: [
          "A professional cleaner should know how to clean a home, but the cleaner does not automatically know your home. The first visit goes better when you spend a few minutes on the details that only you know.",
          "The walkthrough does not need to be dramatic. Show the entry, bathrooms, kitchen, priority rooms, anything off-limits, and any surface that needs special care. If you are booking Shynli, put these notes in the callback or quote conversation so the visit is planned before arrival.",
        ],
        bullets: ["Where to park or enter", "Which rooms matter most", "Pets, gates, alarms, or lockboxes", "Delicate surfaces or products to avoid", "Rooms or closets that should stay closed"],
      },
      {
        title: "Stay home or leave, but do not hover",
        paragraphs: [
          "For a first visit, it is normal to be home for the first few minutes. After the cleaner understands the home, most visits are easier when you either leave or work from a room that is not in the way.",
          "If you stay, the best etiquette is to be available without managing every movement. Cleaners work faster when the path is clear and the checklist is not being changed every ten minutes.",
        ],
        bullets: ["Be available for questions", "Keep children and pets out of work areas", "Avoid walking across wet floors", "Send extra requests before the visit when possible"],
      },
      {
        title: "Speak up before the cleaner leaves",
        paragraphs: [
          "If something matters a lot, say it early. A cleaner would usually rather know that the shower glass, kitchen floor, guest bath, or pet-hair area matters most before time runs out.",
          "After the visit, use calm, specific feedback. A good service can use that feedback to improve the next visit or fix a covered missed item. Vague frustration is much harder to solve than a clear note with a room, surface, and photo.",
        ],
        bullets: ["Name one or two top priorities", "Ask what is included before adding extra tasks", "Take photos if something important was missed", "Keep feedback specific and timely"],
      },
    ],
    faqs: [
      ["Should I clean before the cleaner comes?", "No. Do not clean the house for the cleaner. Do tidy personal clutter enough that the cleaner can reach counters, floors, sinks, and surfaces."],
      ["Should I be home for the first cleaning?", "It can help to be home for the first few minutes, especially for access, pets, priority rooms, and special surfaces. After that, you can leave or stay out of the way."],
      ["Do I need to make a checklist?", "A checklist is helpful for priorities and boundaries. It should not replace a professional cleaning routine."],
      ["What should I do with pets?", "Tell the cleaner where pets will be, whether they can be loose, and which doors or gates need attention. If a pet is nervous, keep them in a safe room."],
    ],
    links: [["How to prepare for cleaning", "/faq/how-to-prepare-for-house-cleaning"], ["Regular cleaning", "/services/regular-cleaning"], ["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"], ["Get a quote", "/quote"]],
  },
  {
    slug: "what-to-tell-cleaning-service-before-quote",
    path: "/guides/what-to-tell-cleaning-service-before-quote",
    title: "What to Tell a Cleaning Service Before a Quote | Shynli Cleaning",
    keywords: "cleaning service quote, house cleaning estimate, what to tell cleaner, cleaning quote checklist, professional cleaning estimate",
    description: "What to tell a cleaning service before a quote: home condition, rooms, pets, access, add-ons, timing, and priorities that change price.",
    eyebrow: "Quote prep",
    h1: "What to tell a cleaning service before you ask for a quote.",
    dek: "A good cleaning quote is not just bedrooms and bathrooms. The price and timing depend on what the cleaner is walking into, what matters most, and what needs extra time.",
    shortAnswer: "Before asking for a house cleaning quote, tell the service your ZIP code, home type, bedrooms, bathrooms, current condition, pets, access notes, priority rooms, and any add-ons like inside fridge, oven, cabinets, blinds, or interior windows. Photos or a quick walkthrough can make the estimate more accurate.",
    audienceQuestion: "What information does a cleaner need to give me a real quote?",
    updated: "2026-06-08",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Start with the facts that shape time",
        paragraphs: [
          "A cleaning quote starts with the size of the job, but size alone is not enough. A two-bedroom apartment with heavy kitchen buildup can take longer than a larger home that is already maintained. That is why a good quote asks about condition, access, and service type.",
          "For Shynli, the most useful starting point is ZIP code, service type, bedrooms, bathrooms, home type, and what is happening next: routine upkeep, deep reset, move-out, move-in, or recurring service.",
        ],
        bullets: ["ZIP code and city", "Apartment, condo, townhouse, or house", "Bedrooms and bathrooms", "Standard, deep, move, or recurring cleaning", "How soon the visit is needed"],
      },
      {
        title: "Describe condition without embarrassment",
        paragraphs: [
          "People often under-describe the home because they feel embarrassed. That usually creates a worse visit. Cleaners are not there to judge the home; they need to know how much time to reserve.",
          "Use normal language. Say the home is maintained, a little behind, heavy in the kitchen, dusty from renovation, pet-heavy, empty for move-out, or needing a first deep clean before recurring service. Honest details make the quote more fair and the visit less rushed.",
        ],
        bullets: ["Maintained", "Behind but manageable", "Heavy kitchen or bathroom buildup", "Pet hair or odor", "Move-out or empty rooms", "Dust after renovation"],
      },
      {
        title: "Name priorities before add-ons",
        paragraphs: [
          "A cleaner can do better work when the priorities are clear. If the guest bathroom, kitchen floor, shower glass, baseboards, or empty cabinets matter most, say that before the schedule is built.",
          "Add-ons should also be named before the cleaner arrives. Inside fridge, inside oven, cabinet interiors, interior windows, blinds, walls, and heavy baseboards can change the time and price.",
        ],
        bullets: ["Top two or three rooms", "Surfaces that bother you most", "Fridge or oven interiors", "Cabinets or drawers", "Interior windows or blinds", "Move-out walkthrough details"],
      },
      {
        title: "Share access like it is part of the job",
        paragraphs: [
          "Access notes are not small details. Parking, gate codes, elevators, lockboxes, pets, alarms, stairs, and working-from-home rooms can decide whether the cleaner starts smoothly or loses time before the clean begins.",
          "If the home is in an apartment or condo building, include building rules early. If the home is empty, say who opens the door and what should happen when the cleaner leaves.",
        ],
        bullets: ["Parking or garage instructions", "Door code, gate, elevator, or lockbox", "Pets and rooms to avoid", "Alarm or front desk rules", "Lock-up instructions after the clean"],
      },
    ],
    faqs: [
      ["Do photos help with a cleaning quote?", "Yes. Photos can help the service understand condition, room size, clutter level, and add-ons before time is reserved."],
      ["Should I say the home is messy?", "Yes, if it changes the work. Use practical words like cluttered surfaces, heavy bathroom buildup, pet hair, or move-out condition."],
      ["Can the quote change after arrival?", "It can if the home is very different from the information provided or if extra tasks are added."],
      ["What is the fastest way to get a better estimate?", "Share the ZIP, service type, bedrooms, bathrooms, condition, access, pets, and priority rooms in one message."],
    ],
    links: [["Get a quote", "/quote"], ["House cleaning cost", "/pricing/house-cleaning-cost"], ["What affects cleaning price", "/faq/what-affects-house-cleaning-price"], ["First cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"]],
  },
  {
    slug: "what-house-cleaners-do-not-do",
    path: "/guides/what-house-cleaners-do-not-do",
    title: "What House Cleaners Usually Do Not Do | Shynli Cleaning",
    keywords: "what house cleaners do not do, house cleaning boundaries, cleaning service not included, maid service expectations, deep cleaning add ons",
    description: "What house cleaners usually do not do, what may be an add-on, and how to avoid awkward expectations before a professional cleaning visit.",
    eyebrow: "Scope boundaries",
    h1: "What house cleaners usually do not do, and what to ask about first.",
    dek: "Many cleaning problems start with the same misunderstanding: the customer thinks a task is included, while the cleaner thinks it is outside the scope or needs extra time.",
    shortAnswer: "House cleaners usually do not organize personal belongings, handle heavy trash, move heavy furniture, clean hazardous messes, treat mold or pests, repair damage, extract carpets, or do exterior work. Some tasks, like inside fridge, inside oven, cabinet interiors, blinds, and interior windows, may be available as add-ons when requested before booking.",
    audienceQuestion: "What is not normally included in a house cleaning visit?",
    updated: "2026-06-08",
    readingTime: "6 min read",
    serviceIntent: "deep-cleaning",
    sections: [
      {
        title: "Cleaning is different from organizing",
        paragraphs: [
          "A home can be tidy but dirty, or messy but not deeply dirty. A house cleaner is usually hired to clean surfaces, rooms, fixtures, floors, kitchens, bathrooms, and dust. Organizing personal belongings is a different job.",
          "If counters, floors, or beds are covered with personal items, the cleaner may have to skip those surfaces or clean around them. That is not laziness; it is often a safety and responsibility boundary.",
        ],
        bullets: ["Sorting papers", "Organizing drawers", "Deciding where personal items belong", "Packing clutter into boxes", "Handling valuables or private documents"],
      },
      {
        title: "Common tasks that need a separate quote",
        paragraphs: [
          "Some tasks are not impossible, but they need extra time, different tools, or a different price. These are the tasks that should be discussed before the cleaner arrives, not added when the appointment is almost over.",
          "Shynli names common add-ons early so the visit can be planned correctly. Inside fridge, oven, cabinets, interior windows, blinds, baseboards, doors, and basement cleaning can change the time on site.",
        ],
        bullets: ["Inside refrigerator", "Inside oven", "Inside cabinets and drawers", "Interior windows", "Heavy blinds", "Whole-home baseboards", "Basement cleaning"],
      },
      {
        title: "Safety boundaries are not negotiable",
        paragraphs: [
          "Professional cleaning also has safety limits. Most residential cleaners are not mold remediation teams, pest-control technicians, carpet extraction crews, painters, movers, or biohazard cleanup services.",
          "If a home has hazardous waste, pest activity, active mold, standing water, sharp debris, or work that requires ladders beyond normal reach, tell the service before booking. The answer may be a different specialist, not a larger cleaning checklist.",
        ],
        bullets: ["Mold remediation", "Pest or animal waste cleanup", "Biohazard work", "Heavy trash hauling", "Carpet extraction", "Exterior windows", "Moving heavy furniture", "Repairs or painting"],
      },
      {
        title: "How to avoid awkward expectations",
        paragraphs: [
          "The easiest way to avoid disappointment is to ask the scope question directly: 'Is this included, an add-on, or outside the service?' A good service will not be offended by that question.",
          "If you want something unusual, ask early and attach a photo when possible. It is much easier to plan the right visit before the cleaner is standing in the house with a full schedule behind them.",
        ],
        bullets: ["Ask what is included", "Ask what costs extra", "Send photos of unusual areas", "Put priority rooms in writing", "Confirm what should be skipped"],
      },
    ],
    faqs: [
      ["Do house cleaners pick up clutter?", "They may move light items to clean a surface, but organizing personal clutter is usually not included unless clearly agreed to."],
      ["Are dishes included?", "Dishwashing is not always included in house cleaning. Ask before booking if the sink or kitchen reset depends on dishes."],
      ["Can cleaners move furniture?", "Light items may be moved when safe. Heavy furniture, appliances, and risky lifting usually need a separate plan."],
      ["Are fridge and oven cleaning included?", "They are usually add-ons unless the quote specifically includes them."],
    ],
    links: [["Deep cleaning checklist", "/checklists/deep-cleaning-checklist"], ["Cleaning supplies included", "/cleaning-supplies-included"], ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"], ["Get a quote", "/quote"]],
  },
  {
    slug: "what-to-do-if-cleaner-missed-spots",
    path: "/guides/what-to-do-if-cleaner-missed-spots",
    title: "What to Do If a Cleaner Missed Spots | Shynli Cleaning",
    keywords: "cleaner missed spots, cleaning service complaint, house cleaning follow up, cleaning satisfaction guarantee, cleaner re-clean request",
    description: "What to do if a house cleaner missed spots: how to document the issue, what to say, and how to prevent the same problem next time.",
    eyebrow: "After-clean follow-up",
    h1: "What to do if a cleaner missed spots after a house cleaning visit.",
    dek: "A missed spot does not always mean the whole cleaning was bad. The right next step depends on whether the item was included, whether the cleaner had enough time, and how quickly you report it.",
    shortAnswer: "If a cleaner missed spots, take clear photos the same day, identify the room and surface, compare the issue to the agreed scope, and contact the cleaning service quickly. Ask for a covered re-clean or follow-up when the missed item was included. For future visits, put priority areas and add-ons in writing before the appointment.",
    audienceQuestion: "How do I handle missed spots without making the whole situation weird?",
    updated: "2026-06-08",
    readingTime: "6 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Start with the scope, not the emotion",
        paragraphs: [
          "It is frustrating to pay for a clean and then notice dust, soap scum, crumbs, streaks, or an untouched corner. Before sending a heated message, check whether the missed item was part of the agreed cleaning scope.",
          "A covered missed item is different from an add-on that was never requested. For example, a bathroom sink in a regular clean is usually core work. Inside an oven, inside cabinets, wall washing, heavy blinds, or moving furniture may be add-ons or outside the scope.",
        ],
        bullets: ["Was the room included?", "Was the surface reachable?", "Was the task an add-on?", "Was there enough access and time?", "Was the home condition different from the quote?"],
      },
      {
        title: "Document it quickly and clearly",
        paragraphs: [
          "The best complaint is specific and easy to verify. Take photos in normal lighting, include enough context to show the room, and send them soon after the visit. Waiting a week makes it harder to tell what happened during the cleaning and what happened after normal use.",
          "Keep the message factual. The service needs to know what was missed, where it was, and what outcome you are asking for.",
        ],
        bullets: ["Photo of the whole area", "Close-up of the missed spot", "Room name", "Time you noticed it", "What you expected based on the scope"],
      },
      {
        title: "Use a message that is easy to solve",
        paragraphs: [
          "A helpful message sounds like this: 'Hi, thank you for the visit today. I noticed the upstairs hall bathroom mirror and the base of the toilet were missed. They were part of the bathroom cleaning scope. I attached photos. Can you help me with the make-right process?'",
          "That kind of message is firm without being vague. It gives the service the information needed to check the scope, talk to the cleaner, and decide whether a re-clean or follow-up is appropriate.",
        ],
        note: "If you book with Shynli, use the follow-up path as soon as you notice an important covered item. The faster the note comes in, the easier it is to fix.",
      },
      {
        title: "Prevent repeat misses on the next visit",
        paragraphs: [
          "Missed spots often happen when the visit has unclear priorities or too much work for the time booked. Before the next clean, write down the two or three areas that decide whether the home feels clean to you.",
          "If the issue was not included, ask to add it next time. If the issue was included and still missed, ask the service how it will be tracked on the cleaner's notes.",
        ],
        bullets: ["Priority rooms", "Problem surfaces", "Add-ons confirmed before arrival", "Photos of recurring issues", "Clear note about what should be skipped"],
      },
    ],
    faqs: [
      ["How soon should I report a missed spot?", "As soon as possible, ideally the same day. Quick reporting makes the issue easier to verify and solve."],
      ["Should I ask for a refund or re-clean?", "For a covered missed item, a re-clean or make-right follow-up is often more reasonable than jumping straight to a refund."],
      ["What if the cleaner says it was not included?", "Ask the service to clarify the scope. If it was an add-on or outside the service, request it before the next visit."],
      ["How do I avoid sounding rude?", "Be specific, factual, and timely. Name the room, surface, photos, and what you expected."],
    ],
    links: [["Satisfaction guarantee", "/satisfaction-guarantee"], ["Reviews", "/reviews"], ["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"], ["Get a quote", "/quote"]],
  },
  {
    slug: "move-out-cleaning-photos-receipts-before-handoff",
    path: "/guides/move-out-cleaning-photos-receipts-before-handoff",
    title: "Move-Out Cleaning Photos and Receipts Before Handoff | Shynli Cleaning",
    keywords: "move out cleaning photos, cleaning receipt landlord, security deposit cleaning proof, apartment move out cleaning evidence, move out handoff cleaning",
    description: "How to use move-out cleaning photos, receipts, and room-by-room proof before returning keys or finishing a landlord walkthrough.",
    eyebrow: "Move-out proof",
    h1: "Move-out cleaning photos and receipts to collect before you return keys.",
    dek: "Move-out cleaning is not only about making the apartment or house look better. It is also about having clear proof of the condition before the landlord, property manager, buyer, or next tenant walks through.",
    shortAnswer: "Before returning keys, take dated photos and videos of every cleaned room, inside appliances, cabinets, closets, bathrooms, floors, baseboards, and any landlord checklist items. Save the cleaning receipt or invoice, lease cleaning requirements, maintenance notes, and final walkthrough messages. Photos and receipts do not guarantee a full deposit, but they make the handoff clearer if there is a dispute.",
    audienceQuestion: "What proof should I keep after move-out cleaning?",
    updated: "2026-06-08",
    readingTime: "7 min read",
    serviceIntent: "move-out-cleaning",
    sections: [
      {
        title: "Take photos after the home is empty",
        paragraphs: [
          "Move-out photos are most useful after furniture, boxes, trash, and personal items are gone. Empty rooms show floors, walls, baseboards, corners, closets, shelves, and cabinet interiors in a way that crowded rooms cannot.",
          "Take wide photos first, then close-ups. A wide photo proves which room you are in. A close-up proves the condition of the surface. If you only take close-ups, it can be hard to connect the picture to the room later.",
        ],
        bullets: ["Entry and hallways", "Kitchen counters, sink, stove, oven, fridge, and cabinets", "Bathrooms, tubs, toilets, mirrors, and floors", "Closets, shelves, and baseboards", "Bedrooms and living areas", "Windows, sills, and blinds if required"],
      },
      {
        title: "Save proof of professional cleaning",
        paragraphs: [
          "If you hire a cleaner, keep the receipt or invoice with the date, service type, property address if available, and the scope of work. A plain payment screenshot is less useful than a receipt that says move-out cleaning, apartment cleaning, or the actual service performed.",
          "If the lease requires professional cleaning, carpet cleaning, or specific move-out tasks, save those requirements next to the receipt. You want one clean packet of evidence, not a search through texts when stress is high.",
        ],
        bullets: ["Cleaning receipt or invoice", "Date and address", "Service type", "Scope notes or checklist", "Add-ons like fridge, oven, or cabinets", "Messages confirming the appointment"],
      },
      {
        title: "Document the handoff, not just the clean",
        paragraphs: [
          "A landlord can still charge for damage, missing items, trash, keys, utilities, carpet rules, or lease requirements that are not cleaning. That is why handoff proof should include more than a shiny sink.",
          "Take photos of keys returned, garage openers, mailbox keys, appliance condition, empty closets, and any maintenance items you reported before leaving. If there is a walkthrough, ask what still needs attention before you lose access.",
        ],
        bullets: ["Keys and remotes returned", "No trash left behind", "Empty cabinets and closets", "Appliance condition", "Maintenance requests submitted", "Walkthrough notes or email"],
      },
      {
        title: "Know what photos cannot guarantee",
        paragraphs: [
          "Photos and receipts help, but they do not control every deposit decision. Lease language, state law, property manager rules, carpet requirements, damage, timing, and normal wear-and-tear standards can all matter.",
          "Use cleaning proof as protection, not as a promise. The goal is to reduce confusion and make the handoff easier to explain if someone later says the home was not clean.",
        ],
        note: "This guide is practical cleaning guidance, not legal advice. For deposit disputes, check your lease and local renter rules.",
      },
    ],
    faqs: [
      ["Do cleaning photos guarantee my security deposit back?", "No. They help document condition, but deposit decisions can also involve lease terms, damage, local rules, and property manager policies."],
      ["Should I photograph inside the fridge and oven?", "Yes, especially if those areas were cleaned or required by the lease. Take wide and close-up photos."],
      ["Is a cleaning receipt enough proof?", "A receipt helps, but photos of the actual condition are stronger when paired with the receipt and lease checklist."],
      ["When should I take move-out photos?", "After the clean and before returning keys, while you still have access to fix or document anything important."],
    ],
    links: [["Move-out cleaning", "/services/move-out-cleaning"], ["Move-out checklist", "/checklists/move-out-cleaning-checklist"], ["Security deposit cleaning", "/faq/how-to-get-security-deposit-back-cleaning"], ["Get a quote", "/quote"]],
  },
]

export const guideNavigationLinks: [string, string][] = guideArticles.map((article) => [article.h1.replace(/\.$/, ""), article.path])

export function getGuideArticleByPath(path: string) {
  return guideArticles.find((article) => article.path === path)
}

export function getGuideLinksForService(serviceSlug: string): [string, string][] {
  if (serviceSlug.includes("move") || serviceSlug.includes("rental") || serviceSlug.includes("apartment")) {
    return [
      ["Move-out photo proof", "/guides/move-out-cleaning-photos-receipts-before-handoff"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
    ]
  }

  if (serviceSlug.includes("deep") || serviceSlug.includes("post-construction")) {
    return [
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
      ["If a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"],
    ]
  }

  if (serviceSlug.includes("recurring") || serviceSlug.includes("weekly") || serviceSlug.includes("biweekly")) {
    return [
      ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
      ["If a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"],
    ]
  }

  return [
    ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
    ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
    ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
  ]
}

export function getGuideLinksForPage(path: string): [string, string][] {
  if (path === "/quote" || path.startsWith("/pricing")) {
    return [
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
    ]
  }

  if (path.includes("move") || path.includes("moving") || path.includes("renter") || path.includes("landlord") || path.includes("security-deposit")) {
    return [
      ["Move-out photo proof", "/guides/move-out-cleaning-photos-receipts-before-handoff"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
    ]
  }

  if (path.includes("guarantee") || path.includes("review") || path.includes("why-shynli")) {
    return [
      ["If a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"],
      ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
    ]
  }

  if (path.startsWith("/checklists") || path.startsWith("/faq")) {
    return [
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
      ["If a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"],
    ]
  }

  return [
    ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
    ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
    ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
  ]
}

export function getGuideIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shynli.com/#business",
        name: publicBusinessName,
        legalName: legalBusinessName,
        telephone: businessPhoneSchema,
        areaServed: cityList.map((name) => ({ "@type": "City", name })),
      },
      {
        "@type": "CollectionPage",
        name: guideHub.h1,
        description: guideHub.description,
        url: "https://shynli.com/guides",
        hasPart: guideArticles.map((article) => ({
          "@type": "Article",
          headline: article.h1,
          url: `https://shynli.com${article.path}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://shynli.com/guides" },
        ],
      },
    ],
  }
}

export function getGuideArticleSchema(article: GuideArticleData) {
  const url = `https://shynli.com${article.path}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shynli.com/#business",
        name: publicBusinessName,
        legalName: legalBusinessName,
        telephone: businessPhoneSchema,
        areaServed: cityList.map((name) => ({ "@type": "City", name })),
      },
      {
        "@type": "Article",
        headline: article.h1,
        description: article.description,
        url,
        datePublished: article.updated,
        dateModified: article.updated,
        author: { "@type": "Organization", name: publicBusinessName },
        publisher: { "@type": "Organization", name: publicBusinessName },
        mainEntityOfPage: url,
        articleSection: "House Cleaning Guides",
        keywords: article.keywords,
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://shynli.com/guides" },
          { "@type": "ListItem", position: 3, name: article.h1, item: url },
        ],
      },
    ],
  }
}
