// VARIABLEN
const breweryContainer = document.getElementById("breweryContainer");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

// ALLE BRAUEREIEN ABRUFEN
function fetchAllBreweries() {
  fetch("https://api.openbrewerydb.org/v1/breweries", { method: "GET" })
    .then((response) => response.json())
    .then((breweries) => {
      breweryContainer.innerHTML = ""; // Container leeren
      showBreweryList(breweries);
    })
    .catch((error) => console.error("Error fetching breweries!", error));
}

// ZUFÄLLIGE BRAUEREI ABRUFEN
function fetchRandomBrewery() {
  fetch("https://api.openbrewerydb.org/v1/breweries/random", {
    method: "GET",
    // Header mit Info, dass nicht gecached werden soll. Ansonsten Fehler bei Fetch -> es kommt immer die gleiche Brauerei.
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
    .then((response) => response.json())
    .then((breweries) => {
      const brewery = breweries[0]; // Ersten Array ansprechen, damit Werte nicht als "undefined" angezeigt werden.
      showBreweryInfo(brewery);
    })
    .catch((error) => console.error("Error fetching breweries!", error));
  openModal();
}

// SEARCH BREWERIES
function searchBreweries() {
  let search = document.getElementById("searchInput").value;

  fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${search}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      breweryContainer.innerHTML = "";

      // Filtern der Brauereien, deren Name mit Suchbegriff übereinstimmt & beides auf Kleinbuchstaben setzen, damit bei Eingabe egal ist, ob Groß- oder Kleinschreibung
      const filteredBreweries = data.filter((brewery) =>
        brewery.name.toLowerCase().includes(search.toLowerCase())
      );
      // Wenn Inputfeld leer -> Fehlermeldung anzeigen
      if (search === "") {
        alert("Please enter a Brewery");
      }
      // Überprüfen, ob Ergebnisse gefunden wurden & entweder Brauereien oder Fehlermeldung anzeigen
      else if (filteredBreweries.length > 0) {
        showBreweryList(filteredBreweries);
      } else {
        alert("No such Brewery found!");
      }
    })
    .catch((error) => console.error("Error fetching breweries!", error));
}

// BRAUEREIEN IN LISTE DARSTELLEN
function showBreweryList(breweries) {
  breweries.forEach((brewery) => {
    const card = document.createElement("div");
    card.classList.add("flex", "flex-col", "bg-orange-100", "my-5", "p-3");

    const breweryName = document.createElement("h2");
    breweryName.innerText = brewery.name;
    breweryName.classList.add("text-xl", "font-bold", "mb-2");

    const detailsButton = document.createElement("button");
    detailsButton.innerText = "Show details";
    detailsButton.classList.add(
      "w-fit",
      "px-3",
      "py-1",
      "bg-yellow-600",
      "text-white",
      "hover:bg-yellow-700",
      "hover:transition-all",
      "rounded"
    );
    detailsButton.addEventListener("click", () => {
      showBreweryInfo(brewery);
    });

    card.appendChild(breweryName);
    card.appendChild(detailsButton);
    breweryContainer.appendChild(card);
  });
}

// DETAILANSICHT IN MODAL ANZEIGEN ------------
function showBreweryInfo(brewery) {
  modalContent.innerHTML = ""; // Modal leeren

  const card = document.createElement("div");

  const breweryName = document.createElement("h2");
  breweryName.innerText = brewery.name;
  breweryName.classList.add("text-2xl", "font-bold", "text-yellow-700");

  const breweryType = document.createElement("p");
  breweryType.innerText = "Type: " + brewery.brewery_type;
  breweryType.classList.add("text-sm", "mb-3");

  const breweryAddress = document.createElement("p");
  breweryAddress.innerText =
    "Address: " +
    brewery.street +
    ", " +
    brewery.postal_code +
    " " +
    brewery.city +
    ", " +
    brewery.state;

  const breweryCountry = document.createElement("p");
  breweryCountry.innerText = "Country: " + brewery.country;

  const breweryURL = document.createElement("a");
  breweryURL.setAttribute("href", brewery.website_url);
  breweryURL.innerText = "Website: " + brewery.website_url;
  breweryURL.classList.add("hover:underline");

  card.appendChild(breweryName);
  card.appendChild(breweryType);
  card.appendChild(breweryAddress);
  card.appendChild(breweryCountry);
  card.appendChild(breweryURL);
  modalContent.appendChild(card);
  openModal();
}

// MODAL ÖFFNEN
function openModal() {
  modal.style.display = "block";
}

// MODAL SCHLIESSEN
function closeModal() {
  modal.style.display = "none";
}
