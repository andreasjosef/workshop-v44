# Händer i veckan 🎟️

Workshop v44. En liten app som visar veckans evenemang i Stockholm. Du laddar dem med en knapp, de ritas upp som en lista, och du kan filtrera på kategori.

Koden har **samma ordning** som SL-tavlan, men appen är så liten att du hinner bygga allt själv på en förmiddag (3–4 timmar).

## Målet

Du ska gå härifrån med en struktur du kan använda i nästan alla små JavaScript-appar:

1. **`el`**: ett objekt med alla delar av sidan som vi uppdaterar.
2. **`state`**: allt appen vet just nu.
3. **Actions**: funktioner som `load()` och `render()`. Bara de ändrar saker.
4. **Wiring**: event listeners längst ner. De fångar vad användaren *vill* och anropar rätt action.

På vägen övar du på att göra om en lista med data till HTML med `map`, och på en knapp som har olika **lägen** (vilar, laddar, klart, fel). JavaScript bestämmer *vilket läge* knappen är i, och CSS bestämmer *hur läget ser ut*.

**Du ska kunna förklara varje rad.** Använd gärna AI, men om du inte kan säga varför en rad står där är den inte din än.

## Kom igång

```bash
npm start
```

Öppna adressen som skrivs ut (oftast http://localhost:3000). Du kan också använda **Live Server** i VS Code.

> Varför en server? Filerna använder `import`/`export`, och det fungerar inte om du öppnar `index.html` direkt från disken.

## Filer

```
index.html        Färdig. Sidans HTML.
styles.css        Färdig, utom tre CSS-ÖVNINGAR som du skriver själv.
data/events.json  Veckans evenemang.
src/
  api.js          Färdig. Hämtar evenemangen. Läs den!
  render.js       Du skriver: gör om data till HTML.
  main.js         Du skriver: el, state, actions och wiring.
```

## Testa olika lägen

Lägg till i adressfältet:

| Adress | Vad händer |
|---|---|
| `/` | Laddar `data/events.json`, med 800 ms låtsad väntan |
| `?latency=3000` | Väntar 3 sekunder, så du hinner se laddningsläget |
| `?latency=0` | Ingen väntan |
| `?source=broken` | Hämtar en fil som inte finns, så du kan testa felläget |

## Datan

Varje evenemang ser ut så här:

```json
{
  "id": 1,
  "title": "Jazzkväll med husbandet",
  "category": "Musik",
  "day": "Mån 2 nov",
  "time": "20:00",
  "place": "Fasching",
  "price": 180,
  "soldOut": false
}
```

`category` är en av `Musik`, `Mat`, `Sport` eller `Kultur`. `price: 0` betyder gratis.

---

## Uppgifter

Gör stegen i ordning. Varje steg slutar med något du kan **se** i webbläsaren eller i konsolen.

### Steg 1 – `el` (ca 20 min)

**Mål:** alla delar av sidan som vi ska uppdatera finns samlade på ett ställe.

1. Öppna `index.html` och hitta id:n och klasser på knappen, knappens text, formuläret, statusraden och listan.
2. Fyll i `el` i `main.js`:
   ```js
   const el = {
     loadButton: document.querySelector("#load-button"),
     // loadLabel, filters, status, events
   };
   ```
3. Skriv `console.log(el)` under objektet.

**Testa:** öppna konsolen. Är något av värdena `null`? Då stämmer inte selektorn.

**Varför?** Vill du ändra något i HTML:en behöver du bara ändra på ett ställe i JavaScript. Resten av koden pratar med `el.status`, inte med `document.querySelector("#status")`.

### Steg 2 – rita listan med `map` (ca 45 min)

**Mål:** en lista med evenemang syns på sidan.

1. Lägg tillfälligt in två evenemang direkt i `state.events` i `main.js` (kopiera från `data/events.json`).
2. I `render.js`, skriv `priceText(event)`: `"Fullbokat"`, `"Gratis"` eller t.ex. `"180 kr"`.
3. Skriv `eventToHtml(event, index)`. Den ska lämna tillbaka exakt den här HTML:en (CSS:en är redan skriven för den):
   ```html
   <li class="event" data-category="Musik" data-sold-out="false" style="--i: 0">
     <div class="event__date">
       <span class="event__day">Mån 2 nov</span>
       <span class="event__time">20:00</span>
     </div>
     <div class="event__body">
       <h2 class="event__title">Jazzkväll med husbandet</h2>
       <p class="event__place">Fasching</p>
     </div>
     <div class="event__meta">
       <span class="event__category">Musik</span>
       <span class="event__price">180 kr</span>
     </div>
   </li>
   ```
   Använd en template string (backticks) och `${...}`. `--i` är evenemangets plats i listan (`index`).
4. Skriv `renderEvents(listEl, events)`: `map` med `eventToHtml`, `join("")`, och lägg resultatet i `listEl.innerHTML`. Är listan tom visar du `<li class="events__empty">Inga evenemang att visa.</li>`.
5. I `main.js`, skriv `render()`. Den anropar `renderEvents(el.events, state.events)` och skriver `Visar 2 evenemang.` i `el.status`.
6. Anropa `render()` längst ner i filen.

**Testa:** ändra `soldOut` till `true` på ett av dina evenemang. Blir det grått och står det "Fullbokat"?

**Tänk på:** `map` skickar in `(element, index)`. Därför kan du skriva `events.map(eventToHtml)` direkt.

### Steg 3 – `load()` (ca 45 min)

**Mål:** knappen hämtar riktig data.

1. Läs `src/api.js`. Vad lämnar `fetchEvents` tillbaka? Vad händer om svaret inte är ok?
2. Ta bort de hårdkodade evenemangen så att `state.events` blir `[]` igen. Ta bort `render()`-anropet längst ner.
3. Skriv `async function load()`: hämta med `fetchEvents(source, latency)`, spara i `state.events`, anropa `render()`.
4. Under **Wiring**: koppla knappens `click` till `load`.

**Testa:** klicka. Efter en kort stund kommer alla 12 evenemang.

**Varför?** `load` hämtar och sparar. `render` ritar det som finns i `state`. De gör var sin sak, och det är därför vi kan återanvända `render` i steg 5.

### Steg 4 – knappen har lägen (ca 45 min)

**Mål:** man ser att något händer när man klickar, och man ser när det går fel.

1. Skriv `setButtonState(buttonState)` i `main.js`. Den ska:
   - sätta `el.loadButton.dataset.state`
   - byta texten i `el.loadLabel`, till exempel med ett objekt:
     ```js
     const BUTTON_LABEL = {
       idle: "Ladda evenemang",
       loading: "Laddar…",
       success: "Klart!",
       error: "Försök igen",
     };
     ```
   - stänga av knappen (`disabled`) medan den laddar
2. I `load()`: sätt `"loading"` först, och `"success"` när allt är klart.
3. Lägg det som kan gå fel i `try { ... } catch (error) { ... }`. I `catch`: sätt `"error"` och skriv vad som hände i `el.status`, t.ex. `Kunde inte ladda evenemang (HTTP 404).`
4. Gör **CSS-ÖVNING 1** och **CSS-ÖVNING 2** i `styles.css`.

**Testa:** `?latency=3000` (snurrar ikonen?) och `?source=broken` (blir knappen röd?).

**Varför?** JS säger bara *vilket läge* knappen är i. Hur läget ser ut står i CSS:en. Vill du byta färg eller animation behöver du inte röra JavaScript.

### Steg 5 – filtrera (ca 30 min)

**Mål:** man kan välja kategori utan att ladda om.

1. Skriv `readFilters()` som lämnar tillbaka `{ category: ... }`, värdet på den ikryssade radioknappen:
   ```js
   el.filters.querySelector('input[name="category"]:checked').value
   ```
2. Skriv `matchesFilters(event, filters)` som lämnar tillbaka `true` om evenemanget ska synas. `"Alla"` ska visa allt.
3. I `render()`: `filter` först och rita sedan bara de som syns. Skriv `Visar 4 av 12 evenemang.` i statusraden.
4. Under **Wiring**: lyssna på `change` på `el.filters` och anropa `render`.

**Testa:** byt kategori. Hämtas datan igen (titta i Network-fliken)? Det ska den inte.

**Varför?** Filtret ändrar inte datan, bara vad vi visar. Därför räcker det att anropa `render()`.

### Extra (om du har tid)

1. **Dölj fullbokade.** Checkboxen finns redan i HTML:en. Lägg till `hideSoldOut` i `readFilters()` och i `matchesFilters()`.
2. **CSS-ÖVNING 3.** Evenemangen glider in ett i taget.
3. **Ett ärligt fel.** Ladda listan och slå sedan på *Offline* i DevTools → Network. Klicka igen. Listan finns kvar, så säg det: `Kunde inte uppdatera (Failed to fetch). Visar de evenemang du redan hade.`
4. **Tillbaka till vila.** "Klart!" ska inte stå kvar för evigt. Låt knappen gå tillbaka till `"idle"` efter 1,5 sekunder med `setTimeout`. Vad händer om man klickar igen innan tiden har gått? Titta på `clearTimeout`.

---

## Checkpoints

Varje steg finns färdigt som en egen branch. **De publiceras efter lunch.** Sedan kan du jämföra med din egen kod:

```bash
git fetch
git diff steg-2-render steg-3-load        # vad ändrades i steg 3?
git switch steg-3-load                    # hoppa till ett steg
```

| Branch | Innehåll |
|---|---|
| `main` | Startpunkten (den här) |
| `steg-1-el` | `el` är ifyllt |
| `steg-2-render` | `render.js` och `render()` med hårdkodade evenemang |
| `steg-3-load` | `load()` och klick på knappen |
| `steg-4-knapp` | `setButtonState`, `try/catch` och CSS-övning 1–2 |
| `steg-5-filter` | Filter på kategori |
| `losning` | Allt, med extrauppgifterna |
