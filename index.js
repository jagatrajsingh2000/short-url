const express = require('express');
const URL = require('./models/url');
const urlRoutes = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const path = require('path');
const {mongoDbConnection} = require('./connection');
const app = express();
const PORT = 8000

// database collection
mongoDbConnection("mongodb://localhost:27017/url").then(()=> console.log("mongodb connected"))
.catch(err => console.log("error connecting", err))

app.set("view engine", "ejs");
app.set('views', path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use("/static",staticRoutes);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    })
})


app.use('/url',urlRoutes);
app.get("/url/:shortId",async (req,res)=>{
    console.log("helloo");
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate(
        {shortId,},
        {
            $push: {
                visitHistory: {
                    timestam: Date.now(),
                }
            }
        }
    )
    res.redirect(result.redirectURL);
})


app.listen(PORT, () => console.log(`listing to Port: ${PORT}`));