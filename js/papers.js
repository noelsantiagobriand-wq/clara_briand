let papers = [];

async function loadPapers(){

    const response = await fetch("data/papers.json");

    papers = await response.json();

    updatePapers();

}

loadPapers();
