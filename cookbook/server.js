const { handleError } = require('./server/middleware/error-handling')
const path = require('path');
const express = require('express')
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3300;

//CORS
const cors = require('cors')
app.use(cors())

// Static pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// adding routes
app.use(express.json())
    .use('/', require('./server/routes'))

// Handling Errors
app.use(handleError);

app.listen(port,() => console.log(`Server is running on port ${port}`));
