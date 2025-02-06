const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const cors = require('cors');

const app = express();

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION =  process.env.CONNECTION;

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.get('/api/customers', async (req, res) => {
    try{
        const result = await Customer.find();
        res.json({"customers" : result});
    }catch (e) {
        res.status(500).json({ error : e.message});
    }  
});

app.get('/api/customers/:id', async (req, res) =>{
    try{
        const {id: customerId} = req.params;
        const customer = await Customer.findById(customerId);
        if(!customer){
            res.status(404).json({error: "User not found."});
        }
        else{
            res.json({customer});
        }   
    }catch (e){
        res.status(500).json({error: e.message});
    }
   
});

app.get('/api/orders/:id', async (req, res) =>{
    try{
        const {id: orderId} = req.params;
        const result = await Customer.findOne({'orders._id': orderId});
        if(!result){
            res.status(404).json({error: "Order not found."});
        }
        else{
            res.json({result});
        }   
    }catch (e){
        res.status(500).json({error: e.message});
    }
   
});


app.put('/api/customers/:id', async (req, res) => {
    try{
        const customerId = req.params.id;
        const result = await Customer.findOneAndReplace({_id: customerId}, req.body, { new: true});
        res.json({updatedCustomer: result});
    }
    catch (e){
        res.status(500).json({error: e.message});
    }   
});

app.patch('/api/customers/:id',async (req, res) => {
    try{
        const customerId = req.params.id;
        const customer = await Customer.findOneAndUpdate({_id: customerId}, req.body, { new: true});
        res.json({customer});
    }
    catch (e){
        res.status(500).json({error: e.message});
    }   
});

app.patch('/api/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    req.body._id = orderId;
    try{
        const result =  await Customer.findOneAndUpdate(
            {'orders._id': orderId},
            { $set: { 'orders.$': req.body }},
            { new: true}
        );
        if(result){
            res.json(result);
        } else{
            res.status(404).json({ error: e.message});
        }
    }
    catch (e) {

    }
});

app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try{
        await customer.save();
        res.status(201).json({customer});
    }catch( error ){
        res.status(400).json({error: error.message});
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    try{
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id: customerId});
        res.json({ deletedCount: result.deletedCount});
    } catch (e){
        res.status(500).json({ error : e.message});
    }
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
