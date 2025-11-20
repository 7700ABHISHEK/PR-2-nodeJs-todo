const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

let todo = []

const PORT = 8000;

app.listen(PORT, (error) => {
    console.log("Server is runnning...");
    console.log(`http://localhost:${PORT}`);
})

app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.render("index", {
        todo
    })
})

app.post("/add-student", (req, res) => {
    todo.push({
        ...req.body,
        id: Date.now()
    })
    return res.redirect('/')
})

app.get("/delete-task", (req, res) => {
    // console.log(req.query.taskId);
    todo = todo.filter((list) => {
        return list.id != req.query.taskId
    })

    return res.redirect("/");
})

app.get("/edit-task", (req, res) => {
    let task = todo.find(list => list.id == req.query.taskId);

    if (!task) {
        return res.send("Task not found");
    }

    res.render("edit", { task });
});


app.post("/edit-task", (req, res) => {
    const { id, taskName, taskPriority } = req.body;

    let index = todo.findIndex(item => item.id == id);

    todo[index].taskName = taskName;
    todo[index].taskPriority = taskPriority;

    res.redirect("/");
});
