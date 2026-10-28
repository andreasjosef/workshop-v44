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

// Two events copied in by hand for now. In step 3 they come from load().
const state = {
  events: [
    { id: 3, title: "Jazzkväll med husbandet", category: "Musik", day: "Mån 2 nov", time: "20:00", place: "Fasching", price: 180, soldOut: false },
    { id: 10, title: "Indiepop-kväll", category: "Musik", day: "Ons 4 nov", time: "19:30", place: "Nalen", price: 250, soldOut: true },
  ],
};

// ---------- 3. Actions – the only functions that change things ----------

// Draws whatever is in state right now.
function render() {
  renderEvents(el.events, state.events);
  el.status.textContent = `Visar ${state.events.length} evenemang.`;
}

// TODO steg 3: async load()
// TODO steg 4: setButtonState(buttonState)
// TODO steg 5: readFilters() and matchesFilters(event, filters)

// ---------- 4. Wiring – listen for what the user wants, call an action ----------

// TODO steg 3: click on the load button → load
// TODO steg 5: change in the filter form → render

render();
