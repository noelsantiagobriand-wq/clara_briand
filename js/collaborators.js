let collaborators = [];

const search = document.getElementById("collaboratorSearch");
const container = document.getElementById("collaboratorsContainer");

// ==========================
// Load collaborators
// ==========================

async function loadCollaborators() {

    const response = await fetch("data/collaborators.json");

    collaborators = await response.json();

    updateCollaborators();

}

loadCollaborators();


// ==========================
// Main update
// ==========================

function updateCollaborators() {

    const text = search.value.toLowerCase();

    const visible = collaborators.filter(c => {

        const researchText = c.research
            ? c.research.join(" ").toLowerCase()
            : "";

        return (

            c.name.toLowerCase().includes(text)

            ||

            c.institution.toLowerCase().includes(text)

            ||

            c.country.toLowerCase().includes(text)

            ||

            researchText.includes(text)

        );

    });

    buildCollaboratorCards(visible);

    updateStats(visible);

}


// ==========================
// Build collaborator cards
// ==========================

function buildCollaboratorCards(visible) {

    container.innerHTML = "";

    visible.forEach(c => {

        const card = document.createElement("div");

        card.className = "collaborator-card";

        const researchTags = (c.research || [])
            .map(area => `<span class="research-tag">${area}</span>`)
            .join("");

        card.innerHTML = `

            <h3>${c.name}</h3>

            <p>

                <strong>Institution:</strong><br>

                ${c.institution}

            </p>

            <p>

                <strong>Country:</strong><br>

                ${c.country}

            </p>

            <div class="research-tags">

                ${researchTags}

            </div>

            <div class="collaborator-links">

                ${c.website
                    ? `<a href="${c.website}" target="_blank">Website</a>`
                    : ""}

                ${c.orcid
                    ? `<a href="${c.orcid}" target="_blank">ORCID</a>`
                    : ""}

            </div>

        `;

        container.appendChild(card);

    });

}


// ==========================
// Statistics
// ==========================

function updateStats(visible) {

    document.getElementById("collaboratorCount").textContent =
        visible.length;

    document.getElementById("visibleCollaboratorCount").textContent =
        visible.length;

    const institutions = new Set();

    const countries = new Set();

    visible.forEach(c => {

        if (c.institution)
            institutions.add(c.institution);

        if (c.country)
            countries.add(c.country);

    });

    document.getElementById("institutionCount").textContent =
        institutions.size;

    document.getElementById("countryCount").textContent =
        countries.size;

}


// ==========================
// Search
// ==========================

search.addEventListener("input", updateCollaborators);
