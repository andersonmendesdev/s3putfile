const express = require('express')
const bodyParser = require('body-parser')
const upload = require('./controllers/sendingImage')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/upload', upload.single('doc'), (req, res) => {
    res.send({
        status: 200,
        data: {
            sucess: true,
            file: req.file
        }
    })
})
app.post('/uploaders',upload.array('files'), (req, res) => {
    res.send({
        status: 200,
        data: {
            sucess: true,
            file: req.files
        }
    })
})

app.post('/bulkupload', upload.array('files'), (req, res) => {
    res.send({
        status: 200,
        data: {
            sucess: true,
            file: req.files
        }
    })   
})

app.listen(port, () => console.log('running in port '+port))