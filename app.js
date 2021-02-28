const userGenerator = 'https://randomuser.me/api/?results=12';


// Handle all fetch requests
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}
// Get users from API
async function getUsers(url) {
    const peopleJSON = await getJSON(url);
    return peopleJSON
}

console.log(getUsers(userGenerator));