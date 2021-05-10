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

app.delete("/delete/todo/:name", (req,res)=>{
    const deleteItem = req.params.name;
    let index = 0
    const checkedItemIndex = todos.find((elem,i)=>{
        index = i;
        return deleteItem === elem.todo;
    })
    if (checkedItemIndex){
        const removedItem = todos.splice(index,1);
        console.log(todos);
        res.json(removedItem);
    }
})

app.put("/complete/todo/:name", (req,res)=> {
    const completedItem = req.params.name;
    let index = 0
    const checkeditem = todos.find((elem,i)=>{
        index = i
        return completedItem === elem.todo
    })
    console.log(checkeditem);
    if(checkeditem){
        res.status(200)
        todos[index].isCompleted= true;
        res.json(todos[index])
    } else {
        res.status(404);
        res.json("item doesn't exist");
    }
})

app.get("/completed/todos", (req,res)=>{
    res.json(todos.filter((elem,i)=>{
        return elem.isCompleted === true
    }))
    
})

app.listen(port, ()=>{
    console.log(todos);
});