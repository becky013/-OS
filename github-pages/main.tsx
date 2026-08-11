import { createRoot } from "react-dom/client";
import PetLifeApp from "../app/petlife-src/app/App";
import "./pages.css";

function PetLifePrototype() {
  return (
    <main className="prototype-stage">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="device-presentation" aria-label="Pet Life app prototype">
        <p className="eyebrow">PET LIFE · INTERACTIVE PROTOTYPE</p>

        <div className="iphone-wrap">
          <div className="iphone" aria-label="iPhone showing the Pet Life app">
            <span className="side-button action-button" aria-hidden="true" />
            <span className="side-button volume-up" aria-hidden="true" />
            <span className="side-button volume-down" aria-hidden="true" />
            <span className="side-button power-button" aria-hidden="true" />

            <div className="metal-rim" aria-hidden="true" />
            <div className="speaker-zone" aria-hidden="true">
              <span className="dynamic-island">
                <span className="camera-lens" />
              </span>
            </div>

            <div className="phone-screen">
              <div className="pet-app-root">
                <PetLifeApp />
              </div>
            </div>

            <span className="home-indicator" aria-hidden="true" />
          </div>
        </div>

        <p className="interaction-hint">Tap the app to explore every screen and interaction</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<PetLifePrototype />);
