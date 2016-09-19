<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[15] 使用 combineReducers() 实现 Reducer组合"
    data-video="http://o71w1wc99.bkt.clouddn.com/15.mp4"
    data-subtitle="./sub/15.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/15.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/zeyovaq/edit?js,console

## 环境

- 包含上节的内容。

## 概念

### `combineReducers`

  用于组合多个 `reducer`.

## 使用 `combineReducers`

上一节中，我们已经知道了如何使用 `reducer` 组合 来让不同的 `reducer` 分工合作。

在 Redux 应用中， 这样的用法非常普遍，所以 Redux 提供了一个方法让你不用每次都手工编写这些代码。它为了自动生成最高层的 `reducer` （用于生成应用 store）。

这个方法就是 `combineReducers`, 它接受一个对象，这个对象声明了要组合的不同的 `reducer` 和其要处理的对应的状态部分名称。

```js
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// };
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
```

基本功能跟我们之前手工写的是一致的，`todos` `reducer` 将会处理应用状态里叫 todos 的那个部分, 同理的其他 reducer 也将用于处理对应名称 (keys) 的部分，最后把所有状态组合起来成为应用的整体状态。

我们还可以使用 ES6 语法简化代码：

```js
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```

## 总结

```js
/**
 * combineReducers: (reducers: { [state key]: reducer }) => topLevelReducer
 * 用于组合多个 reducers
 * 并让每个 reducer 处理对应应用状态的 state key.
 */

// 示例
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const initialState = todoApp(undefined, {});
console.log(initialState); // [object Object] { todos: [], visibilityFilter: "SHOW_ALL" }

const addedTodoState = todoApp(initialState, { type: 'ADD_TODO', id: 1, text: 'Learn Redux' });
console.log(addedTodoState); // [object Object] { todos: [[object Object] { completed: false, id: 1, text: "Learn Redux" }], visibilityFilter: "SHOW_ALL" }

const changedFilterState = todoApp(addedTodoState, { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});
console.log(changedFilterState); // [object Object] { todos: [[object Object] { completed: false, id: 1, text: "Learn Redux" }], visibilityFilter: "SHOW_COMPLETED" }
```

## 思考： （答案将在下一节公布）

### 上节解答:

- 把 `visibilityFilter` 包含到 `todos` 里面会有什么问题？
  - 使两个相互独立的状态耦合在一起。
  - 增加处理动作的复杂性。
即使修改过滤器的状态往往会导致 todo 列表的状态变化，过滤器的状态依然是与 todo 列表状态相互独立存在的。它们之间的关联就是触发某些动作时它们都会改变。

<style>{% include "./css/dplayer.css" %}</style>
