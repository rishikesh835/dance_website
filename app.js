const express = require("express")
const path = require("path")
const fs = require("fs")
const bodyParser=require("body-parser")
const mongoose = require('mongoose');
var dotenv = require('dotenv');

const app = express()
const hostname = '127.0.0.1'
const port = 8000;


dotenv.config();
var url = process.env.MONGOLAB_URL;



async function main() {
  
  await mongoose.connect(url);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//mongoose and mongoDB STUFF
main().catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  desc: String
});

var Contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

  // const params = {}
  res.status(200).render('home.pug');
})
//params is object which contains variable  for pug file 
app.get('/contact', (req, res) => {

  
  res.status(200).render('contact.pug');

})
app.post('/contact',(req,res)=>{
  var myData=new Contact(req.body);
  myData.save().then(()=>{
    res.send("this item is sent to datababse")
  }).catch(()=>{
    res.status(400).send("item was not saved to the database")
  })
})



// START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });

//starting the server
app.listen(port, () => {
  
  console.log(`The application has started on port http://${hostname}:${port}/`);
})