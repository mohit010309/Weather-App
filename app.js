const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app=express();
// Using the body-parser middleware
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //fetching the API
    const query = req.body.cityName;
    const apikey = "5c8ff8e76fa95969baabcfc8f1d42c02";
    const units =  "metric";
    const url='https://api.openweathermap.org/data/2.5/weather?appid='+apikey+'&q='+query+'&units='+units;
    https.get(url,function(response){
        response.on("data",function(chunk){
            var ob=JSON.parse(chunk);
            
            const icon=ob.weather[0].icon;

            const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<h1>The temperature in "+query+" is : "+ob.main.temp+" degree celcius</h1>");
            res.write("<p>The weather in "+query+" is : "+ob.weather[0].description+"</p>");
            res.write("<img src='"+imgurl+"' alt='This is image'/>");
            res.send();
        });
        
    });
    console.log("Inside the app.post method");
});



app.listen(3000,function(){
    console.log("Server is running on port 3000");
});