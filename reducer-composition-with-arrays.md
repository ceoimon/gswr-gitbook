<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[13] “Reducer 组合”和数组"
    data-video="http://o71w1wc99.bkt.clouddn.com/13.mp4"
    data-subtitle="./sub/13.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/13.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/makahu/edit?js,console

## 环境

- 包含上节写的 todo 应用 `reducer` 和测试代码

## 多个 `reducer`

我们已经为两个不同应用分别写过两个 `reducer`.

在实际应用中，将所有状态计算都放到一个 `reducer`, 会让它越来越臃肿复杂，难以维护。

我们可以尝试将 `reducer` “拆解”成为多个 `reducer`, 并让它们各司其职。

### 拆解 todo 应用的 `reducer`

首先分析一下我们之前写的 todo 应用 `reducer`. 它可以处理 `ADD_TODO` 和 `TOGGLE_TODO` 动作， 前者用于添加一个 todo, 后者则是更新指定一个 todo 的状态。

如果我们把 todos 和 todo 的状态分开解释会更容易理解：
- todos
  - `ADD_TODO`: 添加一个新的 todo 到列表。
- todo
  - `TOGGLE_TODO`: 切换这个 todo 的完成状态。

所以 todos 和 todo 是存在**包含**关系的一组状态，但是我们现在把这些状态都放到一起了，这样会导致关系层次难以理解。

我们可以尝试将 todo 分离出来，单独为它的状态写一个 `reducer`.

```js
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};
```

注意在 `todo` `reducer` 里我们也处理了 `ADD_TODO` 动作，并返回了一个新的 todo. 

这样做能让 `todos` `reducer` 更专注于 todos 列表本身：

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action) // 计算一个新的 todo
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action)); // 计算每一个 todo 的完成状态
    default:
      return state;
  }
};
```

注意：
- 我们没有修改 action, 而是直接传递 action.
- todo `reducer` 处理的只是整个应用状态的一部分, 不需要有初始化值。

其实这样的模式 (pattern) 在 Redux 开发中很常见，它被称作 ” reducer 组合“ (reducer composition).

## 总结

- `reducer` 组合处理**包含**关系的状态
  - 一个最上层的父 `reducer` 管理着整体状态。
  - 各个子 `reducer` 负责状态的不同部分。
  - 父 `reducer` 通过调用子 `reducer` 来计算包含的状态。
    - 传递 `action`

<style>{% include "./css/dplayer.css" %}</style>
