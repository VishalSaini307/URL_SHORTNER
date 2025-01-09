const sessioIdTousermap = new Map();

function setUser(id , user){
    sessioIdTousermap.set(id , user);

}
function getUser(id) {
    return sessioIdTousermap.get(id);
    
}
module.exports = {
    setUser , getUser
}
