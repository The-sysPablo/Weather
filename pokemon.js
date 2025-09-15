const pokebtn = document.getElementById("pokebtn");

document.addEventListener("keydown", e => {
    if(e.key === "Enter")
        fetchData();
    });

async function fetchData(){
    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if(!response.ok){
            throw new Error("Could not fetch data from the source");
        }
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("Pokemon_sprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}