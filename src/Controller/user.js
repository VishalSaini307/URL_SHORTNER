const User = require('../Model/user')
const {v4: uuidv4} = require("uuid")
const {setUser} = require('../service/auth')


async function handleUserSignup(req , res){
    const {name , email , password } = req.body;
    await User.create({
        name, 
        email,
        password,
    })
    return res.redirect("/api/static/login");
}
async function  handleUserLogin(req , res){
    const {email , password} = req.body;
    const user = await User.findOne({email , password});
    if(!user)
         return response.render('login',{
        error : "Invalid UserName or Password",
        });

        const sessionId = uuidv4();
        setUser(sessionId ,user);
        res.cookie('uid',sessionId)
        return res.redirect("/api/static")
} 

module.exports ={handleUserSignup , handleUserLogin};