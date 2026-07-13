const search = document.getElementById("paperSearch");
const buttons = document.querySelectorAll(".filter-btn");
const papers = document.querySelectorAll(".paper-card");

let currentYear = "all";

function updatePapers(){

    const text = search.value.toLowerCase();

    let visible = 0;

    papers.forEach(paper=>{

        const year = paper.dataset.year;

        const content = paper.innerText.toLowerCase();

        const matchesYear =
            currentYear==="all" ||
            year===currentYear;

        const matchesSearch =
            content.includes(text);

        if(matchesYear && matchesSearch){

            paper.style.display="block";

            visible++;

        }else{

            paper.style.display="none";

        }

    });

    document.getElementById("paperNumber").textContent=visible;

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

updatePapers();
