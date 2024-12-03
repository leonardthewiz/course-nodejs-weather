console.log("client-side JS loaded!")

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
                results.textContent = data.label + " - " + data.forecastData
            }
        })
    })
})