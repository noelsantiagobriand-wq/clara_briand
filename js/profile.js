async function loadProfile() {

    const response = await fetch("data/profile.json");
    const profile = await response.json();

    // ---------- Helper functions ----------

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = value ?? "";
        }

    }

    function setHTML(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = value;
        }

    }

    // ---------- Page title ----------

    document.title = `Home | ${profile.name}`;

    // ---------- Header ----------

    setText("name", profile.name);
    setText("subtitle",
        `${profile.department} • ${profile.university}`);

    // ---------- Sidebar ----------

    const photo = document.getElementById("sidebarPhoto");

    if (photo) {

        photo.src = profile.photo;
        photo.alt = profile.name;

    }

    setText("sidebarName", profile.name);
    setText("sidebarTitle", profile.title);
    setText("sidebarDepartment", profile.department);
    setText("sidebarUniversity", profile.university);
    setText("sidebarOffice", profile.office);

    setHTML(
        "sidebarEmail",
        `<a href="mailto:${profile.email}">${profile.email}</a>`
    );

    if (profile.orcid) {

        setHTML(
            "orcid",
            `<a href="${profile.orcid}" target="_blank">ORCID</a>`
        );

    }

    if (profile.scholar) {

        setHTML(
            "scholar",
            `<a href="${profile.scholar}" target="_blank">Google Scholar</a>`
        );

    }

    if (profile.github) {

        setHTML(
            "github",
            `<a href="${profile.github}" target="_blank">GitHub</a>`
        );

    }

    // ---------- Welcome ----------

    setText("welcomeText", profile.welcome);

    // ---------- Footer ----------

    setText("footerName", profile.name);
    setText("department", profile.department);
    setText("university", profile.university);
    setText("email", profile.email);

    // ---------- Research Interests ----------

    const researchList = document.getElementById("researchList");

    if (researchList && profile.research) {

        researchList.innerHTML = "";

        profile.research.forEach(area => {

            const card = document.createElement("div");

            card.className = "research-item";

            card.innerHTML = `
                <h3>${area.title}</h3>
                <p>${area.description}</p>
            `;

            researchList.appendChild(card);

        });

    }

}

loadProfile();
