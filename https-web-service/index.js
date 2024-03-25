require('dotenv').config();

const express = require('express')
const https = require('https')
const fs = require('fs')
const cors = require('cors')

const settings = require('./settings')
const routes = require('./routes/routes')


// Create Express app
const app = express()

const port = settings.PORT

app.use(express.json())
app.use(cors())

// Mount routes
app.use('/', routes)

// Read the key and certificate files
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// Create HTTPS server with Express app
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})
