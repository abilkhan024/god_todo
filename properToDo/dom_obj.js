class DOM {
    
    createHTMLElement(tag, className = '', innerTxt = ''){
        const element = document.createElement(tag)
        element.classList.add(className)
        element.innerText = innerTxt
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

    createButton(innerTxt, className, onclickFn = null){
        const button = this.createHTMLElement('button', className, innerTxt)
        button.onclick = onclickFn
        return button
    }

    createControlBtns(task){
        const completeBtn = this.createButton('☑', 'complete_btn', complete(task))
        const uncompleteBtn = this.createButton('↶', 'uncomplete_btn', uncomplete(task))
        const removeBtn = this.createButton('🗑️', 'remove_btn', remove(task))
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
        listElement.classList.toggle('completed')
        return listElement
    }

    remove(task){
        const listElement = this.getElementById(task.id)
        listElement.remove()
        return listElement
    }
}