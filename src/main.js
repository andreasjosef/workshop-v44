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

// What the user has picked in the form right now.
function readFilters() {
  return {
    category: el.filters.querySelector('input[name="category"]:checked').value,
  };
}

// true if the event should be shown.
function matchesFilters(event, filters) {
  if (filters.category === "Alla") return true;
  return event.category === filters.category;
}

// Draws whatever is in state right now. The filter only changes what we show, never state.
function render() {
  const filters = readFilters();
  const visible = state.events.filter((event) => matchesFilters(event, filters));

  renderEvents(el.events, visible);
  el.status.textContent = `Visar ${visible.length} av ${state.events.length} evenemang.`;
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

// ---------- 4. Wiring – listen for what the user wants, call an action ----------

el.loadButton.addEventListener("click", load);
// A new filter needs no new data – just draw again.
el.filters.addEventListener("change", render);
