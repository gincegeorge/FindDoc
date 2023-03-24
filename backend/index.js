const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()


require('dotenv').config()



app.listen(process.env.BACKEND_PORT, () => {
    console.log('Server started http://localhost:' + process.env.BACKEND_PORT);
})


mongoose.connect('mongodb+srv://finddoc:44iYe9xqNYQtayLd@finddocdb.avgepwd.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('DB connected');
}).catch((err)=>{
    console.log(err.message);
})

app.use(
    cors({
        origin: ["http://localhost:" + process.env.BACKEND_PORT],
        methods: ["GET", "POST"],
        credentials: true
    })
)

// app.get(req,res)

app.use(express.json())