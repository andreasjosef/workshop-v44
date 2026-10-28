import { fetchEvents } from "./api.js";
import { renderEvents } from "./render.js";

// Which data to load: ?source=events (default) | broken
// How slow the network pretends to be: ?latency=1500 (milliseconds, default 800)
const params = new URLSearchParams(location.search);
const source = params.get("source") || "events";
const latency = Number(params.get("latency") || 800);

// ---------- 1. el – every part of the page we update ----------

// TODO steg 1: fill in el with document.querySelector(...)
// loadButton, loadLabel, filters, status, events
const el = {};

// ---------- 2. state – everything the app knows right now ----------

const state = {
  events: [],
};

// ---------- 3. Actions – the only functions that change things ----------

// TODO steg 2: render()
// TODO steg 3: async load()
// TODO steg 4: setButtonState(buttonState)
// TODO steg 5: readFilters() and matchesFilters(event, filters)

// ---------- 4. Wiring – listen for what the user wants, call an action ----------

// TODO steg 3: click on the load button → load
// TODO steg 5: change in the filter form → render
