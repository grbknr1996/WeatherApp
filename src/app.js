const express= require('express');
var path=require('path');
const hbs=require('hbs')
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
const app=express();
const port=process.env.PORT||3000;

//Define Path for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handle bars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Gourab Konar'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Gourab Konar'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is a helpful text ',
        title:'Help',
        name:'Gourab Konar'
    });
});
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Gourab Konar',
        errorMessage:'Help article not found'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
            return res.send({
                error:'You must provide an address'
                })
            }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error)
            {
               return res.send({error});
            }
            else{
               forecast(latitude,longitude,(error,forecastData)=>{
                  if(error)
                  {
                    return res.send({error});
                  }
                 else{
                    res.send({      
                        forecast:forecastData,
                        location:location,
                        address:req.query.address
                    })
                 }
               })
            }
            
         })
    }
    
})

app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Gourab Konar',
       errorMessage:'Page not found'
   })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port);
})