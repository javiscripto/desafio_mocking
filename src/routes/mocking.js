const router=require("express").Router();

router.get("/mocking", (req, res)=>{
    res.send("ok")
})




module.exports=router;
