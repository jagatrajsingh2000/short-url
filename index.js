const express = require('express');
const URL = require('./models/url');
const urlRoutes = require('./routes/url');

const {mongoDbConnection} = require('./connection');
const app = express();
const PORT = 8000

app.use(express.json());

// database collection
mongoDbConnection("mongodb://localhost:27017/url").then(()=> console.log("mongodb connected"))
.catch(err => console.log("error connecting", err))

app.use('/url',urlRoutes);
app.get("/:shortId",async (req,res)=>{
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