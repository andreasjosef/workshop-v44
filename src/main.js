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

// Fetches the events, saves them in state, and lets render() draw them.
async function load() {
  state.events = await fetchEvents(source, latency);
  render();
}

// TODO steg 4: setButtonState(buttonState)
// TODO steg 5: readFilters() and matchesFilters(event, filters)

// ---------- 4. Wiring – listen for what the user wants, call an action ----------

el.loadButton.addEventListener("click", load);
// TODO steg 5: change in the filter form → render
