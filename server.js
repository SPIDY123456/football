const express = require('express');
const cors = require('cors');

const routes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6543

app.use('/', routes);


app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);  
})