<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[07] 从头实现 store"
    data-video="http://o71w1wc99.bkt.clouddn.com/07.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/07.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/07.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/nepobom/edit?js,console,output

在前面一节中，我们使用 Redux 实现了一个完整的计数器应用。

我们使用 `store` 去管理状态：
- `getState()`
- `dispatch(action)`
- `subscribe(Function)`

通过 `store` 我们可以获取状态，分发动作，绑定通知。

所以这个神奇的 `store` 里面到底是怎样的呢？

## 揭开引擎盖

让我们开始重新实现一次 `createStore`.

我们已经知道，最终返回的 store 对象存在如下的方法：
- `getState`
- `dispatch`
- `subscribe`

我们可以猜测大概的实现是这样的：

```js
const createStore = (reducer) => {
  let state; // 用于保存最新的应用状态。

  const getState = () => state; // 直接返回最新状态。

  const dispatch = (action) => {
    // ...把 action 交给 reducer 处理。
  }

  const subscribe = (listener) => {
    // ...
  }

  return { getState, dispatch, subscribe } // 返回一个 store 对象.
}
```

### 实现 `subscribe()`

- `subscribe` 方法用于将一个函数绑定到 `store` 上，当状态改变，就执行这个函数。
- 我们称绑定的函数为订阅者 (listener)
- 可以有多个订阅者同时订阅 `store`

为了实现通知多个订阅者，我们需要维护一个订阅者队列。

```js
const createStore = (reducer) => {
  let state; // 用于保存最新的应用状态。
  let listeners = []; // 保存订阅者。

  const getState = () => state; // 直接返回最新状态。

  const dispatch = (action) => {
    // ...把 action 交给 reducer 处理。
  }

  const subscribe = (listener) => {
    listeners.push(listener); // 将订阅者保存起来。
  }

  return { getState, dispatch, subscribe } // 返回一个 store 对象.
}
```

subscribe 方法并不用于通知（调用）订阅者们，因为它甚至不知道状态的变化。

状态的变化发生在分发动作里面。

### 实现 `dispatch()`

应用状态的改变流程：
1. `store` 将动作分发给 `reducer`
2. `reducer` 计算新的状态
3. `store` 将新的状态保存起来
4. `store` 通知订阅者们

我们可以把这一系列的动作合起来实现：

```js
const createStore = (reducer) => {
  let state; // 用于保存最新的应用状态。
  let listeners = []; // 保存订阅者。

  const getState = () => state; // 直接返回最新状态。

  const dispatch = (action) => {
    state = reducer(state, action); // 计算新状态并保存。
    listeners.forEach(listener = listener()); // 通知（调用）订阅者。
  };

  const subscribe = (listener) => {
    listeners.push(listener); // 将订阅者保存起来。
  };

  return { getState, dispatch, subscribe }; // 返回一个 store 对象.
}
```

到这里我们似乎已经完成了整个 `store` 的构造过程，但是等等，我们没有给订阅者退订的机会...这不是霸王条约吗？

我们可以通过这样的方法来添加退订功能：

```js
const subscribe = (listener) => {
  listeners.push(listener); // 将订阅者保存起来。

  // 返回一个具有退订功能的函数
  return () => {
    listeners = listeners.filter(l => l != listener);
  };
};
```

然后我们可以这样调用它：

```js
const unsubscribe = store.subscribe(doSomething); // 添加订阅
unsubscribe(); // 退订
```

最后，我们还要记得初始化应用的状态:

```js
const createStore = (reducer) => {
  let state; // 用于保存最新的应用状态。
  let listeners = []; // 保存订阅者。

  const getState = () => state; // 直接返回最新状态。

  const dispatch = (action) => {
    state = reducer(state, action); // 计算新状态并保存。
    listeners.forEach(listener = listener()); // 通知（调用）订阅者。
  };

  const subscribe = (listener) => {
    listeners.push(listener); // 将订阅者保存起来。

    // 返回一个具有退订功能的函数
    return () => {
      listeners = listeners.filter(l => l != listener);
    };
  };

  dispatch({}); // 初始化应用状态

  return { getState, dispatch, subscribe }; // 返回一个 store 对象.
}
```

这样我们就实现了一个 createStore 方法，并且了解了 store 的内部原理了。

值得一提的是，这个简单的方法其实就跟最初的官方实现差不了多少～

## 总结

- `store` 内部并不复杂

## 思考： （答案将在下一节公布）

- 如果不在 `subscribe` 方法返回退订函数，可能会有什么麻烦？

### 上节解答:

- 为什么需要 `store` 去分发动作给 `reducer` 而不是直接调用 `reducer`?
  - 确保每次调用 reducer 传进入的状态都是最新的。
  - 可以避免动作之间的竞争情况。
  - 更易于测试。

## 扩展阅读：

- [1.0 版本 Redux 的createStore](https://github.com/reactjs/redux/blob/e426039152272393f80d7f3b9e63814890a4119d/src/Store.js)

<style>{% include "./css/dplayer.css" %}</style>
