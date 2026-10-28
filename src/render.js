// Turning data into HTML. Nothing in here fetches or decides – it only draws.

function priceText(event) {
  if (event.soldOut) return "Fullbokat";
  if (event.price === 0) return "Gratis";
  return `${event.price} kr`;
}

// map calls this with (event, index), so index is the event's place in the list.
// --i lets CSS know that place (used in CSS-ÖVNING 3).
function eventToHtml(event, index) {
  return `
    <li class="event" data-category="${event.category}" data-sold-out="${event.soldOut}" style="--i: ${index}">
      <div class="event__date">
        <span class="event__day">${event.day}</span>
        <span class="event__time">${event.time}</span>
      </div>
      <div class="event__body">
        <h2 class="event__title">${event.title}</h2>
        <p class="event__place">${event.place}</p>
      </div>
      <div class="event__meta">
        <span class="event__category">${event.category}</span>
        <span class="event__price">${priceText(event)}</span>
      </div>
    </li>`;
}

export function renderEvents(listEl, events) {
  if (events.length === 0) {
    listEl.innerHTML = `<li class="events__empty">Inga evenemang att visa.</li>`;
    return;
  }

  // One HTML string per event, then glued together into one long string.
  const html = events.map(eventToHtml);
  listEl.innerHTML = html.join("");
}
