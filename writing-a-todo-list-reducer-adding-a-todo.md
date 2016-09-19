<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[11] 编写代办事项列表的 Reducer （添加一个代办事项）"
    data-video="http://o71w1wc99.bkt.clouddn.com/11.mp4"
    data-subtitle="./sub/11.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/11.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/kaboqe/edit?js,console

## 为 todo 应用编写 `reducer`(1/2)

就像之前写计数器的 `reducer` 那样，我们依然使用测试驱动开发，编写一个 todo 应用的“状态计算器” (`reducer`).

不同的是我们这次将加入 `deepFreeze` 来保护应用**状态**不被修改。

### 添加 todo

我们首先要写的是处理添加 todo 的逻辑。

todo 应该被包含在一个数组里面。每一个 todo 都有标号和内容，以及它们的完成状态，默认是未完成的。

```js
const todos = (state = [], action) => {

};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
};
```

为了确保 `reducer` 是纯函数，我们将使用 `deepFreeze` 来 “冰冻” `stateBefore` 和 `action`.

```js
const testAddTodo = () => {
  //...
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};
```

接下来就可以开始实现 `reducer` 对应的添加 todo 功能了。

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false // 默认值
        }
      ];
      default:
        return state;
  }
};
```
需要注意：
- 要使用**非转变**方法去计算新的数组。
- 状态的初始化值。
- 遇到无法处理的动作总是返回当前状态。

现在执行测试，可以完美通过～

```js
// ...前面写的代码
testAddTodo();
console.log('测试通过！');
```

## 总结

- `reducer` 接受当前状态和被分发的动作，计算应用下一个状态。
  - 纯函数。
  - 判断 `action.type` 去计算不同的状态变化。
  - 总是处理未知的动作。
  - 总是处理未初始化的状态。
- 通过确认在触发动作后与预期一致确保 `reducer` 符合要求。

<style>{% include "./css/dplayer.css" %}</style>
