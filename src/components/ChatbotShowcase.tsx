"use client";

import { useId, useRef, useState } from "react";

import type { Locale } from "@/content/site";

type Scenario = {
  id: string;
  index: string;
  tab: string;
  title: string;
  description: string;
  messages: Array<{
    speaker: "visitor" | "ai";
    label: string;
    text: string;
  }>;
  outcome: {
    title: string;
    detail: string;
  };
  systemTrail: Array<{
    title: string;
    detail: string;
  }>;
  connects: string[];
};

const scenarios: Record<Locale, Scenario[]> = {
  sv: [
    {
      id: "sales",
      index: "01",
      tab: "Försäljning",
      title: "Kvalificerar behovet innan sälj tar över.",
      description:
        "Från en vag fråga till ett användbart lead med behov, storlek och tidslinje.",
      messages: [
        {
          speaker: "visitor",
          label: "Besökare",
          text: "Vi behöver mer trafik och fler offertförfrågningar. Kan ni hjälpa oss?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Ja. Är det SEO, webbplatsen eller båda som känns mest akut?",
        },
        {
          speaker: "visitor",
          label: "Besökare",
          text: "Båda. Vi är 14 personer och vill komma igång i september.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Bra — jag har sammanfattat behov, teamstorlek och tidslinje. Vill du boka ett första analysmöte?",
        },
      ],
      outcome: {
        title: "Kvalificerat lead",
        detail: "Behov och tidslinje skickas till sälj före mötet.",
      },
      systemTrail: [
        { title: "Avsikt", detail: "SEO + ny webbplats" },
        { title: "Kontext", detail: "14 personer · start i september" },
        { title: "Nästa steg", detail: "Boka möte och uppdatera CRM" },
      ],
      connects: ["CRM", "Kalender", "E-post"],
    },
    {
      id: "support",
      index: "02",
      tab: "Kundsupport",
      title: "Löser det enkla och eskalerar resten med kontext.",
      description:
        "Kunden slipper börja om när ett ärende behöver lämnas över till en människa.",
      messages: [
        {
          speaker: "visitor",
          label: "Kund",
          text: "Var är min beställning #10428?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Den lämnade lagret i går och beräknas komma på onsdag. Vill du ha spårningslänken?",
        },
        {
          speaker: "visitor",
          label: "Kund",
          text: "Ja tack. Jag behöver också ändra leveransadressen.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Länken är skickad. Adressändringen kräver godkännande, så jag har skapat ett prioriterat ärende med orderuppgifterna bifogade.",
        },
      ],
      outcome: {
        title: "Svar direkt · ärende skapat",
        detail: "Supporten får ordernummer, fråga och historik samlat.",
      },
      systemTrail: [
        { title: "Avsikt", detail: "Orderstatus + adressändring" },
        { title: "Kontext", detail: "Order #10428 hämtad" },
        { title: "Nästa steg", detail: "Svar nu, människa vid undantag" },
      ],
      connects: ["E-handel", "Helpdesk", "Orderdata"],
    },
    {
      id: "booking",
      index: "03",
      tab: "Bokning",
      title: "Hittar rätt tid utan mejltrådar fram och tillbaka.",
      description:
        "Chatten kan boka, flytta eller avboka när regler och kalender tillåter det.",
      messages: [
        {
          speaker: "visitor",
          label: "Besökare",
          text: "Kan jag flytta min demonstration från fredag eftermiddag?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Absolut. Jag ser lediga tider måndag 10:30 och tisdag 14:00. Vad passar bäst?",
        },
        {
          speaker: "visitor",
          label: "Besökare",
          text: "Måndag 10:30 blir bra.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Klart. Bokningen är flyttad och en ny kalenderinbjudan har skickats.",
        },
      ],
      outcome: {
        title: "Bokning uppdaterad",
        detail: "Bekräftelse och kalenderinbjudan skickas automatiskt.",
      },
      systemTrail: [
        { title: "Avsikt", detail: "Boka om befintlig tid" },
        { title: "Kontext", detail: "Lediga tider och bokningsregler" },
        { title: "Nästa steg", detail: "Uppdatera och bekräfta" },
      ],
      connects: ["Kalender", "CRM", "Påminnelser"],
    },
    {
      id: "guidance",
      index: "04",
      tab: "Produktguide",
      title: "Hjälper kunden välja utan att pressa fram ett köp.",
      description:
        "Rekommendationer grundas i kundens behov, produktdata och företagets egna regler.",
      messages: [
        {
          speaker: "visitor",
          label: "Kund",
          text: "Jag söker en enkel hudvårdsrutin för känslig och torr hud.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Då skulle jag börja med få, milda produkter. Vill du undvika parfym eller några särskilda ingredienser?",
        },
        {
          speaker: "visitor",
          label: "Kund",
          text: "Ja, helst parfymfritt och max tre steg.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Här är en parfymfri trestegsrutin med rengöring, serum och barriärkräm — plus varför varje produkt passar.",
        },
      ],
      outcome: {
        title: "Relevant rekommendation",
        detail: "Kunden får ett motiverat urval istället för en katalog.",
      },
      systemTrail: [
        { title: "Avsikt", detail: "Rutin för känslig, torr hud" },
        { title: "Kontext", detail: "Parfymfritt · högst tre steg" },
        { title: "Nästa steg", detail: "Visa relevanta produkter" },
      ],
      connects: ["Produktdata", "Lager", "Varukorg"],
    },
  ],
  en: [
    {
      id: "sales",
      index: "01",
      tab: "Sales",
      title: "Qualifies the need before sales takes over.",
      description:
        "Turns a vague question into a useful lead with need, size, and timeline.",
      messages: [
        {
          speaker: "visitor",
          label: "Visitor",
          text: "We need more traffic and more quote requests. Can you help?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Yes. Is SEO, the website, or both the most urgent issue?",
        },
        {
          speaker: "visitor",
          label: "Visitor",
          text: "Both. We are a team of 14 and want to get started in September.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Great — I have summarised the need, team size, and timeline. Would you like to book an initial assessment?",
        },
      ],
      outcome: {
        title: "Qualified lead",
        detail: "Need and timeline reach sales before the meeting.",
      },
      systemTrail: [
        { title: "Intent", detail: "SEO + new website" },
        { title: "Context", detail: "14 people · September start" },
        { title: "Next step", detail: "Book meeting and update CRM" },
      ],
      connects: ["CRM", "Calendar", "Email"],
    },
    {
      id: "support",
      index: "02",
      tab: "Support",
      title: "Resolves the routine and escalates with context.",
      description:
        "The customer does not have to start again when a person needs to take over.",
      messages: [
        {
          speaker: "visitor",
          label: "Customer",
          text: "Where is my order #10428?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "It left the warehouse yesterday and should arrive Wednesday. Would you like the tracking link?",
        },
        {
          speaker: "visitor",
          label: "Customer",
          text: "Yes, please. I also need to change the delivery address.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "The link is sent. Address changes need approval, so I created a priority case with the order details attached.",
        },
      ],
      outcome: {
        title: "Answered · case created",
        detail: "Support receives the order, question, and history together.",
      },
      systemTrail: [
        { title: "Intent", detail: "Order status + address change" },
        { title: "Context", detail: "Order #10428 retrieved" },
        { title: "Next step", detail: "Answer now, human on exception" },
      ],
      connects: ["Commerce", "Helpdesk", "Order data"],
    },
    {
      id: "booking",
      index: "03",
      tab: "Booking",
      title: "Finds the right time without an email chain.",
      description:
        "The chat can book, move, or cancel when calendar rules allow it.",
      messages: [
        {
          speaker: "visitor",
          label: "Visitor",
          text: "Can I move my demo from Friday afternoon?",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Of course. I can offer Monday at 10:30 or Tuesday at 14:00. Which works best?",
        },
        {
          speaker: "visitor",
          label: "Visitor",
          text: "Monday at 10:30 works.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Done. The booking has been moved and a new calendar invitation is on its way.",
        },
      ],
      outcome: {
        title: "Booking updated",
        detail: "Confirmation and calendar invitation sent automatically.",
      },
      systemTrail: [
        { title: "Intent", detail: "Reschedule an existing slot" },
        { title: "Context", detail: "Availability and booking rules" },
        { title: "Next step", detail: "Update and confirm" },
      ],
      connects: ["Calendar", "CRM", "Reminders"],
    },
    {
      id: "guidance",
      index: "04",
      tab: "Product guide",
      title: "Helps customers choose without forcing a sale.",
      description:
        "Recommendations use the customer’s needs, product data, and company rules.",
      messages: [
        {
          speaker: "visitor",
          label: "Customer",
          text: "I want a simple skincare routine for sensitive, dry skin.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Then I would start with a few gentle products. Do you avoid fragrance or any specific ingredients?",
        },
        {
          speaker: "visitor",
          label: "Customer",
          text: "Yes, fragrance-free and no more than three steps.",
        },
        {
          speaker: "ai",
          label: "Labs AI",
          text: "Here is a fragrance-free three-step routine, with an explanation of why each product fits.",
        },
      ],
      outcome: {
        title: "Relevant recommendation",
        detail: "A reasoned shortlist replaces an overwhelming catalogue.",
      },
      systemTrail: [
        { title: "Intent", detail: "Routine for sensitive, dry skin" },
        { title: "Context", detail: "Fragrance-free · three steps" },
        { title: "Next step", detail: "Show relevant products" },
      ],
      connects: ["Product data", "Inventory", "Cart"],
    },
  ],
};

export function ChatbotShowcase({ locale }: { locale: Locale }) {
  const examples = scenarios[locale];
  const [activeId, setActiveId] = useState(examples[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const componentId = useId().replaceAll(":", "");
  const activeIndex = examples.findIndex((scenario) => scenario.id === activeId);
  const activeScenario = examples[activeIndex] ?? examples[0];
  const isSv = locale === "sv";

  const selectByIndex = (index: number) => {
    const normalizedIndex = (index + examples.length) % examples.length;
    setActiveId(examples[normalizedIndex].id);
    tabRefs.current[normalizedIndex]?.focus();
  };

  return (
    <div className="chatbot-showcase">
      <div className="chatbot-showcase__topbar">
        <span className="status-dot" aria-hidden="true" />
        <span>{isSv ? "AI-chattbot · Exempelflöden" : "AI chatbot · Example flows"}</span>
        <span>{isSv ? "4 användningsområden" : "4 use cases"}</span>
      </div>

      <div className="chatbot-showcase__layout">
        <div
          aria-label={isSv ? "Välj användningsområde" : "Choose a use case"}
          className="chatbot-showcase__scenarios"
          role="tablist"
        >
          <p>{isSv ? "Användningsområde" : "Use case"}</p>
          <div>
            {examples.map((scenario, index) => {
              const isActive = scenario.id === activeScenario.id;
              return (
                <button
                  aria-controls={`${componentId}-panel`}
                  aria-selected={isActive}
                  className="chatbot-showcase__scenario"
                  id={`${componentId}-tab-${scenario.id}`}
                  key={scenario.id}
                  onClick={() => setActiveId(scenario.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      selectByIndex(index + 1);
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      selectByIndex(index - 1);
                    }
                    if (event.key === "Home") {
                      event.preventDefault();
                      selectByIndex(0);
                    }
                    if (event.key === "End") {
                      event.preventDefault();
                      selectByIndex(examples.length - 1);
                    }
                  }}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span>{scenario.index}</span>
                  {scenario.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div
          aria-labelledby={`${componentId}-tab-${activeScenario.id}`}
          className="chatbot-showcase__conversation"
          id={`${componentId}-panel`}
          key={activeScenario.id}
          role="tabpanel"
        >
          <header>
            <p>{isSv ? "Aktivt exempelflöde" : "Active example flow"}</p>
            <h3>{activeScenario.title}</h3>
            <span>{activeScenario.description}</span>
          </header>

          <ol className="chatbot-showcase__messages">
            {activeScenario.messages.map((message, index) => (
              <li
                className={`chatbot-message chatbot-message--${message.speaker}`}
                key={`${message.speaker}-${index}`}
              >
                {message.speaker === "ai" && (
                  <span className="chatbot-message__avatar" aria-hidden="true">
                    AI
                  </span>
                )}
                <div>
                  <span>{message.label}</span>
                  <p>{message.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="chatbot-showcase__outcome">
            <span aria-hidden="true">↳</span>
            <div>
              <p>{activeScenario.outcome.title}</p>
              <span>{activeScenario.outcome.detail}</span>
            </div>
          </div>
        </div>

        <aside className="chatbot-showcase__system">
          <p>{isSv ? "Bakom chatten" : "Behind the chat"}</p>
          <ol>
            {activeScenario.systemTrail.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <p>{step.title}</p>
                  <span>{step.detail}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="chatbot-showcase__connects">
            <p>{isSv ? "Kan kopplas till" : "Can connect to"}</p>
            <ul>
              {activeScenario.connects.map((connection) => (
                <li key={connection}>{connection}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
