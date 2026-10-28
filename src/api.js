// Fetches the week's events from a JSON file. This file is done – read it, you don't need to change it.

const URLS = {
  events: "./data/events.json",
  // A file that doesn't exist – for trying out the error state.
  broken: "./data/finns-inte.json",
};

// Pretends the network is slow, so the loading state has time to show.
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchEvents(source, latency) {
  await wait(latency);

  const response = await fetch(URLS[source]);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.events;
}
