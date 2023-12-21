const request = require('request');
const url ="http://api.weatherstack.com/current?access_key=2742b7719d9f4168f79000f446df631a&query=37.8267,-122.4233&units=f";

request({url: url, json: true}, (error, response) =>{
    if(error){
        console.log("unable to connect to weather server")
    }
    else if(response.body.error){
        console.log("unable to find location");
    }
    else{
        console.log(response.body.current.temperature);
    }
    //const data = JSON.parse(response.body);
    //console.log(response.body.current);
    console.log(response.body.current.weather_descriptions[0]+" it's currently ", response.body.current.temperature, "farheineit", "but it feels like " , response.body.current.feelslike, "farheineit");
})

/* const geocode = (address,callback) => {
    setTimeout(()=> {
        const data = {
            latitude:0 ,
            longitude: 0
        }
        callback(data);
    }, 2000)
}
geocode('Philadelphia',(data)=>{
    console.log(data)
}) */
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/'+encodeURIComponent(address)+'forward?access_key=af244288b32a143fd172776c2ec80086&query=Philadelphia'

    request({url:url, json:true}, (error,response)=>
    {
        if(error){
            callback('Unable to connect to location service', undefined)
        } else if(response.body.length===0){
            callback('Unable to connect to location service. Try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.latitude,
                longitude: response.body.longitude
            })
        }
})
}
geocode('Philadelphia', (error,data)=>{
    console.log('Error',error)
    console.log('data',data)
})
//this api provides a geocoding service (mapbox.com)
const geocodingurl = "http://api.positionstack.com/v1/forward?access_key=af244288b32a143fd172776c2ec80086&query=Philadelphia"

request({url: geocodingurl, json: true},(error, response) => {
    
    const latitude1 = response.body.data[0];
    const longitude1 = response.body.data[0];
    console.log("latitude1: ", latitude1, "longitude1: ", longitude1);
})



//npm init -y (to not have to answer questions and go with the default values)
/* console.log("Starting");

//asynchronous function
setTimeout(()=>{
    console.log("2 second timer");

}, 2000);

setTimeout(()=>{
    console.log("0 second timer");}
    ,0 )

console.log("stopping"); */

//http request: real time communication with the world
