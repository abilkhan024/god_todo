class DOM {
    
    addElementToList(tasks){
        const lastAddedTask = tasks[tasks.length-1]
        const element = this.createHTMLElement('li', 'task')
        element.innerText = lastAddedTask.text
        element.dataset.id = lastAddedTask.id
        return element
    }
    
    createHTMLElement(tag, className = ''){
        const element = document.createElement(tag)
        element.classList.add(className)
        return element
    }

    createButton(innerTxt, className = '', onclickFn = null){
        const button = this.createHTMLElement('button', className)
        button.onclick = onclickFn
        return button
    } 

    createListElement(){
        const element = this.createHTMLElement('li', 'task')
        element.append
    }
}