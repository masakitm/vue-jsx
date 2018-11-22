import TodoList from './TodoList'

const initState = {
  tempText: '',
  todoData: []
}
let id = 0

export default {
  data() {
    return {
      tempText: { ...initState.tempText },
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
    }
  },
  render() {
    return (
      <TodoList
        todoData={this.todoData}
        handleInput={this.updateTempText}
        handleSubmit={this.addItem}
      />
    )
  }
}
