const adminAuth  = (req, res, next)=>{
    const token = "xyz";
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated) {
        res.status(401).send("Unauthorised request");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAuthenticated = token === "abc";
    if(isAuthenticated) {
        res.status(401).send("Unauthorised request");
    } else {
        next();
    }
}
module.exports ={
    adminAuth,
    userAuth
};