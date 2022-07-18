const todoList = new Todolist()
const dom = new DOM()
const ls = new LocalStorage()

document.addEventListener("DOMContentLoaded", () => {
    ls.pushTaskInTodoListObject()
})

function addOnEnter(event){
    if (event.key === "Enter") {
        add()
    }
}

function add(text = ''){
    const input = document.getElementsByTagName('input')[0]
    if (!input.value) return
    todoList.add(input.value)
    dom.addElementToList(todoList.tasks)
    ls.add(todoList.tasks)
    input.value = ''
}

function complete(task){
    return () => {
        if(task.completedAt !== null) return
        todoList.complete(task.id)
        dom.toggle(task)
        ls.complete(task.id)
    }
}

function uncomplete(task){
    return () => {
        if(task.completedAt === null) return
        todoList.uncomplete(task.id)
        dom.toggle(task)
        ls.uncomplete(task.id)
    }
}

function remove(task){
    return () => {
        todoList.remove(task.id)
        dom.remove(task)
        ls.remove(task.id)
    }
}