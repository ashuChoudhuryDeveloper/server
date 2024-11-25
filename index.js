const express=require("express");
const AI=require("./api-script/get_ai");
const app=express();
app.use(express.json());

app.use("/ai", AI);

app.listen(2000, () => {
    console.log("server is up!");
});
