const search = document.getElementById("paperSearch");
const buttons = document.querySelectorAll(".filter-btn");
const papers = [...document.querySelectorAll(".paper-card")];

const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");

let currentYear = "all";

function updateStats(visiblePapers){

    document.getElementById("paperCount").textContent =
        visiblePapers.length;

    document.getElementById("journalCount").textContent =
        visiblePapers.filter(p=>p.dataset.type==="journal").length;

    document.getElementById("preprintCount").textContent =
        visiblePapers.filter(p=>p.dataset.type==="preprint").length;

    document.getElementById("paperNumber").textContent =
        visiblePapers.length;
}

function updatePapers(){

    const text = search.value.toLowerCase();

    const type = typeFilter.value;

    let visible = papers.filter(p=>{

        const matchesSearch =
            p.innerText.toLowerCase().includes(text);

        const matchesYear =
            currentYear==="all"
            ||
            p.dataset.year===currentYear
            ||
            (
                currentYear==="preprint"
                &&
                p.dataset.type==="preprint"
            );

        const matchesType =
            type==="all"
            ||
            p.dataset.type===type;

        return matchesSearch && matchesYear && matchesType;

    });

    switch(sortSelect.value){

        case "oldest":

            visible.sort((a,b)=>
                a.dataset.year.localeCompare(b.dataset.year));

            break;

        case "titleAZ":

            visible.sort((a,b)=>
                a.dataset.title.localeCompare(b.dataset.title));

            break;

        case "titleZA":

            visible.sort((a,b)=>
                b.dataset.title.localeCompare(a.dataset.title));

            break;

        default:

            visible.sort((a,b)=>
                b.dataset.year.localeCompare(a.dataset.year));

    }

    papers.forEach(p=>p.style.display="none");

    visible.forEach(p=>{

        p.style.display="block";

        p.parentNode.appendChild(p);

    });

    updateStats(visible);

}

buttons.forEach(button=>{

    button.onclick=()=>{

        buttons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentYear=button.dataset.year;

        updatePapers();

    };

});

search.oninput=updatePapers;

typeFilter.onchange=updatePapers;

sortSelect.onchange=updatePapers;

updatePapers();
