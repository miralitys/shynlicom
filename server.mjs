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
const publicBaseUrl = "https://shynli.com"

const guideSeoMeta = new Map([
  ["/guides", {
    title: "House Cleaning Guides | Shynli Cleaning",
    description: "Practical Shynli house cleaning guides that answer real questions about cleaners, quotes, messy homes, timing, access, pricing, recurring visits, first-clean feedback, and booking.",
    keywords: "house cleaning guides, professional cleaning questions, messy house cleaner, house cleaning time, cleaner broke something, hourly vs flat rate cleaning, recurring cleaning rotation, cleaning before baby arrives, reschedule house cleaning",
  }],
  ["/guides/first-time-house-cleaner-etiquette", {
    title: "First-Time House Cleaner Etiquette | Shynli Cleaning",
    description: "First-time house cleaner etiquette: what to do before the cleaner arrives, whether to stay home, what to tidy, and how to set expectations.",
    keywords: "first time house cleaner etiquette, what to do before cleaner comes, should I stay home during cleaning, house cleaner protocol, professional house cleaning etiquette",
  }],
  ["/guides/what-to-tell-cleaning-service-before-quote", {
    title: "What to Tell a Cleaning Service Before a Quote | Shynli Cleaning",
    description: "What to tell a cleaning service before a quote: home condition, rooms, pets, access, add-ons, timing, and priorities that change price.",
    keywords: "cleaning service quote, house cleaning estimate, what to tell cleaner, cleaning quote checklist, professional cleaning estimate",
  }],
  ["/guides/what-house-cleaners-do-not-do", {
    title: "What House Cleaners Usually Do Not Do | Shynli Cleaning",
    description: "What house cleaners usually do not do, what may be an add-on, and how to avoid awkward expectations before a professional cleaning visit.",
    keywords: "what house cleaners do not do, house cleaning boundaries, cleaning service not included, maid service expectations, deep cleaning add ons",
  }],
  ["/guides/what-to-do-if-cleaner-missed-spots", {
    title: "What to Do If a Cleaner Missed Spots | Shynli Cleaning",
    description: "What to do if a house cleaner missed spots: how to document the issue, what to say, and how to prevent the same problem next time.",
    keywords: "cleaner missed spots, cleaning service complaint, house cleaning follow up, cleaning satisfaction guarantee, cleaner re-clean request",
  }],
  ["/guides/move-out-cleaning-photos-receipts-before-handoff", {
    title: "Move-Out Cleaning Photos and Receipts Before Handoff | Shynli Cleaning",
    description: "How to use move-out cleaning photos, receipts, and room-by-room proof before returning keys or finishing a landlord walkthrough.",
    keywords: "move out cleaning photos, cleaning receipt landlord, security deposit cleaning proof, apartment move out cleaning evidence, move out handoff cleaning",
  }],
  ["/guides/should-you-tip-house-cleaners", {
    title: "Should You Tip House Cleaners? | Shynli Cleaning",
    description: "Should you tip house cleaners? Learn when tipping is common, what amount feels reasonable, and how to handle one-time, deep, move, and recurring cleaning.",
    keywords: "should you tip house cleaners, house cleaner tipping, cleaning service tip amount, maid service tipping etiquette, tip professional cleaner",
  }],
  ["/guides/house-cleaning-with-pets-and-allergies", {
    title: "House Cleaning With Pets and Allergies | Shynli Cleaning",
    description: "How to prepare for house cleaning when you have pets, pet hair, dander, allergies, odors, litter boxes, and guests who may be sensitive.",
    keywords: "house cleaning with pets, pet hair cleaning, pet dander cleaning, cleaning for allergies, pet friendly house cleaning, cleaner with pets at home",
  }],
  ["/guides/how-to-choose-house-cleaning-service", {
    title: "How to Choose a House Cleaning Service | Shynli Cleaning",
    description: "How to choose a house cleaning service when you care about trust, access, reviews, insurance, scope, pricing, and follow-up after the clean.",
    keywords: "how to choose house cleaning service, trustworthy house cleaner, insured house cleaners, background checked cleaners, professional cleaning service questions",
  }],
  ["/guides/which-house-cleaning-add-ons-are-worth-it", {
    title: "Which House Cleaning Add-Ons Are Worth It? | Shynli Cleaning",
    description: "Which house cleaning add-ons are worth it? Compare oven, fridge, cabinet interiors, blinds, interior windows, baseboards, doors, and basement cleaning.",
    keywords: "house cleaning add ons, oven cleaning add on, fridge cleaning add on, cabinet cleaning add on, blinds cleaning add on, interior window cleaning",
  }],
  ["/guides/keep-house-clean-between-professional-cleanings", {
    title: "How to Keep a House Clean Between Professional Cleanings | Shynli Cleaning",
    description: "How to keep your house clean between professional cleaning visits with small daily, weekly, pet, kitchen, bathroom, and clutter habits.",
    keywords: "keep house clean between cleanings, between professional cleanings, weekly cleaning routine, biweekly cleaning maintenance, recurring house cleaning tips",
  }],
  ["/guides/hiring-cleaner-when-house-is-messy", {
    title: "Hiring a Cleaner When Your House Is Messy | Shynli Cleaning",
    description: "Embarrassed to hire a cleaner because the house is messy? Learn what to say, what to pick up, and when cleaning vs decluttering matters.",
    keywords: "hire cleaner messy house, embarrassed to hire cleaner, cluttered house cleaning service, cleaning help for messy house, professional cleaner messy home",
  }],
  ["/guides/should-you-give-cleaner-key-or-door-code", {
    title: "Should You Give a Cleaner a Key or Door Code? | Shynli Cleaning",
    description: "Should you give a cleaner a key or door code? Learn safer access options, what to confirm, and how to handle cleaning when you are not home.",
    keywords: "give cleaner key, house cleaner door code, leave cleaner alone in house, cleaning service access instructions, cleaner lockbox code",
  }],
  ["/guides/cleaning-service-with-kids-and-toys", {
    title: "House Cleaning With Kids and Toys | Shynli Cleaning",
    description: "How to prepare for a cleaning service when you have kids, toys, playrooms, snack messes, bathrooms, and work-from-home family routines.",
    keywords: "house cleaning with kids, cleaner with toys on floor, cleaning service with children home, playroom cleaning service, prepare for cleaner with kids",
  }],
  ["/guides/what-to-prioritize-cleaning-service-limited-budget", {
    title: "What to Prioritize With a Cleaning Budget | Shynli Cleaning",
    description: "If you have a limited cleaning budget, learn which rooms and tasks to prioritize so the visit creates the biggest visible difference.",
    keywords: "cleaning service limited budget, prioritize rooms for cleaner, house cleaning budget, partial house cleaning, hourly cleaning priorities",
  }],
  ["/guides/initial-deep-clean-before-recurring-cleaning", {
    title: "Why the First Cleaning Is Different From Recurring Cleaning | Shynli Cleaning",
    description: "Why a first cleaning or initial deep clean often takes longer than weekly, biweekly, or monthly recurring cleaning visits.",
    keywords: "first deep clean before recurring cleaning, initial cleaning vs maintenance clean, recurring cleaning first visit, deep clean before biweekly cleaning, first house cleaning more expensive",
  }],
  ["/guides/how-long-house-cleaning-should-take", {
    title: "How Long Should House Cleaning Take? | Shynli Cleaning",
    description: "How long should house cleaning take? Learn what changes cleaning time, why first visits take longer, and how teams compare with one cleaner.",
    keywords: "how long should house cleaning take, house cleaner hours, cleaning service time estimate, how many hours for a cleaner, professional cleaning duration",
  }],
  ["/guides/what-if-cleaner-breaks-something", {
    title: "What If a House Cleaner Breaks Something? | Shynli Cleaning",
    description: "What to do if a cleaner breaks or damages something in your home, how to document it, and how to prevent fragile-item problems.",
    keywords: "cleaner broke something, house cleaner damaged item, cleaning service broke item, cleaner damage what to do, insured house cleaners",
  }],
  ["/guides/cleaning-service-while-working-from-home", {
    title: "House Cleaning While Working From Home | Shynli Cleaning",
    description: "How to handle a cleaning service while working from home, including office rooms, calls, pets, timing, wet floors, and rooms to clean last.",
    keywords: "cleaning service while working from home, cleaner while I work from home, house cleaner home office, cleaning lady etiquette work from home, remote work cleaning visit",
  }],
  ["/guides/cleaner-vs-housekeeper-dishes-laundry-beds", {
    title: "Cleaner vs Housekeeper: Dishes, Laundry, and Beds | Shynli Cleaning",
    description: "Cleaner vs housekeeper: what to ask before expecting dishes, laundry, bed making, sheet changes, tidying, or organizing from a cleaning visit.",
    keywords: "cleaner vs housekeeper, do cleaners do dishes, do house cleaners do laundry, do cleaners change sheets, maid service laundry dishes beds",
  }],
  ["/guides/one-cleaner-vs-cleaning-team", {
    title: "One Cleaner vs Cleaning Team | Shynli Cleaning",
    description: "One cleaner vs a cleaning team: how speed, consistency, trust, price, access, and communication can change the house cleaning experience.",
    keywords: "one cleaner vs cleaning team, cleaning team vs individual cleaner, house cleaning team, individual house cleaner, professional cleaning company team",
  }],
  ["/guides/hourly-vs-flat-rate-house-cleaning", {
    title: "Hourly vs Flat-Rate House Cleaning | Shynli Cleaning",
    description: "Hourly vs flat-rate house cleaning: how to compare cleaner-hours, scope, add-ons, first visits, and what the quote really includes.",
    keywords: "hourly vs flat rate house cleaning, hourly house cleaner, flat rate cleaning service, house cleaning quote, cleaner hours vs price",
  }],
  ["/guides/rotating-deep-cleaning-tasks-on-recurring-visits", {
    title: "Rotating Deep-Cleaning Tasks on Recurring Visits | Shynli Cleaning",
    description: "Can recurring cleaning include rotating deep-cleaning tasks? Learn what can rotate, what needs an add-on, and how to plan weekly or biweekly visits.",
    keywords: "rotating deep cleaning tasks, recurring cleaning rotation, biweekly cleaning deep tasks, weekly cleaning rotation, maintenance cleaning checklist",
  }],
  ["/guides/what-to-check-after-first-house-cleaning", {
    title: "What to Check After Your First House Cleaning | Shynli Cleaning",
    description: "What to check after your first house cleaning before you rebook: priority rooms, scope, missed spots, communication, and recurring fit.",
    keywords: "what to check after first house cleaning, first cleaning walkthrough, cleaning service feedback, house cleaner rebook decision, professional cleaning checklist review",
  }],
  ["/guides/cleaning-service-before-baby-arrives", {
    title: "Hiring a Cleaning Service Before a Baby Arrives | Shynli Cleaning",
    description: "Hiring a cleaning service before a baby arrives: what to prioritize, when to book, product notes, family routines, and what not to overdo.",
    keywords: "cleaning service before baby arrives, house cleaning before newborn, deep cleaning before baby, cleaning help for expecting parents, baby arriving house cleaning",
  }],
  ["/guides/when-to-reschedule-house-cleaning", {
    title: "When to Reschedule a House Cleaning | Shynli Cleaning",
    description: "When should you reschedule a house cleaning? Practical guidance for sickness, no access, movers, contractors, pets, travel, and timing conflicts.",
    keywords: "when to reschedule house cleaning, cancel cleaning service, reschedule cleaner, house cleaner sick at home, cleaning appointment access issue",
  }],
])

const guideArticleSeoExtras = new Map([
  ["/guides/first-time-house-cleaner-etiquette", {
    headline: "First-time house cleaner etiquette: what to do before, during, and after the visit.",
    dateModified: "2026-06-08",
    faqs: [
      ["Should I clean before the cleaner comes?", "No. Do not clean the house for the cleaner. Do tidy personal clutter enough that the cleaner can reach counters, floors, sinks, and surfaces."],
      ["Should I be home for the first cleaning?", "It can help to be home for the first few minutes, especially for access, pets, priority rooms, and special surfaces. After that, you can leave or stay out of the way."],
      ["Do I need to make a checklist?", "A checklist is helpful for priorities and boundaries. It should not replace a professional cleaning routine."],
      ["What should I do with pets?", "Tell the cleaner where pets will be, whether they can be loose, and which doors or gates need attention. If a pet is nervous, keep them in a safe room."],
    ],
  }],
  ["/guides/what-to-tell-cleaning-service-before-quote", {
    headline: "What to tell a cleaning service before you ask for a quote.",
    dateModified: "2026-06-08",
    faqs: [
      ["Do photos help with a cleaning quote?", "Yes. Photos can help the service understand condition, room size, clutter level, and add-ons before time is reserved."],
      ["Should I say the home is messy?", "Yes, if it changes the work. Use practical words like cluttered surfaces, heavy bathroom buildup, pet hair, or move-out condition."],
      ["Can the quote change after arrival?", "It can if the home is very different from the information provided or if extra tasks are added."],
      ["What is the fastest way to get a better estimate?", "Share the ZIP, service type, bedrooms, bathrooms, condition, access, pets, and priority rooms in one message."],
    ],
  }],
  ["/guides/what-house-cleaners-do-not-do", {
    headline: "What house cleaners usually do not do, and what to ask about first.",
    dateModified: "2026-06-08",
    faqs: [
      ["Do house cleaners pick up clutter?", "They may move light items to clean a surface, but organizing personal clutter is usually not included unless clearly agreed to."],
      ["Are dishes included?", "Dishwashing is not always included in house cleaning. Ask before booking if the sink or kitchen reset depends on dishes."],
      ["Can cleaners move furniture?", "Light items may be moved when safe. Heavy furniture, appliances, and risky lifting usually need a separate plan."],
      ["Are fridge and oven cleaning included?", "They are usually add-ons unless the quote specifically includes them."],
    ],
  }],
  ["/guides/what-to-do-if-cleaner-missed-spots", {
    headline: "What to do if a cleaner missed spots after a house cleaning visit.",
    dateModified: "2026-06-08",
    faqs: [
      ["How soon should I report a missed spot?", "As soon as possible, ideally the same day. Quick reporting makes the issue easier to verify and solve."],
      ["Should I ask for a refund or re-clean?", "For a covered missed item, a re-clean or make-right follow-up is often more reasonable than jumping straight to a refund."],
      ["What if the cleaner says it was not included?", "Ask the service to clarify the scope. If it was an add-on or outside the service, request it before the next visit."],
      ["How do I avoid sounding rude?", "Be specific, factual, and timely. Name the room, surface, photos, and what you expected."],
    ],
  }],
  ["/guides/move-out-cleaning-photos-receipts-before-handoff", {
    headline: "Move-out cleaning photos and receipts to collect before you return keys.",
    dateModified: "2026-06-08",
    faqs: [
      ["Do cleaning photos guarantee my deposit back?", "No. Photos do not guarantee a deposit decision, but they help document the condition you left behind."],
      ["Should I photograph the whole room or only problem spots?", "Do both. Wide photos show room condition, while close-ups show appliances, sinks, floors, and details."],
      ["Do I need a cleaning receipt?", "A receipt can help show that cleaning was completed, especially when a lease or property manager expects proof."],
      ["When should I take move-out cleaning photos?", "Take them after the clean is finished and before returning keys, moving more items, or losing access."],
    ],
  }],
  ["/guides/should-you-tip-house-cleaners", {
    headline: "Should you tip house cleaners? A practical guide for one-time, deep, move, and recurring visits.",
    dateModified: "2026-06-14",
    faqs: [
      ["Is tipping required for house cleaning?", "No. Tipping is usually optional unless a company states a specific policy. It is appreciated when the cleaner did careful work or the job was especially demanding."],
      ["Should I tip for a deep clean?", "Many customers do tip for a deep clean because the visit is more detailed and physically demanding than a maintenance clean."],
      ["Do I tip every recurring cleaning visit?", "Not necessarily. Some customers tip occasionally or give a holiday thank-you instead of tipping every recurring appointment."],
      ["Should I tip the owner of a cleaning company?", "Some people tip only employee cleaners and not owner-operators, while others tip anyone who did excellent work. If you are unsure, ask the company how tips are handled."],
    ],
  }],
  ["/guides/house-cleaning-with-pets-and-allergies", {
    headline: "House cleaning with pets and allergies: what to tell the cleaner before the visit.",
    dateModified: "2026-06-14",
    faqs: [
      ["Do I need to put my pets away before cleaning?", "It is safest to secure nervous, reactive, or escape-prone pets. Friendly pets may still need a separate room so the cleaner can work without doors or wet floors becoming a problem."],
      ["Can a house cleaner remove pet dander completely?", "No cleaning visit can promise complete allergen removal. A cleaner can reduce dust, hair, and surface buildup, but carpets, upholstery, ducts, and severe dander may need specialists."],
      ["Should I provide fragrance-free products?", "If you need specific products, mention that before booking. Some companies bring supplies, but allergy or fragrance requests should be confirmed early."],
      ["Will cleaners clean litter boxes or pet accidents?", "Pet waste, biohazards, and heavy contamination are usually outside normal house cleaning. Ask before booking if a pet area needs special attention."],
    ],
  }],
  ["/guides/how-to-choose-house-cleaning-service", {
    headline: "How to choose a house cleaning service when trust matters.",
    dateModified: "2026-06-14",
    faqs: [
      ["What should I ask before hiring a house cleaner?", "Ask what is included, what costs extra, whether supplies are included, how access is handled, what happens if something is missed, and what details affect the quote."],
      ["Is the cheapest cleaner a bad idea?", "Not always, but the cheapest quote can become expensive if the scope is unclear, add-ons are missing, or the visit is rushed."],
      ["Should I choose an independent cleaner or a cleaning company?", "Either can work. A company may offer clearer scheduling, support, and follow-up. An independent cleaner may feel more personal. Compare the actual process, not just the label."],
      ["How do I know if a cleaning service is professional?", "Look for clear communication, service boundaries, practical quote questions, trust signals, and a follow-up path after the visit."],
    ],
  }],
  ["/guides/which-house-cleaning-add-ons-are-worth-it", {
    headline: "Which house cleaning add-ons are worth it before you book?",
    dateModified: "2026-06-14",
    faqs: [
      ["Is oven cleaning usually included?", "Inside oven cleaning is usually an add-on unless the quote clearly includes it."],
      ["Is fridge cleaning worth it?", "It is worth it for move-in, move-out, old spills, odors, or when the fridge affects how clean the kitchen feels."],
      ["Should I add blinds cleaning?", "Add it when blinds are visibly dusty, there are allergies or pet hair, or the room needs to look sharper for guests or photos."],
      ["Can I add cleaning extras after the cleaner arrives?", "Sometimes, but it may not fit the reserved time. Add-ons are best requested before booking."],
    ],
  }],
  ["/guides/keep-house-clean-between-professional-cleanings", {
    headline: "How to keep your house clean between professional cleaning visits.",
    dateModified: "2026-06-14",
    faqs: [
      ["Do I need to clean between professional cleanings?", "You do not need to deep clean, but light maintenance helps keep the next visit effective."],
      ["What should I do the day before my cleaner comes?", "Pick up clutter, clear sinks and counters when possible, secure pets, and leave notes for priority areas."],
      ["How do I know if I need weekly instead of biweekly cleaning?", "If the home feels out of control several days before each visit, weekly service or a deeper first reset may fit better."],
      ["Should I change the cleaning schedule if I have pets?", "Maybe. Pet hair, dander, odors, and floor traffic can make weekly or biweekly service more useful than monthly service."],
    ],
  }],
  ["/guides/hiring-cleaner-when-house-is-messy", {
    headline: "Can you hire a cleaner when your house is messy?",
    dateModified: "2026-06-16",
    faqs: [
      ["Will cleaners judge my messy house?", "A professional cleaner should not judge you. They do need honest details so the right time, service, and expectations are set before the visit."],
      ["Should I clean before hiring a cleaner?", "No. Do not deep clean first. Pick up items that block access, create safety issues, or contain private information, then let the cleaner handle the cleaning."],
      ["Can a cleaner help if I have clutter everywhere?", "Sometimes, but clutter changes the job. If surfaces and floors are blocked, the cleaner may need to skip areas or you may need organizing or decluttering help first."],
      ["What should I say when I feel embarrassed?", "Use practical words: cluttered counters, heavy kitchen buildup, pet hair, laundry on floors, or first deep clean in a long time. You do not need to explain your life story."],
    ],
  }],
  ["/guides/should-you-give-cleaner-key-or-door-code", {
    headline: "Should you give a cleaner a key, door code, or be home for the visit?",
    dateModified: "2026-06-16",
    faqs: [
      ["Should I be home for the first cleaning?", "It is reasonable to be home at the beginning of the first visit. After the walkthrough, you can leave or stay in a room that is out of the way."],
      ["Is a door code better than a key?", "Often yes, because a code can be changed or limited. A key can work too, but you should know who has it and how it is returned."],
      ["What access details should I send before cleaning?", "Send parking, entry, door code or lockbox, alarm, pets, off-limits rooms, and lock-up instructions."],
      ["Can cleaners clean while I work from home?", "Yes, if you choose a room to work in, tell the cleaner to clean that room last, and avoid moving through areas while they are being cleaned."],
    ],
  }],
  ["/guides/cleaning-service-with-kids-and-toys", {
    headline: "How to make house cleaning work when you have kids and toys everywhere.",
    dateModified: "2026-06-16",
    faqs: [
      ["Do I have to pick up every toy before cleaners come?", "No. Focus on toys blocking floors, stairs, sinks, counters, and priority rooms. Use bins or one holding spot if you are short on time."],
      ["Will cleaners organize toys?", "Usually not unless that is agreed to. Cleaners may gather light items, but organizing toys and belongings is a different service."],
      ["Can my kids stay home during cleaning?", "Yes, but keep them out of active work areas and tell the cleaner about nap rooms, child gates, and rooms to clean first or last."],
      ["What rooms should families prioritize?", "Most families get the biggest benefit from kitchen, bathrooms, main floors, bedrooms used daily, and any play area that affects the whole home."],
    ],
  }],
  ["/guides/what-to-prioritize-cleaning-service-limited-budget", {
    headline: "What should you prioritize if you have a limited cleaning budget?",
    dateModified: "2026-06-16",
    faqs: [
      ["Can I book only part of the house?", "Often yes. Ask for a priority-room clean or explain which rooms matter most. The company should tell you what can fit."],
      ["What rooms should I clean first on a budget?", "Bathrooms, kitchen, main floors, entry areas, and the room that affects daily life most usually give the biggest result."],
      ["Should I choose a cheaper cleaner or fewer rooms?", "Fewer rooms with a clearer scope is often better than a rushed full-house clean that touches everything lightly."],
      ["Can recurring cleaning save money over time?", "It can reduce the size of each reset because the home does not fall as far behind between visits."],
    ],
  }],
  ["/guides/initial-deep-clean-before-recurring-cleaning", {
    headline: "Why is the first cleaning different from recurring cleaning?",
    dateModified: "2026-06-16",
    faqs: [
      ["Does every recurring plan need a first deep clean?", "Not always, but many homes need a stronger first visit before maintenance cleaning can work well."],
      ["Why does the first cleaning cost more?", "It usually takes more labor, detail, and setup than a maintenance visit because the cleaner is catching up buildup and learning the home."],
      ["Can I start with regular cleaning instead of deep cleaning?", "Sometimes, especially if the home is already well maintained. If there is buildup, the result may be weaker unless priorities are narrowed."],
      ["How do I choose weekly, biweekly, or monthly cleaning?", "Choose based on how quickly the home gets behind. Weekly fits busy or high-traffic homes, biweekly is a common balance, and monthly requires more self-maintenance."],
    ],
  }],
  ["/guides/how-long-house-cleaning-should-take", {
    headline: "How long should a house cleaning take?",
    dateModified: "2026-06-19",
    faqs: [
      ["Is 9 hours normal for house cleaning?", "It can be normal for one cleaner doing a detailed first clean, especially with pets, buildup, or many rooms. It would mean something different for a large team on a maintenance visit."],
      ["Why did a cleaning team finish faster than one cleaner?", "A team splits rooms and tasks. Two cleaners for two hours can equal four cleaner-hours, so the clock time can look shorter while the labor time is similar."],
      ["Should recurring cleaning take less time?", "Usually yes. Once the baseline is set, recurring visits should focus on maintenance unless the home gets far behind between visits."],
      ["What should I ask before booking?", "Ask how many cleaners may come, what is included, whether the first visit needs extra time, and which add-ons change the schedule."],
    ],
  }],
  ["/guides/what-if-cleaner-breaks-something", {
    headline: "What should you do if a house cleaner breaks something?",
    dateModified: "2026-06-19",
    faqs: [
      ["Should I tell the cleaner directly or the company?", "If you booked through a company, contact the company so the issue is documented and handled through the right process."],
      ["What if I do not notice the damage until later?", "Report it as soon as you notice it and explain when you first saw it. Fast reporting is easier to verify."],
      ["Should I move fragile items before cleaning?", "Yes. Move fragile, valuable, sentimental, or unstable items away from active cleaning surfaces before the visit."],
      ["Does insurance mean every item is automatically covered?", "No. Coverage depends on the facts, service terms, item condition, and the company's process. Ask the service how damage claims are handled."],
    ],
  }],
  ["/guides/cleaning-service-while-working-from-home", {
    headline: "How do you handle house cleaning while working from home?",
    dateModified: "2026-06-19",
    faqs: [
      ["Is it rude to stay home while cleaners clean?", "No. Many customers stay home. It works best when you stay out of active work areas and tell the cleaner which room you will use."],
      ["Should I have cleaners skip my office?", "Skip it if the desk is private, covered with papers, or needed for meetings. You can also ask to have it cleaned first or last."],
      ["Can I take calls during the visit?", "Yes, but share important call windows so vacuuming or nearby room cleaning can be planned around them when possible."],
      ["What should I do with pets while working from home?", "Keep pets in a safe room or with you if they might follow the cleaner, escape through doors, or walk over wet floors."],
    ],
  }],
  ["/guides/cleaner-vs-housekeeper-dishes-laundry-beds", {
    headline: "Cleaner vs housekeeper: do cleaners do dishes, laundry, or beds?",
    dateModified: "2026-06-19",
    faqs: [
      ["Do house cleaners do laundry?", "Usually not unless laundry is clearly included in the service. Washing, drying, folding, and putting away laundry can add significant time."],
      ["Do cleaners change sheets?", "Some cleaners will change sheets if clean linens are ready and the task is requested before the visit."],
      ["Are dishes included in house cleaning?", "Not always. Ask before booking, especially if the sink is full or dishes would take time from the rest of the home."],
      ["What if I need both cleaning and household chores?", "Say that before the quote. You may need a longer visit, a housekeeping-style service, or a priority plan."],
    ],
  }],
  ["/guides/one-cleaner-vs-cleaning-team", {
    headline: "Is one cleaner or a cleaning team better for your home?",
    dateModified: "2026-06-19",
    faqs: [
      ["Is a cleaning team better than one cleaner?", "Not always. A team is often better for larger jobs and tighter timing. One cleaner can be better for a familiar recurring routine."],
      ["Does a team cost more?", "It depends on the quote. Compare cleaner-hours, scope, and result, not only clock time or headcount."],
      ["Will a team know my home as well as one cleaner?", "They can if the company keeps good notes and assigns the visit clearly. Without notes, preferences can get lost."],
      ["Which is better for a first deep clean?", "A team is often helpful for a first deep clean because the visit can require more detail, more rooms, and more cleaner-hours."],
    ],
  }],
  ["/guides/hourly-vs-flat-rate-house-cleaning", {
    headline: "Hourly vs flat-rate house cleaning: which quote is better?",
    dateModified: "2026-06-23",
    faqs: [
      ["Is hourly house cleaning cheaper?", "Not always. It depends on how much time the home needs and whether the cleaner can finish the work you expect inside the reserved hours."],
      ["Is flat-rate cleaning unlimited?", "No. A flat quote still depends on the agreed scope, home details, add-ons, and condition described before booking."],
      ["What should I ask before comparing quotes?", "Ask what is included, how many cleaner-hours are planned, what costs extra, whether supplies are included, and what happens if the visit needs more time."],
      ["How does Shynli quote cleaning?", "Shynli starts with ZIP, service type, bedrooms, bathrooms, condition, access, pets, and add-ons so the visit can be planned before booking."],
    ],
  }],
  ["/guides/rotating-deep-cleaning-tasks-on-recurring-visits", {
    headline: "Can recurring cleaning include rotating deep-cleaning tasks?",
    dateModified: "2026-06-23",
    faqs: [
      ["Can biweekly cleaning include deep-cleaning tasks?", "Sometimes, if the core maintenance work is under control and the extra task is small enough to fit the visit."],
      ["Should I rotate baseboards every visit?", "You can rotate sections of baseboards, but whole-home baseboards usually need extra time or a deep-clean add-on."],
      ["Can oven and fridge rotate into recurring cleaning?", "They can be planned, but inside oven and fridge are usually add-ons because they take focused time."],
      ["What if the cleaner never has time for rotation?", "The home may need a longer visit, a first deep clean, a different cadence, or narrower priorities."],
    ],
  }],
  ["/guides/what-to-check-after-first-house-cleaning", {
    headline: "What to check after your first house cleaning before you rebook.",
    dateModified: "2026-06-23",
    faqs: [
      ["Should I inspect the home before the cleaner leaves?", "If you are home, a quick walkthrough can help. If not, check priority rooms soon after the visit and send photos quickly if something covered was missed."],
      ["What if the home looks better but not perfect?", "That can happen after a first clean with buildup. Compare the result to the scope and decide whether a deeper or longer visit is needed."],
      ["How do I give feedback without being rude?", "Be specific and practical. Name the room, surface, photo, and expected scope instead of sending a vague complaint."],
      ["When should I rebook recurring cleaning?", "Rebook when the service handled the home well and you can set a realistic weekly, biweekly, or monthly rhythm before the home falls behind again."],
    ],
  }],
  ["/guides/cleaning-service-before-baby-arrives", {
    headline: "Hiring a cleaning service before a baby arrives: what to prioritize.",
    dateModified: "2026-06-23",
    faqs: [
      ["Should I book deep cleaning before a baby arrives?", "A deep clean can be useful if the home has buildup or has not had a detailed reset in a while. A maintained home may only need one-time or regular cleaning."],
      ["How close to the due date should I schedule cleaning?", "There is no perfect timing, but booking before the final rush gives more room for schedule changes and follow-up if needed."],
      ["Can cleaners sanitize the home for a newborn?", "A residential cleaning service can clean surfaces and reduce visible buildup, but it should not promise medical-level sanitizing. Follow your healthcare provider's guidance for health concerns."],
      ["What should expecting parents prioritize?", "Bathrooms, kitchen, floors, bedroom surfaces, guest or caregiver areas, and the rooms used every day usually matter most."],
    ],
  }],
  ["/guides/when-to-reschedule-house-cleaning", {
    headline: "When should you reschedule a house cleaning?",
    dateModified: "2026-06-23",
    faqs: [
      ["Should I cancel because my house is messy?", "Usually no. Tell the cleaner the home is more cluttered than usual and name priority rooms. Reschedule only if the cleaner cannot safely reach the work."],
      ["Should I reschedule if someone is sick?", "If the visit would put the cleaner or household under unsafe or uncomfortable conditions, rescheduling is often the better choice. Follow practical health guidance for your situation."],
      ["Can cleaners come while I am out of town?", "Yes, if access, lock-up, pets, alarms, and communication are clear. If not, reschedule."],
      ["What if movers or contractors are still there?", "If rooms are blocked or work is still active, reschedule or move cleaning after the space is ready."],
    ],
  }],
])

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

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function upsertMetaTag(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`
  const pattern = new RegExp(`<meta\\s+name=["']${name}["'][\\s\\S]*?>`, "i")

  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }

  return html.replace("</head>", `    ${tag}\n  </head>`)
}

function upsertCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`
  const pattern = /<link\s+rel=["']canonical["'][\s\S]*?>/i

  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }

  return html.replace("</head>", `    ${tag}\n  </head>`)
}

function upsertJsonLd(html, schema) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c")
  const tag = `<script id="page-schema" type="application/ld+json">${json}</script>`
  const pattern = /<script\s+id=["']page-schema["']\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/i

  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }

  return html.replace("</head>", `    ${tag}\n  </head>`)
}

function getBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${publicBaseUrl}/#business`,
    name: "Shynli Cleaning",
    legalName: "SHYNLI LLC",
    telephone: "+1-630-812-7077",
    areaServed: [
      { "@type": "City", name: "Naperville" },
      { "@type": "City", name: "Aurora" },
      { "@type": "City", name: "Plainfield" },
      { "@type": "City", name: "Oswego" },
      { "@type": "City", name: "Bolingbrook" },
      { "@type": "City", name: "Lisle" },
    ],
  }
}

function getBreadcrumbSchema(path, title) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${publicBaseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${publicBaseUrl}/guides` },
      ...(path === "/guides" ? [] : [{ "@type": "ListItem", position: 3, name: title, item: `${publicBaseUrl}${path}` }]),
    ],
  }
}

function getGuideRouteSchema(path, meta) {
  if (path === "/guides") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        getBusinessSchema(),
        {
          "@type": "CollectionPage",
          name: "House cleaning guides for the questions people ask before they book.",
          description: meta.description,
          url: `${publicBaseUrl}/guides`,
          hasPart: [...guideArticleSeoExtras].map(([articlePath, extras]) => ({
            "@type": "Article",
            headline: extras.headline,
            url: `${publicBaseUrl}${articlePath}`,
          })),
        },
        getBreadcrumbSchema(path, "Guides"),
      ],
    }
  }

  const extras = guideArticleSeoExtras.get(path)
  const articleTitle = extras?.headline ?? meta.title.replace(" | Shynli Cleaning", "")
  const faqs = extras?.faqs ?? []

  return {
    "@context": "https://schema.org",
    "@graph": [
      getBusinessSchema(),
      {
        "@type": "Article",
        headline: articleTitle,
        description: meta.description,
        dateModified: extras?.dateModified ?? "2026-06-14",
        author: { "@type": "Organization", name: "Shynli Cleaning" },
        publisher: { "@id": `${publicBaseUrl}/#business` },
        mainEntityOfPage: `${publicBaseUrl}${path}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      getBreadcrumbSchema(path, articleTitle),
    ],
  }
}

// Карта «маршрут → title/description» для страниц городов и услуг.
// Генерируется при сборке (плагин shynli-seo-routes в vite.config.ts) и лежит
// в dist/seo-routes.json. Без неё сервер отдавал бы всем 600+ страницам
// одинаковый title из оболочки, из-за чего они висли в GSC как
// «Обнаружена, не проиндексирована».
let routeSeoMeta = new Map()

async function loadRouteSeoMeta() {
  try {
    const raw = await readFile(path.join(distDir, "seo-routes.json"), "utf8")
    routeSeoMeta = new Map(Object.entries(JSON.parse(raw)))
    console.log(`SEO-маршрутов загружено: ${routeSeoMeta.size}`)
  } catch {
    // Файла нет (например, старая сборка) — сайт работает как раньше.
    console.warn("dist/seo-routes.json не найден, страницы городов пойдут с общим title")
  }
}

function injectRouteSeo(html, requestPath) {
  const normalizedPath = requestPath.replace(/\/+$/, "") || "/"
  const guideMeta = guideSeoMeta.get(normalizedPath)
  const meta = guideMeta ?? routeSeoMeta.get(normalizedPath)

  if (!meta) {
    return html
  }

  let nextHtml = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
  nextHtml = upsertMetaTag(nextHtml, "description", meta.description)
  if (meta.keywords) {
    nextHtml = upsertMetaTag(nextHtml, "keywords", meta.keywords)
  }
  nextHtml = upsertMetaTag(nextHtml, "robots", "index,follow")
  // meta.canonical задаётся, когда страница намеренно не самостоятельная.
  // Сейчас это /service-areas/<город>/house-cleaning: она целится в тот же
  // запрос, что и страница города, и каноникалится на неё, чтобы сигналы
  // не делились между двумя URL.
  nextHtml = upsertCanonical(nextHtml, `${publicBaseUrl}${meta.canonical ?? normalizedPath}`)

  // JSON-LD гайдов оставляем как было. Для городов и услуг схему рисует
  // клиентский код, дублировать её в HTML сейчас не нужно.
  if (guideMeta) {
    nextHtml = upsertJsonLd(nextHtml, getGuideRouteSchema(normalizedPath, guideMeta))
  }

  return nextHtml
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

function normalizeLeadSource(value = "") {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")

  const aliases = {
    facebook: "facebook_lead_form",
    facebook_ads: "facebook_lead_form",
    facebook_lead: "facebook_lead_form",
    facebook_leads: "facebook_lead_form",
    facebook_lead_ad: "facebook_lead_form",
    facebook_lead_ads: "facebook_lead_form",
    facebook_lead_form: "facebook_lead_form",
    meta: "facebook_lead_form",
    meta_ads: "facebook_lead_form",
    meta_lead: "facebook_lead_form",
    meta_leads: "facebook_lead_form",
    meta_lead_ad: "facebook_lead_form",
    meta_lead_ads: "facebook_lead_form",
    meta_lead_form: "facebook_lead_form",
    shynli_com_website_contact: "shynli.com_website_contact",
    website_contact: "website_contact",
  }

  return aliases[normalized] || ""
}

function leadSourceConfig(lead) {
  if (lead.leadSource === "facebook_lead_form") {
    return {
      type: "facebook_lead_form",
      leadType: "facebook_lead_form",
      leadSource: "facebook_lead_form",
      source: "Facebook Lead Form",
      origin: "https://www.facebook.com/",
      sourceWebsite: "https://www.facebook.com/",
      sourceDomain: "facebook.com",
      sourcePagePath: "/facebook-lead-form",
    }
  }

  return {
    type: "shynli.com_website_contact",
    leadType: "shynli.com website_contact",
    leadSource: "shynli.com_website_contact",
    source: "Shynli.com Callback Request",
    origin: "https://shynli.com/",
    sourceWebsite: "https://shynli.com/",
    sourceDomain: "shynli.com",
    sourcePagePath: "/",
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
  const attribution = {
    ...(typeof body.attribution === "object" && body.attribution ? body.attribution : {}),
    gclid: body.gclid || "",
    gbraid: body.gbraid || "",
    wbraid: body.wbraid || "",
    fbclid: body.fbclid || "",
    utm_source: body.utm_source || "",
    utm_medium: body.utm_medium || "",
    utm_campaign: body.utm_campaign || "",
    utm_content: body.utm_content || "",
    utm_term: body.utm_term || "",
  }

  return {
    id: crypto.randomUUID(),
    type: "callback",
    source: "shynli.com callback form",
    leadSource: normalizeLeadSource(body.leadSource || body.lead_source || body.leadType || body.lead_type || body.type),
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
    metaLeadId: String(body.metaLeadId || body.meta_lead_id || body.leadId || body.lead_id || "").trim(),
    formName: String(body.formName || body.form_name || "").trim(),
    campaignName: String(body.campaignName || body.campaign_name || "").trim(),
    adSetName: String(body.adSetName || body.adsetName || body.ad_set_name || "").trim(),
    adName: String(body.adName || body.ad_name || "").trim(),
    attribution,
    userAgent: request.headers["user-agent"] || "",
    ip: request.headers["x-forwarded-for"] || request.socket.remoteAddress || "",
    submittedAt: new Date().toISOString(),
  }
}

function buildQuoteBackendPayload(lead) {
  const { firstName, lastName } = splitName(lead.fullName)
  const source = leadSourceConfig(lead)
  const details = [
    lead.notes || "Customer asked for a phone call to confirm details and receive the final quote.",
    lead.metaLeadId ? `Meta lead ID: ${lead.metaLeadId}` : "",
    lead.formName ? `Form: ${lead.formName}` : "",
    lead.campaignName ? `Campaign: ${lead.campaignName}` : "",
    lead.adSetName ? `Ad set: ${lead.adSetName}` : "",
    lead.adName ? `Ad: ${lead.adName}` : "",
  ].filter(Boolean).join(" | ")

  return {
    type: source.type,
    leadType: source.leadType,
    leadSource: source.leadSource,
    lead_source: source.leadSource,
    requestType: "call_me",
    source: source.source,
    origin: source.origin,
    sourceWebsite: source.sourceWebsite,
    sourceDomain: source.sourceDomain,
    sourcePagePath: lead.sourcePage || source.sourcePagePath,
    returnPath: lead.sourcePage || source.sourcePagePath,
    metaLeadId: lead.metaLeadId,
    formName: lead.formName,
    campaignName: lead.campaignName,
    adSetName: lead.adSetName,
    adName: lead.adName,
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
      additionalDetails: details,
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
      additionalDetails: details,
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
    const pageHtml = injectRouteSeo(indexHtml, requestUrl.pathname)
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    })
    response.end(pageHtml)
  }
}

await loadRouteSeoMeta()

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
