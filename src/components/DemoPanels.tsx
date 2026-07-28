import type { Locale } from "@/content/site";

export function DemoPanels({ locale }: { locale: Locale }) {
  const isSv = locale === "sv";

  return (
    <div className="demo-grid">
      <article className="chat-demo">
        <div className="demo-heading">
          <span className="status-dot" />
          <span>{isSv ? "Exempelflöde · Webbchatt" : "Example flow · Web chat"}</span>
          <span>14:32</span>
        </div>
        <div className="chat-demo__messages">
          <p className="chat-demo__customer">
            {isSv
              ? "Kan ni hjälpa oss med en ny webbplats?"
              : "Can you help us with a new website?"}
          </p>
          <div className="chat-demo__agent">
            <span>Labs AI</span>
            <p>
              {isSv
                ? "Ja. För att sätta rätt person på det: vad behöver webbplatsen göra bättre än idag?"
                : "Yes. To involve the right person: what does the website need to do better than it does today?"}
            </p>
          </div>
          <p className="chat-demo__customer">
            {isSv
              ? "Fler kvalificerade offertförfrågningar."
              : "Generate more qualified quote requests."}
          </p>
          <div className="chat-demo__handoff">
            <span aria-hidden="true">↳</span>
            {isSv
              ? "Kvalificerad · redo för bokning"
              : "Qualified · ready for booking"}
          </div>
        </div>
      </article>

      <article className="voice-demo">
        <div className="demo-heading">
          <span className="status-dot" />
          <span>{isSv ? "Exempelflöde · Inkommande samtal" : "Example flow · Incoming call"}</span>
          <span>01:18</span>
        </div>
        <div className="voice-demo__identity">
          <span>AI</span>
          <p>
            {isSv
              ? "Hej, du talar med företagets AI-receptionist. Hur kan jag hjälpa dig?"
              : "Hello, you are speaking with the company’s AI receptionist. How can I help?"}
          </p>
        </div>
        <div className="waveform" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <i
              key={index}
              style={
                {
                  "--wave-index": index,
                  "--wave-height": `${18 + ((index * 17) % 62)}%`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <ol className="voice-demo__steps">
          <li className="is-complete">
            <span>01</span>{isSv ? "AI identifierad" : "AI identified"}
          </li>
          <li className="is-complete">
            <span>02</span>{isSv ? "Ärende förstått" : "Intent understood"}
          </li>
          <li>
            <span>03</span>{isSv ? "Människa tillgänglig" : "Human available"}
          </li>
        </ol>
      </article>
    </div>
  );
}
