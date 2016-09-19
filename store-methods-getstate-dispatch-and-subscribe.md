<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[06] store 方法：getState，dispatch 和 subscribe"
    data-video="http://o71w1wc99.bkt.clouddn.com/06.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/06.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/06.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/gipacug/edit?js,console,output

## 环境

- 包含我们上一次写的计数器 `reducer`.
- 引入了 Redux 库。
我们使用 UMD 版本的 Redux，会将 `Redux` 作为全局变量。

如果你想了解什么是 UMD，可以查看这篇博文: [神马是AMD, CommonJS, UMD?](http://www.75team.com/post/%E8%AF%91%E7%A5%9E%E9%A9%AC%E6%98%AFamd-commonjs-umd.html)

## 概念

- Redux 使用一个中心储存器(store)来管理应用状态。
- 通过分发 (dispatch) 来触发动作。
- 通过订阅 (subscribe) 来监听状态变化。

### `store`:

  - Redux 三大原则结合的体现。
  - 储存并控制着应用状态。

## 宇宙的中心

在 Redux 应用里，宇宙的中心就是 `store`, 它保存着所有的状态，控制着所有的状态变化。

让我们来创建一个 `store`:

```js
const { createStore } = Redux; // ES6 结构语法
// var createStore = Redux.createStore; // 等同于上面的代码
// import { createStore } from 'redux'; // 模块化语法，等同于上面的代码。
const store = createStore(counter);
```
`createStore` 方法用于创建一个 `store`, 它接受一个 `reducer` 作为参数，指定使用这个 `reducer` 处理应用状态。

### 获取应用状态 `getState()`

创建 store 之后，可以使用 `getState` 方法来获取应用当前的状态。

```js
console.log(store.getState()); // 打印目前状态
```

### 分发一个动作 `dispatch()`

我们可以通过分发一个动作来改变状态。

```js
console.log(store.getState());

store.dispatch({ type: 'INCREMENT' }); // 分发一个动作，让 reducer 去处理。
console.log(store.getState()); // 打印新的状态
```
`dispatch` 方法用于分发一个动作给 `reducer` 去计算出新的状态。

### 通知变化 `subscribe()`

虽然我们可以打印出状态，但在实际应用中往往是视图元素在使用这些状态，我们必须通知它们状态的改变。

使用 `subscribe` 方法可以将指定函数在状态变化后立即触发：

```js
const render = () => {
  document.body.innerText = store.getState();
}

store.subscribe(render); //在状态发生变化后执行 render.
render(); // 渲染出初始状态。

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```

我们定义了一个 render 方法，将当前状态显示在页面上。（在 output 面板）并在页面中绑定了点击事件，每一次点击页面都会分发一个计数器自增动作。

![counter demo screenshot][Lesson-6_Counter-screenshot]

通过使用 `subscribe` 方法，我们可以在状态变化后立即渲染出最新的变化。

这样，我们就完成了第一个完整的 Redux 应用了！

## 总结

- `store` 管理着 Redux 应用的所有状态。
  - 通过 `createStore(reducer)` 创建。
    - 需要指定用于处理状态的 `reducer`.
  - 保存着当前的状态。
    - `getState()` 获取状态。
  - 管理状态变化。
    - `dispatch(action)` 分发一个动作给 reducer 去计算新状态。
  - 通知变化。
    - `subscribe(Function)` 让函数在状态变化后执行。

一个完整的 Redux 应用包括：
- reducer
- store
  - state
- action

## 思考： （答案将在下一节公布）

- 为什么需要 `store` 去分发动作给 `reducer` 而不是直接调用 `reducer`?

### 上节解答:

- 多个独立计数器的 `reducer` 要怎么写？

```js
const counters = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COUNTER':
      return [...state, 0];
    case 'REMOVE_COUNTER':
      return state.slice(0, -1);
    case 'INCREMENT':
      return [...state.slice(0, action.index), state[action.index] + 1, ...state.slice(action.index + 1)];
    case 'DECREMENT':
      return [...state.slice(0, action.index), state[action.index] - 1, ...state.slice(action.index + 1)];
    default:
      return state;
  }
}
```

  - 多个独立计数器的状态要用数组才能表示
  - 不能修改原来的状态 (纯函数)
注意我们要使用非常多 ES6 语法的 "`...`"(展开运算符) 来确保 reducer 的纯函数特性，下面的课程我们还会深入了解。

[Lesson-6_Counter-screenshot]: ./screenshots/Lesson-6_Counter-screenshot.png

<style>{% include "./css/dplayer.css" %}</style>
