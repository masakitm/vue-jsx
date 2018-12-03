import TodoView from './TodoView'

const initState = {
  tempText: '',
  todoData: []
}
let id = 0

export default {
  data() {
    return {
      tempText: initState.tempText,
      todoData: [...initState.todoData]
    }
  },
  computed: {
    todoItemCount() {
      return this.todoData.length
    }
  },
  methods: {
    updateTempText(text) {
      this.tempText = text
    },
    addItem() {
      const newItem = {
        id: id++,
        name: this.tempText,
        done: false
      }
      this.todoData = this.todoData.concat(newItem)
      this.tempText = ''
    }
  },
  render() {
    return (
      <TodoView
        todoData={this.todoData}
        handleInput={this.updateTempText}
        handleSubmit={this.addItem}
        tempText={this.tempText}
      />
    )
  }
}
