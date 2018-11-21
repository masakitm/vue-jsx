# vue.js + jsx を始めよう 〜TODO アプリで学ぶ jsx〜

### jsx で vue を書くメリット

vue は富豪的なフレームワーク
独自の api が多く、いずれは rails や jquery と同じ道を辿ることになりうる
潰しが利かない

となるとフレームワークへの依存性を薄めた実装をしておけば
=> リファクタしやすい
=> 別ライブラリで書き直す時が来ても大丈夫！

そこで react でおなじみの jsx を使ってみよう

- 他の仮想 DOM ライブラリと同じ感覚で書ける
  => 将来的に vue.js を剥がしやすくなる
- 型をつけやすくなる

### TODO アプリを jsx 表記で作ってみる

Nuxt.js でチャチャっと環境を用意します
今回触るのは `pages` と `components` ディレクトリのみです

### render 関数を使って jsx を返せる => <template>を使わず書ける

`<template>` を使わないので `.vue` でなく `.js` で書くこともできます

```js:todo.js
export default {
  render(h) {
    return <div>Todo</div>
  }
}
```

ですが、`.js` の場合 `<style>` タグでスタイルをコンポーネントに紐付けることはできません
したい場合は css module などで別途実装する必要があります　注意しましょう
※ `styled-jsx` は使えないようでした…

### ビジネスロジックと view を分離してみる

今回
