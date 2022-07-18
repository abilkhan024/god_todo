const todoList = new Todolist('work')
const dom = new DOM

function addOnEnter(event){
    if (event.key === "Enter") {
        add()
    }
}

function add(){
    const input = document.getElementsByTagName('input')[0]
    if (!input.value) return
    todoList.add(input.value)
    dom.addElementToList(todoList.tasks)
    input.value = ''
}

function complete(task){
    return () => {
        if(task.completedAt !== null) return
        todoList.complete(task.id)
        console.log(dom.toggle(task))
    }
}

function uncomplete(task){
    return () => {
        if(task.completedAt === null) return
        todoList.uncomplete(task.id)
        console.log(dom.toggle(task))
    }
}

function remove(task){
    return () => {
        todoList.remove(task.id)
        console.log(dom.remove(task))
    }
}