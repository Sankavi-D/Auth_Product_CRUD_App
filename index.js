const express = require('express')
const mongoose = require('mongoose');
const productRoute = require("./routes/product.route");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//route
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
    res.send("Hello from Node API Server")
});;

mongoose.connect("mongodb+srv://sankavi:6qyhiI8gTqbV3kFU@backend.4fpxnia.mongodb.net/?retryWrites=true&w=majority&appName=Backend")
.then(()=> {
    console.log("Connected to Database");
    app.listen(3000, () => {
        console.log("Server is running in port 3000");
    });
})
.catch(() => {
    console.log("Connection Failed");
});




