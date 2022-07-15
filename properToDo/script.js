const todoList = new Todolist('work')
const dom = new DOM

function add(){
    const input = document.getElementsByTagName('input')[0]
    todoList.add(input.value)
    const temp = document.getElementsByTagName('ul')[0]
    temp.appendChild(dom.addElementToList(todoList.tasks))
}