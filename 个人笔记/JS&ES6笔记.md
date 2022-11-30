@[TOC](目录)

# ES6&JS
## Array.from
下面是一个类似数组的对象，Array.from将它转为真正的数组。
```javascript
let arrayLike = {
'0': 'a',
'1': 'b',
'2': 'c',
length: 3};
// ES5的写法var arr1 = [].slice.call(arrayLike); // ['a', 'b','c']
// ES6的写法let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。`Array.from`方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有`length`属性的对象，都可以通过`Array.from`方法转为数组，而此时扩展运算符就无法转换。

```javascript
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。  
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。  

```javascript
Array.from(arrayLike, x => x * x);
// 等同于Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
下面的例子将数组中布尔值为false的成员转为0。

```javascript
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]
```

上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

```javascript
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```
## Array.of()

```javascript
Array.of()方法用于将一组值，转换为数组。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

## bind()方法

bind()方法主要就是将函数绑定到某个对象，bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()中的第一个参数的值，例如：f.bind(obj)，实际上可以理解为obj.f()，这时f函数体内的this自然指向的是obj,并将创建的函数返回（不会立即执行）


## concat

```javascript
var arr1 = [1,2,3]
var arr2 = [4,5,6]
arr1.concat(arr2) //输出 [1,2,3,4,5,6]
同 [...arr1, ...arr2 n]
arr1.concat(arr2,arr3,arr4) 里面不限数量
不会改变原数组会返回新数组
```

## Array.some, Array.every()

`Some()`:方法用于检测[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)中的元素是否有满足指定条件的，若满足返回true，否则返回false；  
`every()`:方法用于检测数组中所有元素是否都符合指定条件，若符合返回true，否则返回false；

## 定义class类

```javascript
export default class gasComprehensive {
    //实时空气质量
    static async realQuality(params: Record<string, any>) {
        return request.get(`${base.aimsService}/web/api/v1/analyze-map/grid-detail`,params)
    }
    //空气质量累计数据
    static async airQualityPanel(params?: Record<string, any>) {
        return request.get(`${base.aimsPrjService}/web/api/v1/comprehensive-situation/air-quality-panel`,params)
}
}
使用gasComprehensive.airQualityPanel()
```

## Date()

```javascript
let 函数名 =new Date(); Tue Aug 10 2021 16:01:03 GMT+0800 (中国标准时间)
2.1 Date().toDateString() Tue Aug 10 2021
2.2 Date().toTimeString() 16:09:53 GMT+0800 (中国标准时间)
2.3 Date().toLocaleDateString() 2021/8/10
2.4 Date().toLocaleTimeString() 下午4:10:27
2.5 Date().toUTCString() Tue, 10 Aug 2021 08:10:42 GMT
只列举常见方法，具体参考手册
3.1 getTime() 返回日期的毫秒，与valueOf相同
3.2 getFullYear() 返回4位年数 2021
3.3 getMonth() 返回月(0表示1月...) 7
3.4 getDate() 返回日 10
3.5 getDay() 返回周几(0表示周日，6表示周六) 2
```

## Doc. addEventListener 

```javascript
// 监听浏览器隐藏显示
document.addEventListener('visibilitychange', function() {
    var isHidden = document.hidden;
    // console.log(document.visibilityState) // visible hidden
    if (isHidden) { // '隐藏'
        .......
    } else if(codeFlag) { // '显示'
       .......
    }
});
```

## function 
解构参数
```javascript
const greet = ({ greeting, firstName, lastName }) => {
  return `${greeting}, ${firstName}${lastName}`;
}
```
function的长度:
```javascript
function fn1 () {}
function fn2 (name) {}
function fn3 (name, age) {}

console.log(fn1.length) // 0
console.log(fn2.length) // 1
console.log(fn3.length) // 2
-----------------------------------------------------------
function fn1 (name) {}
function fn2 (name = '林三心') {}
function fn3 (name, age = 22) {}
function fn4 (name, age = 22, gender) {}
function fn5(name = '林三心', age, gender) { }

console.log(fn1.length) // 1
console.log(fn2.length) // 0
console.log(fn3.length) // 1
console.log(fn4.length) // 1
console.log(fn5.length) // 0
-----------------------------------------------------------
function fn1(name, ...args) {}

console.log(fn1.length) // 1

```
length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。形参的数量`不包括剩余参数个数`，仅包括第一个具有`默认值`之前的参数个数

## For循环
### 简单 for 循环

```javascript
const arr = [1, 2, 3];
for ( let i = 0; i　< arr.length; i++) {
     console.log(arr[i]);
}
// 不可以const 因为i要++改变
```

### for-in
```javascript
const arr = [1, 2, 3];
let index;
for (index in arr) {
     console.log( "arr[" + index + "] = " + arr[index]);
}
一般情况下，运行结果如下：
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/513d9efe3c44494e87087d12047b72a2.png)
for-in 循环遍历的是对象的属性，而不是数组的索引。因此， for-in
遍历的对象便不局限于数组，还可以遍历对象。例子如下：

```javascript
const person = {
     fname: "san" ,
     lname: "zhang" ,
     age: 99
};
let info;
for (info in person) {
     console.log( "person[" + info + "] = " + person[info]);
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9eb85832521742018da03192d8067fd5.png)

我们可以发现 for-in 并不适合用来遍历 Array
中的元素，其更适合遍历对象中的属性，这也是其被创造出来的初衷。却有一种情况例外，就是稀疏数组。考虑下面的例子：

```javascript
let key;
const arr = [];
arr[0] = "a" ;
arr[100] = "b" ;
arr[10000] = "c" ;
for (key in arr) {
     console.log(arr[key]);
}
输出：a,b,c
```

for-in 只会遍历存在的实体，上面的例子中， for-in
遍历了3次（遍历属性分别为"0″、 "100″、 "10000″的元素，普通 for
循环则会遍历 10001 次）。所以，只要处理得当， for-in 在遍历 Array
中元素也能发挥巨大作用。

### for-of
for-in循环用来遍历对象属性。
for-of循环用来遍历数据---例如数组中的值。
```javascript
const arr = [ 'a' , 'b' , 'c' ];
for ( let data of arr) {
     console.log(data);
}
输出：a,b,c
```

之前的缺陷：
-   forEach 不能 break 和 return；
-   for-in
    > 缺点更加明显，它不仅遍历数组中的元素，还会遍历自定义的属性，甚至原型链上的属性都被访问到。而且，遍历数组元素的顺序可能是随机的。
**那 for-of 到底可以干什么呢？**
-   跟 forEach 相比，可以正确响应 break, continue, return。
-   for-of 循环不仅支持数组，还支持大多数类数组对象，例如 `DOM nodelist` 对象。
-   for-of 循环也支持字符串遍历，它将字符串视为一系列 Unicode 字符来进行遍历。
-   for-of 也支持 Map 和 Set （两者均为 ES6 中新增的类型）对象遍历。
总结一下，for-of 循环有以下几个特征：
-   这是最简洁、最直接的遍历数组元素的语法。
-   这个方法避开了 for-in 循环的所有缺陷。
-   与 forEach 不同的是，它可以正确响应 break、continue 和 return 语句。
-   其不仅可以遍历数组，还可以遍历类数组对象和其他可迭代对象。
for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM [***NodeList对象***](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)。
for-of循环也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历：
```javascript
const myData = 'dsa'
    for(let i of myData) {
      console.log(i);
    }
输出： d,s,a
```
### break，continue,return
break会跳出一个循环可以配合if使用不会只跳出if
continue跳出循环的此次操作执行循环的下一个
Return直接结束
break，continue 配合outer :
```javascript
outer: // outer只是一个标识符 随便命名
outer: for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          console.log("i:" + i + " j:" + j);
          if (j == 1) {
            continue outer;
          }
          if (i == 1) {
            break outer;
          }
        }
        console.log("i:" + i);
      }
输出：
i:0 j:0
i:0 j:1
i:1 j:0

outer: for (var i = 0; i < 10; i++) {
   for (var j = 0; j < 10; j++) {
       if (i > 5) {
          console.log(i);
          break outer;
        }
    }
}
输出： 6
```
break，continue会直接跳出到你的标识符的那层循环位置，如上面的位置就是break可以跳出两层for循环
其还可以在内部使用，跳到任意循环的指定位置，如跳到内部
## forEach
forEach() 方法对数组的每个元素执行一次提供的函数。forEach
方法为数组中含有有效值的每一项执行一次 callback 函数，那些已删除（使用
delete 方法等情况）或者从未赋值的项将被跳过（那些值为 undefined 或 null
的项会被读取）
```javascript
var array = ['a', 'b', 'c'];
array.forEach(function(element) {
    console.log(element);
});
输出为：
a;
b;
c;
```
forEach方法中的function回调有三个参数：
第一个参数是遍历的数组内容，
第二个参数是对应的数组索引，Number类型
第三个参数是数组本身
foreach 语法：

```javascript
[ ].forEach(function(value,index,array){
　　//code something
});
var arr = [1,2,3,4];
var sum =0;
arr.forEach(function(value,index,array){
    array[index] == value; //结果为true
    sum+=value;
});
console.log(sum); //结果为 10
```
## flat
方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat()); //默认降一维
// expected output: [0, 1, 2, 3, 4]
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]
flat() 方法会移除数组中的空项:
用Infinity参数可以将数组内不管有几层都展平
```

## find()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
```javascript
[1, 4, -5, 10].find((n) => n < 0)// -5
```

上面代码找出数组中`第一个`小于 0 的成员。
查找函数有三个参数。value：每一次迭代查找的数组元素。index：每一次迭代查找的数组元素索引。arr：被查找的数组。

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
}) // 10
```

上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```javascript
function f(v){
    return v > this.age;
}
let person = { name: 'John', age: 20 };
[10, 12, 26, 15].find(f, person); // 26
```
上面的代码中，find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
## findIndex
findIndex()
方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。  
findIndex() 方法为数组中的每个元素都调用一次函数执行：  
当数组中的元素在测试条件时返回 [true]{.underline} 时, findIndex()  
返回符合条件的元素的索引位置，之后的值不会再调用执行函数。  
如果没有符合条件的元素返回 -1  

```javascript
var ret3 = arr1.findIndex((value, index, arr) => {
return value > 4
})
```

## filter 

```javascript
返回数组中所有元素都大于 18 的元素:
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age >= 18;
}
function myFunction() {
    document.getElementById("demo").innerHTML =
    ages.filter(checkAdult);
}
输出结果为: 32,33,40
```
filter()
方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。  
注意： filter() 不会对空数组进行检测。  
注意： filter() 不会改变原始数组。  

```javascript
allData.filter(item => {
    return item >= 18
})
```
当return为true时就返回这个item 如果为假就不返回这个item
## fill
fill方法使用给定值，填充一个数组。
```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
```

上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

上面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
## 判断if

```javascript
const data = []
if(data) true
if(data.length) false
const data = {}
if(data) true
if(data.length) false // 但是这样是不对的
因为无论data是不是空其length都是0
Object.keys(obj).length === 0 // 这样才能判断length
if(JSON.stringify(data) === '{}') true
if (Object.keys(obj).length === 0 || !obj.object.name) return
如果前面的语句判断为false || 后面的就不会被执行判断
```

## includes（）
方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016
引入了该方法。

```javascript
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```javascript
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
'mjh'.includes('mh') // false
'mjh'.includes('mj') // true
```

## 实例方法：includes(), startsWith(), endsWith()
传统上，JavaScript
只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6
又提供了三种新方法。

-   includes()：返回布尔值，表示是否找到了参数字符串。
-   startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
-   endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```javascript
let s = 'Hello world!';
s.startsWith('Hello') // trues.endsWith('!') //
trues.includes('o') // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
## indexOf
indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
**语法**
stringObject.indexOf(searchvalue,fromindex)  
Searchvalue 必需。规定需检索的字符串值。  
Fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。  
**提示和注释**
**注释：**indexOf() 方法对大小写敏感！  
**注释：**如果要检索的字符串值没有出现，则该方法返回 -1。  

```javascript
var str="Hello world!"
document.write(str.indexOf("Hello") ) //输出 0
document.write(str.indexOf("World") )//输出 -1
document.write(str.indexOf("world") )//输出 6
var index = [12, 5, 8, 130, 44].indexOf(8);
console.log("index is : " + index ) //index is : 2
```

获得数组对象内的某个值等于要求值的索引
```javascript

  let data = [
    {
        id:1,
        name:"小红"
    },
    {
        id:2,
        name:"小明"
    }
  ];

  data.indexOf(data.filter(d=>d.id == 1)) //index：0
  data.indexOf(data.filter(d=>d.id == 2)) //index：1
  data.indexOf(data.filter(d=>d.name == "小红")) //index：0
  data.indexOf(data.filter(d=>d.name == "小明")) //index：1
  data.indexOf(data.filter(d=>d.id == 3)) // 不存在即返回-1
```
## lastIndexof
```javascript
url.lastIndexOf("/") 获取字符串最后一个/的下标
```

## instanceof
在 JavaScript 中，判断一个变量的类型尝尝会用 typeof 运算符，在使用typeof运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回"object"。ECMAScript 引入了另一个 Java 运算符 instanceof来解决这个问题。  
instanceof 运算符与 typeof运算符相似，用于识别正在处理的对象的类型。与 typeof方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。  
前面放变量后面放放需要判断的类型或者继承关系 (只可以判断存储数据类型Object、function)

```javascript
{} instanceof Object // true
{} instanceof Array  // false
[] instanceof Array // true
[1, 2] instanceof Object // true ！！
function Person(){
}
function Student(){
}
Student.prototype = new Person();
var John = new Student();
console.log(John instanceof Student); // true
console.log(John instancdof Person);  // true
```
## join()
join（）方法将数组的所有元素连接成一个字符串。
语法：

```javascript
array.join(separator);
```
参数
separator -
指定用于分隔数组的每个元素的字符串。如果省略，则使用逗号分隔数组元素。
返回值
连接所有数组元素后返回一个字符串。

```javascript
Arr.join("rn")
输出：
A
B
C
Arr.join("+")
输出： a+b+c
```

## map方法
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。
注意： map() 不会对空数组进行检测。
注意： map() 不会改变原始数组。

```javascript
var numbers = [4, 9, 16, 25];
Const dataMap = numbers.map(Math.sqrt);
// [2,3,4,5]
```

## Let var const
使用let，声明的变量仅在块级作用域内有效 var是全局
在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为"暂时性死区"（temporal
dead zone，简称 TDZ）。
let不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错function func() {
let a = 10;
var a = 1;}
// 报错function func() {
let a = 10;
let a = 1;}
因此，不能在函数内部重新声明参数。
function func(arg) {
    let arg;
}
func() // 报错
function func(arg) {
{
let arg;
}
}
func() // 不报错
const声明一个只读的常量。一旦声明，常量的值就不能改变。
const的作用域与let命令相同：只在声明所在的块级作用域内有效。
const foo = {};
// 为 foo 添加一个属性，可以成功foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {};
// TypeError: "foo" is read-only
常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
const a = [];
a.push('Hello'); // 可执行
a.length = 0; // 可执行
a = ['Dave']; // 报错
```

## map 函数
不改变原数组返回新数组 对数组进行操作可使用，不用来过滤数据

```javascript
const datas = [1, 2, 4, 2, 4, 3];
datas.map(item => item > 2) // [false, false, true, false, true,
true]
item => item > 2 相当于 item => { return item > 2 }
datas.map(item => {
if (item > 2) return item;
}) // [undefined, undefined, 4, undefined, 4, 3]
datas.map(item => item * 2) // [2, 4, 8, 4, 8, 6]
```

## Map类

```javascript
Map对象稍有不同：内含的数据由键值对组成，所以你需要使用解构（destructuring）来将键值对拆解为两个独立的变量：
for (var [key, value] of phoneBookMap) { console.log(key + "'s phone
number is: " + value); }
 var map = new Map([['1','Jckey'],['2','Mike'],['3','zhengxin']]);
    map.set('4','Adam');//添加key-value
    map.set('5','Tom');
    map.set('6','Jerry');
    console.log(map.get('6')); // Jerry
    map.delete('6'); // 删除
    console.log(map.get('6')); // undefined
    for(var [key,value] of map) {
      console.log('key='+key+' , value='+value);
    }
For循环输出
key=1 , value=Jckey
key=2 , value=Mike
key=3 , value=zhengxin
key=4 , value=Adam
key=5 , value=Tom
```

## Math
**Math.trunc()**

```javascript
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
对于非数值，Math.trunc内部使用Number方法将其先转为数值。
```

**Math.sign()**
Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。  
它会返回五种值。  
-   参数为正数，返回+1；  
-   参数为负数，返回-1；  
-   参数为 0，返回0；  
-   参数为-0，返回-0;  
-   其他值，返回NaN。  
`Math.cbrt()` . 
方法用于计算一个数的立方根。  
`Math.hypot `
方法返回所有参数的平方和的平方根。  

```javascript
Math.hypot(3, 4); //5
```

Math.floor() 返回小于或等于一个给定数字的最大整数。  
可以理解 Math.floor()为向下取整  

```javascript
Math.floor(x) // 返回小于x的最大整数
Math.floor(12.2)  // 12
Math.floor(15 / 2)  // 7
Math.ceil(x) // 返回大于x的最小整数
Math.ceil(12.2)  // 13
Math.ceil(15 / 2)  // 8
Math.round() 返回一个数字四舍五入后最接近的整数
var a=Math.round(2.60); // 3
var b=Math.round(2.50); // 3
var c=Math.round(2.49); // 2
var d=Math.round(-2.60); // -3
var e=Math.round(-2.50); // -2
var f=Math.round(-2.49); // -2
```

除法取余数 5%2 1  
`Math.random()`
生成一个0~1的随机数，概率相同  
`Math.max()`
找出最大值并返回最大值，括号内必须是一组数字，如果是数组需要用扩展运算符扩展

```javascript
const arr = [2,5,1,8,6]
Math.max(...arr) // 返回 8
Math.sqrt 取平方根
Math.pow(4,3); 4的3次方 // 也可以用 4**3表示
```

## Number
number可以将将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

```javascript
Number('0b111') // 7
Number('0o10') // 8
0b 二进制 0o 八进制 0x 十六进制
`Number.isFinite()`对于非数值一律返回false, 判断一个数是不是有限数，100/0返回 false infinity（无穷大） false
Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
Number.isInteger()用来判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.1) // false
但是精度不高
Number.parseInt(), Number.parseFloat() 转化为整数和浮点数

```

## Null判断运算符
？？ 属性值为null或undefined时，指定默认值  
读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。  

```javascript
const userName = (list && list.info && list.info.base &&
list.info.base.userName) || 'userName';
```

||或运算符表达的意思是左侧表达式为null、undefined、''、false、0，右侧表达式都会生效。但我们想要的只是在null或undefined的时候生效。  
es2020引入了新的Null判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。  
与链判断运算符?.配合使用。  

```javascript
const userName = list?.info?.base?.userName ?? 'userName';
可用于函数参数默认值的判断
register(a, b) {
    b = b ?? 3;
}
```

## Object是否含有某个属性

```javascript
myObject.hasOwnProperty('a')
'a' in myObject
if(myObject.width)
```

## Object是否为空

```javascript
if (JSON.stringify(data) === '{}') 
if (Object.keys(object).length === 0)
```

## Object.keys()

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
。

```javascript
Object.keys(obj)
// simple arrayvar arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']
// array like object
var obj = { 0: 'a', name: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', 'name', '2']
// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
```

## Object.assign对象合并

```javascript
const config1 = {
Host: '123',
Name: 'root'
Text: 'test'
}
const config2 = {
Host: '3',
Name: 'admin'
dj: 'test1'
}
Object.assign(config1 , config2 )
//config2会把config1里面重名的属性值覆盖掉，不重名的都保留
var num2 =Object.assign({},num1);
*//num2 = num1;*
这种赋值改变num2的属性值是不会影响num1的
```
给合并设置默认值：
```javascript
config = Object.assign({
    title: 'Foo',
    body: 'Bar'
  }, config);
```

## Object.is判断两个值是否完全相等

```javascript
Object.is(120,120) // true
Object.is(NaN,NaN) // true
NaN === NaN // false
和===的区别是可以判断NaN类型
```

## Object.entries
```javascript
    const arr = Object.entries({
      name: "百度",
      address: 'baidu'
    })
    console.log(arr);
    [
        ["name", "百度"],
        ["address", "baidu"]
    ]
```

将对象转化成二维数组
## Object.fromEntries

将数组转化成对象

```javascript
const result = Object.fromEntries([
    ['name','尚硅谷'],
    ['java','python','js','c++']
]);
console.log(result); // {name: "尚硅谷", java: "python"}
const m = new Map()
m.set('name', 'MJH')
const result = Object.fromEntries(m)
console.log(result); //{name: "MJH"}
```

## Object.prototype.toString.call()

```javascript
Object.prototype.toString.call(checkData) === '[object Array]'
//数组
Object.prototype.toString.call(checkData) === '[object Object]'
//对象
[object Number] //是 number类型
[object Null] // 是null
[object Boolean] // Boolean
[object Undefined] // undefined
[object String] // String
[object Number] // NaN 判断出来和number一致 !!
在typeof里 Array 和 Object 检查出来都是Object
```

## padStart()，padEnd()实例方法
padStart()的常见用途是为数值补全指定位数。下面代码生成 10
位的数值字符串。

```javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

第一个参数比如10会自动生成第二个参数填满的10位字符串。最后没有刚好填满的时候会截取第二位参数来填满`padStart`是从后往前填充  
`padEnd`是从前往后 
另一个用途是提示字符串格式。

```javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

## parseInt parseFoat 
parseInt(a) 可以将a转化为int类型 同理parseFloat  
**parseInt()直接舍去小数部分 不会改变原值会返回值**
## Pop
pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减1，并且`返回它删除的元素的值`。如果数组已经为空，则 pop()不改变数组，并返回 undefined 值。
## push
操作后的返回值是数组的长度
## Promise
### 基础promise

```javascript
return Promise.reject(new Error('api地址错误')) 
```
可以手动返回一个失败情况的promise请求其括号内的内容就会传递到后面.catch后面的参数里  

```javascript
.catch(err => {
Console.log(err)
})
```

控制台输出： Error: api地址错误
### promise的all和allSettled
只要p1 和 p2 有一个成功就返回Promise成功 全部失败就返回失败

```javascript
const result = Promise.allSettled([p1, p2])
```

只要p1 和 p2 有一个失败就返回Promise失败 全部成功就返回成功

```javascript
Const result = Promise.all([p1, p2])
```

使用：

```javascript
Promise.all([getControlGroupData(),getControlGroupIndexData()]).then((res:any)
=> {
     getDataChange(res) // 返回的res是数组，分布是两个promise的res返回
}).catch((e) =>{
     console.warn(e);
})
// 请求因子组
const getControlGroupData = () => {
    return new Promise(resolve => {
        if(data.groupId) {
            resolve('')
            return
        }
    waterComprehensiveApi.factorGroupQuality().then(res => {
        const resData = res
        const filData = resData.filter((item:{code:string}) =>item.code === 'EVALUATION_5')
             data.groupId = filData[0].id
            resolve({ code: data.groupId })
        })
      })
}
// 请求因子参数字典
const getControlGroupIndexData = () => {
     return new Promise(resolve => {
           waterComprehensiveApi.queryFactorIndex().then(res => {
                 const resData = res
                 data.keyList = resData
                 resolve({ data: resData })
           })
     })
}
```

## prototype  对象添加属性
prototype 属性使您有能力向对象添加属性和方法。  
语法:

```javascript
object.prototype.name=value
```

## reduce()函数
reduce()函数接收的参数和map()类似，一个函数f，一个list，但行为和map()不同，reduce()传入的函数f必须接收两个参数，reduce()对list的每个元素反复调用函数f，并返回最终结果值。  
例子：

```javascript
function f(x, y):
return x + y
reduce(f, [1, 3, 5, 7, 9]) # 返回结果为25
reduce()还可以接收第3个可选参数，作为计算的初始值。
```

**如果把初始值设置为100** 

```javascript
reduce(f, [1, 3, 5, 7, 9], 100) # 返回结果为125
// prev参数为一开始赋值的参数 比如 0 或者上一轮return的参数 (prev + cur),cur 为当前数组的参数比如1
const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce((prev, cur) => {
return prev + cur
}, 0)
console.log(sum) // 15
```

## reverse()
reverse() 方法用于颠倒数组中元素的顺序。  
用法：

```javascript
arrObject.reverse()
```
**注释：**该方法会改变原来的数组，而不会创建新的数组。
如果要让字符串颠倒可以这样

```javascript
var str = 'mjh'
str.split("").reverse().join("")
```

## replace

```javascript
url = "x={x}"
var a = "x"
url.replace('{' + a + '}', 5);
得到 url = "x=5"
```
提取字符串中的数字部分 'dsada1564dsad'

```javascript
item.value = item.value.replace(/[^d]/g,' ');// 1564
去除字符串中的数字
item.unit = item.value.replace(/[0-9]+/g,"")
去除字符串中的数字和小数点 .
item.unit = item.value.replace(/[0-9,.]+/g,"")
去除空格
console.log('hel lo wor ld'.replace(/s/g, '')); // helloworld
```

## repeat（）
repeat方法返回一个新字符串，表示将原字符串重复n次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

## Set类
Map和Set对象是ES6中新增的类型。ES6中的Map和Set和java中并无太大出入。  
Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。  
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：  


```javascript
var s1 = new Set(); *// 空Set*
var s2 = new Set([1, 2, 3]); *// 含1, 2, 3*
```

重复元素在Set中自动被过滤：


```javascript
var s = new Set([1, 2, 3, 3, '3']); s; // Set {1, 2, 3, "3"}
```

通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：


```javascript
var s = new Set([1, 2, 3]);
s.add(4); s; // Set {1, 2, 3, 4}
s.add(4); s; // Set {1, 2, 3, 4}
```

通过delete(key)方法可以删除元素：


```javascript
var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

Set对象可以自动排除重复项


```javascript
 const stringArr = ['string','string','string3','string4'];
 var newSet = new Set(stringArr);
  for(let key of newSet){
    console.log(key);
  }
输出：string，string3，string4
```

将set类变成数组


```javascript
var arr = [2,7,1,7,8,2]
var newArr = [...new Set(arr)] // 去重
```

## split
split() 方法用于把一个字符串分割成字符串数组。
![在这里插入图片描述](https://img-blog.csdnimg.cn/f69971146000494e8d8718d7da82711c.png)

**注释：**如果把空字符串 ("") 用作 *separator*，那么 stringObject
中的每个字符之间都会被分割。  
**注释：**String.split()执行的操作与 [*Array.join*](https://www.w3school.com.cn/jsref/jsref_join.asp) 执行的操作是相反的。  

```javascript
"hello".split("", 3) //可返回 ["h", "e", "l"]
"hello".split("") //可返回 ["h", "e", "l", "l", "o"]
"2:3:4:5".split(":") //将返回["2", "3", "4", "5"]
```

## splice slice
splice会改变原数组,splice`不可以对字符串操作`

```javascript
splice（index，a，value，value....）
```

index代表从函数第几位开始加入value，  
a代表删除并替换value的位数，如果是0就代表不删除直接添加。  
value（可选）向数组添加的新项目。  
当要删除数组的第二位和第三位时就可以这么写：splice(1,2)

```javascript
const arr = [1,2,1]
arr.splice(1,0,5)
clg(arr) // [1,5,2,1]
```
splice没有返回值，只是对数组的操作。  
`slice（start，end）`返回值 ，从数组/字符串的start到end 不会改变原数组不包括end那位  
当使用`负数作为参数`时就表示从数组末尾开始计数。  
而当省略第二个可选参数时，表示一直找到数组末尾。所以在数组上使用slice(-1)就可以获取数组的最后一个元素了。(-1指最后一个元素，-2 指倒数第二个元素) . 

```javascript
var args = [1, 2, 3];
var lastElement = args.slice(-1);//3
```

## substring()
substring() 方法用于提取字符串中介于两个指定下标之间的字符。   
![在这里插入图片描述](https://img-blog.csdnimg.cn/184c8e43afd74fb89c3cadf69559bcde.png)

返回值：  
一个新的字符串，该字符串值包含 *stringObject* 的一个子字符串，其内容是从 *start* 处到 *stop*-1处的所有字符，其长度为 *stop* 减 *start*。  
说明：  
substring()方法返回的子串包括 *start* 处的字符，但不包括 *stop* 处的字符。
如果参数 *start* 与 *stop* 相等，那么该方法返回的就是一个空串（即长度为0的字符串）。如果 *start* 比 *stop* 大，那么该方法在提取子串之前会先交换这两个参数。  
**重要事项：**与 [*slice()*](https://www.w3school.com.cn/jsref/jsref_slice_string.asp) 和 [*substr()*](https://www.w3school.com.cn/jsref/jsref_substr.asp) 方法不同的是，substring()不接受负的参数。
## sort

```javascript
allData: [
    {
        name: '马佳辉',
        value:65
    },
    {
        name: '马',
        value:58
    },
    {
        name: '马佳',
        value:12
    }
]
```
排序方法

```javascript
this.allData.sort((a,b) => {
    return a.value - b.value //从小到大排序（升序）
    // b.value-a.value从大到小（降序）
})
var dataList = [2,5,8,1,3]
dataList.sort((a,b) => {
    return a - b;
})
```

## stopPropagation() 事件方法
防止同一事件的任何传播：

```javascript
function func1(event) {
    alert("DIV 1");
    event.stopPropagation();
}
stopPropagation() 方法防止调用相同事件的传播。
```

传播意味着向上冒泡到父元素或向下捕获到子元素。
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-lKVBIYix-1669349956873)(media/image34.png)]{width="3.9166666666666665in"
height="1.4270833333333333in"}
## select() 
方法用于选择该元素中的文本。

```javascript
<textarea id="txt1">Hello world....</textarea>
document.getElementById("txt1").select() // 获得HEllow world....
```
## trimStart()，trimEnd()，trim()

只能对字符串操作 不然会报错  
trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符tab、换行符等其他空白符等。  
trim() 方法不会改变原始字符串。  
trim() 方法不适用于 null, undefined, Number 类型。  
[*ES2019*](https://github.com/tc39/proposal-string-left-right-trim) 对字符串实例新增了`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

```javascript
const s = ' abc ';
s.trim() // "abc"
s.trimStart() // "abc "
s.trimEnd() // " abc"
```

上面代码中，`trimStart()`只消除头部的空格，保留尾部的空格。`trimEnd()`也是类似行为。  
除了空格键，这两个方法对字符串头部（或尾部）的 tab键、换行符等不可见的空白符号也有效。
## toFixed
Num.toFixed(2) 四舍五入保留两位小数，并把返回值转化为字符串
## toString()
转换为字符串 number.toString()
## toLowerCase
所有字母变成小写
name.toLowerCase()
## toUpperCase
所有字母变成大写

```javascript
name.toUpperCase()
```
## typeof

```javascript
console.log(typeof '132'); // string
console.log(typeof 123); // number
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number
console.log(typeof true); // boolean
基础数据可以用 typeof '132' === string （true）判断
```

## unshift() 方
unshift() 方法将新项添加到数组的开头，并返回新的长度。  
**注释：** unshift() 方法会改变数组的长度。  
## window
ES6
为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1
let b = 1;
window.b // undefined
```

上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。

```javascript
window.open('www.baidu.com', '_blank'); // 新开页跳转外部链接
window.location.href = 'www.baidu.com' // 当前页跳转外部链接
获取浏览器URL地址 window.location.href（vue内如果使用route.path只能获得/hy-screen等，不能获得前缀地址）
```

## window.addEventListener
**mousewheel**

```javascript
window.addEventListener("mousewheel", this.handleScroll, false);
```
监听鼠标滚轮，方法调用 handleScroll（e） e.deltaY为100就是滚轮向下滚了一格，-100就是向上滚
或者绑定ref

```javascript
// 监听当前组件的滚动事件
this.box = this.$refs.viewBox;
this.box.addEventListener("scroll",() => {
    console.log(this.$refs.viewBox.scrollTop);
    // if (this.$refs.viewBox.scrollTop > 0) {
    // 显示下拉loading，展示更多数据
    this.handleScroll();
    // }
},
false
);
```

但是vue有更好的方法直接在元素上绑定@mousewheel="handleScroll"
**resize: 监听屏幕大小变化**

```javascript
// 跟随屏幕自适应
window.addEventListener('resize', function() {
    mCharts.resize(); // 如果设置了图表大小就会无法自适应
})
```

## window.requestAnimationFrame


```javascript
window.requestAnimationFrame(callback); 
```
**参数：callback**
下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入[*DOMHighResTimeStamp*](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，该参数与[*performance.now()*](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。  
## 可选链操作符? ?? ||
如果读取对象内部的某个属性，往往需要判断一下该对象是否存在，比如获取list.info.base.userName的值

```javascript
// 错误写法，当某一层级值为null或undefined时，会报错
const userName = list.info.base.userName;
// 正确写法（我们常用的方式）
const userName = (list && list.info && list.info.base &&
list.info.base.userName) || 'userName
```

要取的userName处于对象的第三层，需要三层&&判断才能取到值。  
es2020引入链合并运算符，简化上面的写法。  

```javascript
const userName = list?.info?.base?.userName || 'userName';
```

链合并运算符，在调用的时候判断左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。
三种用法：

```javascript
obj?.prop // 对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用
```

## 判断符号^

```javascript
判断规则： a^b
A b 返回值
1 1 0
1 0 1
0 1 1
0 0 0
```

## ** 指数

```javascript
2 ** 10 = 1024
2 ** 3 = 8
```

## 属性名当作变量

```javascript
var name = 'key'
var obj = {
    [name]: 'aaaa'
}
console.log(obj) // {key: 'aaaa'}
```

## 深拷贝：

```javascript
b = JSON.parse(JSON.stringify(a))
```

## 函数扩展
表达式还可以用于定义方法名。

```javascript
let obj = {
['h' + 'ello']() {
    return 'hi';
}};
obj.hello() // hi
```

ES6
允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```javascript
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};
```

下面是另一个例子。

```javascript
let lastWord = 'last word';
const a = {
    'first word': 'hello',
    [lastWord]: 'world'};
}

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

## 指数运算符
ES2016 新增了一个指数运算符（**）。

```javascript
2 ** 2 // 4
这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

上面代码中，首先计算的是第二个指数运算符，而不是第一个。
指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。

```javascript
let a = 1.5;
a **= 2;// 等同于 a = a * a;
```

## 扩展运算符 三个点（...）
**对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中**

```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }*
```

-   扩展运算符可以与解构赋值结合起来，用于生成数组

```javascript
first // 1
rest // [2, 3, 4, 5]
const [first, ...rest] = [1, 2, 3, 4, 5];
```

如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```javascript
let bar = {a: 1, b: 2};
let baz = {...bar, ...{a:2, b: 4}}; *// {a: 2, b: 4}*
```

如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。

```javascript
let aWithDefaults = { x: 1, y: 2, ...a };
```
如果扩展运算符调用的是对象，其只是调用了他的引用，当里面里面的内容被改变的时候其之前运用...生成的对象内的数据也会相应改变与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

```javascript
const obj = {
    ...(x > 1 ? {a: 1} : {}),
    b: 2
};
```
-   可以将数组转换为参数序列

```javascript
function add(x, y) {
    return x + y;
}
const numbers = [4, 38];
add(...numbers) *// 42*
```

如果将扩展运算符用于数组赋值，只能将有扩展运算符的参数放在参数的最后一位，否则会报错。
-   扩展运算符还可以将字符串转为真正的数组

```javascript
[...'hello']*// [ "h", "e", "l", "l", "o" ]*
```
[*https://blog.csdn.net/astonishqft/article/details/82899965*](https://blog.csdn.net/astonishqft/article/details/82899965)
## 函数默认值设置

```javascript
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
const p = new Point();
p // { x: 0, y: 0 }
```

## 模板字符串
ES6中提供了模版字符串，用`（反引号）标识，用${}将变量括起来。上面的例子可以用模版字符串写成下面这样：
```javascript
$("#result").append(`He is <b>${person.name}</b>and we wish to know this${person.age}.that is all`
);
注意：如果使用模版字符串表示多行字符串，所有的空格和缩进都会被保存在输出中！！

console.log( `No matter what you do,
I trust you.`);   
```
显然，由于反引号是模版字符串的标识，如果我们需要在字符串中使用反引号，我们就需要对其进行转义，如下所示：

```javascript
No matter what you do,
I trust you.`
```
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-GHtiNdZF-1669349956874)(media/image35.png)]{width="4.666666666666667in"
height="0.9895833333333334in"} 
模板字符串内还可以调用任意的JavaScript表达式，还可以进行运算，以及引用对象属性还有**函数**
**当调用的函数的返回值不是字符串的时候会被转化为字符串**  
所有模板字符串的空格和换行，都是被保留的，比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。

```javascript
$('#list').html(`<ul>
<li>first</li>
<li>second</li></ul>
`.trim());
```

## 变量的解构赋值
以前，为变量赋值，只能直接指定值。

```javascript
let a = 1;let b = 2;let c = 3;
```

ES6 允许写成下面这样。

```javascript
let [a, b, c] = [1, 2, 3];
```

当右边的数组数量大于左边的时候也是可以对应赋值的，但是后面的如果不是数组就会报错
对于 Set 结构，也可以使用数组的解构赋值。

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

事实上，只要某种数据结构具有 Iterator接口，都可以采用数组形式的解构赋值。

```javascript
function fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

**默认值**解构赋值允许指定默认值。

```javascript
let [foo = true] = [];
foo // true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6
内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

```javascript
let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null
```

解构不仅可以用于数组，还可以用于对象。

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa" 
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。  
对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
// 例一
let { log, sin, cos } = Math;
// 例二
const { log } = console.log('hello') // hello
```

上面代码的例一将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将console.log赋值到log变量。  
如果变量名与属性名不一致，必须写成下面这样。

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello' 
l // 'world'

let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

**字符串的解构赋值**  
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a// "h" b// "e" c// "l" d// "l" e// "o"
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

遍历 Map 结构
任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map
结构原生支持 Iterator
接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
console.log(key + " is " + value);}
// first is hello// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {}
// 获取键值
for (let [,value] of map) {}
```

## 防抖、节流

```javascript
data(){
    return {
        timer: null
    }
}
// 节流 点击后1秒内再次点击则重新开始计时，最后一次点击1秒后再调用方法
changeHomeImg () {
    const that = this
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(function () {
      that.changeNav() // 需要执行的方法
      that.timer = undefined
    }, 1000)
},
// 防抖 短时间内点击后立刻触发方法，1秒内无法再次触发
changeHomeImg () {
   const that = this
   if (this.timer) {
     return
   }
   this.changeNav() // 需要执行的方法
   this.timer = setTimeout(function () {
     that.timer = undefined
   }, 1000)
},
// 节流 点击后一秒后执行方法，在这期间点击无效，1秒后才能重新点击
changeHomeImg () {
const that = this
  if (!this.timer) {
    this.timer = setTimeout(function () {
      that.changeNav() // 需要执行的方法
      that.timer = undefined
    }, 1000)
}
}
```

## 正则表达式

```javascript
/^(?:(?!0{1,4})d{1,4}|10{4}|0)$/ 大于0小于10000
/^100$|^(d|[1-9]d)(.d+)*$/ 大于0小于100
/^[1-9]d{0,5}$/ 小于7位 也就是 0-999999
```

## 对象去重

```javascript
const noRepeat = [...new Set(arr.map(item => JSON.stringify(item)))]

// 反序列化
const newArr = noRepeat.map(item => JSON.parse(item))
```

## 删除dom节点的子元素
1.
```javascript
const dom = document.querySelector('#containers')
if(!dom) return
let child = dom.lastElementChild
while (child) { // 清除dom节点的子元素
   dom.removeChild(child)
   child = dom.lastElementChild
}
```

2.
```javascript
const item = document.querySelector('#itemId')
while (item.firstChild) {
    item.removeChild(item.firstChild)
}
```
## 解决内存溢出

```javascript
"--max_old_space_size=20000" // 增加这一句就可以了!
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/71ee621067954264980e9b8e9744be00.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ccbfce87ec8a42a7b783d2a8bfab23b4.png)

## 过滤特殊字符串
// eslint-disable-next-line no-useless-escape
```javascript
this.fileNameKey = this.fileNameKey.replace(/[-_,!|~`()#$%^&*{}:]/g,
```

'');
## 解决uview 的$u为未定义问题

```javascript
transpileDependencies: ['@ued_fpi/uview-ui'], // 防止uview文件未编译
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/cdeb4c51ad5e4d05b2d83c9ea03b75e9.png)

