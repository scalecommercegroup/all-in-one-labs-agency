import { ContactForm } from "@/components/ContactForm";
import { DemoPanels } from "@/components/DemoPanels";
import { JsonLd } from "@/components/JsonLd";
import { OrbitGlobe } from "@/components/OrbitGlobe";
import { PageShell } from "@/components/SiteShell";
import Image from "next/image";
import { getEvidence } from "@/content/evidence";
import { getRoute } from "@/content/routes";
import {
  commonCopy,
  homeCopy,
  services,
  siteConfig,
  team,
  type Locale,
  type ServiceDefinition,
} from "@/content/site";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>{children}</p>;
}

function BookingLink({
  locale,
  className = "button button--dark",
  tracking = "booking-cta",
}: {
  locale: Locale;
  className?: string;
  tracking?: string;
}) {
  return (
    <a
      className={className}
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noreferrer"
      data-track={tracking}
    >
      {locale === "sv"
        ? "Boka en kostnadsfri analys"
        : "Book a free assessment"}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function ServiceLedger({
  locale,
  headingLevel = 3,
}: {
  locale: Locale;
  headingLevel?: 2 | 3;
}) {
  return (
    <div className="service-ledger">
      {services.map((service) => {
        const copy = service.copy[locale];
        return (
          <a
            className="service-ledger__row"
            href={getRoute(`service:${service.key}`, locale)}
            key={service.key}
          >
            <span className="service-ledger__index">{service.index}</span>
            <div>
              {headingLevel === 2 ? (
                <h2>{copy.navLabel}</h2>
              ) : (
                <h3>{copy.navLabel}</h3>
              )}
              <p>{copy.promise}</p>
            </div>
            <span className="service-ledger__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        );
      })}
    </div>
  );
}

function EvidenceList({
  locale,
  headingLevel = 3,
  variant = "compact",
}: {
  locale: Locale;
  headingLevel?: 2 | 3;
  variant?: "compact" | "editorial";
}) {
  const evidence = getEvidence(locale);
  return (
    <div className={`evidence-list evidence-list--${variant}`}>
      {evidence.map((record, index) => (
        <article className="evidence-row" key={record.id}>
          <div className="evidence-row__media">
            <Image
              src={record.image}
              alt={record.imageAlt}
              width={1200}
              height={900}
              sizes={
                variant === "editorial"
                  ? "(min-width: 64rem) 46vw, 100vw"
                  : "(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 100vw"
              }
            />
            <span aria-hidden="true">0{index + 1}</span>
          </div>
          <div className="evidence-row__body">
            <header>
              <span className="evidence-row__index">
                {locale === "sv" ? "Dokumenterat uppdrag" : "Documented engagement"}
              </span>
              {headingLevel === 2 ? (
                <h2>{record.brand}</h2>
              ) : (
                <h3>{record.brand}</h3>
              )}
            </header>
            <p className="evidence-row__summary">{record.summary}</p>
            <ul aria-label={locale === "sv" ? "Områden" : "Areas"}>
              {record.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <div className="evidence-row__source">
              <a href={record.source} target="_blank" rel="noreferrer">
                {locale === "sv" ? "Offentlig källa" : "Public source"} ↗
              </a>
              <span>
                {locale === "sv" ? "Granskad" : "Reviewed"} {record.reviewedAt}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ClosingCta({
  locale,
  title,
  body,
}: {
  locale: Locale;
  title: string;
  body: string;
}) {
  return (
    <section className="closing-cta">
      <div>
        <Eyebrow light>{locale === "sv" ? "Nästa steg" : "Next step"}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{body}</p>
        <BookingLink
          locale={locale}
          className="button button--light"
          tracking="booking-closing"
        />
      </div>
    </section>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const common = commonCopy[locale];
  const isSv = locale === "sv";
  const process = isSv
    ? [
        ["01", "Avgränsa", "Målgrupp, affärsglapp, bevis och risker."],
        ["02", "Prototypa", "En kärnupplevelse testas innan vi skalar."],
        ["03", "Integrera", "Webb, data och mänskliga arbetsflöden kopplas ihop."],
        ["04", "Driftsätt", "Lansering i kontrollerade steg med mätning."],
      ]
    : [
        ["01", "Bound", "Audience, commercial gap, evidence, and risk."],
        ["02", "Prototype", "One core experience is tested before scaling."],
        ["03", "Integrate", "Web, data, and human workflows connect."],
        ["04", "Operate", "Controlled launch with measurement."],
      ];

  return (
    <PageShell locale={locale}>
      <JsonLd data={organizationSchema(locale)} />
      <section className="hero">
        <div className="hero__copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title}</h1>
          <p className="hero__intro">{copy.intro}</p>
          <div className="hero__actions">
            <BookingLink locale={locale} tracking="booking-hero" />
            <a className="text-link" href={getRoute("services", locale)}>
              {copy.secondaryCta} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <OrbitGlobe locale={locale} />
      </section>

      <section className="section section--services">
        <div className="section-heading">
          <Eyebrow>{common.servicesEyebrow}</Eyebrow>
          <h2>{copy.serviceTitle}</h2>
          <p>{copy.serviceIntro}</p>
        </div>
        <ServiceLedger locale={locale} />
      </section>

      <section className="systems-section">
        <div className="systems-section__intro">
          <Eyebrow light>{isSv ? "System före hype" : "Systems before hype"}</Eyebrow>
          <h2>{copy.problemTitle}</h2>
          <p>{copy.problemBody}</p>
        </div>
        <DemoPanels locale={locale} />
        <p className="demo-disclaimer">
          {isSv
            ? "Illustrerade exempelflöden. Inte kundresultat eller aktiva produktionstjänster."
            : "Illustrated example flows. Not client results or active production services."}
        </p>
      </section>

      <section className="section section--evidence">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow>{copy.proofEyebrow}</Eyebrow>
            <h2>{copy.proofTitle}</h2>
          </div>
          <p>{copy.proofBody}</p>
        </div>
        <EvidenceList locale={locale} variant="compact" />
        <a className="text-link text-link--wide" href={getRoute("cases", locale)}>
          {isSv ? "Se hur vi hanterar bevis" : "See how we handle evidence"}
          <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="section section--process">
        <div className="section-heading">
          <Eyebrow>{isSv ? "Arbetssätt" : "Operating model"}</Eyebrow>
          <h2>{copy.processTitle}</h2>
        </div>
        <ol className="process-list">
          {process.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <ClosingCta
        locale={locale}
        title={copy.closingTitle}
        body={copy.closingBody}
      />
    </PageShell>
  );
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const copy = commonCopy[locale];
  const isSv = locale === "sv";

  return (
    <PageShell locale={locale}>
      <JsonLd data={breadcrumbSchema(locale)} />
      <section className="page-hero page-hero--services">
        <Eyebrow>{copy.servicesEyebrow}</Eyebrow>
        <h1>{copy.servicesTitle}</h1>
        <p>{copy.servicesIntro}</p>
      </section>
      <section className="section section--service-directory">
        <ServiceLedger locale={locale} headingLevel={2} />
      </section>
      <section className="principle-band">
        <p>{isSv ? "Vår princip" : "Our principle"}</p>
        <h2>
          {isSv
            ? "Automatisera det repetitiva. Behåll människor där omdöme spelar roll."
            : "Automate the repetitive. Keep people where judgement matters."}
        </h2>
      </section>
      <ClosingCta
        locale={locale}
        title={
          isSv
            ? "Osäker på var du ska börja?"
            : "Not sure where to begin?"
        }
        body={
          isSv
            ? "Vi prioriterar efter affärseffekt, genomförbarhet och risk – inte efter vilken tjänst som är enklast att sälja."
            : "We prioritise by business impact, feasibility, and risk—not by which service is easiest to sell."
        }
      />
    </PageShell>
  );
}

export function ServicePage({
  locale,
  service,
}: {
  locale: Locale;
  service: ServiceDefinition;
}) {
  const copy = service.copy[locale];
  const isSv = locale === "sv";

  return (
    <PageShell locale={locale}>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={serviceSchema(service.key, locale)} />
      <JsonLd data={breadcrumbSchema(locale, service.key)} />
      <JsonLd data={faqSchema(copy.faqs)} />

      <section className="service-hero">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title}</h1>
        </div>
        <div className="service-hero__aside">
          <p>{copy.intro}</p>
          <BookingLink locale={locale} tracking={`booking-${service.key}`} />
        </div>
        <span className="service-hero__number" aria-hidden="true">
          {service.index}
        </span>
      </section>

      <section className="promise-band">
        <p>{isSv ? "Vårt löfte" : "Our promise"}</p>
        <h2>{copy.promise}</h2>
      </section>

      <section className="detail-grid section">
        <div className="detail-grid__heading">
          <Eyebrow>{isSv ? "Rätt när" : "Best suited when"}</Eyebrow>
          <h2>{isSv ? "Det här känner ni igen." : "This feels familiar."}</h2>
        </div>
        <ul className="check-list">
          {copy.idealFor.map((item) => (
            <li key={item}>
              <span aria-hidden="true">↳</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="deliverables-section">
        <div className="section-heading">
          <Eyebrow light>{isSv ? "Leverans" : "Delivery"}</Eyebrow>
          <h2>{isSv ? "Det som faktiskt ingår." : "What is actually included."}</h2>
        </div>
        <ol className="deliverable-list">
          {copy.deliverables.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="section-heading">
          <Eyebrow>{isSv ? "Genomförande" : "Delivery model"}</Eyebrow>
          <h2>{isSv ? "Kontrollerat från start." : "Controlled from the start."}</h2>
        </div>
        <ol className="process-list process-list--compact">
          {copy.process.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="boundaries-section">
        <div>
          <Eyebrow light>{isSv ? "Tydliga gränser" : "Clear boundaries"}</Eyebrow>
          <h2>{isSv ? "Det här säljer vi inte." : "What we do not sell."}</h2>
        </div>
        <ul>
          {copy.boundaries.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </section>

      <section className="section measurement-section">
        <div>
          <Eyebrow>{isSv ? "Tidslinje" : "Timeline"}</Eyebrow>
          <p className="measurement-section__lead">{copy.timeline}</p>
        </div>
        <div>
          <Eyebrow>{isSv ? "Vi följer" : "We measure"}</Eyebrow>
          <ul>
            {copy.measures.map((measure) => (
              <li key={measure}>{measure}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <Eyebrow>{isSv ? "Raka svar" : "Straight answers"}</Eyebrow>
          <h2>{isSv ? "Vanliga frågor." : "Common questions."}</h2>
        </div>
        <div className="faq-list">
          {copy.faqs.map((faq, index) => (
            <details key={faq.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {faq.question}
                <i aria-hidden="true">+</i>
              </summary>
              <div>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta
        locale={locale}
        title={
          isSv
            ? "Låt oss se om det här är rätt första steg."
            : "Let’s see whether this is the right first step."
        }
        body={
          isSv
            ? "Vi går igenom nuläge, mål och begränsningar. Om en annan insats bör komma först säger vi det."
            : "We review the current state, goals, and constraints. If something else should come first, we will say so."
        }
      />
    </PageShell>
  );
}

export function CasesPage({ locale }: { locale: Locale }) {
  const copy = commonCopy[locale];
  const isSv = locale === "sv";

  return (
    <PageShell locale={locale}>
      <section className="case-hero">
        <div className="case-hero__title">
          <Eyebrow>{copy.casesEyebrow}</Eyebrow>
          <h1>{copy.casesTitle}</h1>
        </div>
        <div className="case-hero__aside">
          <p>{copy.casesIntro}</p>
          <dl>
            <div>
              <dt>{isSv ? "Offentliga referenser" : "Public references"}</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>{isSv ? "Vår standard" : "Our standard"}</dt>
              <dd>{isSv ? "Källa · scope · datum" : "Source · scope · date"}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="section section--case-page">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow>{isSv ? "Arbetet bakom namnen" : "The work behind the names"}</Eyebrow>
            <h2>{isSv ? "Relationer vi kan visa." : "Relationships we can show."}</h2>
          </div>
          <p>
            {isSv
              ? "Bilderna och relationerna är offentliga. Vi publicerar inte prestationssiffror utan en tydlig definition, period och godkänd källa."
              : "The imagery and relationships are public. We do not publish performance figures without a clear definition, period, and approved source."}
          </p>
        </div>
        <EvidenceList locale={locale} headingLevel={2} variant="editorial" />
      </section>
      <section className="evidence-policy">
        <div>
          <Eyebrow light>{isSv ? "Bevispolicy" : "Evidence policy"}</Eyebrow>
          <h2>
            {isSv
              ? "Ett resultat är inte en rubrik förrän det går att förklara."
              : "A result is not a headline until it can be explained."}
          </h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            {isSv ? "Tydlig baseline" : "Clear baseline"}
          </li>
          <li>
            <span>02</span>
            {isSv ? "Definierad period" : "Defined period"}
          </li>
          <li>
            <span>03</span>
            {isSv ? "Spårbar källa" : "Traceable source"}
          </li>
          <li>
            <span>04</span>
            {isSv ? "Godkänd placering" : "Approved placement"}
          </li>
        </ol>
      </section>
      <ClosingCta
        locale={locale}
        title={
          isSv
            ? "Nästa verifierade case kan vara ert."
            : "The next verified case could be yours."
        }
        body={
          isSv
            ? "Vi sätter mätningen före genomförandet så att effekten går att skilja från berättelsen."
            : "We define measurement before delivery so the effect can be separated from the story."
        }
      />
    </PageShell>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = commonCopy[locale];
  const isSv = locale === "sv";

  return (
    <PageShell locale={locale}>
      <JsonLd data={organizationSchema(locale)} />
      <section className="about-hero">
        <div className="about-hero__title">
          <Eyebrow>{copy.aboutEyebrow}</Eyebrow>
          <h1>{copy.aboutTitle}</h1>
        </div>
        <div className="about-hero__aside">
          <span aria-hidden="true">04</span>
          <p>{copy.aboutIntro}</p>
          <p>
            {isSv
              ? "Ett kärnteam nära beslut, genomförande och kund."
              : "A core team close to decisions, delivery, and the client."}
          </p>
        </div>
      </section>
      <section className="about-manifesto">
        <p>{isSv ? "Vår utgångspunkt" : "Our starting point"}</p>
        <h2>
          {isSv
            ? "Vi bygger som om resultatet ska synas i vår egen resultaträkning."
            : "We build as if the outcome will show up in our own P&L."}
        </h2>
        <div>
          <p>
            {isSv
              ? "Det betyder mindre teater, färre onödiga verktyg och tydligare ansvar för vad som händer efter lansering."
              : "That means less theatre, fewer unnecessary tools, and clearer responsibility for what happens after launch."}
          </p>
          <p>
            {isSv
              ? "AI används där den minskar friktion. Människor behåller beslut som kräver omdöme, relation eller ansvar."
              : "AI is used where it removes friction. People retain decisions requiring judgement, relationships, or accountability."}
          </p>
        </div>
      </section>
      <section className="section team-section">
        <div className="section-heading">
          <Eyebrow>{isSv ? "Team" : "Team"}</Eyebrow>
          <h2>{isSv ? "Nära dem som gör jobbet." : "Close to the work."}</h2>
        </div>
        <div className="team-list">
          {team.map((person, index) => (
            <article key={person.name}>
              <div className="team-list__portrait">
                <Image
                  src={person.image}
                  alt={person.imageAlt[locale]}
                  width={900}
                  height={1125}
                  sizes="(min-width: 64rem) 23vw, (min-width: 40rem) 46vw, 42vw"
                />
                <span aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="team-list__copy">
                <h3>{person.name}</h3>
                <p>{person.role[locale]}</p>
                <p>{person.focus[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="principles-grid">
        {(isSv
          ? [
              ["Sanning före säljspråk", "Påståenden ska tåla en följdfråga."],
              ["System före punktinsats", "Vi ser beroenden innan vi optimerar en del."],
              ["Pilot före skala", "AI-flöden går live i kontrollerade steg."],
              ["Överlämning före beroende", "Kunden ska förstå och kunna äga lösningen."],
            ]
          : [
              ["Truth before sales language", "Claims must survive a follow-up question."],
              ["Systems before point solutions", "We see dependencies before optimising one part."],
              ["Pilot before scale", "AI flows launch in controlled stages."],
              ["Handover before dependency", "The customer should understand and own the solution."],
            ]
        ).map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <ClosingCta
        locale={locale}
        title={
          isSv
            ? "Ett litet team. Ett tydligt ansvar."
            : "A small team. Clear accountability."
        }
        body={
          isSv
            ? "Börja med att visa oss var flödet bryts idag."
            : "Start by showing us where the flow breaks today."
        }
      />
    </PageShell>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const copy = commonCopy[locale];
  const isSv = locale === "sv";

  return (
    <PageShell locale={locale}>
      <section className="contact-hero">
        <div>
          <Eyebrow>{copy.contactEyebrow}</Eyebrow>
          <h1>{copy.contactTitle}</h1>
          <p>{copy.contactIntro}</p>
        </div>
        <div className="contact-hero__direct">
          <p>{isSv ? "Direktkontakt" : "Direct contact"}</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
          <BookingLink
            locale={locale}
            className="text-link"
            tracking="booking-contact"
          />
        </div>
      </section>
      <section className="contact-form-section">
        <div className="contact-form-section__intro">
          <span>01</span>
          <h2>{isSv ? "Ge oss rätt kontext." : "Give us the right context."}</h2>
          <p>
            {isSv
              ? "Ju tydligare nuläge och begränsningar, desto mer konkret blir vårt första svar."
              : "The clearer the current state and constraints, the more concrete our first response will be."}
          </p>
          <p className="contact-form-section__qualification">
            {isSv
              ? "Före start får ni skriftlig omfattning, beroenden, ansvar, supportupplägg och pris."
              : "Before work starts, you receive written scope, dependencies, ownership, support model, and price."}
          </p>
        </div>
        {siteConfig.contactFormEnabled ? (
          <ContactForm locale={locale} />
        ) : (
          <div className="contact-fallback">
            <p>{isSv ? "Tillfällig kontaktväg" : "Temporary enquiry route"}</p>
            <h2>
              {isSv
                ? "Formuläret öppnar när den säkra e-postkanalen är verifierad."
                : "The form will open when the secure email channel is verified."}
            </h2>
            <p>
              {isSv
                ? "Tills dess kan du boka analysen eller mejla direkt. Ingen information försvinner i ett oanslutet formulär."
                : "Until then, book the assessment or email us directly. No information is sent into an unconnected form."}
            </p>
            <div className="contact-fallback__actions">
              <BookingLink
                locale={locale}
                className="button button--light"
                tracking="booking-contact-fallback"
              />
              <a className="text-link text-link--light" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = commonCopy[locale];
  const isSv = locale === "sv";
  const sections = isSv
    ? [
        ["Personuppgiftsansvarig", `${siteConfig.legalName}, org.nr ${siteConfig.organizationNumber}, är personuppgiftsansvarig för uppgifter som samlas in via denna webbplats.`],
        ["Kontaktförfrågningar", "När du kontaktar oss behandlar vi namn, kontaktuppgifter, företagsinformation och meddelande för att besvara förfrågan och bedöma ett möjligt affärsförhållande. Uppgifterna skickas via vår e-postleverantör och lagras inte i en separat webbdatabas."],
        ["Rättslig grund", "Behandlingen sker för att vidta åtgärder på din begäran före ett eventuellt avtal och, där det är relevant, utifrån vårt berättigade intresse att hantera affärsförfrågningar. Vi använder inte formuläret för marknadsföring utan ett separat stöd."],
        ["Leverantörer", "Webbplatsen kan använda Vercel för hosting, Resend för e-postleverans, Cloudflare Turnstile för spamskydd och Plausible för integritetsvänlig webbstatistik. Calendly öppnas som en extern tjänst när du väljer att boka."],
        ["Lagring", "Kontaktuppgifter sparas bara så länge de behövs för dialogen, rättsliga skyldigheter eller ett dokumenterat affärsförhållande. Tekniska säkerhetsloggar kan ha kortare separata lagringsperioder."],
        ["Dina rättigheter", "Du kan begära tillgång, rättelse, radering eller begränsning och invända mot viss behandling. Kontakta oss på e-postadressen nedan. Du kan också lämna klagomål till Integritetsskyddsmyndigheten."],
        ["AI-tjänster", "Denna publika webbplats använder inte dina formulärsvar för att träna en AI-modell. Kundspecifika AI-lösningar omfattas av separat dokumentation, rollfördelning, leverantörsbedömning och avtal."],
      ]
    : [
        ["Controller", `${siteConfig.legalName}, company number ${siteConfig.organizationNumber}, is the controller for personal information collected through this website.`],
        ["Enquiries", "When you contact us, we process your name, contact details, company information, and message to respond and assess a possible business relationship. The information is delivered through our email provider and is not stored in a separate website database."],
        ["Legal basis", "Processing is used to take steps at your request before a potential agreement and, where relevant, under our legitimate interest in handling business enquiries. The form is not used for marketing without separate support."],
        ["Suppliers", "The website may use Vercel for hosting, Resend for email delivery, Cloudflare Turnstile for spam protection, and Plausible for privacy-conscious analytics. Calendly opens as an external service when you choose to book."],
        ["Retention", "Contact details are retained only as long as needed for the dialogue, legal obligations, or a documented business relationship. Technical security logs may use separate shorter retention periods."],
        ["Your rights", "You may request access, correction, deletion, or restriction and object to certain processing. Contact us using the email below. You may also lodge a complaint with the Swedish Authority for Privacy Protection."],
        ["AI services", "This public website does not use form submissions to train an AI model. Customer-specific AI solutions are governed by separate documentation, role allocation, supplier assessment, and agreements."],
      ];

  return (
    <PageShell locale={locale}>
      <section className="page-hero page-hero--legal">
        <Eyebrow>{copy.privacyEyebrow}</Eyebrow>
        <h1>{copy.privacyTitle}</h1>
        <p>
          {isSv
            ? "Senast granskad 28 juli 2026. Policyn beskriver den publika webbplatsen – inte alla framtida kundlösningar."
            : "Last reviewed 28 July 2026. This policy covers the public website—not every future customer solution."}
        </p>
      </section>
      <section className="legal-content">
        {sections.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
        <article>
          <span>{String(sections.length + 1).padStart(2, "0")}</span>
          <div>
            <h2>{isSv ? "Kontakt" : "Contact"}</h2>
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              {siteConfig.legalName}
              <br />
              {isSv ? siteConfig.addressSv : siteConfig.address}
            </p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
