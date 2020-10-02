const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongoose', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });

 mongoose.connection.on("error", function (error){
     if (error){
         return console.log(error);
     };
 })

 const VisitorSchema = mongoose.Schema ({
    date: Date,
    name: String,
 });

 const VisitorModel = mongoose.model("Visitor", VisitorSchema);

 app.get("/", (req, res) => {
    const { name } = req.query;

    VisitorModel.create ({
        date: new Date(),
        name: name ? name : 'Anónimo',
    });

    res.send("<h1>El visitante fue almacenado con éxito</h1>");
 });

 app.listen(3000, () => {
     console.log("server listening on port: 3000")
 });
 