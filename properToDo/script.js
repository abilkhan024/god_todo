const todoList = new Todolist('work')
const dom = new DOM

function add(){
    const input = document.getElementsByTagName('input')[0]
    todoList.add(input.value)
    dom.addElementToList(todoList.tasks)
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