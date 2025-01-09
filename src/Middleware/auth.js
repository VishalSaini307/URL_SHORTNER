const {getUser} = require('../service/auth')

async function restrictToLoggedinUserOnly(req , res, next){
    const userUid = req.cookies?.uid;

    if(!userUid){
        return res.redirect('/api/static/login')
    }
    const user = getUser(userUid)
    if (!user){
        return res.redirect('/api/static/login')
    }
    req.user = user ;
    next();
}


async function checkAuth(req , res , next){
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);
    req.user = user
    next();
}
module.exports = {restrictToLoggedinUserOnly , checkAuth};