async function loadPapers() {

    // -----------------------------
    // Load JSON files
    // -----------------------------

    const [profileResponse, papersResponse] = await Promise.all([
        fetch("data/profile.json"),
        fetch("data/papers.json")
    ]);

    const profile = await profileResponse.json();
    let papers = await papersResponse.json();

    // -----------------------------
    // Page information
    // -----------------------------

    document.title = `Papers | ${profile.name}`;

    const headerName = document.getElementById("name");
    if (headerName) headerName.textContent = profile.name;

    const subtitle = document.getElementById("subtitle");
    if (subtitle)
        subtitle.textContent =
            `${profile.department} • ${profile.university}`;

    // -----------------------------
    // Controls
    // -----------------------------

    const search = document.getElementById("paperSearch");
    const typeFilter = document.getElementById("typeFilter");
    const sortSelect = document.getElementById("sortSelect");
    const buttons = document.querySelectorAll(".filter-btn");

    const container = document.getElementById("papersContainer");

    let currentYear = "all";

    // -----------------------------
    // Statistics
    // -----------------------------

    function updateStats(list) {

        document.getElementById("paperCount").textContent =
            list.length;

        document.getElementById("journalCount").textContent =
            list.filter(p => p.type === "journal").length;

        document.getElementById("preprintCount").textContent =
            list.filter(p => p.type === "preprint").length;

        document.getElementById("paperNumber").textContent =
            list.length;

        const coauthors = new Set();

        list.forEach(paper => {

            paper.authors.forEach(author => {

                if (author !== profile.name) {
                    coauthors.add(author);
                }

            });

        });

        document.getElementById("coauthorCount").textContent =
            coauthors.size;

    }

    // -----------------------------
    // Create links
    // -----------------------------

    function createLinks(links) {

        let html = "";

        for (const [name, url] of Object.entries(links)) {

            if (!url) continue;

            html += `
                <a href="${url}"
                   target="_blank">
                    ${name.toUpperCase()}
                </a>
            `;

        }

        return html;

    }

    // -----------------------------
    // Render papers
    // -----------------------------

    function render(list) {

        container.innerHTML = "";

        let currentHeading = null;

        list.forEach(paper => {

            if (paper.year !== currentHeading) {

                currentHeading = paper.year;

                container.innerHTML +=
                    `<h3 class="year-heading">${currentHeading}</h3>`;

            }

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

                    ${paper.venue}

                </div>

                ${
                    paper.description
                    ?
                    `<p>${paper.description}</p>`
                    :
                    ""
                }

                ${
                    paper.notes.length
                    ?
                    `<p><em>${paper.notes.join("<br>")}</em></p>`
                    :
                    ""
                }

                <div class="paper-links">

                    ${createLinks(paper.links)}

                </div>

            `;

            container.appendChild(card);

        });

    }

    // -----------------------------
    // Filtering
    // -----------------------------

    function update() {

        const text =
            search.value.toLowerCase();

        const type =
            typeFilter.value;

        let visible = papers.filter(p => {

            const searchString = (

                p.title +
                " " +
                p.authors.join(" ") +
                " " +
                p.venue +
                " " +
                p.description

            ).toLowerCase();

            const matchesSearch =
                searchString.includes(text);

            const matchesYear =

                currentYear === "all"

                ||

                p.year == currentYear

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

            return (
                matchesSearch
                &&
                matchesYear
                &&
                matchesType
            );

        });

        switch (sortSelect.value) {

            case "oldest":

                visible.sort(
                    (a, b) =>
                        a.year - b.year
                );

                break;

            case "titleAZ":

                visible.sort(
                    (a, b) =>
                        a.title.localeCompare(b.title)
                );

                break;

            case "titleZA":

                visible.sort(
                    (a, b) =>
                        b.title.localeCompare(a.title)
                );

                break;

            default:

                visible.sort(
                    (a, b) =>
                        b.year - a.year
                );

        }

        updateStats(visible);

        render(visible);

    }

    // -----------------------------
    // Events
    // -----------------------------

    buttons.forEach(button => {

        button.onclick = () => {

            buttons.forEach(
                b => b.classList.remove("active")
            );

            button.classList.add("active");

            currentYear =
                button.dataset.year;

            update();

        };

    });

    search.oninput = update;

    typeFilter.onchange = update;

    sortSelect.onchange = update;

    update();

}

loadPapers();
