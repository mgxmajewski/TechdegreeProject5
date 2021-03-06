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
    data.forEach( person => {
         gallery.insertAdjacentHTML('beforeend', `
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


// Render modal container
function generateModalContainer(data, index, person) {
    const newModalContainer = document.createElement('div');
    gallery.appendChild(newModalContainer);

    const birthday = person.dob.date;
    const birthdayFormatted = formatBirthdayDate(birthday);

    const phoneNum = person.cell;
    const phoneNumFormatted =  formatPhoneNumber(phoneNum);

    newModalContainer.insertAdjacentHTML('afterend', `
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
    newModalContainer.style.display = 'none';
    closeClickHandler();
    generateToggleContainer(data, index);
    toggleClickHandler(data, index);
}


// Render toggle container
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

// Render buttons
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

// Format birthday
function formatBirthdayDate(date){
    const birthdayDay = date.substring(8, 10);
    const birthdayMonth = date.substring(5, 7);
    const birthdayYear = date.substring(0, 4);
    return `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
}

// Format phone number
// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return 'Not a valid US number! - ' + phoneNumberString
}

// Handle buttons to switch profiles
function toggleClickHandler(data, index) {
    const nextBtn = document.getElementById('modal-next');
    const prevBtn = document.getElementById('modal-prev');
    const modalContainer = document.querySelector('.modal-container');
    if (nextBtn){
        nextBtn.addEventListener('click', () => {
            modalContainer.remove();
            generateModalContainer(data, index+1, data[index+1]);
        })
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            modalContainer.remove();
            generateModalContainer(data, index-1, data[index-1]);
        })
    }
}

// Close modal container
function closeClickHandler() {
    const closeXbtn = document.getElementById('modal-close-btn');
    const modalContainer = document.querySelector('.modal-container');
    closeXbtn.addEventListener('click', () => {
        modalContainer.remove();
    })
}

// Add listeners to open modal container
function addClickHandler(data) {
    const cardToClick = document.querySelectorAll('.card');
    cardToClick.forEach( (card, index)  =>
        card.addEventListener('click', () => {
            generateModalContainer(data, index, data[index]);
        })
    );
}

// Dynamically filter users
function searchKeyUpHandler(data){
    const searchInput = document.getElementById('search-input');
    let filteredArray = [];
    searchInput.addEventListener('keyup', () =>{
        gallery.innerHTML = '';
        let searchValue = searchInput.value;
        let searchLength = searchValue.length;
        data.forEach( person => {
            let lastNameMatch = person.name.last.toLowerCase().includes(searchValue.toLowerCase());
            let firstNameMatch = person.name.first.toLowerCase().includes(searchValue.toLowerCase());
            if (searchLength !== 0 && lastNameMatch || searchLength !==0 && firstNameMatch) {
                filteredArray.push(person);
                generatePeople(filteredArray);
                addClickHandler(filteredArray);
                filteredArray = [];
            } else if (searchLength ===0) {
                filteredArray.push(person);
                generatePeople(filteredArray);
                addClickHandler(filteredArray);
                filteredArray = [];
            }
        });
    })
}

// Add search bar
function generateSearchContainer(data){
    const search = document.querySelector('.search-container');
    search.insertAdjacentHTML('beforeend', `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `)
    searchKeyUpHandler(data);
}

getUsers(userGenerator);
