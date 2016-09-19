<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[12] 编写代办事项列表的 Reducer （切换代办事项的完成状态）"
    data-video="http://o71w1wc99.bkt.clouddn.com/12.mp4"
    data-subtitle="./sub/12.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/12.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/faxaze/edit?js,console

## 环境

- 包含上节写的 todo 应用 `reducer` 和测试代码。

## 为 todo 应用编写 `reducer`(2/2)

我们已经实现了添加 todo 的功能，接下来将实现切换 todo 完成状态的功能。

### 切换 todo 完成状态

编写测试函数来规范功能：

```js
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};
```

就像之前一样，使用了 `deepFreeze` 来确保状态不被修改。

然后我们来实现这个 `reducer` 的对应功能：

```js
const todos = (state = [], action) => {
  switch (action.type) {
    // ...case 'ADD_TODO'
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      });
    default:
      return state;
  }
};
```

通过使用 `map` 方法去计算新的数组, 只对对应 `id` 的 todo 作修改。（注意使用**非转变**方法）

通过测试：

```js
testAddTodo();
testToggleTodo();
console.log('测试通过！');
```

这样我们就实现了一个可以处理添加 todo 和切换 todo 完成状态的 `reducer`.

## 总结

- 要使用**非转变**方法去计算新的数组。
- 计算对象时，切忌直接修改对象属性。

<style>{% include "./css/dplayer.css" %}</style>
