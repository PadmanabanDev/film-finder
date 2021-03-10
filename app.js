const express = require('express');
const https = require ('https');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('homepage')
});

app.post ('/',(req,res)=>{
    const movieName = req.body.movieName;
    const url = "https://www.omdbapi.com/?i=tt3896198&apikey=f45fff2c&t="+movieName;
    axios.get(url).then(response =>{

        if(response.data.Response === 'True'){
            res.render('movieShowPage',{
                 
                movieTitle : response.data.Title,  
                movieReleased : response.data.Released,
                moviePlot : response.data.Plot, 
                moviePoster : response.data.Poster,
                movieActors : response.data.Actors,
                imdbRating : typeof response.data.Ratings[0] === 'undefined'? "-/-" :response.data.Ratings[0].Value ,
                rottenRating : typeof response.data.Ratings[1] === 'undefined'? "-/-" :response.data.Ratings[1].Value ,
                metacriticRating: typeof response.data.Ratings[2] === 'undefined'? "-/-" :response.data.Ratings[2].Value ,
                genre : response.data.Genre,
                director : response.data.Director,
                language : response.data.Language,
                awards : response.data.Awards,
                rated : response.data.Rated

            });

        }else {
            res.render("error");
        }
    })
});

app.post("/home", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('port listening on server 3000');
})


