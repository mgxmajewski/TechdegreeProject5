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
    const gender = data[0].gender;
    console.log(gender);
    data.map( usersArray => {
        const personBox = document.createElement('div');
        gallery.appendChild(personBox);
        personBox.insertAdjacentHTML('beforeend',
            '<div id="two">${gender}</div>')
    });
}

