let papers = [];

const search = document.getElementById("paperSearch");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");

const container = document.getElementById("papersContainer");

const MAIN_AUTHOR = "Clara Briand";

let currentYear = "all";

// ==========================
// Load JSON
// ==========================

async function loadPapers() {

    const response = await fetch("data/papers.json");

    papers = await response.json();

    createYearButtons();

    updatePapers();

}

loadPapers();


// ==========================
// Create year buttons
// ==========================

function createYearButtons() {

    const filterContainer = document.querySelector(".year-filters");

    filterContainer.innerHTML = "";

    addYearButton("All", "all");

    const years = [...new Set(papers.map(p => p.year))]
        .sort((a, b) => b - a);

    years.forEach(year => {

        addYearButton(year, year);

    });

    addYearButton("Preprints", "preprint");

}

function addYearButton(text, value) {

    const button = document.createElement("button");

    button.className = "filter-btn";

    if (value === "all")
        button.classList.add("active");

    button.textContent = text;

    button.dataset.year = value;

    button.onclick = () => {

        document
            .querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        button.classList.add("active");

        currentYear = value.toString();

        updatePapers();

    };

    document
        .querySelector(".year-filters")
        .appendChild(button);

}


// ==========================
// Main update
// ==========================

function updatePapers() {

    const text = search.value.toLowerCase();

    const type = typeFilter.value;

    let visible = papers.filter(p => {

        const matchesSearch =

            p.title.toLowerCase().includes(text)

            ||

            p.authors.join(", ").toLowerCase().includes(text)

            ||

            p.journal.toLowerCase().includes(text);

        const matchesYear =

            currentYear === "all"

            ||

            p.year.toString() === currentYear

            ||

            (

                currentYear === "preprint"

                &&

                p.type === "preprint"

            );

        const matchesType =

            type === "all"

            ||

            p.type === type;

        return matchesSearch && matchesYear && matchesType;

    });

    switch (sortSelect.value) {

        case "oldest":

            visible.sort((a, b) => a.year - b.year);

            break;

        case "titleAZ":

            visible.sort((a, b) =>
                a.title.localeCompare(b.title));

            break;

        case "titleZA":

            visible.sort((a, b) =>
                b.title.localeCompare(a.title));

            break;

        default:

            visible.sort((a, b) => b.year - a.year);

    }

    buildPaperCards(visible);

    updateStats(visible);

}


// ==========================
// Build cards
// ==========================

function buildPaperCards(visible) {

    container.innerHTML = "";

    visible.forEach(paper => {

        const card = document.createElement("div");

        card.className = "paper-card";

        card.innerHTML = `

            <div class="paper-title">

                ${paper.title}

            </div>

            <div class="paper-authors">

                ${paper.authors.join(", ")}

            </div>

            <div class="paper-journal">

                ${paper.journal}

            </div>

            <div class="paper-links">

                ${paper.pdf ? `<a href="${paper.pdf}" target="_blank">PDF</a>` : ""}

                ${paper.doi ? `<a href="${paper.doi}" target="_blank">DOI</a>` : ""}

                ${paper.arxiv ? `<a href="${paper.arxiv}" target="_blank">arXiv</a>` : ""}

            </div>

        `;

        container.appendChild(card);

    });

}


// ==========================
// Statistics
// ==========================

function updateStats(visible) {

    document.getElementById("paperCount").textContent =
        visible.length;

    document.getElementById("journalCount").textContent =
        visible.filter(p => p.type === "journal").length;

    document.getElementById("preprintCount").textContent =
        visible.filter(p => p.type === "preprint").length;

    document.getElementById("paperNumber").textContent =
        visible.length;

    const coauthors = new Set();

    visible.forEach(paper => {

        paper.authors.forEach(author => {

            if (author !== MAIN_AUTHOR)

                coauthors.add(author);

        });

    });

    document.getElementById("coauthorCount").textContent =
        coauthors.size;

}


// ==========================
// Events
// ==========================

search.addEventListener("input", updatePapers);

typeFilter.addEventListener("change", updatePapers);

sortSelect.addEventListener("change", updatePapers);
