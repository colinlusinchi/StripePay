console.log("Stripe Payment is running.");

var dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
var skey = process.env.STRIPE_S_KEY;

var express = require("express");
var stripe = require("stripe")(skey);
var hbs = require("hbs");
var bodyParser = require("body-parser");
// require and load dotenv


var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('index', {
  });
});

app.get('/paysuccess', function(req, res){
  res.render('paysuccess', {
  });
});

app.post('/charge', function(req, res){
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "eur",
    source: token
  }, function(err, charge){
    if(err && err.type === "StripeCardError"){
      console.log("Your card was declined");
    }
  });
  console.log("Your payment was successful.");
  res.redirect('/paysuccess');
});

app.listen(3000, function(){
  console.log("Stripe is Running");
});
