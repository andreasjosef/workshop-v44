import { fetchEvents } from "./api.js";
import { renderEvents } from "./render.js";

// Which data to load: ?source=events (default) | broken
// How slow the network pretends to be: ?latency=1500 (milliseconds, default 800)
const params = new URLSearchParams(location.search);
const source = params.get("source") || "events";
const latency = Number(params.get("latency") || 800);

// ---------- 1. el – every part of the page we update ----------

const el = {
  loadButton: document.querySelector("#load-button"),
  loadLabel: document.querySelector(".load-button__label"),
  filters: document.querySelector("#filters"),
  status: document.querySelector("#status"),
  events: document.querySelector("#events"),
};

// ---------- 2. state – everything the app knows right now ----------

const state = {
  events: [],
};

// ---------- 3. Actions – the only functions that change things ----------

// Draws whatever is in state right now.
function render() {
  renderEvents(el.events, state.events);
  el.status.textContent = `Visar ${state.events.length} evenemang.`;
}

const BUTTON_LABEL = {
  idle: "Ladda evenemang",
  loading: "Laddar…",
  success: "Klart!",
  error: "Försök igen",
};

// JS only says which state the button is in. styles.css decides how it looks.
function setButtonState(buttonState) {
  el.loadButton.dataset.state = buttonState;
  el.loadLabel.textContent = BUTTON_LABEL[buttonState];
  el.loadButton.disabled = buttonState === "loading";
}

// Fetches the events, saves them in state, and lets render() draw them.
async function load() {
  setButtonState("loading");

  try {
    state.events = await fetchEvents(source, latency);
    render();
    setButtonState("success");
  } catch (error) {
    setButtonState("error");
    el.status.textContent = `Kunde inte ladda evenemang (${error.message}).`;
  }
}

// TODO steg 5: readFilters() and matchesFilters(event, filters)

// ---------- 4. Wiring – listen for what the user wants, call an action ----------

el.loadButton.addEventListener("click", load);
// TODO steg 5: change in the filter form → render
