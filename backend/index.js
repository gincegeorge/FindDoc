const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./Routes/AuthRoutes')
require('dotenv').config()

const app = express()

//logger
app.use(morgan('dev'))

//server setup
app.listen(process.env.BACKEND_PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server started http://localhost:' + process.env.BACKEND_PORT);
    }
})

//database connection
mongoose.connect('mongodb+srv://finddoc:44iYe9xqNYQtayLd@finddocdb.avgepwd.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(err.message);
})

//cors
app.use(
    cors({
        origin: ["http://localhost:" + process.env.BACKEND_PORT],
        methods: ["GET", "POST"],
        credentials: true
    })
)

app.get('/', (req, res) => {
    res.status(200).send("working")
})

app.use(cookieParser())
app.use(express.json())
app.use('/', authRoutes)