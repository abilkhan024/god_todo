class LocalStorage{

    getTasksInLocalStorage(){
        const tasksInLocalStorage = []
        for(let i in {...localStorage}){
            tasksInLocalStorage.push(JSON.parse({...localStorage}[i]))
        }
        tasksInLocalStorage.sort((a, b) => a.createdAt - b.createdAt)
        return tasksInLocalStorage
    }

    // seems like that is unsolvable everything that I will do will cause more code
    // if u solve spread problem there will be much less code in 4 operations
    pushTaskInTodoListObject(){
        const tasks = this.getTasksInLocalStorage()
        for(let i in tasks){
            todoList.add(tasks[i].description)
            let lastAdded = todoList.tasks[todoList.tasks.length-1]
            console.log(lastAdded, tasks[i])
            lastAdded.id = tasks[i].id
            lastAdded.createdAt = tasks[i].createdAt
            lastAdded.completedAt = tasks[i].completedAt
            lastAdded.completionHistory = tasks[i].completionHistory
            // lastAdded = {...lastAdded, ...tasks[i]}
            dom.addElementToList(todoList.tasks)
        }
    }

    add(tasks){
        const lastAddedTask = tasks[tasks.length-1]
        this.setNewItem(lastAddedTask)
        return window.localStorage.getItem(`${lastAddedTask.id}`)
    }

    uncomplete(id){
        const itemInStorage = this.getItemById(id)
        itemInStorage.completedAt = null
        this.setNewItem(itemInStorage)
        return itemInStorage
    }

    complete(id){
        const itemInStorage = this.getItemById(id)
        itemInStorage.completedAt = todoList.findTaskById(id).completedAt
        itemInStorage.completionHistory = todoList.findTaskById(id).completionHistory
        this.setNewItem(itemInStorage)
        return itemInStorage
    }

    remove(id){
        const itemInStorage = this.getItemById(id)
        window.localStorage.removeItem(`${itemInStorage.id}`);
        return itemInStorage
    }

    setNewItem(item){
        window.localStorage.removeItem(`${item.id}`);
        window.localStorage.setItem(`${item.id}`, JSON.stringify(item))
    }

    getItemById(id){
        return JSON.parse(window.localStorage.getItem(`${id}`))
    }
}