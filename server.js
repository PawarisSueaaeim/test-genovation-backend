const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { readdirSync } = require('fs');

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({
    limit: '10mb',
}));

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.listen(9001, () => console.log('Server is running on port 9001'));