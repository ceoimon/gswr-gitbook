<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[16] 从头实现 combineReducer()"
    data-video="http://o71w1wc99.bkt.clouddn.com/16.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/16.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/16.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>
本节使用到的环境：https://jsbin.com/nihareh/edit?js,console

## 环境
- 包括上一节的内容。

## 概念

### 高阶函数 (Higher-order function)

至少满足下列一个条件的函数：
- 接受一个或多个函数作为输入
- 输出一个函数

## 实现 `combineReducers()`

我们已经知道如何使用 `combineReducers` 来组合多个 `reducer` 了，虽然我们之前也已经实现过实现同样功能的函数，但是并不具有一般性。

`combineReducers` 可以组合任意数量的 `reducer`, 那么它是如何做到的呢？

让我们来手动实现一次这个函数，以便加深对其的了解。

我们已经知道这个函数的输入与输出是什么：

```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {

  }
}
```

对于传入的 reducers 数组, 函数总是返回一个大的 `reducer` 函数。

让我们回顾一下, reducer 是一个接受当前状态和被分发的动作，计算出新的状态的纯函数。

我们的目标是拿到一个由各个 `reducer` 计算后总的新状态。

我们可以调用每个 `reducer`, 把它们要处理的那部分状态和被分发的动作传入去计算出新的状态。并且这些新状态都是有名字标记的，也就是传入对象的键 (keys).

最后把这些新状态组合起来就好了。

```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};
```

使用 `reduce` 方法能够让计算串联起来得到最终结果。

注意我们实际上用**转变**的方法修改了 `nextState`, 但因为 `nextState` 本来是函数内定义的，不会影响 reducer 作为纯函数的特性。

## 总结

我们知道了怎么实现 `combineReducers` 这个帮助函数。但是 `combineReducers` 不是开发 Redux 应用必须用到的，所以如果你还是不完全明白它是怎么一回事也不是太大的问题。

### 高阶函数

高阶函数是指一个函数可以接受其他函数作为参数，也可以是返回一个函数的函数。

`combineReducers` 是一个高阶函数， 它返回了一个函数。高阶函数对开发 Redux 应用有很大的帮助，了解这个概念可以提高你的生产力。

<style>{% include "./css/dplayer.css" %}</style>
