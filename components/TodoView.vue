<script>
export default {
  functional: true,
  props: {
    todoData: {
      type: Array,
      default: () => []
    },
    handleInput: {
      type: Function,
      default: () => {}
    },
    handleSubmit: {
      type: Function,
      default: () => {}
    }
  },
  render(h) {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            this.handleSubmit()
          }}
        >
          <input onKeyup={e => this.handleInput(e.target.value)} />
          <button type="submit">ADD</button>
        </form>

        <div>
          {this.todoData.length > 0 && (
            <div>
              {this.todoData.map(item => (
                <div>{item.name}</div>
              ))}
            </div>
          )}

          {this.todoData.length === 0 && <div>no item found</div>}
        </div>
      </div>
    )
  }
}
</script>
