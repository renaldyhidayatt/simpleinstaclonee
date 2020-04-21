const express = require('express');
const app = express()
const mongoose = require('mongoose');


// pass aiHKqSHpuTu8N0bj
const db = require("./config/dbSecretKeys").MONGOURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("we are connected to our"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    console.log('home')
    res.send("hello world")
});

require('./models/users');
require('./models/posts');

const auth = require("./routes/auth");
const users = require("./routes/users");
const posts = require("./routes/post");


app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/users", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})