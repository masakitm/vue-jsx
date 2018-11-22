# vue.js で jsx を始めよう 〜TODO アプリで学ぶ jsx〜

### TL;DR

記法は違えど感覚はかなり近い  
React 書いてる気持ちになる  
賢い気持ちになる

### jsx で vue を書くメリット

vue は富豪的なフレームワーク  
独自の api が多く、いずれは rails や jquery と同じ道を辿るかも…という心配がある

となるとフレームワークへの依存性を薄めた実装をしておけば  
=> リファクタしやすい  
=> 別ライブラリで書き直す時が来ても大丈夫！

そこで react でおなじみの jsx で vue.js を書いてみよう

- 他の仮想 DOM ライブラリと同じ感覚で書ける
- 将来的に vue.js を剥がしやすくなる
- 型をつけやすくなる

### TODO アプリを jsx 表記で作ってみる

Nuxt.js でチャチャっと環境を用意します  
今回触るのは `pages` と `components` ディレクトリのみです

### render 関数を使って jsx を返せる => template タグを使わず書ける

お馴染みの template 記法を jsx で書き直してみる

```html
<template>
  <div>Todo</div>
</template>
```

```js
<script>
export default {
  render(h) {
    return <div>Todo</div>
  }
}
</script>
```

render 関数を使って div 要素を return してやることで、
template 記法に近い感覚で div を返すコンポーネントができました

複数行書く場合は jsx 部分を `()` で囲みます

```js
<script>
export default {
  render(h) {
    return (
      <div>
        <h1>Todo</h1>
      </div>
    )
  }
}
</script>
```

そしてこの場合、 `<template>` タグがないので `.vue` ファイルにする必要もありません
`<script>` をとって `.js` として保存しても vue コンポーネントとして扱うことができます

※`.js` の場合 `<style>` タグでスタイルをコンポーネントに紐付けることはできません
css module などを導入することで可能になります

### v-if での出し分けを jsx で実装してみる

`v-if` を `jsx` で実装してみましょう

### ビジネスロジックと view を分離してみる

template を持たない vue コンポーネントが明示的に作れるようになったので、
ロジックだけを提供するコンポーネントを `.js` 、見た目を担保するコンポーネントを `.vue` として完全に分けてみましょう

data や methods は全部 TodoContainer.js に持たせ、
残りは props を元にレンダリングするだけにしてみる

挙動に関して記述されたファイルがひとつだけになので、機能追加や変更時に 1 ファイルを参照するだけですむ
運用に優しくなる

### イベント検知して親の methods を叩いてみる
