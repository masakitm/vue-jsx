import TodoList from './TodoList'

const initState = {
  todoData: []
}

export default {
  data() {
    return {
      todoData: { ...initState.todoData }
    }
  },
  render(h) {
    return <TodoList todoData={initState.todoData} />
  }
}
