class Todolist {
    constructor(title) {
      this.title = title
      this.tasks = []
      this.taskIds = []
      this.sortAsc = true;
    }
  
    add(text) {
      let task = new Task(text)
      this.tasks.push(task)
      return task
    }
  
    complete(id) {
      let task = this.findTaskById(id)
      if(task.completedAt !== null) return -1
      return task.complete()
    }
  
    uncomplete(id) {
      let task = this.findTaskById(id)
      if(task.completedAt === null) return -1
      return task.uncomplete()
    }
  
    remove(id) {
      let task = this.findTaskById(id)
      let taskIdx = this.tasks.indexOf(task)
      return this.tasks.splice(taskIdx, 1)[0]
    }
  
    getCompletionHistory(id) {
      let task = this.findTaskById(id)
      return task.getCompletionHistory()
    }
  
    findTaskById(id) {
      let foundTask = this.tasks.filter(task => {
        return task.id === id
      })
      return foundTask[0]
    }

    formatDate(millis){
      if (millis) return new Date(millis).toLocaleString('en-GB')
      return '-'
    }

    sortToggle() {
      if (!this.sortAsc) {
        this.tasks.sort((a,b) => a.createdAt - b.createdAt)
      }
      else{
        this.tasks.sort((a,b) => b.createdAt - a.createdAt)
      }
      this.sortAsc = !this.sortAsc;
    }

  }
  
  class Task {
    constructor(text) {
      this.id = Task.generateRandomId()
      this.text = text
      this.createdAt = Date.now()
      this.completedAt = null
  
      this.completionHistory = []
    }
  
    static generateRandomId() {
      return Date.now() + Math.floor(Math.random() * 9e5 + 1e5)
    }
  
    complete() {
      let now = Date.now()
      this.completedAt = now
      this.completionHistory.push(now)
  
      return this
    }
  
    uncomplete() {
      this.completedAt = null
  
      return this
    }
  
    getCompletionHistory() {
      return this.completionHistory
    }
  }
