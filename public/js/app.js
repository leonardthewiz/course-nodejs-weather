console.log("client-side JS loaded!")

/* fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else{
            console.log(data.location)
            console.log(data.forecast)
        }

    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const results = document.querySelector('#results')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                results.textContent = data.errorb
            } else {
                //console.log(data)
                results.textContent = data.label + " - " + data.forecastData
            }
        })
    })
})