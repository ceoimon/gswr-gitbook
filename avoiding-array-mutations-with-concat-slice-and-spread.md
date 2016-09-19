<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[09] 使用 slice()，concat() 和 ...(展开运算符) 来避免修改数组"
    data-video="http://o71w1wc99.bkt.clouddn.com/09.mp4"
    data-subtitle="./sub/09.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/09.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/kaboqe/edit?js,console

## 环境

- 引入了 Expect, deep-freeze 库。

Expect 我们之前已经用过, 而 deep-freeze 库只提供了一个方法 `deepFreeze`.

### `deepFreeze`

冻结对象，让整个对象不可修改。

还记得之前使用过的测试驱开发？本节也将使用这个方法。

## 可变和不可变

我们已经知道，在 Redux 中, `state` 是只读的，每次要改变只能去计算出一个全新的。

像这种不可修改的对象叫做不可变 (immutable) 对象。

将修改对象称为转变 (mutation).

为了避免无意地转变不可变对象，我们将讨论一些在处理不可变数组时，应该要注意的地方。

## 多个计数器例子

我们之前已经实现过单个计数器，并使用单个数值表示整个应用的状态。

当我们要写一个"多个独立计数器"应用时（相信你已经玩弄过前面的示例）, 我们要用数组去表示多个单独的计数器状态。

### 添加计数器

我想实现的第一个函数是添加计数器的函数

```js
const addCounter = (list) => {
  // 待实现
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('全部测试通过！');
```
我们希望在执行 `addCounter` 后给数组最后添加一个 0

我们可以简单地使用 `push` 方法将 0 加入数组，而且可以通过测试。

```js
const addCounter = (list) => {
  list.push(0);
  return list;
};
```
！[Tests passed screenshot][Lesson-9_Tests-passed-screenshot]

当然，我们要确保我们没有**转变**这个数组。

通过 `deepFreeze` 方法我们可以保护数组不被修改：

```js
deepFreeze(listBefore);
```
现在，再次运行代码，会报错误，因为不能添加新的属性到一个被“冰冻”的对象。

![Screenshot of Array protected by deep-freeze][Lesson-9_Screenshot-of-Array-protected-by-deep-freeze]

我将使用数组的 `concat` 方法，这个方法不会修改原来的数组，而是返回一个新的数组，它是一个**纯函数**

```js
const addCounter = (list) => {
  return list.concat([0]);
};
```
测试再一次通过，因为我们没有**转变**原来的状态。

我们也可以使用 ES6 数组 ...(展开运算符) 来简化代码：

```js
const addCounter = (list) => {
  return [...list, 0];
};
```
### 移除计数器

下面要实现的是 removeCounter, 用于移除计数器。

它接受两个参数，一个是数值数组（代表所有计数器的状态）,另一个是代表计数器位置的索引 (index).

```js
const removeCounter = (list, index) => {

};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore); // 我们直接添加了 deepFreeze.

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};
```
如果现在的状态是三个计数器，在调用删除计数器的函数后，我们会删除对应索引的计数器，这里是第二个。（索引为1）

一般来说，我们可以使用 `splice` 方法去删除数组里面的东西。但是， `splice` 是一个**转变**方法，它会修改原有的数组，我们不应该在 Redux 中使用。

```js
const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list;
};
```
在使用 deepFreeze 之后这样是通过不了的，我们要想出另外一个删除数组项的办法。

我们可以使用一个跟 `splice` 很像的 `slice` 方法，但是它跟 `splice` 不一样，每次调用都会返回一个新的数组。所以我们可以这么用：

```js
// ES5
function removeCounter(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

// ES6 展开运算符
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};
```
我们只要数组的指定索引前和后的部分。

### 计数器自增

计数器自增应该是这样的：

```js
const incrementCounter = (list, index) => {

};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore); // 我们直接添加了 deepFreeze.

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter)
};
```

最直接的方法是直接修改数组对应索引的项，但这也是会使数组发生**转变**的，因为我们使用了 deepFreeze, 它不会通过测试。

```js
const incrementCounter = (list, index) => {
  list[index]++;
  return list;
};
```

为了解决这个问题，我们同样可以使用 `slice` 和 `concat` 来拼接新的数组，使用展开运算符取代 `concat` 将更直观简洁。

```js
// ES5
function incrementCounter(list, index) {
  return list.slice(0, index).concat(list[index] + 1, list.slice(index + 1));
}

// ES6 展开运算符
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0,index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};
```

## 总结

- 避免使用会使原来数组发生**转变**的方法。
  - 使用 deepFreeze 保护数组不被修改。
- 常见的**转变**方法及替代方法：

```js
let array = [1, 2, 3];
let newArray = [];

// 转变方法
newArray = array.push(4);
console.log(newArray); // [1, 2, 3, 4]
console.log(array); // [1, 2, 3, 4]

// 非转变方法
newArray = array.concat(4);
newArray = [...array, 4]; // ES6
console.log(newArray); // [1, 2, 3, 4]
console.log(array); // [1, 2, 3]

// 转变方法
array.splice(1)
newArray = array;
console.log(newArray); // [1, 3]
console.log(array); // [1, 3]

// 非转变方法
newArray = array.slice(0, 1).concat(array.slice(1 + 1))
newArray = [...array.slice(0, 1), ...array.slice(1 + 1)]; // ES6
console.log(newArray); // [1, 3]
console.log(array); // [1, 2, 3]

// 转变方法
array[1] += 1;
newArray = array;
console.log(newArray); // [1, 3, 3]
console.log(array); // [1, 3, 3]

// 非转变方法
newArray = array.slice(0, 1).concat(array[1] + 1, array.slice(1 + 1));
newArray = [...array.slice(0, 1), array[1] + 1, ...array.slice(1 + 1)]; // ES6
console.log(newArray); // [1, 3, 3]
console.log(array); // [1, 2, 3]
```

## 思考： （答案将在下一节公布）

- `deepFreeze` 的原理是什么，它是怎么保护对象的？

### 上节解答:

- 为什么我们不在 `Counter` 组件里面直接获取当前状态？
相关代码：

```js
const Counter = ({
  value
}) => (
  // ...具体实现
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
    />,
    document.getElementById('root')
  );
};
```
  - 这样做会使组件和状态耦合，组件本身不应依赖 `store`.
  - `Counter` 是一个展示型组件，后面我们会继续深入讨论。

[Lesson-9_Tests-passed-screenshot]: ./screenshots/Lesson-9_Tests-passed-screenshot.png
[Lesson-9_Screenshot-of-Array-protected-by-deep-freeze]: ./screenshots/Lesson-9_Screenshot-of-Array-protected-by-deep-freeze.png

<style>{% include "./css/dplayer.css" %}</style>
