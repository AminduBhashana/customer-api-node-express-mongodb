const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION =  process.env.CONNECTION;

const customers = [
    {
        "name" : "Saman",
        "industry": "IT"
    },
    {
        "name" : "kamal",
        "industry": "Textile and Apparel"
    },
    {
        "name" : "Nimal",
        "industry": "Transport"
    }
];

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.get('/api/customers', (req, res) => {
    res.send({"Customers" : customers});
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

const start = async () => {
    try {
        await mongoose.connect(CONNECTION);
        console.log("Connected to MongoDB Atlas");
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
    }
    
};

start();
