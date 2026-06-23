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
  keywords: "house cleaning guides, professional cleaning questions, messy house cleaner, house cleaning time, cleaner broke something, hourly vs flat rate cleaning, recurring cleaning rotation, cleaning before baby arrives, reschedule house cleaning",
  description: "Practical Shynli house cleaning guides that answer real questions about cleaners, quotes, messy homes, timing, access, pricing, recurring visits, first-clean feedback, and booking.",
  h1: "House cleaning guides for the questions people ask before they book.",
  dek: "These guides turn common homeowner, renter, parent, pet-owner, remote-work, and first-time-cleaner questions into plain-English answers. Use them before you request a quote, compare a service, share access, plan timing, review the first visit, or decide what to prioritize.",
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
  {
    slug: "should-you-tip-house-cleaners",
    path: "/guides/should-you-tip-house-cleaners",
    title: "Should You Tip House Cleaners? | Shynli Cleaning",
    keywords: "should you tip house cleaners, house cleaner tipping, cleaning service tip amount, maid service tipping etiquette, tip professional cleaner",
    description: "Should you tip house cleaners? Learn when tipping is common, what amount feels reasonable, and how to handle one-time, deep, move, and recurring cleaning.",
    eyebrow: "Tipping etiquette",
    h1: "Should you tip house cleaners? A practical guide for one-time, deep, move, and recurring visits.",
    dek: "Tipping is one of the most common awkward questions people have before a cleaner arrives. The short answer is that it is appreciated, but it should not be treated like a hidden fee.",
    shortAnswer: "You are not usually required to tip a house cleaner, but tipping is a kind way to recognize hard work, a difficult job, a one-time deep clean, a move-out clean, or consistently good recurring service. Many customers choose a cash tip after the visit or a larger holiday thank-you for recurring cleaners. If you are unsure, ask the cleaning company whether tips are accepted and how they are shared.",
    audienceQuestion: "Am I supposed to tip the cleaner, and how much is normal?",
    updated: "2026-06-14",
    readingTime: "6 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Tipping is appreciated, not a secret requirement",
        paragraphs: [
          "A professional cleaning quote should stand on its own. If the visit costs a certain amount, that price should not depend on the customer guessing a required tip after the cleaner finishes.",
          "At the same time, residential cleaning is physical work. When a team handles a hard first clean, heavy bathrooms, pet hair, move-out detail, or a tight schedule with care, a tip is a simple way to say that the work mattered.",
        ],
        bullets: ["Tip when you want to recognize extra effort", "Do not treat tipping as a replacement for fair pricing", "Ask the company if tips are accepted", "Use cash if you want the cleaner to receive it directly"],
      },
      {
        title: "When people most often tip",
        paragraphs: [
          "Customers are most likely to tip after one-time cleaning, deep cleaning, move-in or move-out cleaning, holiday cleaning, or an especially detailed first visit. Those jobs can be more demanding than a maintained recurring home.",
          "For recurring service, many people do not tip every visit. They may tip occasionally, leave a holiday bonus, or give a thank-you when the cleaner handles something especially helpful.",
        ],
        bullets: ["First-time deep clean", "Move-out or move-in cleaning", "Holiday or guest-ready cleaning", "A very difficult kitchen or bathroom", "A cleaner who consistently remembers your home"],
      },
      {
        title: "How much to tip without overthinking it",
        paragraphs: [
          "There is no single correct amount. A small cash thank-you can still feel meaningful, especially when the cleaner did careful work and the visit was priced clearly.",
          "If a team comes, think about whether the tip should be easy to split. If one cleaner comes regularly, a holiday thank-you or occasional extra cash may feel more natural than tipping every appointment.",
        ],
        bullets: ["A small flat cash tip for a normal visit", "A larger tip for a hard deep or move clean", "A holiday thank-you for recurring service", "Small bills if a team needs to split it"],
      },
      {
        title: "What matters more than tipping",
        paragraphs: [
          "A tip is kind, but it does not fix unclear expectations. The better gift to both yourself and the cleaner is a clear scope, reachable surfaces, safe access, and quick feedback if something important was missed.",
          "Before booking Shynli, share the service type, home condition, pets, add-ons, and priority rooms. That helps the cleaner arrive prepared and keeps tipping separate from confusion about what was included.",
        ],
        bullets: ["Clear scope", "Safe entry and parking notes", "Pets secured or explained", "Add-ons requested before arrival", "Fast, specific feedback"],
      },
    ],
    faqs: [
      ["Is tipping required for house cleaning?", "No. Tipping is usually optional unless a company states a specific policy. It is appreciated when the cleaner did careful work or the job was especially demanding."],
      ["Should I tip for a deep clean?", "Many customers do tip for a deep clean because the visit is more detailed and physically demanding than a maintenance clean."],
      ["Do I tip every recurring cleaning visit?", "Not necessarily. Some customers tip occasionally or give a holiday thank-you instead of tipping every recurring appointment."],
      ["Should I tip the owner of a cleaning company?", "Some people tip only employee cleaners and not owner-operators, while others tip anyone who did excellent work. If you are unsure, ask the company how tips are handled."],
    ],
    links: [["Get a quote", "/quote"], ["House cleaning cost", "/pricing/house-cleaning-cost"], ["First cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"], ["If a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"]],
  },
  {
    slug: "house-cleaning-with-pets-and-allergies",
    path: "/guides/house-cleaning-with-pets-and-allergies",
    title: "House Cleaning With Pets and Allergies | Shynli Cleaning",
    keywords: "house cleaning with pets, pet hair cleaning, pet dander cleaning, cleaning for allergies, pet friendly house cleaning, cleaner with pets at home",
    description: "How to prepare for house cleaning when you have pets, pet hair, dander, allergies, odors, litter boxes, and guests who may be sensitive.",
    eyebrow: "Pets and allergies",
    h1: "House cleaning with pets and allergies: what to tell the cleaner before the visit.",
    dek: "Pet homes can be clean and still need a different plan. Hair, dander, litter areas, odors, toys, bedding, and nervous animals all change how the visit should be prepared.",
    shortAnswer: "Before a cleaning visit in a home with pets or allergies, tell the service what animals live in the home, where they will be during the clean, whether anyone has fragrance or product sensitivities, and which pet-heavy areas matter most. Pick up toys, secure nervous pets, move bowls when possible, and ask ahead about pet hair, dander, litter areas, and product preferences.",
    audienceQuestion: "What should I tell a cleaner if I have pets or allergy concerns?",
    updated: "2026-06-14",
    readingTime: "7 min read",
    serviceIntent: "pet-friendly-cleaning",
    sections: [
      {
        title: "Tell the cleaner about pets before arrival",
        paragraphs: [
          "Pets are not a small detail. A friendly dog, a shy cat, a litter area, a bird cage, or a room with pet odor can change the safest way to clean the home.",
          "The cleaner should know what animals are present, whether they can be loose, which doors must stay closed, and whether the pet has any behavior issues. This protects the cleaner, the animal, and the home.",
        ],
        bullets: ["Type and number of pets", "Where pets will be during the clean", "Doors or gates that must stay closed", "Nervous or reactive pets", "Litter, crate, or feeding areas"],
      },
      {
        title: "Pet hair and dander need reachable surfaces",
        paragraphs: [
          "Pet hair hides on floors, baseboards, sofa edges, stairs, under furniture, bedding, vents, and corners. A professional cleaner can help, but the surfaces have to be reachable.",
          "Before the visit, pick up toys, leashes, blankets, bowls, and loose items from the floor if you want vacuuming and mopping to be more effective. If pet bedding should be moved or washed, ask before booking because laundry may not be included.",
        ],
        bullets: ["Clear floors for vacuuming", "Move pet toys and bowls if possible", "Point out pet-heavy corners", "Mention furniture or stairs with heavy hair", "Ask before adding laundry or pet bedding"],
      },
      {
        title: "Allergies and fragrance sensitivity should be named early",
        paragraphs: [
          "If someone in the home has allergies, asthma, migraines from fragrance, or sensitivity to certain products, do not wait until the cleaner arrives. Put the note in the quote request.",
          "A cleaning visit can reduce dust and surface buildup, but it is not medical remediation. Severe pet dander, carpet contamination, ducts, upholstery, mold, or pest issues may require a specialist beyond regular house cleaning.",
        ],
        bullets: ["Fragrance-free request", "Products to avoid", "Rooms used by allergic guests", "Carpet or upholstery concerns", "HVAC, duct, or remediation limits"],
      },
      {
        title: "What a cleaner can and cannot promise in a pet home",
        paragraphs: [
          "A cleaner can improve visible hair, dust, floors, bathrooms, kitchens, high-touch surfaces, and many reachable pet-heavy areas. That can make the home feel much better.",
          "A cleaner usually cannot guarantee full allergen removal, remove odors from carpet padding, treat urine soaked into subfloors, clean air ducts, or solve dander embedded in upholstery. The right expectation keeps the visit useful instead of disappointing.",
        ],
        bullets: ["Good fit: floors, dust, bathrooms, kitchens, reachable hair", "Ask first: pet bedding, upholstery, litter area detail", "Different specialist: ducts, carpet extraction, subfloor odor, mold, pests"],
      },
    ],
    faqs: [
      ["Do I need to put my pets away before cleaning?", "It is safest to secure nervous, reactive, or escape-prone pets. Friendly pets may still need a separate room so the cleaner can work without doors or wet floors becoming a problem."],
      ["Can a house cleaner remove pet dander completely?", "No cleaning visit can promise complete allergen removal. A cleaner can reduce dust, hair, and surface buildup, but carpets, upholstery, ducts, and severe dander may need specialists."],
      ["Should I provide fragrance-free products?", "If you need specific products, mention that before booking. Some companies bring supplies, but allergy or fragrance requests should be confirmed early."],
      ["Will cleaners clean litter boxes or pet accidents?", "Pet waste, biohazards, and heavy contamination are usually outside normal house cleaning. Ask before booking if a pet area needs special attention."],
    ],
    links: [["Pet-friendly cleaning", "/pet-friendly-cleaning"], ["Eco-friendly cleaning", "/eco-friendly-cleaning"], ["Cleaning supplies included", "/cleaning-supplies-included"], ["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"]],
  },
  {
    slug: "how-to-choose-house-cleaning-service",
    path: "/guides/how-to-choose-house-cleaning-service",
    title: "How to Choose a House Cleaning Service | Shynli Cleaning",
    keywords: "how to choose house cleaning service, trustworthy house cleaner, insured house cleaners, background checked cleaners, professional cleaning service questions",
    description: "How to choose a house cleaning service when you care about trust, access, reviews, insurance, scope, pricing, and follow-up after the clean.",
    eyebrow: "Choosing a service",
    h1: "How to choose a house cleaning service when trust matters.",
    dek: "For most homeowners, the hardest part is not finding a cleaner. It is deciding who you feel comfortable letting into the home, how to compare quotes, and what to ask before booking.",
    shortAnswer: "Choose a house cleaning service by checking whether the company serves your area, explains what is included, confirms pricing factors before arrival, has clear access and pet instructions, carries the right trust signals, and gives you a way to follow up if something is missed. The best choice is not always the cheapest quote. It is the service that makes the visit clear before anyone enters the home.",
    audienceQuestion: "How do I choose a cleaner I can actually trust in my home?",
    updated: "2026-06-14",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Start with trust, then compare price",
        paragraphs: [
          "Price matters, but a house cleaner is not a product you leave on the porch. Someone is entering your home, seeing personal spaces, working around pets or family routines, and sometimes receiving door codes or lockbox instructions.",
          "Before comparing the lowest number, look for the signals that make the visit safer and easier: a real company, a clear service area, a reachable contact path, written scope, and a follow-up process.",
        ],
        bullets: ["Real service area", "Reachable phone or callback path", "Clear list of services", "Reviews or local proof", "Follow-up if something is missed"],
      },
      {
        title: "Ask what is included and what is not",
        paragraphs: [
          "Many disappointments start because the customer and cleaner used the same word but meant different things. One person says deep clean and expects inside every cabinet. Another says deep clean and means bathrooms, kitchen detail, floors, baseboards, and high-touch surfaces.",
          "A trustworthy service should be able to explain standard work, deep cleaning, move cleaning, recurring cleaning, and add-ons in plain language. If the answer is vague, the visit can become vague too.",
        ],
        bullets: ["Standard cleaning scope", "Deep cleaning differences", "Move-in or move-out details", "Add-ons and exclusions", "What happens if time runs short"],
      },
      {
        title: "Pay attention to how the quote is built",
        paragraphs: [
          "A quote that asks no questions can look easy, but it may be less accurate. The right questions protect both sides: ZIP code, home size, condition, pets, access, timing, and add-ons.",
          "If your home has stairs, apartment parking, heavy pet hair, an empty move-out deadline, or a first deep clean after months of catch-up, tell the company before the appointment is held.",
        ],
        bullets: ["Bedrooms and bathrooms", "Home condition", "Pets and access", "Timing pressure", "Fridge, oven, cabinets, windows, or blinds"],
      },
      {
        title: "Use reviews carefully",
        paragraphs: [
          "Reviews are useful, but do not read only the star rating. Look for the kind of result you need: on-time arrival, respectful cleaners, clear communication, careful kitchens and bathrooms, move-out detail, recurring consistency, and how the company responds when something is not perfect.",
          "A perfect-looking service with no process can still be risky. A real service should be able to explain what happens before, during, and after the clean.",
        ],
        bullets: ["Communication", "Consistency", "Move or deep-clean results", "How complaints are handled", "Whether expectations were clear"],
      },
    ],
    faqs: [
      ["What should I ask before hiring a house cleaner?", "Ask what is included, what costs extra, whether supplies are included, how access is handled, what happens if something is missed, and what details affect the quote."],
      ["Is the cheapest cleaner a bad idea?", "Not always, but the cheapest quote can become expensive if the scope is unclear, add-ons are missing, or the visit is rushed."],
      ["Should I choose an independent cleaner or a cleaning company?", "Either can work. A company may offer clearer scheduling, support, and follow-up. An independent cleaner may feel more personal. Compare the actual process, not just the label."],
      ["How do I know if a cleaning service is professional?", "Look for clear communication, service boundaries, practical quote questions, trust signals, and a follow-up path after the visit."],
    ],
    links: [["Why Shynli", "/why-shynli"], ["Insured cleaners", "/insured-cleaners"], ["Background-checked cleaners", "/background-checked-cleaners"], ["Professional vs independent cleaner", "/professional-cleaning-vs-independent-cleaner"]],
  },
  {
    slug: "which-house-cleaning-add-ons-are-worth-it",
    path: "/guides/which-house-cleaning-add-ons-are-worth-it",
    title: "Which House Cleaning Add-Ons Are Worth It? | Shynli Cleaning",
    keywords: "house cleaning add ons, oven cleaning add on, fridge cleaning add on, cabinet cleaning add on, blinds cleaning add on, interior window cleaning",
    description: "Which house cleaning add-ons are worth it? Compare oven, fridge, cabinet interiors, blinds, interior windows, baseboards, doors, and basement cleaning.",
    eyebrow: "Add-on choices",
    h1: "Which house cleaning add-ons are worth it before you book?",
    dek: "Add-ons are useful when they match the real problem in the home. They are frustrating when they are chosen randomly or added too late for the cleaner to have enough time.",
    shortAnswer: "The most useful cleaning add-ons are the ones tied to a clear outcome: inside fridge before move-in or move-out, inside oven after buildup, cabinet interiors for empty homes, blinds or interior windows when dust is visible, baseboards before guests or listings, and basement cleaning when it changes how the home feels. Ask for add-ons before booking so the quote and schedule match the work.",
    audienceQuestion: "Which cleaning extras should I pay for, and which can wait?",
    updated: "2026-06-14",
    readingTime: "7 min read",
    serviceIntent: "deep-cleaning",
    sections: [
      {
        title: "Choose add-ons by outcome, not by menu anxiety",
        paragraphs: [
          "A long add-on list can make people feel like they are missing something. The better question is what you need the home to feel ready for: everyday maintenance, guests, a listing, move-in, move-out, or a first reset before recurring service.",
          "If an add-on changes the result you care about, it may be worth it. If it is hidden, low-priority, or easy for you to handle later, it can wait.",
        ],
        bullets: ["Guests coming", "Move or handoff", "Listing photos", "First deep clean", "Recurring maintenance setup"],
      },
      {
        title: "Kitchen add-ons usually matter most",
        paragraphs: [
          "Inside fridge, inside oven, range hood, and cabinet interiors are common add-ons because they take focused time and can carry smell, grease, crumbs, or old spills.",
          "They are especially useful before moving into a home, after moving out, before selling, after tenants, or when the kitchen is the reason the home does not feel clean.",
        ],
        bullets: ["Inside refrigerator", "Inside oven", "Range hood", "Inside cabinets and drawers", "Cabinet fronts and handles"],
      },
      {
        title: "Dust-detail add-ons are best when visible",
        paragraphs: [
          "Baseboards, doors, blinds, and interior windows can make a room feel sharper, but they are not equally urgent in every home. Choose them when dust, fingerprints, pet hair, or listing photos make those details noticeable.",
          "If you have pets, allergies, guests, or a home that has not had a detail clean in a while, dust-detail add-ons may be more valuable than another quick pass over already-clean counters.",
        ],
        bullets: ["Baseboards", "Doors and door frames", "Blinds", "Interior windows", "Window sills"],
      },
      {
        title: "Ask before the appointment, not at the door",
        paragraphs: [
          "Add-ons are not just small requests. They can change how long the cleaner needs, what tools are brought, and what should be prioritized.",
          "If the cleaner arrives with a full schedule and you add oven, fridge, blinds, cabinets, and basement at the door, the visit may either run long or leave you disappointed. The fair time to decide is before the quote is confirmed.",
        ],
        bullets: ["Name add-ons during the quote", "Send photos if the area is heavy", "Choose the top priorities first", "Confirm what can fit into the visit"],
      },
    ],
    faqs: [
      ["Is oven cleaning usually included?", "Inside oven cleaning is usually an add-on unless the quote clearly includes it."],
      ["Is fridge cleaning worth it?", "It is worth it for move-in, move-out, old spills, odors, or when the fridge affects how clean the kitchen feels."],
      ["Should I add blinds cleaning?", "Add it when blinds are visibly dusty, there are allergies or pet hair, or the room needs to look sharper for guests or photos."],
      ["Can I add cleaning extras after the cleaner arrives?", "Sometimes, but it may not fit the reserved time. Add-ons are best requested before booking."],
    ],
    links: [["Deep cleaning cost", "/pricing/deep-cleaning-cost"], ["Deep cleaning checklist", "/checklists/deep-cleaning-checklist"], ["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"], ["What affects cleaning price", "/faq/what-affects-house-cleaning-price"]],
  },
  {
    slug: "keep-house-clean-between-professional-cleanings",
    path: "/guides/keep-house-clean-between-professional-cleanings",
    title: "How to Keep a House Clean Between Professional Cleanings | Shynli Cleaning",
    keywords: "keep house clean between cleanings, between professional cleanings, weekly cleaning routine, biweekly cleaning maintenance, recurring house cleaning tips",
    description: "How to keep your house clean between professional cleaning visits with small daily, weekly, pet, kitchen, bathroom, and clutter habits.",
    eyebrow: "Between visits",
    h1: "How to keep your house clean between professional cleaning visits.",
    dek: "A professional cleaner can reset the home, but the days between visits decide whether the next appointment feels easy, rushed, or like starting over.",
    shortAnswer: "To keep a house clean between professional cleanings, do small maintenance tasks that protect the cleaner's time: dishes and counters most days, quick bathroom wipe-downs, floors in high-traffic areas, pet hair control, laundry contained, and clutter kept off surfaces that need cleaning. The goal is not to deep clean before the cleaner. It is to keep the home reachable.",
    audienceQuestion: "What should I do between cleaner visits so the house does not fall apart?",
    updated: "2026-06-14",
    readingTime: "7 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "Protect the surfaces the cleaner needs to reach",
        paragraphs: [
          "The biggest difference between a smooth recurring clean and a rushed one is not whether the home is perfect. It is whether counters, floors, sinks, toilets, and common surfaces are reachable.",
          "Between visits, focus on keeping personal items from taking over the spaces you want cleaned. A little surface control can make the next professional visit feel much more thorough.",
        ],
        bullets: ["Counters not buried", "Floors mostly reachable", "Sinks not blocked", "Laundry contained", "Toys or papers gathered before the visit"],
      },
      {
        title: "Do tiny kitchen and bathroom resets",
        paragraphs: [
          "Kitchens and bathrooms usually decide whether a home feels clean. You do not need to deep clean them every day, but small resets keep buildup from turning into a bigger job.",
          "Wipe obvious spills, keep dishes from blocking the sink, rinse toothpaste from sinks, and deal with trash before it becomes odor. These small habits help the professional visit focus on detail instead of rescue work.",
        ],
        bullets: ["Dishes or dishwasher habit", "Quick counter wipe", "Bathroom sink wipe", "Trash before odor", "Stove spills before they harden"],
      },
      {
        title: "Match the routine to your cleaning frequency",
        paragraphs: [
          "A weekly cleaning client can usually do less between visits than a monthly cleaning client. A biweekly home needs a middle rhythm. Pets, kids, cooking, and work-from-home rooms also change the amount of maintenance needed.",
          "If the home always feels too far gone before the next visit, the answer may be a different schedule, a first deep clean, or clearer priorities for recurring service.",
        ],
        bullets: ["Weekly: protect surfaces and handle daily mess", "Biweekly: add quick floor and bathroom touch-ups", "Monthly: expect more self-maintenance", "Pet homes: control hair and odors between visits"],
      },
      {
        title: "Do not clean so much that you hide the real need",
        paragraphs: [
          "Some people panic-clean before the cleaner arrives and then feel strange paying for the visit. You do not need to do that. The cleaner's job is to clean.",
          "Your job is to remove the barriers that stop cleaning from happening. Leave the actual bathrooms, kitchen detail, dust, floors, and routine checklist to the professional visit.",
        ],
        bullets: ["Tidy, do not deep clean", "Share priority rooms", "Ask if the schedule should change", "Request add-ons before the next visit"],
      },
    ],
    faqs: [
      ["Do I need to clean between professional cleanings?", "You do not need to deep clean, but light maintenance helps keep the next visit effective."],
      ["What should I do the day before my cleaner comes?", "Pick up clutter, clear sinks and counters when possible, secure pets, and leave notes for priority areas."],
      ["How do I know if I need weekly instead of biweekly cleaning?", "If the home feels out of control several days before each visit, weekly service or a deeper first reset may fit better."],
      ["Should I change the cleaning schedule if I have pets?", "Maybe. Pet hair, dander, odors, and floor traffic can make weekly or biweekly service more useful than monthly service."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["How often to schedule cleaning", "/faq/how-often-should-i-schedule-cleaning"], ["Recurring cleaning cost", "/pricing/recurring-cleaning-cost"], ["First cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"]],
  },
  {
    slug: "hiring-cleaner-when-house-is-messy",
    path: "/guides/hiring-cleaner-when-house-is-messy",
    title: "Hiring a Cleaner When Your House Is Messy | Shynli Cleaning",
    keywords: "hire cleaner messy house, embarrassed to hire cleaner, cluttered house cleaning service, cleaning help for messy house, professional cleaner messy home",
    description: "Embarrassed to hire a cleaner because the house is messy? Learn what to say, what to pick up, and when cleaning vs decluttering matters.",
    eyebrow: "Messy home help",
    h1: "Can you hire a cleaner when your house is messy?",
    dek: "Yes, but the visit goes better when the cleaning company knows what kind of mess it is. A messy home is not a moral problem. It is a planning problem: clutter, buildup, trash, dishes, pets, time, and safety all change the right service.",
    shortAnswer: "You can hire a cleaner when the house is messy, but be honest before the quote. Pick up hazards, valuables, personal papers, food trash, dishes, and anything blocking floors or counters when you can. If the main issue is clutter, organizing, hoarding, pests, or unsafe waste, say that clearly because normal house cleaning may need a different plan or specialist help.",
    audienceQuestion: "Is my house too messy to hire a cleaner?",
    updated: "2026-06-16",
    readingTime: "7 min read",
    serviceIntent: "deep-cleaning",
    sections: [
      {
        title: "Messy does not mean impossible",
        paragraphs: [
          "A lot of people wait too long to call because they feel embarrassed. Cleaners see real homes, not staged photos. Dishes, dust, laundry, toys, pet hair, and a kitchen that got behind are normal reasons people ask for help.",
          "What matters is whether the cleaner can reach the surfaces that need cleaning. A home can be messy and still cleanable. A home can also be so blocked by clutter that the first step is organizing or trash removal, not surface cleaning.",
        ],
        bullets: ["Dusty rooms", "Behind-on-life kitchen", "Laundry or toys on floors", "Pet hair buildup", "Bathrooms that need a reset", "Move-in or move-out catch-up"],
      },
      {
        title: "Tell the truth before the quote",
        paragraphs: [
          "The easiest way to make the visit less awkward is to describe the home plainly before the appointment is held. You do not need a confession. You need useful details.",
          "Say if counters are covered, floors are hard to reach, there is heavy kitchen buildup, pet hair is everywhere, or the home has not had a deep clean in a long time. Photos can help the company reserve enough time and avoid promising a result that will not fit the schedule.",
        ],
        bullets: ["How many rooms are affected", "Whether floors and counters are reachable", "Kitchen and bathroom condition", "Pet hair or odor", "Trash, dishes, or laundry level", "Any room you want skipped"],
      },
      {
        title: "Do the safety pickup first",
        paragraphs: [
          "You do not need to deep clean before the cleaner comes. The best prep is removing items that create risk, privacy concerns, or wasted time. This lets the cleaner spend paid time on surfaces, floors, fixtures, dust, and buildup.",
          "Start with food trash, dishes with old food, sharp objects, medications, documents, cash, jewelry, breakables, and items on the floor that could be tripped over. If you only have twenty minutes, make the kitchen sink, bathroom counters, and main walking paths reachable.",
        ],
        bullets: ["Food trash and old dishes", "Medication and private papers", "Cash, jewelry, and fragile items", "Toys or laundry from main floors", "Anything blocking sinks or counters", "Pet items that may be in the way"],
      },
      {
        title: "Know when cleaning is not the first service",
        paragraphs: [
          "A residential house cleaning visit is not always the right first step. If the home needs sorting, packing, heavy trash hauling, pest cleanup, biohazard cleanup, or hoarding support, a normal cleaner may not be able to do that safely or fairly.",
          "That does not mean you cannot get help. It means the right answer may be a decluttering session, junk removal, a specialist cleanup, or a smaller first clean focused only on reachable bathrooms, kitchen, and floors.",
        ],
        bullets: ["Organizing personal belongings", "Hoarding-level clutter", "Pest or animal waste cleanup", "Heavy trash hauling", "Biohazard or unsafe materials", "Rooms with no clear walking path"],
        note: "If you are unsure, send photos and ask what can realistically be cleaned in the first visit. A clear answer is kinder than a rushed appointment.",
      },
    ],
    faqs: [
      ["Will cleaners judge my messy house?", "A professional cleaner should not judge you. They do need honest details so the right time, service, and expectations are set before the visit."],
      ["Should I clean before hiring a cleaner?", "No. Do not deep clean first. Pick up items that block access, create safety issues, or contain private information, then let the cleaner handle the cleaning."],
      ["Can a cleaner help if I have clutter everywhere?", "Sometimes, but clutter changes the job. If surfaces and floors are blocked, the cleaner may need to skip areas or you may need organizing or decluttering help first."],
      ["What should I say when I feel embarrassed?", "Use practical words: cluttered counters, heavy kitchen buildup, pet hair, laundry on floors, or first deep clean in a long time. You do not need to explain your life story."],
    ],
    links: [["Deep cleaning", "/services/deep-cleaning"], ["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"], ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"], ["Get a quote", "/quote"]],
  },
  {
    slug: "should-you-give-cleaner-key-or-door-code",
    path: "/guides/should-you-give-cleaner-key-or-door-code",
    title: "Should You Give a Cleaner a Key or Door Code? | Shynli Cleaning",
    keywords: "give cleaner key, house cleaner door code, leave cleaner alone in house, cleaning service access instructions, cleaner lockbox code",
    description: "Should you give a cleaner a key or door code? Learn safer access options, what to confirm, and how to handle cleaning when you are not home.",
    eyebrow: "Home access",
    h1: "Should you give a cleaner a key, door code, or be home for the visit?",
    dek: "Access is one of the biggest trust questions before hiring a cleaning service. The right setup should protect the home, help the cleaner start on time, and avoid making you rearrange the whole day.",
    shortAnswer: "Many customers let cleaners enter with a door code, lockbox, key, garage code, front desk note, or someone home for the first visit. The safest option is the one you can control: a temporary code, clear arrival window, written lock-up instructions, and a service you trust. For the first visit, it is reasonable to be home at the start, then leave or work out of the way.",
    audienceQuestion: "Is it safe to leave a cleaner alone in my house?",
    updated: "2026-06-16",
    readingTime: "6 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Choose an access method you can control",
        paragraphs: [
          "A cleaner cannot do good work if the appointment starts with confusion at the door. At the same time, access should feel safe to the homeowner. Door codes, lockboxes, keys, garage entries, concierge access, and first-visit walkthroughs can all work when the instructions are clear.",
          "A temporary or cleaner-specific code is often easier to manage than a loose key. If you use a key, decide where it is stored, who has it, and how it is returned if the service ends.",
        ],
        bullets: ["Temporary door code", "Lockbox", "Garage code", "Front desk or concierge note", "Someone home at arrival", "Key only when you trust the process"],
      },
      {
        title: "Use the first visit to build confidence",
        paragraphs: [
          "It is normal to be home for the first few minutes of a first cleaning. Use that time to confirm the entry, rooms, pets, alarm, special surfaces, and how the home should be locked when the cleaner leaves.",
          "After that, most cleanings are smoother when the cleaner can work without being watched closely. If you stay home, pick a room that can be cleaned last and avoid crossing wet floors or moving through work areas.",
        ],
        bullets: ["Walk through the home once", "Confirm off-limits rooms", "Explain pets and doors", "Show supplies only if requested", "Stay reachable by phone"],
      },
      {
        title: "Put lock-up instructions in writing",
        paragraphs: [
          "The end of the visit matters as much as the start. Written instructions help avoid simple but stressful mistakes: which door to lock, whether to set the alarm, where to leave the key, and whether any lights should stay on.",
          "If you live in an apartment or condo, include elevator, parking, gate, front desk, and trash-room notes before the appointment. Those details can save real time.",
        ],
        bullets: ["Which doors to lock", "Alarm or camera notes", "Where to leave keys", "Garage or gate instructions", "Pet gates and closed rooms", "Building parking and elevator rules"],
      },
      {
        title: "Trust is part of the service, not a side issue",
        paragraphs: [
          "If you feel uneasy, ask how the company handles team assignment, insurance, follow-up, missed items, and access notes. You should not have to guess whether the service has a process.",
          "A lower price does not help if access feels chaotic. Choose the service that can explain how the home is entered, cleaned, locked, and followed up on after the visit.",
        ],
        bullets: ["Clear company contact", "Insurance and trust signals", "Written access notes", "Repeatable arrival window", "Simple follow-up path"],
      },
    ],
    faqs: [
      ["Should I be home for the first cleaning?", "It is reasonable to be home at the beginning of the first visit. After the walkthrough, you can leave or stay in a room that is out of the way."],
      ["Is a door code better than a key?", "Often yes, because a code can be changed or limited. A key can work too, but you should know who has it and how it is returned."],
      ["What access details should I send before cleaning?", "Send parking, entry, door code or lockbox, alarm, pets, off-limits rooms, and lock-up instructions."],
      ["Can cleaners clean while I work from home?", "Yes, if you choose a room to work in, tell the cleaner to clean that room last, and avoid moving through areas while they are being cleaned."],
    ],
    links: [["How to choose a cleaning service", "/guides/how-to-choose-house-cleaning-service"], ["Insured cleaners", "/insured-cleaners"], ["Why Shynli", "/why-shynli"], ["Get a quote", "/quote"]],
  },
  {
    slug: "cleaning-service-with-kids-and-toys",
    path: "/guides/cleaning-service-with-kids-and-toys",
    title: "House Cleaning With Kids and Toys | Shynli Cleaning",
    keywords: "house cleaning with kids, cleaner with toys on floor, cleaning service with children home, playroom cleaning service, prepare for cleaner with kids",
    description: "How to prepare for a cleaning service when you have kids, toys, playrooms, snack messes, bathrooms, and work-from-home family routines.",
    eyebrow: "Kids and toys",
    h1: "How to make house cleaning work when you have kids and toys everywhere.",
    dek: "Homes with kids do not need to be perfect before a cleaner arrives. They do need a simple plan for toys, snack messes, bathrooms, bedrooms, and the rooms where the family will be during the visit.",
    shortAnswer: "Before a cleaner comes to a home with kids, pick up toys from main floors, clear counters and sinks where possible, secure small pieces, put private items away, and choose where children will be during the visit. If the playroom is a priority, say whether you want surfaces cleaned around toys or whether toys will be gathered first.",
    audienceQuestion: "How do I prepare for cleaners when my kids keep making messes?",
    updated: "2026-06-16",
    readingTime: "6 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "Do not aim for perfect; aim for reachable",
        paragraphs: [
          "Kids can undo a room in five minutes. A cleaning service should not expect a magazine-ready home, but the cleaner does need access to floors, sinks, counters, tubs, toilets, and high-touch surfaces.",
          "The best preparation is a quick toy sweep in the rooms you want cleaned most. Use bins, baskets, laundry baskets, or one temporary holding spot. Sorting every toy is not the goal before a cleaning visit.",
        ],
        bullets: ["Main walking paths", "Kitchen and bathroom floors", "Stairs", "Bathroom counters", "Playroom floor if it is being cleaned", "Small pieces that could be vacuumed"],
      },
      {
        title: "Decide what the cleaner should do with toys",
        paragraphs: [
          "Some families want toys gathered into bins. Some do not want cleaners touching toys at all. Some want the playroom skipped unless the floor is already clear. Any of those choices can work if the expectation is clear.",
          "If the cleaner has to move every toy before vacuuming or mopping, less time is left for bathrooms, kitchen detail, dusting, and floors. Say what matters most before the visit.",
        ],
        bullets: ["Put toys in bins", "Leave toys alone and clean around them", "Skip the playroom this visit", "Focus on bathrooms and kitchen first", "Rotate bedrooms or play areas by visit"],
      },
      {
        title: "Keep children out of active work areas",
        paragraphs: [
          "Children can be home during cleaning, but they should not be underfoot. Wet floors, cleaning tools, cords, open doors, and moved items can create avoidable safety issues.",
          "Choose one room for the family to use, go outside, run errands, or have the cleaner start in the rooms the kids are not using. If a child naps, mention the room and timing before work starts.",
        ],
        bullets: ["Pick a room to stay in", "Clean nap rooms first or last", "Avoid wet floors", "Keep children away from supplies", "Tell the cleaner about child gates and closed doors"],
      },
      {
        title: "Use recurring cleaning to reduce the reset burden",
        paragraphs: [
          "Families often need cleaning because life does not pause long enough for a full reset. A recurring service works best when it protects the hard rooms: bathrooms, kitchen, floors, dust, and high-touch areas.",
          "If every visit feels like starting over, consider a first deep clean, a weekly schedule, or a priority-room plan instead of expecting one short visit to fix the whole home every time.",
        ],
        bullets: ["Kitchen and bathrooms every visit", "Playroom or bedrooms rotated", "Floors on the main level", "Snack and sticky areas", "High-touch doors and handles"],
      },
    ],
    faqs: [
      ["Do I have to pick up every toy before cleaners come?", "No. Focus on toys blocking floors, stairs, sinks, counters, and priority rooms. Use bins or one holding spot if you are short on time."],
      ["Will cleaners organize toys?", "Usually not unless that is agreed to. Cleaners may gather light items, but organizing toys and belongings is a different service."],
      ["Can my kids stay home during cleaning?", "Yes, but keep them out of active work areas and tell the cleaner about nap rooms, child gates, and rooms to clean first or last."],
      ["What rooms should families prioritize?", "Most families get the biggest benefit from kitchen, bathrooms, main floors, bedrooms used daily, and any play area that affects the whole home."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["Weekly cleaning", "/services/weekly-cleaning"], ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"], ["Get a quote", "/quote"]],
  },
  {
    slug: "what-to-prioritize-cleaning-service-limited-budget",
    path: "/guides/what-to-prioritize-cleaning-service-limited-budget",
    title: "What to Prioritize With a Cleaning Budget | Shynli Cleaning",
    keywords: "cleaning service limited budget, prioritize rooms for cleaner, house cleaning budget, partial house cleaning, hourly cleaning priorities",
    description: "If you have a limited cleaning budget, learn which rooms and tasks to prioritize so the visit creates the biggest visible difference.",
    eyebrow: "Budget priorities",
    h1: "What should you prioritize if you have a limited cleaning budget?",
    dek: "A smaller cleaning budget can still help if the visit has a clear order. The mistake is trying to make every room perfect with time that only fits the highest-impact areas.",
    shortAnswer: "If your cleaning budget is limited, prioritize the rooms that affect daily life and health first: bathrooms, kitchen, main floors, entry areas, and the room guests or family use most. Be honest about your budget, ask what can realistically fit, and give the cleaner a ranked list instead of a full-house wish list.",
    audienceQuestion: "What should I ask a cleaner to do first if I cannot afford everything?",
    updated: "2026-06-16",
    readingTime: "6 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Start with the rooms that change daily life",
        paragraphs: [
          "When time or budget is limited, the best cleaning plan is not equal attention everywhere. It is focused attention where the home will feel most different after the cleaner leaves.",
          "For most homes, bathrooms and kitchens come first. They carry odors, residue, food mess, toothpaste, soap scum, grease, and the feeling of whether the home is clean. Main floors and entry areas usually come next.",
        ],
        bullets: ["Bathrooms", "Kitchen", "Main living area floors", "Entry and stairs", "One bedroom if it affects sleep", "Guest-facing room if company is coming"],
      },
      {
        title: "Give the cleaner a ranked list",
        paragraphs: [
          "A ranked list prevents the cleaner from spending time on lower-impact tasks while the kitchen sink or guest bath still needs work. Write the list in the order you want time spent.",
          "Use plain language: 'If time runs short, please do bathrooms and kitchen before bedrooms.' That gives the cleaner permission to protect the result instead of trying to touch everything lightly.",
        ],
        bullets: ["Must do", "Nice to do", "Skip if time is tight", "Do not enter", "Add-on for next time"],
      },
      {
        title: "Do not hide the budget",
        paragraphs: [
          "A cleaning company cannot make a real plan if it does not know whether you want a full clean, a priority clean, or a partial reset. A clear budget conversation is not rude. It helps the cleaner explain what will and will not fit.",
          "The fair version is not asking for a full-house clean at a partial-house price. The fair version is asking what result can be achieved within the time and price you can approve.",
        ],
        bullets: ["Ask what fits the budget", "Ask what should wait", "Ask whether a first deep clean is needed", "Ask if recurring visits lower the reset burden"],
      },
      {
        title: "Save add-ons for the right moment",
        paragraphs: [
          "Inside oven, fridge, cabinet interiors, blinds, baseboards, and interior windows can be worth it, but they may not be the first priority when the main home needs a reset.",
          "If the budget is tight, choose add-ons only when they are the reason the home does not feel clean or when a move, guest visit, listing, or inspection makes them urgent.",
        ],
        bullets: ["Kitchen appliance interiors for move or odor", "Baseboards before guests or photos", "Interior windows when visibly dirty", "Cabinets when empty or moving", "Blinds when dust is obvious"],
      },
    ],
    faqs: [
      ["Can I book only part of the house?", "Often yes. Ask for a priority-room clean or explain which rooms matter most. The company should tell you what can fit."],
      ["What rooms should I clean first on a budget?", "Bathrooms, kitchen, main floors, entry areas, and the room that affects daily life most usually give the biggest result."],
      ["Should I choose a cheaper cleaner or fewer rooms?", "Fewer rooms with a clearer scope is often better than a rushed full-house clean that touches everything lightly."],
      ["Can recurring cleaning save money over time?", "It can reduce the size of each reset because the home does not fall as far behind between visits."],
    ],
    links: [["House cleaning cost", "/pricing/house-cleaning-cost"], ["What affects cleaning price", "/faq/what-affects-house-cleaning-price"], ["Which add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"], ["Get a quote", "/quote"]],
  },
  {
    slug: "initial-deep-clean-before-recurring-cleaning",
    path: "/guides/initial-deep-clean-before-recurring-cleaning",
    title: "Why the First Cleaning Is Different From Recurring Cleaning | Shynli Cleaning",
    keywords: "first deep clean before recurring cleaning, initial cleaning vs maintenance clean, recurring cleaning first visit, deep clean before biweekly cleaning, first house cleaning more expensive",
    description: "Why a first cleaning or initial deep clean often takes longer than weekly, biweekly, or monthly recurring cleaning visits.",
    eyebrow: "First visit reset",
    h1: "Why is the first cleaning different from recurring cleaning?",
    dek: "The first visit often feels more expensive or longer because it is doing two jobs: catching up the home and setting up the future maintenance rhythm.",
    shortAnswer: "The first cleaning is different because the cleaner is removing buildup, learning the home, finding the real priorities, and creating a baseline for future visits. Recurring cleaning is usually faster because the home is already maintained. If the first visit is too short, the recurring visits may never feel as good as expected.",
    audienceQuestion: "Why does the first clean cost more than the regular visits?",
    updated: "2026-06-16",
    readingTime: "7 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "The first visit is a reset",
        paragraphs: [
          "A recurring cleaning visit is maintenance. A first visit is often a reset. The cleaner is not only wiping normal weekly dust; they may be dealing with soap scum, kitchen grease, baseboard dust, pet hair, corners, neglected details, and rooms that have not been on a rhythm.",
          "That is why a home can look generally clean and still need more time on the first visit. The work is in the buildup and the details, not only in the visible mess.",
        ],
        bullets: ["Bathroom buildup", "Kitchen grease", "Baseboards and corners", "Pet hair and dust", "High-touch doors and handles", "Learning the home layout"],
      },
      {
        title: "Maintenance cleaning is faster because the baseline is set",
        paragraphs: [
          "Once the home has been reset, recurring cleaning can focus on keeping it there. Bathrooms do not have to be rescued every visit. Floors do not have the same buildup. Dust has less time to settle into every edge.",
          "Weekly, biweekly, and monthly cleaning are not the same. The longer the gap, the more the visit starts to feel like another reset instead of simple maintenance.",
        ],
        bullets: ["Weekly: smallest reset between visits", "Biweekly: common balance for busy homes", "Monthly: more self-maintenance needed", "Pet or kid homes may need shorter gaps"],
      },
      {
        title: "A short first clean can create long-term disappointment",
        paragraphs: [
          "If the first visit is squeezed too tightly, the cleaner may do a surface pass instead of a real baseline clean. The home can look better but still not feel fully reset.",
          "Then recurring visits start from a weak baseline. The cleaner keeps maintaining a home that never got caught up. If you want the regular visits to feel strong, the first clean needs enough time or a clear priority plan.",
        ],
        bullets: ["Enough time for bathrooms and kitchen", "Clear add-ons before arrival", "Priority list if time is limited", "Photos or condition notes before quote", "Agreement on what can wait"],
      },
      {
        title: "How to plan the first visit",
        paragraphs: [
          "The best first visit starts with honest details: how long since the last deep clean, which rooms are hardest, whether there are pets or kids, and what outcome you want after the visit.",
          "If the budget does not fit a full first deep clean, ask for a staged plan. Start with kitchen, bathrooms, main floors, and one priority room, then use recurring visits or add-ons to catch the rest over time.",
        ],
        bullets: ["Share condition honestly", "Pick must-do rooms", "Request add-ons early", "Ask what regular visits will include", "Choose weekly, biweekly, or monthly based on how fast the home resets"],
      },
    ],
    faqs: [
      ["Does every recurring plan need a first deep clean?", "Not always, but many homes need a stronger first visit before maintenance cleaning can work well."],
      ["Why does the first cleaning cost more?", "It usually takes more labor, detail, and setup than a maintenance visit because the cleaner is catching up buildup and learning the home."],
      ["Can I start with regular cleaning instead of deep cleaning?", "Sometimes, especially if the home is already well maintained. If there is buildup, the result may be weaker unless priorities are narrowed."],
      ["How do I choose weekly, biweekly, or monthly cleaning?", "Choose based on how quickly the home gets behind. Weekly fits busy or high-traffic homes, biweekly is a common balance, and monthly requires more self-maintenance."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Recurring cleaning cost", "/pricing/recurring-cleaning-cost"], ["How often to schedule cleaning", "/faq/how-often-should-i-schedule-cleaning"]],
  },
  {
    slug: "how-long-house-cleaning-should-take",
    path: "/guides/how-long-house-cleaning-should-take",
    title: "How Long Should House Cleaning Take? | Shynli Cleaning",
    keywords: "how long should house cleaning take, house cleaner hours, cleaning service time estimate, how many hours for a cleaner, professional cleaning duration",
    description: "How long should house cleaning take? Learn what changes cleaning time, why first visits take longer, and how teams compare with one cleaner.",
    eyebrow: "Cleaning timing",
    h1: "How long should a house cleaning take?",
    dek: "People often worry when a cleaner finishes too fast or stays much longer than expected. The real answer depends on the home, the service type, the number of cleaners, and whether this is a first reset or a maintenance visit.",
    shortAnswer: "A regular maintained home may take a team a shorter visit, while one cleaner can need several hours. A first deep clean, pet hair, heavy bathrooms, kitchen buildup, cluttered surfaces, stairs, and add-ons can make the visit much longer. Instead of judging only by clock time, compare the time to the scope, team size, condition, and result.",
    audienceQuestion: "Is this cleaning taking too long, too fast, or about right?",
    updated: "2026-06-19",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Start with cleaner-hours, not only clock time",
        paragraphs: [
          "One cleaner working for six hours is very different from a three-person team working for two hours. Both can equal about six cleaner-hours. That is why a short team visit does not automatically mean the home was rushed, and a long single-cleaner visit does not automatically mean something is wrong.",
          "When you compare timing, ask how many people are coming, what checklist is included, and whether the visit is standard, deep, move, first-time, or recurring. The answer makes the clock make more sense.",
        ],
        bullets: ["Number of cleaners", "Total cleaner-hours", "Standard or deep scope", "First visit or maintenance visit", "Home condition and access"],
      },
      {
        title: "The first visit usually takes longer",
        paragraphs: [
          "A first visit often includes buildup that recurring visits do not have to fight every time. Bathrooms, kitchen grease, baseboards, pet hair, corners, and high-touch areas can all need extra time before the home has a clean baseline.",
          "That does not mean every first visit must be huge. It means the first quote should be honest about what the cleaner is walking into. If the first clean is squeezed too tightly, the recurring visits may keep feeling weaker than expected.",
        ],
        bullets: ["Bathroom buildup", "Kitchen grease", "Pet hair", "Baseboards and corners", "Learning the home layout", "Priority rooms"],
      },
      {
        title: "What makes a normal visit take longer",
        paragraphs: [
          "Two homes with the same bedroom count can need very different timing. A maintained two-bedroom apartment can be faster than a larger home, but a smaller home with heavy kitchen buildup, pets, stairs, clutter, or appliance add-ons may take longer.",
          "Access can also steal time. Parking, gates, elevators, lockboxes, alarms, pets, and rooms being used while the cleaner is there all affect how smoothly the visit starts and moves.",
        ],
        bullets: ["Heavy kitchen or bathroom buildup", "Pets, hair, and dander", "Clutter on floors or counters", "Inside fridge, oven, or cabinets", "Parking, elevator, or gate delays", "Work-from-home rooms"],
      },
      {
        title: "How to know if the timing is reasonable",
        paragraphs: [
          "Do not judge the visit only by whether it matched a number you saw online. Look at the result, the agreed scope, and the amount of labor. A fast visit can be fine for a maintained home. A long visit can be normal for a detailed first clean.",
          "If the timing feels off, ask the service what was included, what was skipped, what took the most time, and what should change next visit. A clear answer is more useful than guessing from the clock.",
        ],
        bullets: ["Compare to the agreed scope", "Ask what took the most time", "Ask what could not fit", "Use photos for priority areas", "Adjust frequency or add-ons before the next visit"],
      },
    ],
    faqs: [
      ["Is 9 hours normal for house cleaning?", "It can be normal for one cleaner doing a detailed first clean, especially with pets, buildup, or many rooms. It would mean something different for a large team on a maintenance visit."],
      ["Why did a cleaning team finish faster than one cleaner?", "A team splits rooms and tasks. Two cleaners for two hours can equal four cleaner-hours, so the clock time can look shorter while the labor time is similar."],
      ["Should recurring cleaning take less time?", "Usually yes. Once the baseline is set, recurring visits should focus on maintenance unless the home gets far behind between visits."],
      ["What should I ask before booking?", "Ask how many cleaners may come, what is included, whether the first visit needs extra time, and which add-ons change the schedule."],
    ],
    links: [["House cleaning cost", "/pricing/house-cleaning-cost"], ["Deep cleaning timing", "/faq/how-long-does-deep-cleaning-take"], ["First deep clean before recurring", "/guides/initial-deep-clean-before-recurring-cleaning"], ["Get a quote", "/quote"]],
  },
  {
    slug: "what-if-cleaner-breaks-something",
    path: "/guides/what-if-cleaner-breaks-something",
    title: "What If a House Cleaner Breaks Something? | Shynli Cleaning",
    keywords: "cleaner broke something, house cleaner damaged item, cleaning service broke item, cleaner damage what to do, insured house cleaners",
    description: "What to do if a cleaner breaks or damages something in your home, how to document it, and how to prevent fragile-item problems.",
    eyebrow: "Damage concerns",
    h1: "What should you do if a house cleaner breaks something?",
    dek: "Accidents are uncomfortable for both sides. The best outcome usually comes from fast documentation, calm communication, and clear expectations about fragile items before the next visit.",
    shortAnswer: "If a cleaner breaks or damages something, take photos, save the item, write down when and where you noticed it, and contact the cleaning company as soon as possible. Keep the message factual and ask for the company's damage process. For future visits, move fragile, valuable, sentimental, or unstable items out of active cleaning areas before the cleaner starts.",
    audienceQuestion: "What is the fair way to handle a broken item after cleaning?",
    updated: "2026-06-19",
    readingTime: "6 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Document the issue before moving on",
        paragraphs: [
          "If you notice something broken after a cleaning visit, start with simple evidence. Take a wide photo of the area, a close photo of the item, and a quick note about when you noticed it.",
          "Do not throw the item away immediately. If the company needs to understand what happened, the actual item and the surrounding area may matter more than a vague description.",
        ],
        bullets: ["Wide photo of the area", "Close photo of the item", "Date and time noticed", "Room and surface", "Any message from the cleaner or team"],
      },
      {
        title: "Contact the service quickly and calmly",
        paragraphs: [
          "The first message should be factual. Name the room, the item, the visit date, and attach photos. You do not need to accuse someone to ask for the damage process.",
          "A clear message might say: 'I noticed this frame was broken after today's cleaning. It was on the living room shelf. I attached photos. Can you tell me how Shynli handles this kind of issue?'",
        ],
        bullets: ["Name the item", "Name the room", "Attach photos", "Ask for the process", "Keep the tone practical"],
      },
      {
        title: "Separate accidents from pre-existing issues",
        paragraphs: [
          "Some items are already loose, cracked, unstable, aged, or placed where normal cleaning movement can knock them over. Other damage is clearly tied to the visit. The company has to understand the difference before deciding what happens next.",
          "That is why fragile-item prep matters. If a shelf is packed with awards, glassware, framed photos, candles, collectibles, or sentimental pieces, move them or ask the cleaner to skip that surface.",
        ],
        bullets: ["Loose shelves", "Unstable frames", "Fragile decor", "Sentimental items", "Items near edges", "Special surfaces"],
      },
      {
        title: "Prevent the same problem next time",
        paragraphs: [
          "Before the next clean, remove fragile items from surfaces that need dusting. If something should not be touched, say so clearly and put it in a skip area.",
          "Good cleaning requires access, but it also requires boundaries. A cleaner should not have to guess whether an item is replaceable, sentimental, unstable, or safe to move.",
        ],
        bullets: ["Clear fragile shelves", "Put valuables away", "Label rooms or surfaces to skip", "Mention special materials", "Use written notes for recurring visits"],
      },
    ],
    faqs: [
      ["Should I tell the cleaner directly or the company?", "If you booked through a company, contact the company so the issue is documented and handled through the right process."],
      ["What if I do not notice the damage until later?", "Report it as soon as you notice it and explain when you first saw it. Fast reporting is easier to verify."],
      ["Should I move fragile items before cleaning?", "Yes. Move fragile, valuable, sentimental, or unstable items away from active cleaning surfaces before the visit."],
      ["Does insurance mean every item is automatically covered?", "No. Coverage depends on the facts, service terms, item condition, and the company's process. Ask the service how damage claims are handled."],
    ],
    links: [["Insured cleaners", "/insured-cleaners"], ["Satisfaction guarantee", "/satisfaction-guarantee"], ["How to choose a cleaning service", "/guides/how-to-choose-house-cleaning-service"], ["Contact Shynli", "/contact"]],
  },
  {
    slug: "cleaning-service-while-working-from-home",
    path: "/guides/cleaning-service-while-working-from-home",
    title: "House Cleaning While Working From Home | Shynli Cleaning",
    keywords: "cleaning service while working from home, cleaner while I work from home, house cleaner home office, cleaning lady etiquette work from home, remote work cleaning visit",
    description: "How to handle a cleaning service while working from home, including office rooms, calls, pets, timing, wet floors, and rooms to clean last.",
    eyebrow: "Work-from-home visit",
    h1: "How do you handle house cleaning while working from home?",
    dek: "Working from home does not have to block a cleaning visit. It just needs a plan for the office, calls, pets, noise, wet floors, and which rooms should be cleaned first or last.",
    shortAnswer: "If you work from home during a cleaning visit, choose one room as your work zone, tell the cleaner whether to skip it or clean it last, avoid walking through active work areas, and share call times, pets, parking, and door notes before the visit. If privacy matters, put documents, laptops, and personal items away before the cleaner arrives.",
    audienceQuestion: "Can cleaners come while I am working from home without it being awkward?",
    updated: "2026-06-19",
    readingTime: "6 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "Choose your work zone before the cleaner arrives",
        paragraphs: [
          "The easiest setup is to pick one room where you will work while the cleaner starts elsewhere. That room can be skipped, cleaned first before your calls begin, or cleaned last when you can move.",
          "Do not make the cleaner guess where you will be. A short note before arrival protects your workday and helps the cleaner keep a normal route through the home.",
        ],
        bullets: ["Skip the office", "Clean the office first", "Clean the office last", "Use a bedroom for calls", "Move once instead of all day"],
      },
      {
        title: "Plan around calls, noise, and wet floors",
        paragraphs: [
          "Vacuuming, bathrooms, floors, trash, and kitchen work can all create noise or movement. If you have an important meeting, tell the cleaner which area should be avoided during that window.",
          "Wet floors matter too. If you walk through the kitchen or hallway while mopping is happening, the cleaner may have to redo work and the visit slows down.",
        ],
        bullets: ["Meeting times", "Quiet rooms", "Vacuum timing", "Rooms to avoid", "Main walking paths", "Wet floor awareness"],
      },
      {
        title: "Put private work items away",
        paragraphs: [
          "Work-from-home rooms often have laptops, client notes, papers, mail, chargers, coffee cups, and personal documents on the desk. If you want that room cleaned, clear the surfaces first.",
          "A cleaner should not be responsible for sorting private papers or deciding what can be moved. If the desk is covered, ask for the room to be skipped or only have floors cleaned.",
        ],
        bullets: ["Laptops and tablets", "Work papers", "Mail and bills", "Medication or personal items", "Fragile desk decor", "Cords on the floor"],
      },
      {
        title: "Make recurring visits predictable",
        paragraphs: [
          "Work-from-home cleaning gets easier when the same pattern repeats. If the office is always cleaned last, the cleaner can build the route around that. If your calls change every week, send the updated note before the visit.",
          "The goal is not to hide in your own home. The goal is to avoid interrupting the cleaner while still protecting your workday.",
        ],
        bullets: ["Same room plan each visit", "Updated meeting notes", "Pets separated from work areas", "Clear lock-up instructions", "Priority rooms named before arrival"],
      },
    ],
    faqs: [
      ["Is it rude to stay home while cleaners clean?", "No. Many customers stay home. It works best when you stay out of active work areas and tell the cleaner which room you will use."],
      ["Should I have cleaners skip my office?", "Skip it if the desk is private, covered with papers, or needed for meetings. You can also ask to have it cleaned first or last."],
      ["Can I take calls during the visit?", "Yes, but share important call windows so vacuuming or nearby room cleaning can be planned around them when possible."],
      ["What should I do with pets while working from home?", "Keep pets in a safe room or with you if they might follow the cleaner, escape through doors, or walk over wet floors."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["First cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"], ["Access notes", "/guides/should-you-give-cleaner-key-or-door-code"], ["Get a quote", "/quote"]],
  },
  {
    slug: "cleaner-vs-housekeeper-dishes-laundry-beds",
    path: "/guides/cleaner-vs-housekeeper-dishes-laundry-beds",
    title: "Cleaner vs Housekeeper: Dishes, Laundry, and Beds | Shynli Cleaning",
    keywords: "cleaner vs housekeeper, do cleaners do dishes, do house cleaners do laundry, do cleaners change sheets, maid service laundry dishes beds",
    description: "Cleaner vs housekeeper: what to ask before expecting dishes, laundry, bed making, sheet changes, tidying, or organizing from a cleaning visit.",
    eyebrow: "Cleaner vs housekeeper",
    h1: "Cleaner vs housekeeper: do cleaners do dishes, laundry, or beds?",
    dek: "A lot of disappointment comes from using the word cleaning when the customer really wants housekeeping. The difference matters before the quote, not after the cleaner arrives.",
    shortAnswer: "A house cleaner usually focuses on cleaning kitchens, bathrooms, floors, dust, surfaces, and reachable rooms. A housekeeper may also handle tidying, dishes, laundry, linens, and household chores when that is agreed to. Some cleaners will make beds or change sheets if clean linens are ready, but laundry, dishes, and organizing should be requested clearly before booking.",
    audienceQuestion: "Am I hiring a cleaner, a housekeeper, or both?",
    updated: "2026-06-19",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Cleaning and housekeeping are not the same job",
        paragraphs: [
          "A cleaning visit is usually built around surfaces: kitchens, bathrooms, floors, dusting, sinks, counters, tubs, toilets, and high-touch areas. Housekeeping can include more household management: dishes, laundry, bed linens, tidying, and organizing.",
          "Some services blend the two, but you should not assume that from the word cleaner. If the job includes household chores, say it before the quote so the time and price are realistic.",
        ],
        bullets: ["Cleaner: surfaces and rooms", "Housekeeper: chores and upkeep", "Organizer: belongings and systems", "Laundry help: wash, dry, fold, or put away", "Each needs a different scope"],
      },
      {
        title: "Beds and sheets need clear instructions",
        paragraphs: [
          "Many cleaners can make beds. Some can change sheets if clean linens are laid out. Washing, drying, folding, and putting away laundry is a different time commitment and may not fit a standard house cleaning visit.",
          "If beds matter, leave clean sheets where the cleaner can find them and say which beds should be changed. If the cleaner should not touch bedrooms, say that too.",
        ],
        bullets: ["Make beds", "Change sheets when clean linens are ready", "Leave laundry out only if agreed", "Say which bedrooms to skip", "Ask before expecting folding or putting away"],
      },
      {
        title: "Dishes can change the whole visit",
        paragraphs: [
          "Dishes may look like a small request, but a full sink can take the time that was supposed to go to bathrooms, floors, and kitchen surfaces. Some cleaners do dishes, some do not, and some charge extra.",
          "If the sink is blocked, the kitchen clean may be weaker even if dishes are not included. The best prep is to clear enough dishes that the cleaner can reach the sink, counters, and stovetop.",
        ],
        bullets: ["Empty or manageable sink", "Ask if dishes are included", "Ask if pots and pans are extra", "Do not let dishes block the kitchen clean", "Rank dishes against bathrooms and floors"],
      },
      {
        title: "How to ask without making it awkward",
        paragraphs: [
          "Ask directly: 'Do you offer housekeeping tasks like dishes, laundry, bed changes, or tidying, or is this visit cleaning only?' That one question prevents most confusion.",
          "For Shynli, use the quote conversation to separate standard cleaning, add-ons, and household chores. If the request is outside normal residential cleaning, we can tell you before anyone arrives.",
        ],
        bullets: ["Ask what is included", "Ask what costs extra", "Ask what is not offered", "Put linens and priorities in writing", "Use a priority list when time is limited"],
      },
    ],
    faqs: [
      ["Do house cleaners do laundry?", "Usually not unless laundry is clearly included in the service. Washing, drying, folding, and putting away laundry can add significant time."],
      ["Do cleaners change sheets?", "Some cleaners will change sheets if clean linens are ready and the task is requested before the visit."],
      ["Are dishes included in house cleaning?", "Not always. Ask before booking, especially if the sink is full or dishes would take time from the rest of the home."],
      ["What if I need both cleaning and household chores?", "Say that before the quote. You may need a longer visit, a housekeeping-style service, or a priority plan."],
    ],
    links: [["What cleaners do not do", "/guides/what-house-cleaners-do-not-do"], ["Cleaning budget priorities", "/guides/what-to-prioritize-cleaning-service-limited-budget"], ["House cleaning", "/services/house-cleaning"], ["Get a quote", "/quote"]],
  },
  {
    slug: "one-cleaner-vs-cleaning-team",
    path: "/guides/one-cleaner-vs-cleaning-team",
    title: "One Cleaner vs Cleaning Team | Shynli Cleaning",
    keywords: "one cleaner vs cleaning team, cleaning team vs individual cleaner, house cleaning team, individual house cleaner, professional cleaning company team",
    description: "One cleaner vs a cleaning team: how speed, consistency, trust, price, access, and communication can change the house cleaning experience.",
    eyebrow: "Cleaner team choice",
    h1: "Is one cleaner or a cleaning team better for your home?",
    dek: "A single cleaner can feel personal and consistent. A team can finish faster and handle larger jobs more efficiently. The better choice depends on the home, scope, trust needs, schedule, and how the company manages notes.",
    shortAnswer: "One cleaner may be a good fit when you want a familiar person and a smaller recurring visit. A cleaning team may be better for larger homes, first deep cleans, move cleans, or tighter time windows. The real issue is not only headcount. It is whether the service has clear notes, accountability, scope, access instructions, and a follow-up process.",
    audienceQuestion: "Should I choose one cleaner, a team, or a company?",
    updated: "2026-06-19",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "A single cleaner can feel more familiar",
        paragraphs: [
          "One cleaner may learn the home over time: where pets are, which bathroom matters most, which room to skip, and how you like the beds or kitchen handled. That consistency can feel comfortable.",
          "The tradeoff is time and backup. If the home is large, the first clean is heavy, or the cleaner gets sick, a single-person setup can be slower or harder to schedule.",
        ],
        bullets: ["More familiar routine", "Fewer people in the home", "May learn preferences deeply", "Can take longer", "Backup may be limited"],
      },
      {
        title: "A team can finish large jobs faster",
        paragraphs: [
          "A team can split bathrooms, kitchen, floors, bedrooms, and dusting so the home is not occupied by cleaning work all day. This is especially useful for first deep cleans, move-in, move-out, guest-ready visits, and larger homes.",
          "The tradeoff is coordination. If notes are unclear, a team can move quickly in the wrong direction. The company needs a clear checklist and a way to pass preferences from visit to visit.",
        ],
        bullets: ["Shorter clock time", "Better for large scopes", "Useful for deadlines", "Needs clear notes", "May feel less personal without good communication"],
      },
      {
        title: "Compare cleaner-hours, not just price",
        paragraphs: [
          "A two-person team for two hours is not the same as one cleaner for two hours. When comparing quotes, think about total labor, service scope, add-ons, travel, supplies, insurance, and follow-up.",
          "A cheaper visit can become frustrating if it does not include enough labor. A higher quote can be reasonable if it brings enough cleaner-hours and a clear result.",
        ],
        bullets: ["Team size", "Total time on site", "Cleaner-hours", "Scope and add-ons", "Insurance and support", "Make-right process"],
      },
      {
        title: "Choose based on the visit type",
        paragraphs: [
          "For a recurring maintained home, either setup can work. For a large first deep clean, move-out deadline, post-renovation dust, heavy pet hair, or guest-ready deadline, a team may make the visit easier to finish in one window.",
          "If trust is the main concern, ask how the company assigns cleaners, handles notes, manages access, and follows up. A team is only helpful when the process around the team is clear.",
        ],
        bullets: ["Recurring maintenance", "First deep clean", "Move-in or move-out", "Guest deadline", "Pet-heavy home", "Access and trust requirements"],
      },
    ],
    faqs: [
      ["Is a cleaning team better than one cleaner?", "Not always. A team is often better for larger jobs and tighter timing. One cleaner can be better for a familiar recurring routine."],
      ["Does a team cost more?", "It depends on the quote. Compare cleaner-hours, scope, and result, not only clock time or headcount."],
      ["Will a team know my home as well as one cleaner?", "They can if the company keeps good notes and assigns the visit clearly. Without notes, preferences can get lost."],
      ["Which is better for a first deep clean?", "A team is often helpful for a first deep clean because the visit can require more detail, more rooms, and more cleaner-hours."],
    ],
    links: [["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"], ["How to choose a service", "/guides/how-to-choose-house-cleaning-service"], ["Insured cleaners", "/insured-cleaners"], ["Get a quote", "/quote"]],
  },
  {
    slug: "hourly-vs-flat-rate-house-cleaning",
    path: "/guides/hourly-vs-flat-rate-house-cleaning",
    title: "Hourly vs Flat-Rate House Cleaning | Shynli Cleaning",
    keywords: "hourly vs flat rate house cleaning, hourly house cleaner, flat rate cleaning service, house cleaning quote, cleaner hours vs price",
    description: "Hourly vs flat-rate house cleaning: how to compare cleaner-hours, scope, add-ons, first visits, and what the quote really includes.",
    eyebrow: "Pricing structure",
    h1: "Hourly vs flat-rate house cleaning: which quote is better?",
    dek: "People often compare cleaning quotes by the number on the page. The better comparison is whether the price matches the scope, cleaner-hours, condition of the home, and follow-up process.",
    shortAnswer: "Hourly cleaning can work when the job is open-ended or you want to buy a set amount of time for priority rooms. Flat-rate cleaning can work better when the company has enough details to quote the full visit clearly. The safest way to compare both is to ask what is included, how many cleaner-hours are planned, what counts as an add-on, and what happens if the home needs more time than expected.",
    audienceQuestion: "Should I choose an hourly cleaner or a flat-rate cleaning service?",
    updated: "2026-06-23",
    readingTime: "7 min read",
    serviceIntent: "house-cleaning",
    sections: [
      {
        title: "Do not compare price without scope",
        paragraphs: [
          "A cheap hourly rate can become expensive if the cleaner needs far more time than expected. A flat quote can look higher at first, but may be clearer if the company has already accounted for bedrooms, bathrooms, condition, pets, access, and add-ons.",
          "The real question is not only hourly or flat-rate. The real question is whether the cleaner and customer are imagining the same visit.",
        ],
        bullets: ["Rooms included", "Current home condition", "Number of cleaners", "Add-ons and exclusions", "Follow-up if something is missed"],
      },
      {
        title: "Understand cleaner-hours",
        paragraphs: [
          "Clock time and labor time are not the same. One cleaner for four hours and two cleaners for two hours are both four cleaner-hours. A team may leave faster without the job being smaller.",
          "When a quote feels confusing, ask how the company thinks about time. A first deep clean, pet-heavy home, move clean, or heavy kitchen can need more cleaner-hours than a maintained recurring visit.",
        ],
        bullets: ["One cleaner for four hours equals four cleaner-hours", "Two cleaners for two hours also equals four cleaner-hours", "First visits usually need more setup and detail", "Recurring visits should get easier when the home stays maintained"],
      },
      {
        title: "When hourly cleaning can be a good fit",
        paragraphs: [
          "Hourly cleaning is useful when priorities matter more than a full-house promise. If you have a limited budget, you can choose bathrooms, kitchen, main floors, or the rooms that would change daily life most.",
          "The tradeoff is that time can run out. If you book two hours for a home that needs five, the cleaner may have to stop before every room is finished.",
        ],
        bullets: ["Priority-room cleaning", "A limited budget", "Open-ended catch-up work", "A home where you know not everything will fit"],
      },
      {
        title: "When flat-rate cleaning can be safer",
        paragraphs: [
          "Flat-rate cleaning is usually stronger when the company asks enough questions before the quote. That gives you a clearer agreement about what the visit is supposed to accomplish.",
          "Flat-rate does not mean unlimited. If the home is very different from the quote, or if you add oven, fridge, cabinets, blinds, and extra rooms at the door, the scope may need to change.",
        ],
        bullets: ["Clear full-visit expectations", "Move-in or move-out cleaning", "First deep clean", "Recurring service with a known routine", "Customers who want fewer surprises"],
      },
    ],
    faqs: [
      ["Is hourly house cleaning cheaper?", "Not always. It depends on how much time the home needs and whether the cleaner can finish the work you expect inside the reserved hours."],
      ["Is flat-rate cleaning unlimited?", "No. A flat quote still depends on the agreed scope, home details, add-ons, and condition described before booking."],
      ["What should I ask before comparing quotes?", "Ask what is included, how many cleaner-hours are planned, what costs extra, whether supplies are included, and what happens if the visit needs more time."],
      ["How does Shynli quote cleaning?", "Shynli starts with ZIP, service type, bedrooms, bathrooms, condition, access, pets, and add-ons so the visit can be planned before booking."],
    ],
    links: [["Pricing", "/pricing"], ["House cleaning cost", "/pricing/house-cleaning-cost"], ["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"], ["Get a quote", "/quote"]],
  },
  {
    slug: "rotating-deep-cleaning-tasks-on-recurring-visits",
    path: "/guides/rotating-deep-cleaning-tasks-on-recurring-visits",
    title: "Rotating Deep-Cleaning Tasks on Recurring Visits | Shynli Cleaning",
    keywords: "rotating deep cleaning tasks, recurring cleaning rotation, biweekly cleaning deep tasks, weekly cleaning rotation, maintenance cleaning checklist",
    description: "Can recurring cleaning include rotating deep-cleaning tasks? Learn what can rotate, what needs an add-on, and how to plan weekly or biweekly visits.",
    eyebrow: "Recurring rotation",
    h1: "Can recurring cleaning include rotating deep-cleaning tasks?",
    dek: "A recurring cleaning visit is mostly maintenance, but some detail tasks can rotate when the plan is realistic. The key is separating normal upkeep, rotating detail, and true deep-clean add-ons.",
    shortAnswer: "Recurring cleaning can include small rotating detail tasks when the regular checklist is under control. Good rotation items include baseboards in one area, doors, reachable dusting, cabinet fronts, or one extra bathroom detail. Larger jobs like inside oven, inside fridge, heavy blinds, full baseboards, wall washing, or post-construction dust usually need to be requested as add-ons or a separate deep clean.",
    audienceQuestion: "Can my weekly or biweekly cleaner rotate deeper tasks over time?",
    updated: "2026-06-23",
    readingTime: "7 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "Maintenance comes first",
        paragraphs: [
          "Recurring cleaning works because the core rooms get handled again and again: kitchen, bathrooms, floors, dust, bedrooms, and shared spaces. If those basics are still taking the whole visit, there may not be much room for rotating detail.",
          "That does not mean rotation is impossible. It means the baseline has to be honest. A home that is still catching up may need an initial deep clean before rotation makes sense.",
        ],
        bullets: ["Kitchen surfaces", "Bathrooms", "Floors", "Dusting", "Bedrooms and common areas", "Trash and high-touch surfaces"],
      },
      {
        title: "Good tasks to rotate",
        paragraphs: [
          "The best rotation tasks are visible, reachable, and small enough to fit without sacrificing the whole home. Think of one focused detail added to a normal visit, not a second cleaning package hidden inside the same time.",
          "For example, one visit can include extra attention to baseboards in the main level. Another visit can focus on door frames or reachable dust in bedrooms. This keeps the home improving without pretending every detail can be done every time.",
        ],
        bullets: ["One floor of baseboards", "Door frames and light switches", "Cabinet fronts", "Reachable vents", "One extra bathroom detail", "Dust-heavy corners or shelves"],
      },
      {
        title: "Tasks that usually need separate time",
        paragraphs: [
          "Some tasks sound small until the cleaner starts doing them. Inside appliances, heavy blinds, whole-home baseboards, interior windows, walls, and heavy buildup can take enough time to disrupt a normal recurring visit.",
          "Those items are often better as add-ons, a seasonal deep clean, or a longer scheduled visit. That way the cleaner does not have to choose between the normal checklist and the extra task.",
        ],
        bullets: ["Inside oven", "Inside refrigerator", "Whole-home baseboards", "Heavy blinds", "Interior windows", "Wall washing", "Cabinet interiors", "Heavy bathroom buildup"],
      },
      {
        title: "How to ask for a recurring rotation",
        paragraphs: [
          "Ask for the rotation before the visit, not when the cleaner is already halfway through the home. A simple note is enough: 'Can we rotate one extra detail each visit after the regular checklist is done?'",
          "If you book with Shynli, use the quote or callback conversation to explain the recurring goal. The team can help decide whether weekly, biweekly, monthly, or a first deep clean makes the most sense.",
        ],
        bullets: ["Name the regular checklist first", "Choose one rotating detail at a time", "Ask what fits the reserved visit", "Use add-ons for heavier work", "Adjust cadence if the home keeps falling behind"],
      },
    ],
    faqs: [
      ["Can biweekly cleaning include deep-cleaning tasks?", "Sometimes, if the core maintenance work is under control and the extra task is small enough to fit the visit."],
      ["Should I rotate baseboards every visit?", "You can rotate sections of baseboards, but whole-home baseboards usually need extra time or a deep-clean add-on."],
      ["Can oven and fridge rotate into recurring cleaning?", "They can be planned, but inside oven and fridge are usually add-ons because they take focused time."],
      ["What if the cleaner never has time for rotation?", "The home may need a longer visit, a first deep clean, a different cadence, or narrower priorities."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["Weekly cleaning", "/services/weekly-cleaning"], ["First deep clean before recurring", "/guides/initial-deep-clean-before-recurring-cleaning"], ["Recurring cleaning cost", "/pricing/recurring-cleaning-cost"]],
  },
  {
    slug: "what-to-check-after-first-house-cleaning",
    path: "/guides/what-to-check-after-first-house-cleaning",
    title: "What to Check After Your First House Cleaning | Shynli Cleaning",
    keywords: "what to check after first house cleaning, first cleaning walkthrough, cleaning service feedback, house cleaner rebook decision, professional cleaning checklist review",
    description: "What to check after your first house cleaning before you rebook: priority rooms, scope, missed spots, communication, and recurring fit.",
    eyebrow: "First-clean review",
    h1: "What to check after your first house cleaning before you rebook.",
    dek: "The first cleaning is not only about whether the house looks better. It tells you whether the service understood the scope, protected the home, communicated clearly, and can become a reliable routine.",
    shortAnswer: "After your first house cleaning, check the priority rooms first, then compare the result to the agreed scope. Look at bathrooms, kitchen, floors, dusting, surfaces, add-ons, lock-up, and whether anything was missed or damaged. If something important was included but missed, send clear photos quickly. If the service handled the home well, use the feedback to set the next recurring visit.",
    audienceQuestion: "How do I know whether the first cleaning was good enough to rebook?",
    updated: "2026-06-23",
    readingTime: "7 min read",
    serviceIntent: "home-cleaning",
    sections: [
      {
        title: "Check the rooms that mattered most",
        paragraphs: [
          "Do not inspect the house like you are trying to catch someone. Start with the rooms that made you book the clean in the first place. If the kitchen, main bath, floors, or guest areas were the priority, check those first.",
          "A first visit may not make an old home perfect, especially if there was heavy buildup. The better question is whether the cleaner spent time where the visit was supposed to matter.",
        ],
        bullets: ["Kitchen counters, sink, stovetop, and floors", "Bathrooms, toilets, sinks, tubs, and mirrors", "Main floors and entry areas", "Dust on reachable surfaces", "Bedrooms or guest areas you named as priorities"],
      },
      {
        title: "Compare the result to the agreed scope",
        paragraphs: [
          "A disappointing feeling is not always the same as a missed included task. Before you judge the whole service, compare what you expected with what was actually booked.",
          "Inside appliances, cabinet interiors, heavy blinds, interior windows, laundry, dishes, organizing, and moving heavy furniture may not be included unless they were requested before the visit.",
        ],
        bullets: ["Was it standard, deep, move, or recurring cleaning?", "Were add-ons requested before booking?", "Were surfaces reachable?", "Was the home condition described honestly?", "Did time run short because priorities changed?"],
      },
      {
        title: "Give feedback while it can still help",
        paragraphs: [
          "If something important was missed, send a calm, specific note the same day or as soon as possible. Include the room, surface, photos, and why you believe it was part of the scope.",
          "Good feedback is not rude. It helps the company fix a covered issue and helps the cleaner understand the home better next time.",
        ],
        bullets: ["Use photos", "Name the room and surface", "Mention the original scope", "Ask for the make-right process", "Save new preferences for the next visit"],
      },
      {
        title: "Decide what should change next time",
        paragraphs: [
          "The best first clean often creates a better second clean. Once the first visit reveals the home, you can decide whether the next appointment should be weekly, biweekly, monthly, longer, shorter, or focused differently.",
          "If the home was far behind, do not expect every recurring visit to repeat the first deep clean. Use the first clean to set the baseline, then maintain it with a realistic cadence.",
        ],
        bullets: ["Keep the same checklist", "Add one priority note", "Request a rotating detail", "Move to recurring service", "Book a longer or deeper visit if needed"],
      },
    ],
    faqs: [
      ["Should I inspect the home before the cleaner leaves?", "If you are home, a quick walkthrough can help. If not, check priority rooms soon after the visit and send photos quickly if something covered was missed."],
      ["What if the home looks better but not perfect?", "That can happen after a first clean with buildup. Compare the result to the scope and decide whether a deeper or longer visit is needed."],
      ["How do I give feedback without being rude?", "Be specific and practical. Name the room, surface, photo, and expected scope instead of sending a vague complaint."],
      ["When should I rebook recurring cleaning?", "Rebook when the service handled the home well and you can set a realistic weekly, biweekly, or monthly rhythm before the home falls behind again."],
    ],
    links: [["What if a cleaner missed spots", "/guides/what-to-do-if-cleaner-missed-spots"], ["Satisfaction guarantee", "/satisfaction-guarantee"], ["Recurring cleaning", "/services/recurring-cleaning"], ["Get a quote", "/quote"]],
  },
  {
    slug: "cleaning-service-before-baby-arrives",
    path: "/guides/cleaning-service-before-baby-arrives",
    title: "Hiring a Cleaning Service Before a Baby Arrives | Shynli Cleaning",
    keywords: "cleaning service before baby arrives, house cleaning before newborn, deep cleaning before baby, cleaning help for expecting parents, baby arriving house cleaning",
    description: "Hiring a cleaning service before a baby arrives: what to prioritize, when to book, product notes, family routines, and what not to overdo.",
    eyebrow: "Before baby arrives",
    h1: "Hiring a cleaning service before a baby arrives: what to prioritize.",
    dek: "Expecting parents often want the home to feel calmer before the baby arrives, but the goal is not to sterilize life. The goal is to reset the rooms that will carry the first few weeks.",
    shortAnswer: "Before a baby arrives, prioritize bathrooms, kitchen, floors, dust, bedroom surfaces, laundry-area access, guest areas, and the rooms caregivers will actually use. Book early enough that the visit is not fighting the due date, and mention fragrance sensitivity, pets, nursery access, and any rooms that should be skipped. A cleaning service can help the home feel ready, but it should not promise medical-level sanitizing or replace health guidance.",
    audienceQuestion: "What should I have professionally cleaned before a baby comes home?",
    updated: "2026-06-23",
    readingTime: "7 min read",
    serviceIntent: "deep-cleaning",
    sections: [
      {
        title: "Clean for real life, not perfection",
        paragraphs: [
          "The first weeks with a baby are practical. People use the kitchen, bathrooms, bedroom, laundry area, floors, and the path between them. Those spaces usually matter more than chasing every hidden corner of the home.",
          "A good pre-baby clean should make the home easier to live in, easier for family to help in, and less stressful to maintain when energy is limited.",
        ],
        bullets: ["Kitchen counters, sink, and floors", "Bathrooms", "Bedroom surfaces", "Main floors and walkways", "Guest or caregiver areas", "Trash and high-touch surfaces"],
      },
      {
        title: "Book before the week feels urgent",
        paragraphs: [
          "Do not wait until the last possible day if you can avoid it. Cleaning close to the due date can be stressful if the schedule changes, the home needs more time, or family plans move around.",
          "Many families prefer a deep clean or one-time reset before the final stretch, then lighter maintenance if needed. The right timing depends on your home, energy, help, and schedule.",
        ],
        bullets: ["Book before the calendar feels tight", "Share any time-sensitive notes", "Choose deep or one-time cleaning based on condition", "Avoid stacking cleaning with appointments, deliveries, or furniture assembly"],
      },
      {
        title: "Mention product and fragrance preferences early",
        paragraphs: [
          "If someone in the home is sensitive to fragrance or certain products, say so before booking. The cleaner should know whether you want standard supplies, product notes, or rooms handled carefully.",
          "Keep the expectation practical. Residential cleaning can reduce dust and surface buildup, but it is not medical sanitizing or allergen remediation.",
        ],
        bullets: ["Fragrance-sensitive request", "Products to avoid", "Nursery or bedroom notes", "Pet areas", "Rooms that should stay closed"],
      },
      {
        title: "Do not turn the visit into every project at once",
        paragraphs: [
          "The pre-baby nesting list can grow fast: oven, fridge, cabinets, blinds, baseboards, windows, closets, laundry, toys, storage, and guest rooms. A cleaner can help, but one visit still needs priorities.",
          "Choose the rooms and add-ons that will change daily life most. If the home needs organizing, trash removal, or laundry help, ask clearly because those may not be standard cleaning tasks.",
        ],
        bullets: ["Pick the top rooms first", "Add oven or fridge only if they matter", "Do not assume organizing is included", "Keep private papers and baby items where you want them", "Leave clear notes for off-limits rooms"],
      },
    ],
    faqs: [
      ["Should I book deep cleaning before a baby arrives?", "A deep clean can be useful if the home has buildup or has not had a detailed reset in a while. A maintained home may only need one-time or regular cleaning."],
      ["How close to the due date should I schedule cleaning?", "There is no perfect timing, but booking before the final rush gives more room for schedule changes and follow-up if needed."],
      ["Can cleaners sanitize the home for a newborn?", "A residential cleaning service can clean surfaces and reduce visible buildup, but it should not promise medical-level sanitizing. Follow your healthcare provider's guidance for health concerns."],
      ["What should expecting parents prioritize?", "Bathrooms, kitchen, floors, bedroom surfaces, guest or caregiver areas, and the rooms used every day usually matter most."],
    ],
    links: [["Deep cleaning", "/services/deep-cleaning"], ["One-time cleaning", "/services/one-time-cleaning"], ["Cleaning with kids and toys", "/guides/cleaning-service-with-kids-and-toys"], ["Get a quote", "/quote"]],
  },
  {
    slug: "when-to-reschedule-house-cleaning",
    path: "/guides/when-to-reschedule-house-cleaning",
    title: "When to Reschedule a House Cleaning | Shynli Cleaning",
    keywords: "when to reschedule house cleaning, cancel cleaning service, reschedule cleaner, house cleaner sick at home, cleaning appointment access issue",
    description: "When should you reschedule a house cleaning? Practical guidance for sickness, no access, movers, contractors, pets, travel, and timing conflicts.",
    eyebrow: "Rescheduling",
    h1: "When should you reschedule a house cleaning?",
    dek: "A cleaning appointment works best when the cleaner can safely enter, reach the rooms, and finish the agreed scope. Some messy days are still cleanable. Some days are better moved.",
    shortAnswer: "Reschedule house cleaning when the cleaner cannot safely access the home, someone is sick in a way that makes the visit unsafe, movers or contractors are still blocking the work, pets cannot be secured, utilities are not available, or you will be unreachable for required access. Do not reschedule only because the home is imperfect. Instead, share the condition and priority rooms so the cleaner can plan honestly.",
    audienceQuestion: "Should I cancel, reschedule, or let the cleaner come anyway?",
    updated: "2026-06-23",
    readingTime: "7 min read",
    serviceIntent: "recurring-cleaning",
    sections: [
      {
        title: "Messy is not the same as impossible",
        paragraphs: [
          "Many people want to cancel because the house is embarrassing. That is usually not necessary. A cleaner can often work with a real home as long as floors, counters, sinks, and priority rooms are reachable enough to clean.",
          "Instead of canceling because the home is not perfect, send a note: 'The house is more cluttered than usual. Please focus on bathrooms, kitchen, and main floors first.'",
        ],
        bullets: ["Cluttered but reachable", "Dishes or laundry contained", "Pets secured", "Priority rooms named", "Cleaner can still enter and work safely"],
      },
      {
        title: "Reschedule when access or safety is the problem",
        paragraphs: [
          "Some situations make the visit unfair or unsafe for everyone. If the cleaner cannot get in, cannot park, cannot reach the rooms, or would be working around active illness, construction, or uncontrolled pets, moving the visit may be the cleaner choice.",
          "Give as much notice as possible. A late cancellation can affect the cleaner's route and schedule.",
        ],
        bullets: ["No key, code, lockbox, or door access", "Active contractors blocking rooms", "Movers still loading or unloading", "No water or power where needed", "Pets cannot be safely separated", "A sick household member needs separation or rest"],
      },
      {
        title: "Out of town can work if access is clear",
        paragraphs: [
          "You do not always need to be home for cleaning. If you are out of town but have a reliable access plan, lock-up notes, alarm instructions, and a reachable phone, the visit may still work.",
          "If nobody can answer a door, disarm an alarm, secure a pet, or explain an issue, rescheduling may be better than sending the cleaner into a confusing visit.",
        ],
        bullets: ["Door code or lockbox works", "Alarm instructions are clear", "Pets are handled", "Off-limits rooms are named", "You can answer the phone if needed"],
      },
      {
        title: "How to reschedule without creating confusion",
        paragraphs: [
          "A helpful reschedule message includes the appointment date, reason, urgency, and the next possible window. If the issue changes the cleaning scope, include that too.",
          "If you book with Shynli, use the contact or callback path early. The goal is not to punish real life; the goal is to keep the route, cleaner, and home plan clear.",
        ],
        bullets: ["Give the appointment date", "Explain the access or timing issue", "Offer new windows", "Mention whether the service type changed", "Ask about the cancellation policy if the notice is short"],
      },
    ],
    faqs: [
      ["Should I cancel because my house is messy?", "Usually no. Tell the cleaner the home is more cluttered than usual and name priority rooms. Reschedule only if the cleaner cannot safely reach the work."],
      ["Should I reschedule if someone is sick?", "If the visit would put the cleaner or household under unsafe or uncomfortable conditions, rescheduling is often the better choice. Follow practical health guidance for your situation."],
      ["Can cleaners come while I am out of town?", "Yes, if access, lock-up, pets, alarms, and communication are clear. If not, reschedule."],
      ["What if movers or contractors are still there?", "If rooms are blocked or work is still active, reschedule or move cleaning after the space is ready."],
    ],
    links: [["Cancellation policy", "/cancellation"], ["Home access guide", "/guides/should-you-give-cleaner-key-or-door-code"], ["Working from home during cleaning", "/guides/cleaning-service-while-working-from-home"], ["Contact Shynli", "/contact"]],
  },
]

export const guideNavigationLinks: [string, string][] = guideArticles.map((article) => [article.h1.replace(/\.$/, ""), article.path])

export function getGuideArticleByPath(path: string) {
  return guideArticles.find((article) => article.path === path)
}

export function getRelatedGuideArticles(article: GuideArticleData) {
  const candidatePaths = [
    ...article.links.map(([, href]) => href),
    ...getGuideLinksForService(article.serviceIntent).map(([, href]) => href),
    ...getGuideLinksForPage(article.path).map(([, href]) => href),
  ]

  const related = candidatePaths
    .map((href) => getGuideArticleByPath(href))
    .filter((item): item is GuideArticleData => {
      if (!item) return false
      return item.path !== article.path
    })

  const seen = new Set<string>()
  const uniqueRelated = related.filter((item) => {
    if (seen.has(item.path)) return false
    seen.add(item.path)
    return true
  })

  return [
    ...uniqueRelated,
    ...guideArticles.filter((item) => item.path !== article.path && !seen.has(item.path)),
  ].slice(0, 4)
}

export function getGuideLinksForService(serviceSlug: string): [string, string][] {
  if (serviceSlug.includes("move") || serviceSlug.includes("rental") || serviceSlug.includes("apartment")) {
    return [
      ["Move-out photo proof", "/guides/move-out-cleaning-photos-receipts-before-handoff"],
      ["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (serviceSlug.includes("post-construction")) {
    return [
      ["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"],
      ["First deep clean before recurring", "/guides/initial-deep-clean-before-recurring-cleaning"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (serviceSlug.includes("deep")) {
    return [
      ["Cleaning before a baby arrives", "/guides/cleaning-service-before-baby-arrives"],
      ["First deep clean before recurring", "/guides/initial-deep-clean-before-recurring-cleaning"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (serviceSlug.includes("one-time")) {
    return [
      ["Cleaning before a baby arrives", "/guides/cleaning-service-before-baby-arrives"],
      ["What to check after the first clean", "/guides/what-to-check-after-first-house-cleaning"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (serviceSlug.includes("recurring") || serviceSlug.includes("weekly") || serviceSlug.includes("biweekly")) {
    return [
      ["Rotating deeper tasks", "/guides/rotating-deep-cleaning-tasks-on-recurring-visits"],
      ["When to reschedule cleaning", "/guides/when-to-reschedule-house-cleaning"],
      ["Keep the house clean between visits", "/guides/keep-house-clean-between-professional-cleanings"],
    ]
  }

  return [
    ["Hourly or flat-rate cleaning?", "/guides/hourly-vs-flat-rate-house-cleaning"],
    ["What to check after the first clean", "/guides/what-to-check-after-first-house-cleaning"],
    ["How to choose a cleaning service", "/guides/how-to-choose-house-cleaning-service"],
  ]
}

export function getGuideLinksForPage(path: string): [string, string][] {
  if (path.includes("cancellation") || path.includes("contact")) {
    return [
      ["When to reschedule cleaning", "/guides/when-to-reschedule-house-cleaning"],
      ["Should you give a cleaner a key or code?", "/guides/should-you-give-cleaner-key-or-door-code"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
    ]
  }

  if (path.includes("baby") || path.includes("kids") || path.includes("guest") || path.includes("holiday")) {
    return [
      ["Cleaning before a baby arrives", "/guides/cleaning-service-before-baby-arrives"],
      ["House cleaning with kids and toys", "/guides/cleaning-service-with-kids-and-toys"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (path.includes("supplies") || path.includes("do-cleaners-bring-supplies")) {
    return [
      ["Cleaner vs housekeeper", "/guides/cleaner-vs-housekeeper-dishes-laundry-beds"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
    ]
  }

  if (path.includes("pet") || path.includes("allerg") || path.includes("eco-friendly") || path.includes("supplies")) {
    return [
      ["Cleaning with pets and allergies", "/guides/house-cleaning-with-pets-and-allergies"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
    ]
  }

  if (path.includes("why-shynli") || path.includes("insured") || path.includes("background") || path.includes("professional-cleaning-vs-independent-cleaner") || path.includes("review") || path.includes("guarantee")) {
    return [
      ["What to check after the first clean", "/guides/what-to-check-after-first-house-cleaning"],
      ["What if a cleaner breaks something?", "/guides/what-if-cleaner-breaks-something"],
      ["How to choose a cleaning service", "/guides/how-to-choose-house-cleaning-service"],
    ]
  }

  if (path.includes("move") || path.includes("moving") || path.includes("renter") || path.includes("landlord") || path.includes("security-deposit")) {
    return [
      ["Move-out photo proof", "/guides/move-out-cleaning-photos-receipts-before-handoff"],
      ["Which cleaning add-ons are worth it", "/guides/which-house-cleaning-add-ons-are-worth-it"],
      ["What to tell us before a quote", "/guides/what-to-tell-cleaning-service-before-quote"],
    ]
  }

  if (path.includes("recurring") || path.includes("weekly") || path.includes("biweekly") || path.includes("schedule")) {
    return [
      ["Rotating deeper tasks", "/guides/rotating-deep-cleaning-tasks-on-recurring-visits"],
      ["When to reschedule cleaning", "/guides/when-to-reschedule-house-cleaning"],
      ["Keep the house clean between visits", "/guides/keep-house-clean-between-professional-cleanings"],
    ]
  }

  if (path === "/quote" || path.startsWith("/pricing") || path.includes("price") || path.includes("cost")) {
    return [
      ["Hourly or flat-rate cleaning?", "/guides/hourly-vs-flat-rate-house-cleaning"],
      ["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"],
      ["Cleaning budget priorities", "/guides/what-to-prioritize-cleaning-service-limited-budget"],
    ]
  }

  if (path.startsWith("/checklists") || path.startsWith("/faq")) {
    return [
      ["What to check after the first clean", "/guides/what-to-check-after-first-house-cleaning"],
      ["Cleaner vs housekeeper", "/guides/cleaner-vs-housekeeper-dishes-laundry-beds"],
      ["What cleaners usually do not do", "/guides/what-house-cleaners-do-not-do"],
    ]
  }

  return [
    ["How long cleaning takes", "/guides/how-long-house-cleaning-should-take"],
    ["Should you give a cleaner a key or code?", "/guides/should-you-give-cleaner-key-or-door-code"],
    ["First-time cleaner etiquette", "/guides/first-time-house-cleaner-etiquette"],
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
