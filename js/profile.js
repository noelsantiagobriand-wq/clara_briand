async function loadProfile() {

    const response = await fetch("data/profile.json");
    const profile = await response.json();

    document.getElementById("name").textContent =
        profile.name;

    document.getElementById("subtitle").textContent =
        `${profile.department} • ${profile.university}`;

    document.title =
        `Home | ${profile.name}`;

    document.getElementById("sidebarPhoto").src =
        profile.photo;

    document.getElementById("sidebarPhoto").alt =
        profile.name;

    document.getElementById("sidebarName").textContent =
        profile.name;

    document.getElementById("sidebarTitle").textContent =
        profile.title;

    document.getElementById("sidebarDepartment").textContent =
        profile.department;

    document.getElementById("sidebarUniversity").textContent =
        profile.university;

    document.getElementById("sidebarEmail").innerHTML =
        `<a href="mailto:${profile.email}">${profile.email}</a>`;

    document.getElementById("sidebarOffice").textContent =
        profile.office;

    document.getElementById("welcomeText").textContent =
        profile.welcome;

    document.getElementById("cvButton").href =
        profile.cv;

    // -------------------------
    // Research Interests
    // -------------------------

    const researchList = document.getElementById("researchList");

    if (researchList) {

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
