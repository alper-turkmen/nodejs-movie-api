const express = require('express');
const router = express.Router();

//Models
const Movies = require('../models/Movie');

router.get('/', (req, res) => {
   const promise = Movies.find({ });
   promise.then((data) => {
     res.json(data);
   }).catch((err) => {
     res.json(err);
  });
});

router.get('/top10', (req, res) => {
    const promise = Movies.find({ }).limit(10).sort({imdb_score: -1});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


router.get('/:movie_id', (req, res, next) => {
    //res.send(req.params);
    const promise = Movies.findById(req.params.movie_id);
    promise.then((movie) => {
        if(!movie){
            next({message:'movie not found'});
        }else{
            res.json(movie);
        }
    }).catch((err) => {
        res.json(err);
    } )
});



router.delete('/:movie_id', (req, res, next) => {
    //res.send(req.params);
    const promise = Movies.findByIdAndRemove(req.params.movie_id);
    promise.then((movie) => {
        if(!movie){
            next({message:'movie not found'});
        }else{
            res.json({status: 1});
        }
    }).catch((err) => {
        res.json(err);
    } )
});

//TOP 10


router.put('/:movie_id', (req, res, next) => {
    //res.send(req.params);
    const promise = Movies.findByIdAndUpdate(req.params.movie_id, req.body, {new:true});
    promise.then((movie) => {
        if(!movie){
            next({message:'movie not found'});
        }else{
            res.json(movie);
        }
    }).catch((err) => {
        res.json(err);
    } )
});

/* GET users listing. */
router.post('/', (req, res, next) => {
  //const {title, imdb_score, category, country, year} = req.body;
  /*
  const movie = new Movie({
     title:title,
     imdb_score:imdb_score,
     category:category,
     country:country,
     year:year
   });
             */

  const movie = new Movies(req.body);

   movie.save((err, data) => {
     if(err){
       res.json(err);
     }else{
       res.json({status:1});
     }
   })

  //res.json(imdb_score);
});


//Between

router.get('/between/:start_year/:end_year', (req, res) => {
    const{start_year, end_year} = req.params;
    const promise = Movies.find({
        year: { '$gte' : parseInt(start_year), '$lte': parseInt(end_year)}
        //  year: { '$gt' : parseInt(start_year), '$lt': parseInt(end_year)}
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;
