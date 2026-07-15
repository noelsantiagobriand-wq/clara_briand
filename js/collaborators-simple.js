async function loadCollaborators() {
    // -----------------------------
    // Load JSON files
    // -----------------------------

    const [profileResponse, collaboratorsResponse] = await Promise.all([
        fetch("data/profile.json"),
        fetch("data/collaborators.json")
    ]);

    const profile = await profileResponse.json();
    const collaborators = await collaboratorsResponse.json();

    // -----------------------------
    // Page information
    // -----------------------------

    document.title = `Collaborators | ${profile.name}`;

    const name = document.getElementById("name");
    if (name) {
        name.textContent = profile.name;
    }

    const subtitle = document.getElementById("subtitle");
    if (subtitle) {
        subtitle.textContent =
            `${profile.department} • ${profile.university}`;
    }

    const footerName = document.getElementById("footerName");
    if (footerName) {
        footerName.textContent = profile.name;
    }

    const department = document.getElementById("department");
    if (department) {
        department.textContent = profile.department;
    }

    const university = document.getElementById("university");
    if (university) {
        university.textContent = profile.university;
    }

    const email = document.getElementById("email");
    if (email) {
        email.textContent = profile.email;
    }

    // -----------------------------
    // Sort collaborators alphabetically
    // -----------------------------

    collaborators.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    // -----------------------------
    // Render collaborators
    // -----------------------------

    const container =
        document.getElementById("collaboratorsContainer");

    collaborators.forEach(person => {

        const card = document.createElement("div");

        card.className = "collaborator-card";

        let links = "";

        if (person.website) {
            links += `<a href="${person.website}" target="_blank">Website</a>`;
        }

        if (person.orcid) {
            links += `<a href="${person.orcid}" target="_blank">ORCID</a>`;
        }

        if (person.scholar) {
            links += `<a href="${person.scholar}" target="_blank">Google Scholar</a>`;
        }

        if (person.github) {
            links += `<a href="${person.github}" target="_blank">GitHub</a>`;
        }

        card.innerHTML = `

            <h3>${person.name}</h3>

            <p>

                <strong>${person.institution}</strong>

                ${person.country ? "<br>" + person.country : ""}

            </p>

            ${
                person.research && person.research.length
                ?
                `<p>
                    ${person.research.join(", ")}
                </p>`
                :
                ""
            }

            ${
                links
                ?
                `<div class="paper-links">
                    ${links}
                </div>`
                :
                ""
            }

        `;

        container.appendChild(card);

    });

}

loadCollaborators();
