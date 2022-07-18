class DOM {
    
    // getTasksInLocalStorage(){
    //     const tasksInLocalStorage = []
    //     for(let i = 0; i < window.localStorage.length; i++){
    //         let task = window.localStorage.getItem(`${i}`)
    //         task = JSON.parse(task)
    //         tasksInLocalStorage.push(task)
    //     }
    //     return tasksInLocalStorage
    // }

    createHTMLElement(tag, className = '', innerTxt = '', onclickFn = null){
        const element = document.createElement(tag)
        element.classList.add(className)
        element.innerText = innerTxt
        element.onclick = onclickFn
        return element
    }
    
    createSpan(innerTxt, className){
        const span = this.createHTMLElement('span', className, innerTxt)
        return span
    }

    createSpansOfTask(task){
        const descriptionSpan = this.createSpan(task.description, 'description')
        const createdTimeSpan = this.createSpan(todoList.formatDate(task.createdAt), 'created_time')
        const completedTimeSpan = this.createSpan(todoList.formatDate(task.completedAt), 'completed_time')
        return [descriptionSpan, createdTimeSpan, completedTimeSpan]
    }

    createControlBtns(task){
        const completeBtn = this.createHTMLElement('button', 'control_btn', '☑', complete(task))
        const uncompleteBtn = this.createHTMLElement('button', 'control_btn', '↶', uncomplete(task))
        const removeBtn = this.createHTMLElement('button', 'control_btn', '🗑', remove(task))
        return [completeBtn, uncompleteBtn, removeBtn]
    }

    createListElement(task){
        const element = this.createHTMLElement('li', 'task')
        element.append(...this.createSpansOfTask(task), ...this.createControlBtns(task))
        element.dataset.id = task.id
        return element
    }

    addElementToList(tasks){
        const task_list = document.getElementsByTagName('ul')[0]
        const lastAddedTask = tasks[tasks.length-1]
        const element = this.createListElement(lastAddedTask)
        return task_list.appendChild(element)
    }
    
    getElementById(taskId){
        const listElement = Array
        .from(document.getElementsByClassName('task'))
        .filter(liElement => liElement.dataset.id == taskId)[0]
        return listElement
    }

    toggle(task){
        const listElement = this.getElementById(task.id)
        const completed_time = listElement.children[2] // child [2] is completion time span
        completed_time.textContent = todoList.formatDate(task.completedAt)
        return listElement
    }

    remove(task){
        const listElement = this.getElementById(task.id)
        listElement.remove()
        return listElement
    }
}