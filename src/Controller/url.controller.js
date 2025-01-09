const URL = require('../Model/url');
const shortid = require('shortid')

async function handleGenrateShortURl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }


  

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        vistHistory: [],
        createdBy : req.user._id
    });

    return res.render( "home" ,{
        id : shortID
    });
}

async function showGenrateURl(req, res) {
    const shortId = req.params.shortId;

  
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true } 
    );


    if (!entry) {
        return res.status(404).send('URL not found');
    }


    res.redirect(entry.redirectURL);
}

async function handleGenrateAnalytics(req ,res){
    const shortId = req.params.shortId;
   const result =   await URL.findOne({shortId})
   return res.json({
    totalclicks : result.visitHistory.length,
    analytics : result.visitHistory,
   })

}


module.exports = {
    handleGenrateShortURl,showGenrateURl,handleGenrateAnalytics
};