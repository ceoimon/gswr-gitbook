<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[04] reducer 函数"
    data-video="http://o71w1wc99.bkt.clouddn.com/04.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/04.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/04.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

在 React 里，每一次渲染都要去计算全新的组件。

- UI 就是用一个纯函数加上数据计算出来的结果。
 -  数据包括 props, state, context 等

这是 React 最先提出的一个理念，可以让 UI 操作更可控。

Redux 认为不只是 UI 可以由纯函数来计算，应用的所有**状态**变化也可以用纯函数来计算。

这样做可以使状态的变化更可控。

## 概念

- Redux 第三原则: Redux 使用纯函数来计算应用的所有状态变化

### `reducer`:
- Redux 的核心。
- Redux 中用来计算应用中状态变化的纯函数。
- 接受当前状态 (`state`) 和触发的动作 (`action`)作为参数。
- 返回新的状态。

```js
/**
 * 用于计算新的应用状态的纯函数
 *
 * @param state 当前应用的状态 
 * @param action 动作，用于描述状态变化
 * @return 新的状态
 */
function reducer(state, action) {
   // 用 action 计算出下一个状态
   // let nextState = ...

   // 返回下一个状态
   return nextState;
}
```

具体比喻: 你做了一个零件 (`state`), 但是甲方不满意，发出了新的修改要求 (`action`), 甲方不能把现在在用的零件还给你，你要根据当初的图纸和新的要求重新做出一个新的零件 (`nextState`)，然后甲方就可以换上新零件了。

## 例子 1 - 计数器

![Counter demo screenshot][Lesson-4_Counter-screenshot]
演示：https://jsbin.com/libubul/edit?console,output

- 每次状态变化都可以观察到三个过程
  - 上一个状态
  - 触发的动作
  - 下一个状态

## 例子 2 - 多个独立的计数器

![Multiple Counter demo screenshot][Lesson-4_Multiple-counters-screenshot]
演示：https://jsbin.com/zajuma/edit?console,output

- 变化可以是整体的: 增加或删除一个计数器
- 也可以是部分的: 让单个计数器自增或自减

## 例子 3 - Todo 应用

演示：https://jsbin.com/joqiwu/edit?console,output

虽然应用每次更改得到的状态都是全新的状态对象，但是在性能上不必太担心。

因为每次构建新的状态时，都可能可以保留对内部一些部分的引用。

比如更改了过滤条件需要构建新的状态对象，但是仍然可以保留对之前 todos 数组的引用：

![Change todo app visibility filter screenshot][Lesson-4_Change-Todo-App-Visibility-Filter-screenshot]

上图红色框部分的数据都是共享的，没有浪费。

## 总结

```js
/**
 * reducer: (state, action) => nextState
 * 用于计算新的应用状态的纯函数
 *
 */

// 示例
function counter(state, action) {
  // 用 action 计算出下一个状态
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

- Redux 使用 `reducer` 来计算应用的所有状态变化
- `reducer` 必须是纯函数
- 任何一个 Redux 应用都有一个 `reducer`
- 无论应用多复杂，你总是可以只使用一个 `reducer` 来管理
- 重复计算新的状态并不会给性能造成太大影响

## 思考： （答案将在下一节公布）

- 使用纯函数去计算状态到底有啥好处？

### 上节解答:

- 我们可以把应用的状态 `state` 传入一个非纯函数吗？
  - 不能，因为 `state` 是只读的。我们要通过纯函数 `reducer` 来计算新的应用状态。

## 扩展阅读：

- [Redux 三大原则](http://cn.redux.js.org/docs/introduction/ThreePrinciples.html)

[Lesson-4_Counter-screenshot]: ../screenshots/Lesson-4_Counter-screenshot.png

[Lesson-4_Multiple-counters-screenshot]: ../screenshots/Lesson-4_Multiple-counters-screenshot.png

[Lesson-4_Change-Todo-App-Visibility-Filter-screenshot]: ../screenshots/Lesson-4_Change-Todo-App-Visibility-Filter-screenshot.png

<style>{% include "./css/dplayer.css" %}</style>
