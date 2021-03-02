const userGenerator = 'https://randomuser.me/api/?results=12&?nat=us';
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
    generateSearchContainer(usersArray);
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
                        <p class="card-text cap">${person.location.city}</p>
                    </div> 
            </div>
        `)
    });
}


function generateModalContainer(data, index, person) {
    console.log(person);
    const newModalContainer = document.createElement('div');
    gallery.appendChild(newModalContainer);

    const birthday = person.dob.date;
    const birthdayFormatted = formatBirthdayDate(birthday);

    const phoneNum = person.cell;
    const phoneNumFormatted =  formatPhoneNumber(phoneNum);

    newModalContainer.insertAdjacentHTML('beforeend', `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${person.picture.large}  alt="profile picture">
                    <h3 id="name" class="modal-name cap">${person.name.first}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${phoneNumFormatted}</p>
                    <p class="modal-text">${person.location.street.name} ${person.location.street.number},</br> 
                                          ${person.location.state}, ${person.location.postcode}</p>
                    <p class="modal-text">${birthdayFormatted}</p>
                </div>
            </div> 
        </div>
    `)
    closeClickHandler();
    generateToggleContainer(data, index);
    toggleClickHandler(data, index);
}

function generateToggleContainer(data, index) {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.insertAdjacentHTML('beforeend', `
        <div class="modal-btn-container"></div>
    `)
    if (index !== 0) {
        generatePrevButton();
    }
    if (index !== data.length-1) {
        generateNextButton();
    }
}

function generatePrevButton() {
    const toggleContainer = document.querySelector('.modal-btn-container');
    toggleContainer.insertAdjacentHTML('beforeend', `
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    `)
}

function generateNextButton() {
    const toggleContainer = document.querySelector('.modal-btn-container');
    toggleContainer.insertAdjacentHTML('beforeend', `
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `)
}

function formatBirthdayDate(date){
    const birthdayDay = date.substring(8, 10);
    const birthdayMonth = date.substring(5, 7);
    const birthdayYear = date.substring(0, 4);
    return `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
}

// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return 'Not a valid US number! - ' + phoneNumberString
}


function toggleClickHandler(data, index) {
    const nextBtn = document.getElementById('modal-next');
    const prevBtn = document.getElementById('modal-prev');
    const modalContainer = document.querySelector('.modal-container');
    if (nextBtn){
        nextBtn.addEventListener('click', () => {
            modalContainer.remove();
            if (index+1 === data.length-1) {
                console.log('disabled');
            }
            generateModalContainer(data, index+1, data[index+1]);
        })
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            modalContainer.remove();
            if (index-1 === 0) {
                console.log('disabled');
            }
            generateModalContainer(data, index-1, data[index-1]);
        })
    }
}

function closeClickHandler() {
    const closeXbtn = document.getElementById('modal-close-btn');
    const modalContainer = document.querySelector('.modal-container');
    closeXbtn.addEventListener('click', () => {
        modalContainer.remove();
    })
}

function addClickHandler(data) {
    const cardToClick = document.querySelectorAll('.card');
    cardToClick.forEach( (card, index)  =>
        card.addEventListener('click', () => {
            // console.log(card);
            generateModalContainer(data, index, data[index]);
        })
    );
}

function generateSearchContainer(data){
    const search = document.querySelector('.search-container');
    search.insertAdjacentHTML('beforeend', `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `)
}

getUsers(userGenerator);

// document.addEventListener('click', async (event) => {
//     try {
//         const data = await fetchUsers;
//         generateModalContainer(data, event);
//     } catch(e) {
//         console.error(e);
//     }
// });

