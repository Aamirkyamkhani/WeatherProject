const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html") 
});
app.post("/",function(req,res){
    const query = req.body.cityName
    const apikey = "74b14f118a67b85a8cd2b883e0bdd959"
    const unit = "metric"
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${unit}`
    
    
    https.get(url,(response)=>{
        console.log(response.statusCode);

        response.on("data",(data)=>{
            
        const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description  
    const icon = weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
   res.write("<p>The weather is currently" + weatherDescription +"</p>")
   res.write("<h1>The Temperature in "+query+" is"+ temp +"degree celcius</h1>")
   res.write("<img src"+ imageURL +">")
   res.send()    
})
    })
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})