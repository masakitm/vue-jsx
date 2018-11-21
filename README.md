#

### render 関数を使って jsx を返せる => <template>を使わず書ける

`<template>` を使わないので `.vue` でなく `.js` で書くこともできます

```js:todo.js
export default {
  render(h) {
    return <div>Todo</div>
  }
}
```

なお、`.js` の場合 `<style>` タグでスタイルをコンポーネントに紐付けることはできません。
css module などで別途実装する必要があります。

###
