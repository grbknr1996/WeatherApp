const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=b91063b6844ee4933352aa7f9fd75f98&query='+encodeURIComponent(latitude)+' '+encodeURIComponent(longitude);
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Cannot connect to the weather service',undefined)
        }
        else if(body.error)
        {
            callback('cannot find the weather for the location',undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} degrees out .It feels like ${body.current.feelslike} degrees out`);
        }
    })
}
module.exports=forecast