const userGenerator = 'https://randomuser.me/api/?results=12';
const fetchUsers = getUsers(userGenerator);
const body = document.getElementsByTagName('body');
const gallery = document.getElementById('gallery');



// Handle fetch request
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Get users from API and create array
async function getUsers(url) {
    let usersArray = []
    const peopleJSON = await getJSON(url);
    const results = peopleJSON.results;
    for (let i = 0; i < results.length; i++){
        usersArray.push(results[i])
    }
    generatePeople(usersArray);
    addClickHandler(usersArray);
}

// Callback called when data ready
function generatePeople(data) {
    // const gender = data[0].gender;
    //console.log(data);
    data.forEach( person => {
        const personBox = document.createElement('div');
        gallery.appendChild(personBox);
        personBox.insertAdjacentHTML('beforeend', `
            <div class="card">
                <div class="card-img-container">
                        <img class="card-img" src=${person.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div> 
            </div>
        `)
    });
}

function generateCloseUp(data) {
    console.log(data);
    const closeUp = document.createElement('div');
    gallery.appendChild(closeUp);
    closeUp.insertAdjacentHTML('beforeend', `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
    `)
}

function addClickHandler(data) {
    const cardToClick = document.querySelectorAll('.card');
    cardToClick.forEach( (card, index)  =>
        card.addEventListener('click', () => {
            // console.log(card);
            generateCloseUp(data[index]);
        })
    );
}



// document.addEventListener('click', async (event) => {
//     try {
//         const data = await fetchUsers;
//         generateCloseUp(data, event);
//     } catch(e) {
//         console.error(e);
//     }
// });

