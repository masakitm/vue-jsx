<script>
export default {
  props: {
    todoData: {
      type: Array,
      default: () => []
    }
  },
  render(h) {
    return (
      <div>
        {this.todoData.length > 0 && (
          <div>
            items found
            <div>list item</div>
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
