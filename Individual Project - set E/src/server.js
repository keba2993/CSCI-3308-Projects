/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

const axios = require('axios');
const qs = require('query-string');


/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user:  process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

const db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



/*Add your other get/post request handlers below here: */

app.get('/', function(req, res) {
  // res.json({ status: "success", message: "Welcome!" })

  res.render('pages/main', {
    my_title: "Home",
    items: '',
    error: false,
    status: 'success',
    message: 'Welcome!'
  });
});

app.get('/main', function(req, res) {
  res.render('pages/main', {
    my_title: "Home",
    items: '',
    error: false,
    status: 'fail',
    message: ''
  });
});


app.post('/main/search', function(req, res) {
	var meal = req.body.meal_name;
	var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

	if(meal) {
    axios({
      url: url,
        method: 'GET',
        dataType:'json',
      })
        .then(items => {
          // TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
          // Did console.log(items) return anything useful? How about console.log(items.data.results)?
          // Stuck? Look at the '/' route above

          // console.log(items);
	        console.log(items.data.meals[0]);
	        // for(var i=0; i < items.data.meals.length; i++) {
		      //   console.log(items.data.results[i]);
          // }

          res.render('pages/main',{
            my_title: "Meal",
            items: items.data.meals[0],
            error: false,
            message: ''
          })
        })
        .catch(error => {
          console.log(error);
          res.render('pages/main',{
            my_title: "Meal",
            items: '',
            error: true,
            message: error
          })
        });


  }
  else {
    // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
    // Stuck? On the web page, try submitting a search query without a search term
    res.render('pages/main',{
      my_title: "Meal",
      items: '',
      error: true,
      message: `Error: No meal Provided. Please provide a meal in the search bar.`
    })
  }
});

app.get('/reviews', function(req, res) {
  var reviews_query = `SELECT * FROM meal_reviews;`;
  db.task('get-everything', task => {
    return task.batch([
        task.any(reviews_query)
    ]);
  })
    .then(data => {
      // res.status(200).send({reviews: data[0]})

      res.render('pages/reviews', {
        my_title: "Reviews Page",
        reviews: data[0]
      })
    })
    .catch(err => {
      console.log('error', err);
      res.render('pages/reviews', {
        my_title: 'Reviews Page',
        reviews: ''
      })
    })
});

app.post('/reviews', function(req, res) {
  var meal = req.body.meal_name;
  var review = req.body.review_text;
  var d = new Date();
  let review_date = d.toISOString().substr(0, 10);

  var insert_statement = `INSERT INTO meal_reviews(meal_name, review, review_date) VALUES('${meal}', '${review}', '${review_date}');`;
  var reviews_query = `SELECT * FROM meal_reviews;`;
  db.task('get-everything', task => {
    return task.batch([
        task.any(insert_statement),
        task.any(reviews_query)
        
    ]);
  })
    .then(data => {      
      res.render('pages/reviews', {
        my_title: "Reviews Page",
        reviews: data[1]
      })
    })
    .catch(err => {
      console.log('error', err);
      res.render('pages/reviews', {
        my_title: 'Reviews Page',
        reviews: ''
      })
    })
});

app.post('/reviews/filter', function(req, res) {
  var filter = req.body.meal_filter;
  var reviews_query = `SELECT * FROM meal_reviews WHERE meal_name = '${filter}';`;
  db.task('get-everything', task => {
    return task.batch([
        task.any(reviews_query)
    ]);
  })
    .then(data => {
      // res.status(200).send({reviews: data[0]})

      res.render('pages/reviews', {
        my_title: "Reviews Page",
        reviews: data[0]
      })
    })
    .catch(err => {
      console.log('error', err);
      res.render('pages/reviews', {
        my_title: 'Reviews Page',
        reviews: ''
      })
    })
});

//app.listen(3000);
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
module.exports = server;