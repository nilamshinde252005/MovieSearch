const searchinput = document.getElementById('search-input')
const moviegrid = document.getElementById("movie-grid")

let allMovies = []

async function fetchData() {
    try{
        const res = await fetch("movies.json");
        if(!res.ok){
            throw new Error("failed to fetch");
        }
        allMovies = await res.json()
        renderMovies(allMovies);
    }catch(err){
        console.error(err);
    }
}

function renderMovies(movies){
    moviegrid.innerHTML="";

    movies.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "card"
        const poster = movie.poster

        card.innerHTML=`
        <img src="${poster}" alt="${movie.title}">
        <div class="card-body">
        <div>Title :${movie.title}</div>
        <div>Rating :${movie.rating}</div>
        </div>
        `
        moviegrid.append(card)
    });
}

function filterMovies(search){
    const searchedMovie = search.trim().toLowerCase()
    const filtered = allMovies.filter( movie => {
       return movie.title.toLowerCase().includes(searchedMovie)
    })
    renderMovies(filtered)
}

searchinput.addEventListener("input",(e)=>{
    filterMovies(e.target.value)
})
// Start
fetchData();

// Why does renderMovies(movies) take a parameter?Because you don’t always want to render all movies.
// Data → Render → Update