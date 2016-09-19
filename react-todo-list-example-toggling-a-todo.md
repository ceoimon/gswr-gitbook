<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[18] React 代办事项列表示例（切换代办事项的完成状态）"
    data-video="http://o71w1wc99.bkt.clouddn.com/18.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/18.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/18.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/qeligi/edit?js,output

## 切换 todo 的完成状态

我们已经实现了 todo 里对应 `ADD_TODO` 动作的功能，接下来应该实现的是对应 `TOGGLE_TODO` 的功能。

我们可以通过点击 todo 来触发这个切换的动作。

所以我们给每一个 `li` 都加上 `onClick` 事件。

```js
class TodoApp extends Component {
  render() {
    return(
      <div>
        {/* <input .../> */}
        {/* <button ...>...</button> */}
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
                onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });         
                }}
                style={{
                  textDecoration:
                  todo.completed 
                    ? 'line-through'
                    : 'none'
                }}
            >
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
```

我们还给完成的 todo 添加了删除线的样式。

## 总结

我们通过在 `li` 上绑定 `click` 事件来分发 `TOGGLE_TODO` 方法来达到转换 todo 的完成状态的功能。

<style>{% include "./css/dplayer.css" %}</style>
