const express=require("express");
const AI=require("./api-script/get_ai");
const app=express();
app.use(express.json());

app.use("/ai", AI);
app.get("/help", (req, res) => {
   res.json({
msg: "hello server is Very happy ",
       time: new Date().toLocaleString()
});
});
app.listen(2000, () => {
    console.log("server is up!");
});
