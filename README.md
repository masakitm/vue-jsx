# vue.js で jsx を始めよう 〜TODO アプリで学ぶ jsx〜

## はじめに

AsiaQuest 株式会社所属のフロントエンドエンジニアです  
vue を書いたり react 書いたり古い jquery を触ったりしています

## 対象読者

vue.js の単一ファイルコンポーネントで開発したことがある人
jsx になじみがない人

## TL;DR

記法は違えど感覚は `<template>` にかなり近い  
React 書いてる気持ちになる  
賢い気持ちになる

### jsx で vue を書くメリット

みんな大好き vue.js、使ってますか？僕も好きです  
vue は富豪的なフレームワークです  
独自の api が多く、いずれは rails や jquery と同じ道を辿るかも…という懸念があります

となるとフレームワークへの依存性を薄めた実装をしておけば  
=> リファクタしやすい  
=> 別ライブラリで書き直す時が来ても大丈夫！

そこで react でおなじみの jsx で vue.js を書いてみましょう

- 他の仮想 DOM ライブラリと同じ感覚で書ける
- 将来的に vue.js を剥がしやすくなる
- 型をつけやすくなる

こんなメリットがあります　では早速見てみましょう

### TODO アプリを jsx 表記で作ってみる

nuxt.js でチャチャっと環境を用意します

`$ npx create-nuxt-app <my-project>`

vue で jsx を使うパッケージが最初から同梱されているためです  
今回主に触るのは `components` ディレクトリです、`pages`などは適宜やってください

### render 関数を使って jsx を返せる => template タグを使わず書ける

お馴染みの template 記法を jsx で書き直してみましょう

```html
<template>
  <div>Todo</div>
</template>
```

```js
components/TodoView.vue

<script>
export default {
  render(h) {
    return <div>Todo</div>
  }
}
</script>
```

render 関数を使って div 要素を return することで、template 記法に近い感覚で書けます
※詳しくはこちら https://jp.vuejs.org/v2/guide/render-function.html

複数行書く場合は jsx 部分を `()` で囲みます

```js
components/TodoView.vue

render(h) {
  return (
    <div>
      <h1>Todo</h1>
    </div>
  )
}
```

そしてこの場合、 `<template>` タグがないので `.vue` ファイルにする必要もありません  
`<script>` をとって `.js` として保存しても vue コンポーネントとして扱うことができます

※`.js` の場合 `<style>` タグでスタイルをコンポーネントに紐付けることはできません、別途 css module などの導入が必要です

### v-if での出し分けを jsx で実装してみる

`v-if` を `jsx` で実装してみましょう  
`todoData`という配列の長さに応じて要素を出し分けます

`{}` で括った中に式を書くことが出来ます  
`&&` で式を評価し、満たした場合に `jsx` を返します  
これで `v-if` のような出し分けを再現できます

```html
<template>
  <div>
    <div v-if="todoData.length > 0">
      <div>item found</div>
    </div>

    <div v-if="todoData.length === 0">
      <div>no item found</div>
    </div>
  </div>
<template>
```

```js
components / TodoView.vue

render(h) {
  return (
    <div>
      {this.todoData.length > 0 && (
        <div>
          <div>item found</div>
        </div>
      )}

      {this.todoData.length === 0 && <div>no item found</div>}
    </div>
  )
}
```

### ビジネスロジックと view を分離してみる

template を持たないコンポーネントが明示的に作れるようになったので、 ビジネスロジックだけ提供するコンポーネントを `.js` 、見た目を担保するコンポーネントを `.vue` として完全に分けてみます

こんなイメージです

```
.js ( data, methods, computed... )

↓ data, methods, computedをpropsで渡す

.vue ( propsを受け取って描画・スタイル設定 dataやmethodsは持たない )
```

data や methods は全部 TodoContainer.js に持たせ、残りは props を元にレンダリングするだけのコンポーネントにします  
挙動に関して記述されたファイルがひとつだけになので、機能追加や変更時に 1 ファイルを参照するだけですみます

先ほど作った `TodoView.vue` を読み込み、props を付与して render で返すだけの `.js` コンポーネントを作ります

```js
components / TodoContainer.js

import TodoView from './TodoView'

export default {
  data() {
    return { todoData: [] }
  },
  render() {
    return <TodoView todoData={this.todoData} />
  }
}
```

以後、`data` や `method` は全てこのコンポーネントに書いていきます

`TodoView` 側も props を受け取れるようにしておきましょう

```js
components / TodoView.vue

props: {
  todoData: {
    type: Array,
    default: () => []
  }
},
```

### メソッドの実装

Todo アプリの挙動を考えます

- `input` にテキストを入力すると `TodoContainer` の `data: tempText` 文字列が書き換わる
- `button` を押下すると `data: tempText` を元にオブジェクトを生成、 `TodoContainer` の `data: todoData` 配列に追加される

こんな動きにしましょう

今回は `$emit` も使わず親 > 子のみのフローとします  
`data`, `methods` は全て `TodoContainer` に書いて `TodoView` へ `props` として渡します

```js
components / TodoContainer.js

import TodoView from './TodoView'

let id = 0
export default {
  data() {
    return {
      tempText: '',
      todoData: []
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
      <TodoView
        todoData={this.todoData}
        handleInput={this.updateTempText}
        handleSubmit={this.addItem}
      />
    )
  }
}
```

### イベント検知して親のメソッドを叩く

入力部分のフォームを作ります

```js
components/TodoView.vue

<div>
	<form>
		<input />
		<button type="submit">ADD</button>
	</form>

	{/* 略 */}
</div>
```

`props` で受け取った関数をイベント検知して叩きます  
`onSubmit`、`onKeyup`と属性をベタ書きして見えますが、実際の html 出力時に属性としては残りません

```js
components / TodoView.vue

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

      {/* 略 */}
    </div>
  )
}
```

これで `input` 入力時に `TodoContainer` の `data` を書き換え、`submit`時に todo を追加する部分が実装できました

### Todo リストの View を作る

Todo 部分の view を作ります
`v-for` を使わず、`map()` を使って実装します

`todoData`をループして各要素ごとに`<div>{ name }</div>`を返すことで、`v-for`と同様の挙動を再現することができます

```js
components / TodoView.vue

{
  this.todoData.length > 0 && (
    <div>
      {this.todoData.map(item => (
        <div>{item.name}</div>
      ))}
    </div>
  )
}
```

### おしまい

これでごく基本的な説明は終了です  
責務ごとにコンポーネントを分けたり、`<style>`で css をつけたり、todo の 削除機能などは通常の vue.js 同様に試してみてください

今回作成した内容は下記リポジトリへアップしています  
ぜひご覧になってくださいね
https://github.com/masakitm/vue-jsx/blob/master/components/TodoContainer.js  
https://github.com/masakitm/vue-jsx/blob/master/components/TodoView.vue
