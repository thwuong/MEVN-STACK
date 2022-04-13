const express = require('express');
const config = require('./app/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./app/config/connectDb');
const port = config.port;
const app = express();
const route = require('./app/routes');
// connect db
connectDB();
// midleware
app.use(cors());
app.use(express.json());
// router
route(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`Server running in port http://localhost:${port}`);
})
