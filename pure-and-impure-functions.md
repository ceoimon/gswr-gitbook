<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[03] 纯函数和非纯函数"
    data-video="http://o71w1wc99.bkt.clouddn.com/03.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/03.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/03.jpg?v0.0.1"
  ></div>
</div>

<style>{% include "./css/dplayer.css" %}</style>
<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

## 概念

- 纯函数 (pure function) 的返回值只依赖于它的参数
  - 不依赖外部变量。
  - 传入同样的参数，必然返回同样的结果。
- 纯函数不能有任何可见的副作用
  - 像网络请求、访问数据库和 I/O 输入输出等。
  - 多次调用产生的效果是一样的。
  - 不会修改传递进来的参数。

## 对比 1 - 不依赖外部变量

```js
// 纯函数 (Pure function)
function addOne(x) {
  return x + 1;
}

// 非纯函数 (Impure function)
let one = 1;
function addOne(x) {
  return x + one; // 函数依赖了外部变量
}
```
## 对比 2 - 不会产生副作用

```js
// 纯函数
function doSomething(x) {
  return x;
}

// 非纯函数
function doSomething(x) {
  updateXInDatebase(x); // 访问了数据库。
  return x;
}
```

## 对比 3 - 传入同样的参数，必然返回同样的结果

```js
// 纯函数
function doSomething(x, y, z) {
  return x + y + z;
}

// 非纯函数
function doSomething(x, y, z) {
  return x + y + z + Math.random(); // 每次用同样的参数都可能返回不一样的结果
}
```

## 对比 4 - 多次调用产生的效果是一样的
```js
// 纯函数
function doSomething(x) {
  return x;
}

// 非纯函数
function doSomething(x) {
  console.log(x); // 多次调用会打印多个句子
  return x;
}
```

## 对比 5 - 不会修改传递进来的参数

```js
// 纯函数
function doSomething(num) {
  num = num + 1; // 原始类型传参是值传递。
  return num;
}

// 非纯函数 
function doSomething(obj) {
  obj.x = obj.x + 1; // 引用类型被修改
  return obj;
}
```

## 总结

**纯函数 (Pure function)** 确保了不会修改传进去的参数，不会产生多余的操作。行为很好预测。

在 Redux 中有些功能必须是以纯函数来实现。

## 思考： （答案将在下一节公布）

- 我们可以把应用的状态 `state` 传入一个非纯函数吗？

### 上节解答:

- 为什么 `action` 里的 `type` 属性通常使用字符串？
  - 字符串易于储存。
  - 字符串表述直观。

## 扩展阅读：

- [函数的副作用](http://www.cnblogs.com/snandy/archive/2011/08/14/2137898.html)
- [函数副作用（维基百科）](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E5%89%AF%E4%BD%9C%E7%94%A8)
