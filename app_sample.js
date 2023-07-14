const express=require('express');
const https=require('https');

const app=express();

app.get("/",function(req,res){

    //fetching the API
    const url='https://api.openweathermap.org/data/2.5/weather?appid=5c8ff8e76fa95969baabcfc8f1d42c02&q=london&units=metric';
    https.get(url,function(response){
        
        // console.log(response);

        //printing the status code and message
        // console.log("The status code is : "+response.statusCode);
        // console.log("The status message is : "+response.statusMessage);

        //printing the data
        response.on("data",function(chunk){
            //console.log(typeof chunk);
            //console.log(chunk);
            // var ob=JSON.parse(chunk);
            // var ob1=JSON.stringify(chunk);
            // console.log(ob);
            // console.log(ob1);
            // var s=""+chunk;
            var ob=JSON.parse(chunk);
            console.log(ob.main.temp);
            console.log(ob.weather[0].description);

            const icon=ob.weather[0].icon;

            const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            //res.send("<h1>The temperature in London is : "+ob.main.temp+"</h1>");
            // console.log("inside the api get");
            res.write("<h1>The temperature in London is : "+ob.main.temp+" degree celcius</h1>");
            res.write("<p>The weather in London is : "+ob.weather[0].description+"</p>");
            res.write("<img src='"+imgurl+"' alt='This is image'/>");
            res.send();
        });
        
    });
    // res.send("Hello World");
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});