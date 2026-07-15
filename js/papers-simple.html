async function loadPapers() {

    const profile =
        await (await fetch("data/profile.json")).json();

    const papers =
        await (await fetch("data/papers.json")).json();

    document.title =
        `Papers | ${profile.name}`;

    document.getElementById("name").textContent =
        profile.name;

    document.getElementById("subtitle").textContent =
        `${profile.department} • ${profile.university}`;

    document.getElementById("footerName").textContent =
        profile.name;

    papers.sort((a,b)=>b.year-a.year);

    const container =
        document.getElementById("papersContainer");

    let currentYear = null;

    papers.forEach(paper=>{

        if(currentYear!==paper.year){

            currentYear=paper.year;

            const heading=document.createElement("h3");

            heading.className="year-heading";

            heading.textContent=currentYear;

            container.appendChild(heading);

        }

        const card=document.createElement("div");

        card.className="paper-card";

        let links="";

        for(const [name,url] of Object.entries(paper.links)){

            if(url){

                links+=
                    `<a href="${url}" target="_blank">${name}</a>`;

            }

        }

        card.innerHTML=`

            <div class="paper-title">

                ${paper.title}

            </div>

            <div class="paper-authors">

                ${paper.authors.join(", ")}

            </div>

            <div class="paper-journal">

                ${paper.venue}

            </div>

            ${paper.description
                ?`<p>${paper.description}</p>`
                :""
            }

            <div class="paper-links">

                ${links}

            </div>

        `;

        container.appendChild(card);

    });

}

loadPapers();
