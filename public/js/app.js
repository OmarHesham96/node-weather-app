const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

//messageOne.textContent = 'from 2alby'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Please Wait'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
                messageTwo.textContent = 'Please Try Again'
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})