const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db');

const app = express();
const productRouter = require('./routes/productRouter')

app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/FOOD-ORDERING-DB', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
console.log('Database Connection is ready...')
})
.catch((err)=> {
console.log(err);
})





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
 

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Food Ordering"}
    )}
)



 app.use('/', require('./routes/productRouter') )

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


