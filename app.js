const userGenerator = 'https://randomuser.me/api/?results=12';
const promiseToParse = getUsers(userGenerator)



// Handle all fetch requests
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}
const usersArray = [];

// Get users from API and create array
async function getUsers(url) {
    const peopleJSON = await getJSON(url);

    const results = peopleJSON.results;
    for (let i = 0; i < results.length; i++){
        usersArray.push(results[i])
    }
}



