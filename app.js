const express = require("express");

const app = express();
const port = 3000;

app.use(express.json())

const todos = [{ todo: "wake up", isCompleted: false }, { todo: "Eat Breakfast", isCompleted: false }];

app.get("/todos", (req,res)=>{
    res.json(todos);
})

app.post("/create/todo", (req,res)=>{
    const add_todo = {todo: req.body.todo, isCompleted: req.body.isCompleted};
    todos.push(add_todo);
    res.json(add_todo);
});

app.put("/update/todo/:name", (req,res)=>{
    const updateItem = req.params.name;
    const add_item = {todo: req.body.todo, isCompleted: req.body.isCompleted};
    const checkeditem = todos.find((elem,i)=>{
        return updateItem === elem.todo
    })

    if(checkeditem){
        res.status(200)
        checkeditem.todo= req.body.todo;
        checkeditem.isCompleted= req.body.isCompleted;
        res.json(checkeditem)
    } else {
        res.status(404);
        res.json("item doesn't exist");
    }
});

app.listen(port, ()=>{
    console.log("hello world");
});