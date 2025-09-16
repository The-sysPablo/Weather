const clubForm = document.querySelector(".box");
const clubInput = document.querySelector(".clubName");
const card = document.querySelector(".card");
const apiKey = `ebd45361abcc4e3b80f7dae1bb7fe0e8`;

clubForm.addEventListener("submit", async e => {
    
    e.preventDefault();

    const club = clubInput.value;

    if(club){
        try{
            const clubData = await getClubData(club);
            displayClubData(clubData);
    }catch(error){
        console.error(error);
        displayError(error);
    }
    }else{
        displayError("Could not find this club, please try again.");
    }
    
})

async function getClubData(club){
    const apiURL = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${club}`;
    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("Could not fetch club data")
    }
        return await response.json();
}

function displayClubData(data){
    console.log(data);
    const team = data.teams?.[0];
    if(!team){
        displayError("Could not found the club");
        return;
    }
    const {strTeam, strStadium, intStadiumCapacity, strBadge} = team;
    card.textContent = "";
    card.style.display = "flex";

    const clubDisplay = document.createElement("h1");
    const stadiumDisplay = document.createElement("p");
    const stadiumCapacityDisplay = document.createElement("p");
    const logoDisplay = document.createElement("img");
    

    clubDisplay.textContent = `Club: ${strTeam}`;
    stadiumDisplay.textContent = `Stadium: ${strStadium}`;
    stadiumCapacityDisplay.textContent = `Stadium capacity: ${intStadiumCapacity}`;
    logoDisplay.src = strBadge;
    logoDisplay.alt = `club logo`;

    clubDisplay.classList.add("clubDisplay");
    stadiumDisplay.classList.add("stadiumDisplay");
    stadiumCapacityDisplay.classList.add("stadiumCapacityDisplay");
    logoDisplay.classList.add("badgeDisplay");

    card.appendChild(logoDisplay);
    card.appendChild(clubDisplay);
    card.appendChild(stadiumDisplay);
    card.appendChild(stadiumCapacityDisplay);

    

}

function displayError(message){
    window.alert(message);
}
