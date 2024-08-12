const express = require('express')
const mongoose = require('mongoose')
const User = require('./Model/User')
const app = express()
const port = 5001
require('dotenv').config({
    path: './config/.env'
})

app.use(express.json())
const URI = process.env.MANGO_URI
app.get('/', (req,res)=>{
    res.send('Hello')
})
console.log(URI)
mongoose.connect(URI)
.then(rep => {
    console.log(`connexion reussie ${rep.connection.name}`)
})
.catch(error=>{
    console.log(error)
})

app.get('/Users',(req,res)=>{
  User.find()
  .then(rep =>{
    res.status(200).json({data: rep})
  }) 
  .catch(error =>{
    res.status(500).json({erreur: error})
  })
})

app.post('/Users', (req, res)=> {
    const{nom, email} = req.body
    User.create({nom: nom, email: email})
    .then(rep => {
        const msg = "ajout reussi"
        res.status(201).json({message: msg, data: rep})
    })
    .catch(error =>{
        res.status(500).json({erreur: error})
      })
} )

app.put('/Users/:id', (req, res) => {
    const{nom, email} = req.body
    const id = req.params.id
    console.log(req.body, id)

    User.findByIdAndUpdate(id, {nom: nom, email: email}, {new: true})
    .then(rep => {
        const msg = "modification reussi"
        res.status(201).json({message: msg, data: rep})
    })
    .catch(error =>{
        res.status(500).json({erreur: error})
      })
})

app.delete('/Users/:id', (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(rep => {
        const msg = "supression reussie"
        res.status(200).json({message: msg, data: rep})
    })
    .catch(error =>{
        res.status(500).json({erreur: error})
      })
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})