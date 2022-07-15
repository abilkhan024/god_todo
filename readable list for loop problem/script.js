const todolist = new Todolist('work')
const tasks = todolist.tasks
todolist.add('1')
todolist.add('2')
todolist.complete(tasks[1].id)

const app = document.getElementsByClassName('app')[0]

window.addEventListener('DOMContentLoaded', (event) => {
    generateUL()
});

function order(){
    todolist.sortToggle()
    generateUL()
}

function onKeypressEnter(event){
    if((event.key !== "Enter")) return
    event.preventDefault();
    add()
}

function add(){
    let inputField = document.getElementsByTagName('input')[0]
    if(!inputField.value) {
        alert('Input empty')
        return
    }
    todolist.add(inputField.value)
    inputField.value = ''
    generateUL()
}

function complete(index){
    return function(){
        if(todolist.complete(tasks[index].id) === -1) {
            alert('Task already completed')
            return
        }
        generateUL()
    }
}

function uncomplete(index){
    return function(){
        if(todolist.uncomplete(tasks[index].id) === -1) {
            alert('Task is not completed')
            return
        }
        generateUL()
    }
}

function remove(index){
    return function(){
        todolist.remove(tasks[index].id)
        generateUL()
    }
}

function createHTMLelement(tag, innerTxt = '', className = ''){
    const createdHTMLelement = document.createElement(tag)
    createdHTMLelement.innerText = innerTxt
    createdHTMLelement.classList.add(className)
    return createdHTMLelement
}

function createButton(innerTxt, className = '', onclickFn = null){
    const button = createHTMLelement('button', innerTxt, className)
    button.classList.add('control_btn')
    button.onclick = onclickFn
    return button
}

function createControlBtns(i){
    const completeBtn = createButton('☑', 'complete_btn', complete(i))
    const uncompleteBtn = createButton('↶', 'uncomplete_btn', uncomplete(i))
    const removeBtn = createButton('🗑️', 'remove_btn', remove(i))
    return [completeBtn, uncompleteBtn, removeBtn]
}

function createTimeSpan(createdOrCompletedStr, timeToAppend){
    const innertxt = `${createdOrCompletedStr} at ${todolist.formatDate(timeToAppend)}`
    const createdTimeSpan = createHTMLelement('span', innertxt, 'time_span')
    return createdTimeSpan
}

function createTimeSpansOfElement(index){
    const createdAtSpan = createTimeSpan('Created', tasks[index].createdAt)
    const completedAtSpan = createTimeSpan('Completed', tasks[index].completedAt)
    
    return [createdAtSpan, completedAtSpan]
}

function makeUL(tasks) {
    const list = document.createElement('ul');

    for (let i = 0; i < tasks.length; i++) {
        const liClassName = tasks[i].completedAt === null ? 'uncompleted' : 'completed'
        const listElement = createHTMLelement('li', undefined, liClassName)
        const descriptionSpan = createHTMLelement('span', tasks[i].text, 'description')
        listElement.append(descriptionSpan, ...createTimeSpansOfElement(i), ...createControlBtns(i))
        list.appendChild(listElement)
    }

    return list;
}

function removeExistingUL(){
    const ul = document.getElementsByTagName('ul')[0]
    if(ul === undefined)return
    ul.remove()
}

function generateUL(){
    removeExistingUL()
    app.appendChild(makeUL(tasks));
}