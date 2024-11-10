const express = require('express')
const path = require('path')
const index = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.set('partials',partialsPath)
app.use(express.static(index))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"my test title"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        helptext:"here's some help text"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title:"help article not found"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"please provide a search"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,label}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                label,
                forecastData
            })
        })
    })
})


app.get('*',(req,res)=>{
    res.send("damn")
})

app.listen(port,()=>{
    console.log('server started on port 3000')
})