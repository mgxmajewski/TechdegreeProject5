const userGenerator = 'https://randomuser.me/api/?results=12';
const fetchUsers = getUsers(userGenerator);
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
}

// Callback called when data ready
function generatePeople(data) {
    // const gender = data[0].gender;
    console.log(data);
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

