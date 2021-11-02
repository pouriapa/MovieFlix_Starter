/*
 Authors:
 Pouria Pourarjmand and student #: A01176014
 
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs').promises

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


let html = ''
sfasadfasd


app.get("/", (req, res) => res.render("pages/index", {data: html}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {  
    let data = req.body
    let movies = data.movies.split(',')
    
    movies.forEach(element => {      
       html += `<label class="todo-list__label">
      <input type="checkbox" name="" id="" />
      <i class="check"></i>
      <span>${element}</span>
      </label>`
    });

    res.render('pages/index',{data: html})
});

app.get("/myListQueryString", (req, res) => {
  let query = req.query
  if(query.movie1 === '' || query.movie2 === '') res.render('pages/index', {data: `<h2>Empty fileds not allowed<h2>`})
  let html = `<label class="todo-list__label">
  <input type="checkbox" name="" id="" />
  <i class="check"></i>
  <span>${query.movie1}</span>
  </label> <label class="todo-list__label">
  <input type="checkbox" name="" id="" />
  <i class="check"></i>
  <span>${query.movie2}</span>
  </label>`
  
  res.render('pages/index', {data: html})  
});

app.get("/search/:movieName", async(req, res) => {
  let movie = req.params.movieName
  let fileContent = await fs.readFile('./movieDescriptions.txt', 'utf-8')
  let tempContent = fileContent.split('\n')
 
  tempContent.forEach(element => {
    if(element.split(':')[0].toLowerCase() === movie.toLowerCase()){
      res.render('pages/searchResult', {moviename: movie , description: element.split(':')[1], errMessage:''})
    }     
  })

  res.render('pages/searchResult',{moviename:'', description:'', errMessage: `Movie could not be found`})

});



app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});