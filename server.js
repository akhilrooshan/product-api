const express = require("express")
const userdb = require('./models/usermodels')
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express()
const cors = require('cors')
const adminRouter = require('./routes/admin.router')
const userRouter = require('./routes/user.router')

const bodyParser = require('body-parser')
const verifyAdminTokenMiddleware=require('./middleware/admin')
const verifyUserTokenMiddleware=require('./middleware/user')
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors({
    origin: ['http://localhost:4200']
}));
app.post("/login", (req, res) => {
    const { username, password} = req.body;
    getLog=async(request,response)=>{
        const data=await userdb.findAll()

        for(i=0;i<data.length;i++)
        {

            if (username === data[i].dataValues.username && password === data[i].dataValues.password && data[i].dataValues.role=="admin" ) {
                const id=data[i].dataValues.id
                const token = jwt.sign({ username ,id},
                    process.env.JWT_ADMIN_SECRET_KEY,{expiresIn: 1800000});
                return res.json({ username, token, msg: "Login Success" });
                break;
            }else if(username === data[i].dataValues.username && password === data[i].dataValues.password){
                const id=data[i].dataValues.id
                const token = jwt.sign({ username,id },
                    process.env.JWT_USER_SECRET_KEY,{expiresIn: 1800000});
                return res.json({ username, token, msg: "Login Success" });
                break; 
            }
        }
        return res.json({ msg: "Invalid Credentials" });    
    }
    getLog()
    
});
//middleware -allows us to relax the security applied to an API.
app.get('/', async (req, res) => {
    try {
        await res.status(200).send({ message: "Welcome to my app" })
    } catch (error) {
        await res.status(500).send(error.message)
    }
})
app.use("/api/admin",verifyAdminTokenMiddleware,adminRouter);

app.use("/api",verifyUserTokenMiddleware,userRouter);


app.listen(8702, async (req, res) => {
    try {
        await console.log("Your app running on port 8702");
    } catch (error) {
        json
        await console.log(error.message);
    }
})














// const verifyuserTokenMiddleware = (req, res, next) => {
//     if(req.header('Authorization')==undefined){
//         res.send(500).message("Invalid access")
//     }
//     const token = req.header('Authorization').split(' ');
//     console.log(token[1])
//     if (!token) return res.status(403).json({
//         msg: "No token present"
//     }); 
//     try {
//         const decoded = jwt.verify(token[1],
//             process.env.JWT_SECRET_KEY);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).json({
//             msg: "Invalid Token"
//         });
//     }
//     next();
// };