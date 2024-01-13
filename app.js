const express=require("express")
const path=require("path")
const fs=require("fs")
const app=express()
const hostname = '127.0.0.1'
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    // const params = {}
    res.status(200).render('home.pug');
})
//params is object which contains variable  for pug file 
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})




// START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });

//starting the server
app.listen(port, () => {
    console.log(`The application has started on port http://${hostname}:${port}/`);
})


//mongoose stuff
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rishikeshmishra835:qulsIrUBxgMKR4i4@cluster0.mon7jy4.mongodb.net/tutorial2?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//new schema declared down below
const phoneSchema = new mongoose.Schema({
    name: String,
    price: Number,
    rating: Number,
    qty: Number,
    sold: Number  

  });

//creating model
const phone= mongoose.model('phone',phoneSchema)
const realme = new phone({name:"realme 9pro", price: 17000, rating:4.5,qty: 500, sold:655 })

realme.save();


