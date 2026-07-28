export type Locale = "sv" | "en";
export type ServiceKey =
  | "seo"
  | "aeo"
  | "websites"
  | "chatbots"
  | "voice";

export type Localized<T> = Record<Locale, T>;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceCopy {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  promise: string;
  idealFor: string[];
  deliverables: string[];
  process: { title: string; text: string }[];
  boundaries: string[];
  timeline: string;
  measures: string[];
  faqs: FaqItem[];
  metaTitle: string;
  metaDescription: string;
}

export interface ServiceDefinition {
  key: ServiceKey;
  index: string;
  copy: Localized<ServiceCopy>;
}

export const siteConfig = {
  name: "All-in-One Labs",
  legalName: "ScaleCommerce Group AB",
  organizationNumber: "559437-8761",
  address: "Kemistvägen 2A, 183 79 Täby, Sweden",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://all-in-one-labs.com",
  bookingUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/elliot-theaioecom/30-minute-meeting-clone",
  email: "elliot@theaioecom.com",
  phoneDisplay: "+46 70 880 27 56",
  phoneHref: "+46708802756",
  linkedIn: "https://www.linkedin.com/company/all-in-one-ecom/",
  instagram: "https://www.instagram.com/all_in_one_ecom/",
} as const;

export const services: ServiceDefinition[] = [
  {
    key: "seo",
    index: "01",
    copy: {
      sv: {
        slug: "seo",
        navLabel: "SEO",
        eyebrow: "Organisk synlighet",
        title: "SEO som leder rätt människor hela vägen fram.",
        intro:
          "Vi bygger en tydlig, tekniskt sund och mätbar söknärvaro för svenska företag som vill växa utan att köpa varje klick.",
        promise:
          "Mer relevant efterfrågan, bättre innehållsstruktur och en webbplats som sökmotorer faktiskt kan förstå.",
        idealFor: [
          "Företag med starkt erbjudande men svag organisk synlighet",
          "Team som publicerar innehåll utan en sammanhållen sökstrategi",
          "Webbplatser med indexerings-, struktur- eller prestandaproblem",
          "Lokala och nationella verksamheter som behöver fler kvalificerade leads",
        ],
        deliverables: [
          "Teknisk SEO- och innehållsaudit",
          "Sökintention, konkurrentbild och prioriterad möjlighetkarta",
          "Sidstruktur, metadata och internlänkning",
          "Lokal SEO där den påverkar affären",
          "Innehållsplan med tydliga ägare och publiceringsordning",
          "Search Console, mätpunkter och rapportering",
        ],
        process: [
          {
            title: "Diagnos",
            text: "Vi kartlägger teknik, innehåll, konkurrens och vad som faktiskt skapar affärsvärde.",
          },
          {
            title: "Prioritering",
            text: "Möjligheterna rangordnas efter effekt, arbetsinsats och beroenden.",
          },
          {
            title: "Genomförande",
            text: "Vi åtgärdar grunden och bygger innehåll kring verklig kundintention.",
          },
          {
            title: "Lärande",
            text: "Resultaten mäts på leads och kvalitet—not bara positioner.",
          },
        ],
        boundaries: [
          "Inga garanterade placeringar",
          "Inga köpta eller manipulerade länknätverk",
          "Ingen masspublicering av tunt AI-innehåll",
        ],
        timeline: "Grundarbete 2–4 veckor. Därefter löpande optimering vid behov.",
        measures: [
          "Kvalificerade organiska leads",
          "Synlighet på relevanta icke-varumärkessökningar",
          "Indexerade prioritetssidor",
          "Konvertering från organisk trafik",
        ],
        faqs: [
          {
            question: "Hur snabbt ger SEO resultat?",
            answer:
              "Tekniska förbättringar kan synas tidigt, men hållbar organisk tillväxt byggs normalt över flera månader. Vi skiljer på snabba korrigeringar och långsiktigt innehållsarbete.",
          },
          {
            question: "Arbetar ni med lokal SEO?",
            answer:
              "Ja. För verksamheter med geografiska marknader optimerar vi bland annat lokal sidstruktur, företagsinformation och innehåll kring verkliga lokala behov.",
          },
          {
            question: "Kan ni arbeta med vårt befintliga team?",
            answer:
              "Ja. Vi kan leda strategin, genomföra arbetet eller ge ert interna team prioriteringar, mallar och kvalitetsgranskning.",
          },
          {
            question: "Garanterar ni förstaplaceringar?",
            answer:
              "Nej. Seriös SEO kan förbättra förutsättningarna och resultaten, men ingen byrå kontrollerar sökmotorernas beslut.",
          },
        ],
        metaTitle: "SEO-byrå för svenska tillväxtföretag | All-in-One Labs",
        metaDescription:
          "Teknisk SEO, innehållsstrategi och lokal synlighet för svenska företag som vill skapa fler kvalificerade leads.",
      },
      en: {
        slug: "seo",
        navLabel: "SEO",
        eyebrow: "Organic visibility",
        title: "SEO that brings the right people all the way through.",
        intro:
          "We build a clear, technically sound, measurable search presence for Swedish companies that want to grow without buying every click.",
        promise:
          "More relevant demand, stronger content structure, and a website search engines can properly understand.",
        idealFor: [
          "Companies with a strong offer but weak organic visibility",
          "Teams publishing without a connected search strategy",
          "Websites with indexing, structure, or performance problems",
          "Local and national businesses needing more qualified leads",
        ],
        deliverables: [
          "Technical SEO and content audit",
          "Search intent, competitive landscape, and opportunity map",
          "Page structure, metadata, and internal linking",
          "Local SEO where it affects the business",
          "Content roadmap with ownership and publishing order",
          "Search Console, measurement, and reporting",
        ],
        process: [
          {
            title: "Diagnose",
            text: "We map the technology, content, competition, and the outcomes that create business value.",
          },
          {
            title: "Prioritise",
            text: "Opportunities are ranked by impact, effort, and dependency.",
          },
          {
            title: "Implement",
            text: "We repair the foundation and build content around genuine customer intent.",
          },
          {
            title: "Learn",
            text: "Results are measured through lead quality—not positions alone.",
          },
        ],
        boundaries: [
          "No ranking guarantees",
          "No bought or manipulative link networks",
          "No mass publishing of thin AI content",
        ],
        timeline: "A 2–4 week foundation, followed by ongoing optimisation where useful.",
        measures: [
          "Qualified organic leads",
          "Relevant non-brand visibility",
          "Indexed priority pages",
          "Organic conversion",
        ],
        faqs: [
          {
            question: "How quickly does SEO work?",
            answer:
              "Technical improvements can surface early, but sustainable organic growth normally develops over several months. We separate quick repairs from long-term content work.",
          },
          {
            question: "Do you provide local SEO?",
            answer:
              "Yes. For geographically focused businesses we optimise local page structure, company information, and content built around real local needs.",
          },
          {
            question: "Can you work with our existing team?",
            answer:
              "Yes. We can lead the strategy, execute the work, or equip your internal team with priorities, templates, and quality reviews.",
          },
          {
            question: "Do you guarantee first place?",
            answer:
              "No. Serious SEO improves the conditions and outcomes, but no agency controls a search engine’s decisions.",
          },
        ],
        metaTitle: "SEO agency for Swedish growth companies | All-in-One Labs",
        metaDescription:
          "Technical SEO, content strategy, and local visibility for Swedish companies that need more qualified leads.",
      },
    },
  },
  {
    key: "aeo",
    index: "02",
    copy: {
      sv: {
        slug: "aeo",
        navLabel: "AEO",
        eyebrow: "Answer Engine Optimization",
        title: "Bli ett svar som kunder och AI-system kan lita på.",
        intro:
          "AEO bygger vidare på bra SEO. Vi gör företagets expertis tydlig, verifierbar och lätt att hitta i både klassisk sök och AI-assisterade svar.",
        promise:
          "En starkare digital kunskapsyta—utan genvägar, specialmarkup eller löften om garanterade AI-citeringar.",
        idealFor: [
          "Expertföretag som behöver bli förstådda, inte bara hittade",
          "Varumärken vars erbjudande beskrivs inkonsekvent på webben",
          "Team som vill mäta ChatGPT- och answer-engine-trafik där det går",
          "Företag med många komplexa kundfrågor före köp",
        ],
        deliverables: [
          "Crawl- och answer-engine-audit",
          "Tydlig tjänste-, expert- och entitetsstruktur",
          "Fråge-, jämförelse- och beslutsinnehåll med riktiga källor",
          "Strukturerad data som matchar synligt innehåll",
          "Robots- och indexeringskontroll för relevanta sökcrawlers",
          "Mätning av synliga referrals och återkommande frågeteman",
        ],
        process: [
          {
            title: "Förstå frågorna",
            text: "Vi kartlägger vad kunder försöker avgöra innan de kontaktar er.",
          },
          {
            title: "Stärk sanningen",
            text: "Påståenden förankras i erfarenhet, data, människor och tydliga källor.",
          },
          {
            title: "Gör den åtkomlig",
            text: "Teknik, sidstruktur och innehåll gör informationen möjlig att hämta och citera.",
          },
          {
            title: "Följ signalerna",
            text: "Vi mäter referraltrafik, frågor, varumärkessök och kvalificerade leads.",
          },
        ],
        boundaries: [
          "Inga garantier om AI-citeringar",
          "Ingen fabricerad expertis eller köpta omnämnanden",
          "Ingen llms.txt-teater som ersätter riktig SEO",
        ],
        timeline: "Grundarbete 2–4 veckor. Innehåll och mätning utvecklas löpande.",
        measures: [
          "Kvalificerad trafik från sök och answer engines",
          "Tydligare varumärkes- och tjänsteentiteter",
          "Synlighet för verkliga kundfrågor",
          "Andel innehåll med verifierbar expertförankring",
        ],
        faqs: [
          {
            question: "Är AEO samma sak som SEO?",
            answer:
              "AEO är inte en separat magisk kanal. Det bygger på samma tekniska och innehållsmässiga grund som seriös SEO, men lägger extra fokus på tydliga svar, expertis, källor och entiteter.",
          },
          {
            question: "Kan ni garantera att ChatGPT citerar oss?",
            answer:
              "Nej. Vi kan förbättra åtkomst, tydlighet och trovärdighet, men det är answer engine-leverantören som bestämmer vad som visas.",
          },
          {
            question: "Behöver vi llms.txt?",
            answer:
              "Inte som standard. Google säger uttryckligen att filen inte påverkar synlighet i deras generativa sök. Vi prioriterar indexerbart, användbart och verifierbart innehåll.",
          },
          {
            question: "Hur mäter ni AEO?",
            answer:
              "Vi kombinerar synlig referraltrafik, frågebaserad organisk synlighet, varumärkessökningar, innehållstäckning och leadkvalitet. Mätbarheten varierar mellan plattformar.",
          },
        ],
        metaTitle: "AEO-byrå i Sverige | Answer Engine Optimization",
        metaDescription:
          "AEO för svenska företag: tydlig expertis, verifierbart innehåll och teknisk åtkomst för AI-assisterad sök.",
      },
      en: {
        slug: "aeo",
        navLabel: "AEO",
        eyebrow: "Answer Engine Optimization",
        title: "Become an answer customers and AI systems can trust.",
        intro:
          "AEO builds on sound SEO. We make your expertise clear, verifiable, and discoverable across classic search and AI-assisted answers.",
        promise:
          "A stronger digital knowledge surface—without shortcuts, special-markup theatre, or guaranteed citation claims.",
        idealFor: [
          "Expert businesses that need to be understood, not merely found",
          "Brands described inconsistently across the web",
          "Teams wanting to measure answer-engine referrals where possible",
          "Companies facing complex pre-purchase questions",
        ],
        deliverables: [
          "Crawlability and answer-engine audit",
          "Clear service, expert, and entity structure",
          "Question, comparison, and decision content with real sources",
          "Structured data aligned with visible content",
          "Crawler and indexing controls for relevant search systems",
          "Measurement of visible referrals and recurring question themes",
        ],
        process: [
          {
            title: "Understand questions",
            text: "We map what customers are trying to decide before they contact you.",
          },
          {
            title: "Strengthen truth",
            text: "Claims are anchored in experience, data, people, and clear sources.",
          },
          {
            title: "Make it accessible",
            text: "Technology, page structure, and content make information retrievable and citable.",
          },
          {
            title: "Follow signals",
            text: "We measure referrals, questions, branded demand, and qualified leads.",
          },
        ],
        boundaries: [
          "No AI citation guarantees",
          "No fabricated expertise or bought mentions",
          "No llms.txt theatre replacing genuine SEO",
        ],
        timeline: "A 2–4 week foundation, followed by ongoing content and measurement.",
        measures: [
          "Qualified search and answer-engine traffic",
          "Clearer brand and service entities",
          "Visibility for real customer questions",
          "Share of content supported by verifiable expertise",
        ],
        faqs: [
          {
            question: "Is AEO the same as SEO?",
            answer:
              "AEO is not a separate magical channel. It uses the same technical and content foundation as serious SEO, with added emphasis on clear answers, expertise, sourcing, and entities.",
          },
          {
            question: "Can you guarantee ChatGPT citations?",
            answer:
              "No. We can improve access, clarity, and credibility, but the answer-engine provider decides what appears.",
          },
          {
            question: "Do we need llms.txt?",
            answer:
              "Not by default. Google explicitly says it does not affect visibility in generative search. We prioritise indexable, useful, verifiable content.",
          },
          {
            question: "How do you measure AEO?",
            answer:
              "We combine visible referral traffic, question-led organic visibility, branded search, content coverage, and lead quality. Measurement varies between platforms.",
          },
        ],
        metaTitle: "AEO agency in Sweden | Answer Engine Optimization",
        metaDescription:
          "AEO for Swedish companies: clear expertise, verifiable content, and technical access for AI-assisted search.",
      },
    },
  },
  {
    key: "websites",
    index: "03",
    copy: {
      sv: {
        slug: "webbplatser",
        navLabel: "Webbplatser",
        eyebrow: "Design & utveckling",
        title: "Webbplatser byggda för beslut—not bara besök.",
        intro:
          "Vi förenar positionering, innehåll, UX och ren utveckling till snabba webbplatser som gör erbjudandet lätt att förstå och agera på.",
        promise:
          "En tydligare väg från första intryck till kvalificerad kontakt, utan onödig teknisk skuld.",
        idealFor: [
          "Företag vars webbplats inte speglar kvaliteten i erbjudandet",
          "Team som är beroende av utvecklare för varje innehållsändring",
          "Verksamheter med låg konvertering eller svag mobilupplevelse",
          "Bolag som behöver en ny digital grund för SEO, AEO och automation",
        ],
        deliverables: [
          "Discovery, positionering och konverteringsstrategi",
          "Informationsarkitektur och svensk källcopy",
          "Responsiv UX och egen visuell riktning",
          "Tillgänglig, prestandabudgeterad produktion",
          "Analytics, formulär och bokningsflöden",
          "Dokumentation, utbildning och överlämning",
        ],
        process: [
          {
            title: "Riktning",
            text: "Vi låser målgrupp, erbjudande, bevis och primär handling innan design.",
          },
          {
            title: "Prototyp",
            text: "Startsida och en kärnsida validerar systemet på mobil och desktop.",
          },
          {
            title: "Bygg",
            text: "Godkända mönster skalas till resterande sidor och integrationer.",
          },
          {
            title: "Lansering",
            text: "Prestanda, tillgänglighet, tracking och formulär verifieras live.",
          },
        ],
        boundaries: [
          "Ingen generisk mall för alla verksamheter",
          "Ingen lansering med tomma sidor eller platshållarcopy",
          "Ingen plattform väljs av vana istället för behov",
        ],
        timeline: "Vanligtvis 6–10 veckor beroende på innehåll och integrationer.",
        measures: [
          "Kvalificerade bokningar och formulär",
          "Core Web Vitals och tillgänglighet",
          "Mobil konvertering",
          "Redaktionell självständighet",
        ],
        faqs: [
          {
            question: "Vilken plattform använder ni?",
            answer:
              "Vi väljer utifrån innehåll, redaktörsbehov, integrationer och affär. Next.js, Shopify och etablerade CMS-plattformar fyller olika behov.",
          },
          {
            question: "Hjälper ni till med copy?",
            answer:
              "Ja. Vi strukturerar budskap, skriver eller redigerar svensk källcopy och säkerställer att varje sida har en tydlig uppgift.",
          },
          {
            question: "Kan ni ta över en befintlig webbplats?",
            answer:
              "Ja. Först gör vi en teknisk och redaktionell genomgång och avgör vad som ska behållas, förbättras eller byggas om.",
          },
          {
            question: "Vad händer efter lansering?",
            answer:
              "Ni får dokumentation och överlämning. Löpande utveckling, SEO, innehåll och konverteringsarbete kan läggas till efter behov.",
          },
        ],
        metaTitle: "Webbdesign och webbutveckling i Sverige | All-in-One Labs",
        metaDescription:
          "Snabba, tillgängliga webbplatser byggda kring tydliga erbjudanden, SEO och kvalificerade leads.",
      },
      en: {
        slug: "websites",
        navLabel: "Websites",
        eyebrow: "Design & development",
        title: "Websites built for decisions—not just visits.",
        intro:
          "We combine positioning, content, UX, and clean development into fast websites that make an offer easy to understand and act on.",
        promise:
          "A clearer route from first impression to qualified contact, without unnecessary technical debt.",
        idealFor: [
          "Companies whose website undersells the quality of their offer",
          "Teams dependent on developers for every content change",
          "Businesses with weak conversion or mobile experience",
          "Companies needing a new foundation for SEO, AEO, and automation",
        ],
        deliverables: [
          "Discovery, positioning, and conversion strategy",
          "Information architecture and Swedish source copy",
          "Responsive UX and an original visual direction",
          "Accessible, performance-budgeted production",
          "Analytics, forms, and booking journeys",
          "Documentation, training, and handover",
        ],
        process: [
          {
            title: "Direction",
            text: "We lock the audience, offer, evidence, and primary action before design.",
          },
          {
            title: "Prototype",
            text: "The homepage and one core page validate the system on mobile and desktop.",
          },
          {
            title: "Build",
            text: "Approved patterns scale across the remaining pages and integrations.",
          },
          {
            title: "Launch",
            text: "Performance, accessibility, tracking, and forms are verified live.",
          },
        ],
        boundaries: [
          "No generic template for every business",
          "No launch with empty pages or placeholder copy",
          "No platform chosen through habit instead of need",
        ],
        timeline: "Usually 6–10 weeks, depending on content and integrations.",
        measures: [
          "Qualified bookings and enquiries",
          "Core Web Vitals and accessibility",
          "Mobile conversion",
          "Editorial independence",
        ],
        faqs: [
          {
            question: "Which platform do you use?",
            answer:
              "We choose based on content, editorial needs, integrations, and commercial requirements. Next.js, Shopify, and established CMS platforms solve different problems.",
          },
          {
            question: "Can you help with copy?",
            answer:
              "Yes. We structure the message, write or edit Swedish source copy, and ensure every page has a clear job.",
          },
          {
            question: "Can you take over an existing website?",
            answer:
              "Yes. We begin with a technical and editorial review to decide what should be kept, improved, or rebuilt.",
          },
          {
            question: "What happens after launch?",
            answer:
              "You receive documentation and handover. Ongoing development, SEO, content, and conversion work can be added where useful.",
          },
        ],
        metaTitle: "Website design and development in Sweden | All-in-One Labs",
        metaDescription:
          "Fast, accessible websites built around clear offers, organic visibility, and qualified leads.",
      },
    },
  },
  {
    key: "chatbots",
    index: "04",
    copy: {
      sv: {
        slug: "ai-chattbotar",
        navLabel: "AI-chattbotar",
        eyebrow: "Digital kunddialog",
        title: "En AI-chattbot som vet när den ska svara—and när den ska lämna över.",
        intro:
          "Vi bygger avgränsade, varumärkesanpassade chattbotar som besvarar godkända frågor, kvalificerar leads och kopplar in människor när det behövs.",
        promise:
          "Snabbare svar och bättre sorterade ärenden utan att låtsas att automation kan ersätta varje mänskligt beslut.",
        idealFor: [
          "Verksamheter med många återkommande frågor",
          "Team som tappar leads utanför kontorstid",
          "Företag med bokning, offert eller kvalificeringsflöden",
          "Supportorganisationer som behöver tydligare första linje",
        ],
        deliverables: [
          "Use-case-, data- och riskbedömning",
          "Godkänd kunskapsbas med källhänvisning",
          "Varumärkesanpassad webbchatt",
          "Kvalificering, bokning och formulär",
          "CRM- eller helpdesk-handoff där det stöds",
          "Analys, fallback och förbättringsloop",
        ],
        process: [
          {
            title: "Avgränsa",
            text: "Vi definierar vad boten får svara på, samla in och genomföra.",
          },
          {
            title: "Förankra",
            text: "Svar hämtas från godkända källor med tydligt innehållsansvar.",
          },
          {
            title: "Integrera",
            text: "Bokning, leads och eskalering kopplas till befintliga arbetsflöden.",
          },
          {
            title: "Förbättra",
            text: "Missade frågor och handoffs granskas och används för kontrollerade uppdateringar.",
          },
        ],
        boundaries: [
          "Ingen träning på okontrollerat kundmaterial",
          "Inga känsliga beslut utan särskild bedömning",
          "Ingen dold AI-identitet eller saknad mänsklig väg",
        ],
        timeline: "Vanligtvis 3–6 veckor från avgränsning till kontrollerad lansering.",
        measures: [
          "Kvalificerade leads och bokningar",
          "Andel korrekt hanterade frågor",
          "Eskalering och fallback",
          "Svarstid och kundfeedback",
        ],
        faqs: [
          {
            question: "Kan boten svara utifrån våra dokument?",
            answer:
              "Ja, om materialet är godkänt, aktuellt och lämpligt. Vi strukturerar källorna och sätter gränser för vad som får användas.",
          },
          {
            question: "Kan den boka möten?",
            answer:
              "Ja. Den kan samla in relevanta uppgifter och skicka vidare till ett godkänt bokningsflöde.",
          },
          {
            question: "Vad händer när boten inte vet?",
            answer:
              "Den ska säga det tydligt, samla in rätt kontext och lämna över till en människa istället för att gissa.",
          },
          {
            question: "Är chattboten GDPR-anpassad?",
            answer:
              "Lösningen byggs med dataminimering, tydligt ändamål och dokumenterade leverantörer. Kundens slutliga juridiska bedömning beror på användning och data.",
          },
        ],
        metaTitle: "AI-chattbotar för svenska företag | All-in-One Labs",
        metaDescription:
          "AI-chattbotar för frågor, leadkvalificering, bokning och kontrollerad överlämning till människor.",
      },
      en: {
        slug: "ai-chatbots",
        navLabel: "AI chatbots",
        eyebrow: "Digital customer dialogue",
        title: "An AI chatbot that knows when to answer—and when to hand over.",
        intro:
          "We build bounded, on-brand chatbots that answer approved questions, qualify leads, and involve people when needed.",
        promise:
          "Faster responses and better-routed enquiries without pretending automation can replace every human decision.",
        idealFor: [
          "Businesses receiving many recurring questions",
          "Teams losing leads outside office hours",
          "Companies with booking, quote, or qualification journeys",
          "Support organisations needing a clearer first line",
        ],
        deliverables: [
          "Use-case, data, and risk assessment",
          "Approved knowledge base with source references",
          "On-brand website chat",
          "Qualification, booking, and forms",
          "CRM or helpdesk handoff where supported",
          "Analytics, fallback, and improvement loop",
        ],
        process: [
          {
            title: "Bound",
            text: "We define what the bot may answer, collect, and perform.",
          },
          {
            title: "Ground",
            text: "Answers come from approved sources with clear content ownership.",
          },
          {
            title: "Integrate",
            text: "Booking, leads, and escalation connect to existing workflows.",
          },
          {
            title: "Improve",
            text: "Missed questions and handoffs are reviewed for controlled updates.",
          },
        ],
        boundaries: [
          "No training on uncontrolled customer material",
          "No sensitive decisions without specific assessment",
          "No hidden AI identity or missing human route",
        ],
        timeline: "Usually 3–6 weeks from scoping to controlled launch.",
        measures: [
          "Qualified leads and bookings",
          "Successfully handled questions",
          "Escalation and fallback",
          "Response time and customer feedback",
        ],
        faqs: [
          {
            question: "Can the bot answer from our documents?",
            answer:
              "Yes, when the material is approved, current, and appropriate. We structure the sources and define what may be used.",
          },
          {
            question: "Can it book meetings?",
            answer:
              "Yes. It can collect relevant details and pass the visitor into an approved booking journey.",
          },
          {
            question: "What happens when it does not know?",
            answer:
              "It should say so clearly, collect the right context, and hand over to a person instead of guessing.",
          },
          {
            question: "Is the chatbot GDPR compliant?",
            answer:
              "The solution is designed around data minimisation, clear purpose, and documented suppliers. The customer’s final legal assessment depends on the use case and data.",
          },
        ],
        metaTitle: "AI chatbots for Swedish companies | All-in-One Labs",
        metaDescription:
          "AI chatbots for questions, lead qualification, booking, and controlled human handoff.",
      },
    },
  },
  {
    key: "voice",
    index: "05",
    copy: {
      sv: {
        slug: "ai-telefonister",
        navLabel: "AI-telefonister",
        eyebrow: "AI-röst med mänsklig kontroll",
        title: "Låt inget viktigt samtal mötas av tystnad.",
        intro:
          "Vår standardlösning är en transparent AI-receptionist för inkommande samtal: svar, kvalificering, bokning, routing och sammanfattning.",
        promise:
          "Bättre tillgänglighet och färre missade möjligheter—med tydlig AI-identitet, godkända manus och mänsklig eskalering.",
        idealFor: [
          "Företag som missar samtal under toppar eller efter arbetstid",
          "Verksamheter med bokning och återkommande frågor",
          "Team som behöver kvalificera ärenden före mänsklig handläggning",
          "Organisationer som vill följa upp befintliga leads kontrollerat",
        ],
        deliverables: [
          "Use-case-, regel- och riskbedömning",
          "AI-disclosure och godkänt samtalsmanus",
          "FAQ, kvalificering, bokning och routing",
          "Mänsklig eskalering och säker fallback",
          "Samtalssammanfattning och kontrollerad lagring",
          "Kvalitetsgranskning och återkommande förbättring",
        ],
        process: [
          {
            title: "Godkänn flödet",
            text: "Syfte, manus, data, öppettider och mänskliga vägar dokumenteras.",
          },
          {
            title: "Bygg rösten",
            text: "Ton, uttal, avbrott och informationsgränser testas med riktiga scenarier.",
          },
          {
            title: "Pilotera",
            text: "En begränsad trafikandel följs manuellt innan bredare aktivering.",
          },
          {
            title: "Kontrollera",
            text: "Samtalsutfall, missar, eskaleringar och opt-outs granskas kontinuerligt.",
          },
        ],
        boundaries: [
          "Inkommande reception är standard; outbound är särskilt scope",
          "Ingen kall konsumenttelefoni utan laglig grund och kontroll",
          "Inga automatiska konsumentavtal eller dold AI-identitet",
        ],
        timeline: "Vanligtvis 4–8 veckor inklusive manus, integration och pilot.",
        measures: [
          "Besvarade och korrekt routade samtal",
          "Bokningar och kvalificerade ärenden",
          "Missade samtal och fallback",
          "Eskalering, opt-out och kvalitetsutfall",
        ],
        faqs: [
          {
            question: "Säger telefonisten att den är AI?",
            answer:
              "Ja. Personen ska informeras tydligt i början av interaktionen, om det inte redan är uppenbart i sammanhanget.",
          },
          {
            question: "Kan den ringa utgående säljsamtal?",
            answer:
              "Outbound är inte standard. Det kräver ett avgränsat use-case, godkända kontaktkällor, suppression- och opt-out-rutiner samt juridisk kontroll där det behövs.",
          },
          {
            question: "Kan den koppla till en människa?",
            answer:
              "Ja. Eskalering och fallback är en del av grunddesignen och testas före pilot.",
          },
          {
            question: "Spelas samtalen in?",
            answer:
              "Endast när det finns ett definierat behov, laglig grund, tydlig information och en godkänd lagringsperiod. Många flöden kan använda kortlivad transkribering eller enbart sammanfattning.",
          },
        ],
        metaTitle: "AI-telefonist och AI-receptionist i Sverige | All-in-One Labs",
        metaDescription:
          "Transparent AI-reception för inkommande samtal, kvalificering, bokning, routing och mänsklig eskalering.",
      },
      en: {
        slug: "ai-voice-agents",
        navLabel: "AI voice agents",
        eyebrow: "AI voice with human control",
        title: "Let no important call be met by silence.",
        intro:
          "Our standard offer is a transparent AI receptionist for incoming calls: answers, qualification, booking, routing, and summaries.",
        promise:
          "Better availability and fewer missed opportunities—with clear AI identity, approved scripts, and human escalation.",
        idealFor: [
          "Companies missing calls during peaks or outside office hours",
          "Businesses with bookings and recurring questions",
          "Teams needing to qualify enquiries before human handling",
          "Organisations following up existing leads in a controlled way",
        ],
        deliverables: [
          "Use-case, regulatory, and risk assessment",
          "AI disclosure and approved call script",
          "FAQ, qualification, booking, and routing",
          "Human escalation and safe fallback",
          "Call summaries and controlled retention",
          "Quality review and recurring improvement",
        ],
        process: [
          {
            title: "Approve the flow",
            text: "Purpose, script, data, opening hours, and human routes are documented.",
          },
          {
            title: "Build the voice",
            text: "Tone, pronunciation, interruption, and information boundaries are tested with real scenarios.",
          },
          {
            title: "Pilot",
            text: "A limited share of traffic is manually reviewed before broader activation.",
          },
          {
            title: "Control",
            text: "Outcomes, misses, escalations, and opt-outs are reviewed continuously.",
          },
        ],
        boundaries: [
          "Inbound reception is standard; outbound is separately scoped",
          "No cold consumer calling without lawful basis and controls",
          "No automated consumer contracts or hidden AI identity",
        ],
        timeline: "Usually 4–8 weeks including script, integration, and pilot.",
        measures: [
          "Answered and correctly routed calls",
          "Bookings and qualified enquiries",
          "Missed calls and fallback",
          "Escalation, opt-out, and quality outcomes",
        ],
        faqs: [
          {
            question: "Does the agent say it is AI?",
            answer:
              "Yes. The person should be informed clearly at the start of the interaction unless it is already obvious in context.",
          },
          {
            question: "Can it make outbound sales calls?",
            answer:
              "Outbound is not standard. It requires a bounded use case, approved contact sources, suppression and opt-out routines, and legal review where needed.",
          },
          {
            question: "Can it transfer to a person?",
            answer:
              "Yes. Escalation and fallback are part of the foundation and are tested before the pilot.",
          },
          {
            question: "Are calls recorded?",
            answer:
              "Only where there is a defined need, lawful basis, clear notice, and approved retention. Many flows can use short-lived transcription or summaries only.",
          },
        ],
        metaTitle: "AI receptionist and voice agents in Sweden | All-in-One Labs",
        metaDescription:
          "Transparent AI reception for incoming calls, qualification, booking, routing, and human escalation.",
      },
    },
  },
];

export const homeCopy = {
  sv: {
    eyebrow: "Tillväxtsystem för svenska företag",
    title: "Synlighet. System. Tillväxt.",
    intro:
      "Vi bygger SEO, AEO, webbplatser och AI-agenter som skapar fler kvalificerade affärer och mindre manuellt arbete.",
    primaryCta: "Boka en kostnadsfri analys",
    secondaryCta: "Utforska våra tjänster",
    serviceTitle: "Fem discipliner. Ett sammanhängande system.",
    serviceIntro:
      "En stark webbplats utan synlighet står tom. Trafik utan tydlig konvertering blir dyr. Automation utan kontroll skapar risk. Vi kopplar ihop helheten.",
    problemTitle: "Tekniken är sällan problemet i sig.",
    problemBody:
      "Problemet är glappen mellan marknad, webb, försäljning och kundservice. Labs bygger bort glappen med tydligt ansvar, mätbara flöden och mänsklig kontroll.",
    proofEyebrow: "Erfarenhet som går att spåra",
    proofTitle: "Byggt i den verkliga ekonomin.",
    proofBody:
      "Teamet bakom Labs har arbetat med e-handel, webb, retention och tillväxt för svenska och internationella varumärken. Vi återanvänder erfarenheten—not gamla löften.",
    processTitle: "Från oklar möjlighet till kontrollerad drift.",
    closingTitle: "Börja med det som blockerar mest.",
    closingBody:
      "På 30 minuter kartlägger vi var synlighet, webb eller kundhantering tappar affärsvärde. Du får ett konkret nästa steg, även om det inte blir ett projekt med oss.",
  },
  en: {
    eyebrow: "Growth systems for Swedish companies",
    title: "Visibility. Systems. Growth.",
    intro:
      "We build SEO, AEO, websites, and AI agents that create more qualified business and less manual work.",
    primaryCta: "Book a free assessment",
    secondaryCta: "Explore our services",
    serviceTitle: "Five disciplines. One connected system.",
    serviceIntro:
      "A strong website without visibility stands empty. Traffic without conversion becomes expensive. Automation without control creates risk. We connect the whole system.",
    problemTitle: "Technology is rarely the problem by itself.",
    problemBody:
      "The problem is the gap between marketing, web, sales, and customer service. Labs closes those gaps through clear ownership, measurable flows, and human control.",
    proofEyebrow: "Experience that can be traced",
    proofTitle: "Built in the real economy.",
    proofBody:
      "The team behind Labs has worked across ecommerce, web, retention, and growth for Swedish and international brands. We reuse the experience—not old promises.",
    processTitle: "From unclear opportunity to controlled operation.",
    closingTitle: "Start with the biggest blocker.",
    closingBody:
      "In 30 minutes we map where visibility, web, or customer handling is losing business value. You leave with a concrete next step, even if it does not become a project with us.",
  },
} satisfies Localized<Record<string, string>>;

export const commonCopy = {
  sv: {
    navServices: "Tjänster",
    navCases: "Case",
    navAbout: "Om oss",
    navContact: "Kontakt",
    booking: "Boka analys",
    menu: "Meny",
    language: "English",
    servicesEyebrow: "Tjänster",
    servicesTitle: "Kapacitet som hänger ihop.",
    servicesIntro:
      "Varje disciplin kan stå för sig själv. Den största effekten kommer när synlighet, webb och kunddialog förstärker varandra.",
    casesEyebrow: "Utvalda samarbeten",
    casesTitle: "Bevis före superlativ.",
    casesIntro:
      "Vi visar bara relationer och resultat som har en spårbar offentlig eller intern grund. Labs-specifika AI-resultat publiceras först när piloterna är verifierade.",
    aboutEyebrow: "Om Labs",
    aboutTitle: "Operatörer först. Byrå därefter.",
    aboutIntro:
      "All-in-One Labs drivs av ScaleCommerce Group AB och bygger vidare på praktisk erfarenhet från e-handel, webb, marknadsföring och automation.",
    contactEyebrow: "Kontakt",
    contactTitle: "Vilket glapp kostar mest just nu?",
    contactIntro:
      "Berätta kort om verksamheten. Vi återkommer med rätt person, ett par skarpa frågor och ett tydligt nästa steg.",
    privacyEyebrow: "Integritet",
    privacyTitle: "Tydligt om data, verktyg och ansvar.",
  },
  en: {
    navServices: "Services",
    navCases: "Cases",
    navAbout: "About",
    navContact: "Contact",
    booking: "Book assessment",
    menu: "Menu",
    language: "Svenska",
    servicesEyebrow: "Services",
    servicesTitle: "Capabilities that connect.",
    servicesIntro:
      "Each discipline can stand alone. The strongest outcome comes when visibility, web, and customer dialogue reinforce one another.",
    casesEyebrow: "Selected engagements",
    casesTitle: "Evidence before superlatives.",
    casesIntro:
      "We show relationships and results only when they have a traceable public or internal basis. Labs-specific AI results will be published after verified pilots.",
    aboutEyebrow: "About Labs",
    aboutTitle: "Operators first. Agency second.",
    aboutIntro:
      "All-in-One Labs is operated by ScaleCommerce Group AB and builds on practical experience across ecommerce, web, marketing, and automation.",
    contactEyebrow: "Contact",
    contactTitle: "Which gap is costing the most right now?",
    contactIntro:
      "Tell us briefly about the business. We will respond with the right person, a few sharp questions, and a clear next step.",
    privacyEyebrow: "Privacy",
    privacyTitle: "Clear about data, tools, and responsibility.",
  },
} satisfies Localized<Record<string, string>>;

export const team = [
  {
    name: "Hugo Idrén",
    role: { sv: "VD", en: "CEO" },
    focus: {
      sv: "Kommersiell riktning och partnerskap",
      en: "Commercial direction and partnerships",
    },
  },
  {
    name: "Elliot Lyrberg",
    role: { sv: "Medgrundare", en: "Co-founder" },
    focus: {
      sv: "Tillväxtsystem, webb och kunddialog",
      en: "Growth systems, web, and customer dialogue",
    },
  },
  {
    name: "Vincent Wånehed",
    role: { sv: "Account Manager", en: "Account Manager" },
    focus: {
      sv: "Kundbehov och genomförande",
      en: "Customer needs and delivery",
    },
  },
  {
    name: "Algot Salmi",
    role: { sv: "Account Manager", en: "Account Manager" },
    focus: {
      sv: "Projektflöde och kundrelation",
      en: "Project flow and client relationships",
    },
  },
] as const;
