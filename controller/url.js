const shortId = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "url is required"});
    const shortID = shortId();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.render("home", {
        id: shortID,
    })
    
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const results = await URL.findOne({ shortId});
    return res.json({
        totalClicks: results.visitHistory.length,
        analytics: results.visitHistory,
    })
}
module.exports = {handleGenerateNewShortURL, handleGetAnalytics}