const mainEL = document.querySelector('.main')
const wrapper = document.createElement('div')


const formEL = document.createElement('form')
formEL.classList.add('search')
formEL.addEventListener('submit' , async (e)=> {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target))
    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`)

    if(response.ok){
        const data = await response.json()
        wrapper.appendChild(createProfileCard(data))
        mainEL.appendChild(wrapper)
    }else{
        alert("Пользователь не найден")
    }
})

const inputEL = document.createElement('input')
inputEL.classList.add('search-input')
inputEL.setAttribute('name' ,'name')

const searchButton = document.createElement('button')
searchButton.classList.add('search-button')
searchButton.setAttribute('type' , 'submit')
searchButton.innerHTML = 'Найти'

formEL.appendChild(inputEL)
formEL.appendChild(searchButton)

mainEL.appendChild(formEL)


function createProfileCard(profileData){
    const element = document.createElement('div')
    element.classList.add('profile')
    element.innerHTML = `
    <img src="${profileData.avatar_url}" class="search-image" alt="">
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
    <p class="search-text"><span>Ссылка на GitHub: </span>${profileData.html_url}</p>
    `
    element.appendChild(deleteProfileCard())
    return element
}

function deleteProfileCard(){
    const element = document.createElement('button')
    element.classList.add('deletebtn')
    element.innerText = "Delete"
    element.addEventListener('click', ()=> {
    wrapper.innerHTML = ''
    })
    return element
}