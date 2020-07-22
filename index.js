const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser")

const config = require("./config/key");

const { User } = require("./models/User")


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("mongoDB Connected.."))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World!~~~ 메롱'))

app.post('/register', (req, res) => {

//회원가입할때 필요한 정보들을 client에서 가져오면 변수로 넣어줌


    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })


})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))