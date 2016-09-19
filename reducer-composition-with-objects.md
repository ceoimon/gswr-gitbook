<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[14] “Reducer 组合”和数组"
    data-video="http://o71w1wc99.bkt.clouddn.com/14.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/14.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/14.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/gigexax/edit?js,console

## 环境

- 包含上节写的 todo 应用 `reducer` `todo` 和 `todos`.
- 去掉了已经无用处的测试代码。
- 引入了 Redux 库。
- 模拟分发了一些动作。
- 添加了一些打印消息。

## 添加 todos 过滤器状态信息

我们模拟了一些分发动作的情况，并将当前的状态打印出来。

目前这个 todo 应用的 `reducer` 已经可以处理必要的动作了。我们也只用到了一个数组来代表整个应用的状态。

但是如果我们想要应用储存更多的状态信息呢？比如我们想要添加一个让用户选择当前可见的 todo 列表的过滤器。

这个过滤器应该有如下选择：
- "SHOW_ALL": 显示全部 todos, 默认值。
- "SHOW_ACTIVE": 显示未完成的 todos.
- "SHOW_COMPLETED": 显示完成的 todos.

我们可以把它命名为 `visibilityFilter`.

```js
const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
```

过滤器的状态只是一串代表着当前过滤器的字符串，它会被 "`SET_VISIBILITY_FILTER`" 动作改变。

我们暂不实现过滤的功能，仅仅是考虑新的状态信息的存放。

过滤器与 todos 不是包含关系，因此可以把它们放到同一层。

可以运用上一节的 “ `reducer` 组合”模式，创建一个更大的父 `reducer` 来处理整体应用状态：

```js
const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};
```

`todoApp` 通过调用其他 `reducer` 去计算不同部分的状态，并将其组合成一个**单一的状态对象**。

这样我们的 todo 应用的状态就不再是一个数组，而是对象。我们通过使用 “ `reducer` 组合” 来让应用可以在不修改原有 `reducer` 的基础上添加额外的 `reducer`.

我们还需要修改 `createStore` 传入的 `reducer`:

```js
const store = createStore(todoApp);
```

对于每次传入的 `state` 和 `action`, 各个 `reducer` 都是独立处理同一个动作，计算不同部分的状态的，它们互不干扰。

我们可以添加下面的代码来测试我们新写的 `reducer`:

```js
console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');
```

![visibilityFilter test screenshot][Lesson-14_visibilityFilter-test-screenshot]

可以看到，当分发 "SET_VISIBILITY_FILTER" 动作时，不会影响到 `todos` 的状态，但是 `visibilityFilter` 的状态更新了。

## 总结

- 使用 “`reducer` 组合” 扩展应用：
  - 使用一个抽象 `reducer` 包含所有 `reducer` 并用于创建应用 `store`.
  - 不同 `reducer` 可以处理相对独立的应用状态部分。
  - 对于被分发的每个动作，每一个 `reducer` 分别处理，互不干扰。

## 思考： （答案将在下一节公布）

- 把 `visibilityFilter` 包含到 `todos` 里面会有什么问题？

[Lesson-14_visibilityFilter-test-screenshot]: ./screenshots/Lesson-14_visibilityFilter-test-screenshot.png

<style>{% include "./css/dplayer.css" %}</style>
