import { legalBusinessName, publicBusinessName } from "@/site/data"
import { legalPages } from "@/site/legal-data"
import { SiteFooter, SiteHeader, useSeoMeta } from "@/site/shared"

export type LegalPageData = (typeof legalPages)[number]

function isPrimaryHeading(line: string) {
  return /^\d+\)\s/.test(line) || /^\d+\.\s/.test(line)
}

function isSecondaryHeading(line: string) {
  return /^\d+\.\d+\s/.test(line) || /^[A-Z][A-Za-z /&-]+:$/.test(line)
}

export function LegalLine({ line }: { line: string }) {
  if (/^[A-Z][A-Z /()-]+$/.test(line) && line.length < 80) {
    return <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1976a3]">{line}</p>
  }

  if (isPrimaryHeading(line)) {
    return <h2 className="pt-6 text-2xl font-black leading-tight text-[#0d2633] md:text-3xl">{line}</h2>
  }

  if (isSecondaryHeading(line)) {
    return <h3 className="pt-4 text-xl font-black leading-tight text-[#0d2633]">{line}</h3>
  }

  if (line.startsWith("- ")) {
    return (
      <li className="ml-5 list-disc text-base leading-8 text-[#43525c]">
        {line.slice(2)}
      </li>
    )
  }

  if (line.includes("Last Updated:") || line.includes("Time Zone:") || line.startsWith("Questions:")) {
    return <p className="text-sm font-black text-[#5b6a73]">{line}</p>
  }

  return <p className="text-base leading-8 text-[#43525c]">{line}</p>
}

export function LegalPage({ page }: { page: LegalPageData }) {
  const bodyLines = page.lines.filter((line) => line !== page.lines[0])
  const showCancellationHelp = page.path === "/cancellation"

  useSeoMeta(`${page.title} | Shynli Cleaning`, page.description, {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: `https://shynli.com${page.path}`,
    publisher: {
      "@type": "Organization",
      name: publicBusinessName,
      legalName: legalBusinessName,
    },
    isPartOf: {
      "@type": "WebSite",
      name: publicBusinessName,
      url: "https://shynli.com",
    },
  })

  return (
    <main className="min-h-screen bg-[#eef8fc] pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(159,227,255,0.18),transparent_34%),linear-gradient(135deg,#0d2633_0%,#12384a_54%,#0d2633_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Shynli legal</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{page.description}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <article className="mx-auto max-w-4xl rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm md:p-8">
          <div className="space-y-4">
            {bodyLines.map((line, index) => (
              <LegalLine key={`${page.slug}-${index}-${line.slice(0, 24)}`} line={line} />
            ))}
          </div>
        </article>
      </section>

      {showCancellationHelp ? (
        <section className="px-4 pb-12 md:px-8 md:pb-16">
          <div className="mx-auto max-w-4xl rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm md:p-7">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1976a3]">Before you move the visit</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0d2633]">Not every messy day needs to be cancelled.</h2>
            <p className="mt-3 text-base leading-8 text-[#43525c]">
              If the home is simply more lived-in than usual, a priority-room plan may work better than cancelling. If access, safety, movers, contractors, pets, or illness block the visit, rescheduling is usually clearer.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="/guides/when-to-reschedule-house-cleaning" className="inline-flex min-h-11 items-center rounded-full border border-[#1976a3] bg-[#eaf7ff] px-4 text-sm font-black text-[#145f85] hover:bg-[#d8f1ff]">
                When to reschedule cleaning
              </a>
              <a href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-[#d8e8f0] bg-white px-4 text-sm font-black text-[#0d2633] hover:border-[#1976a3]">
                Contact Shynli
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  )
}
