<script>
import TodoInput from './TodoInput'

export default {
  components: {
    TodoInput
  },
  props: {
    todoData: {
      type: Array,
      default: () => []
    },
    handleInput: {
      type: Function,
      default: () => null
    },
    handleSubmit: {
      type: Function,
      default: () => null
    }
  },
  render(h) {
    return (
      <div>
        {
          <TodoInput
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        }

        {this.todoData.length > 0 && (
          <div>
            <div>item found</div>
          </div>
        )}

        {this.todoData.length === 0 && <div>no item found</div>}
      </div>
    )
  }
}
</script>

<style>
</style>
