const todolist = new Todolist('work')
const tasks = todolist.tasks
todolist.add('1')
todolist.add('2')
todolist.complete(tasks[1].id)

function complete(event){
    console.log(event)
}

function createHTMLelement(tag, className = '', innerTxt = ''){
    const createdHTMLelement = document.createElement(tag)
    createdHTMLelement.innerText = innerTxt
    createdHTMLelement.classList.add(className)
    return createdHTMLelement
}

function createButton(innerTxt, className = '', onclickFn = null){
    const button = createHTMLelement('button', className, innerTxt)
    button.classList.add('control_btn')
    button.onclick = onclickFn
    return button
}

function createControlBtns(thisOfButton){ // i
    const completeBtn = createButton('☑', 'complete_btn', complete(event)) //
    const uncompleteBtn = createButton('↶', 'uncomplete_btn') //, uncomplete(i)
    const removeBtn = createButton('🗑️', 'remove_btn') //, remove(i)
    return [completeBtn, uncompleteBtn, removeBtn]
}

function createNewElement(lastAddedTask){
    const ul = document.getElementsByTagName('ul')[0]
    const element = createHTMLelement('li', 'task',)
    const descriptionSpan = createHTMLelement('span', 'description', lastAddedTask.text)
    element.append(descriptionSpan, ...createControlBtns())
    ul.appendChild(element)
}

function add(){
    const input = document.getElementsByTagName('input')[0]
    todolist.add(input.value)
    const lastAddedElement = tasks[tasks.length - 1]
    createNewElement(lastAddedElement)    
}