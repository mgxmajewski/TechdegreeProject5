const userGenerator = 'https://randomuser.me/api/?results=12';
const select = document.getElementById('test');

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error))
}

Promise.all([fetchData(userGenerator)])
.then(data => {
    const profiles = data[0].results;
    generatePeople(profiles)
})


function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generatePeople(data) {
    const date = data[0].dob.date;
    console.log(date)
    // const options = data.map(item => `
    // <option value='${item}'>${item}</option>
    // `).join('');
    // select.innerHTML = options;
}
