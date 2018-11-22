<script>
export default {
  props: {
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
    const onKeyup = e => this.handleInput(e.target.value)
    const onSubmit = e => {
      e.preventDefault()
      this.handleSubmit()
    }

    return (
      <form onSubmit={onSubmit}>
        <input onKeyup={onKeyup} />
        <button type="submit">ADD</button>
      </form>
    )
  }
}
</script>
