<div class="dplayer-container">
  <div
    id="dplayer"
    class="dplayer"
    style="margin-bottom: 20px;"
    data-id="[10] 使用 Object.assign() 和 ...(展开运算符) 来避免修改对象"
    data-video="http://o71w1wc99.bkt.clouddn.com/10.mp4"
    data-subtitle="http://o71w1wc99.bkt.clouddn.com/10.vtt?v0.0.1"
    data-cover="http://o71w1wc99.bkt.clouddn.com/10.jpg?v0.0.1"
  ></div>
</div>

<script defer src="./js/DPlayer.min.js"></script>
<script defer src="./js/dplayer.js"></script>

本节使用到的环境：https://jsbin.com/kaboqe/edit?js,console

## 标记 Todo 为完成/代办

和上一节一样，我们将使用 `expect` 和 `deepFreeze` 来编写一些**非转变**函数。

这次，要测试的是一个叫 `toggleTodo` 的方法，它用于改变 todo 对象里的 `completed` 属性，如果一个 todo 是标记为完成的，它将是 `true`, 否则为 `false`.

```js
const toggleTodo = (todo) => {

};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('全部测试通过！');
```

我们可以直接“反转”目前的值来达到目地，就像上一节，我们首先写一个**转变**版本的来通过测试。

```js
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
```

我只是单纯地“反转”了 `completed` 属性的值，然后重新赋值。

虽然通过了测试，但是我们已经知道这样的**转变**是（在 Redux 中）不被允许的。我们可以通过使用 `deepFreeze` 来保护我们的对象。

```js
deepFreeze(todoBefore); // 将这行代码放到 expect 前
```

既然我们不能修改原有的对象，我们就要新建一个对象，并将之前的对象完全复制一次，然后再去修改需要改变的属性。

```js
const toggleTodo = (todo) => {
  const newObject = {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  };
  return newObject;
};
```
这虽然是一个可行的办法，但是有时可能会忘记填入一些其他的属性，特别是当对象变得越来越复杂。

所以我们可以使用在 ES6 里的新增的 `Object.assign` 方法，它可以将传进入的任意多个对象组合为一个对象，注意它会修改第一个传入的对象，所以我们一般要这么使用：

```js
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};
```

我们传进入的第一个对象是一个空的对象，这样就确保了每次返回的都是新建的对象。

其他随后的对象参数都会按顺序地跟目前得到的对象进行“合并”，将所有属性复制到目前的对象中，如果遇到同名的属性将进行覆盖，所以遇到同名的属性，总是会取最后出现的那一个。

另外值得一提的是，在 ES7 的提议中，对象也是可以使用展开运算符 (...) 的。

```js
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};
```
这样会更简洁明了。

## 总结

- 避免使用会使原来对象发生**转变**的方法。
  - 使用 deepFreeze 保护对象不被修改。
- 常见的**转变**方法及替代方法：

```js
let object = { key1: 'value1', key2: 'value2', key3: 'value3' };
let newObject = {};

// 转变方法
newObject = object;
newObject.key3 = 'newValue';
console.log(newObject); // Object {key1: "value1", key2: "value2", key3: "newValue"}
console.log(object); // Object {key1: "value1", key2: "value2", key3: "newValue"}

// 非转变方法
newObject = { key1: 'value1', key2: 'value2', key3: 'newValue' };
newObject = Object.assign({}, object, { key3: 'newValue' }); // ES6
newObject = { ...object, key3: 'newValue' }; // ES7
console.log(newObject); // Object {key1: "value1", key2: "value2", key3: "newValue"}
console.log(object); // Object {key1: "value1", key2: "value2", key3: "value3"}
```

## 思考： （答案将在下一节公布）

### 上节解答:

- `deepFreeze` 的原理是什么，它是怎么保护对象的？
`Object` 存在一个 `freeze` 方法，它的作用是让目标对象不能添加、修改和删除属性，换言之就是使对象变得**不可变** (immutable).

`deepFreeze` 实现：

```js
function deepFreeze (obj) {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach(function (prop) {
    if (obj.hasOwnProperty(prop)
    && obj[prop] !== null
    && (typeof obj[prop] === "object" || typeof obj[prop] === "function")
    && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]); // 如果对象的属性的值是对象，递归调用
    }
  });
  
  return obj;
};
```

<style>{% include "./css/dplayer.css" %}</style>
