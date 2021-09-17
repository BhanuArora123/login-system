const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const authRouter = require("./routes/auth");

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use(authRouter);

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.kpq9o.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})