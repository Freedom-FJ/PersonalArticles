@[TOC](目录)

# TypeScript

## 基础用法：

### Record
```javascript
type keys = 'A' | 'B' | 'C'

const result: Record<keys, number> = {

A: 1,

B: 2,

C: 3

}

也可以Record<any, number>
```

## PropType
```javascript
import { PropType, defineComponent } from 'vue'

export default defineComponent({ // 让vue监测类型定义

props: {

        showType: {

            type: String

        },

        defaultCheckedLists: {

            type: Object as PropType<{company: string[],
noWasteCells: string[]}>,

            default: () => {

                return {

                    company: [],

                    noWasteCells: []

                }

            }

        }

    },

    setup(props, content) {} // 直接使用prop 不需要给prop定义
因为有defineComponent

})
```
## ts特殊类型定义
```javascript

// <div>

const div:HTMLDivElement = document.createElement('div');

// <img>

const img:HTMLImageElement = document.createElement('img');

const img:HTMLImageElement = new Image();

const canvas:HTMLCanvasElement = document.createElement('canvas');

const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

let timer:number = setInterval(()=>{

},500);

timeInterval：NodeJS.Timeout = setInterval( getData,60000)

var timeOut: NodeJS.Timeout;//定义setTimeout的类型

timeOut = setTimeout(function () {

......

}, 1000);
```
## 高级使用

###  范型
```javascript
// 当类型变量使用

type dataTypeReturn1<T, U> =  {

    data: T

    num: U

}

 

const data: dataTypeReturn1<string, number> = {

    data: 'name',

    num: 15

}

 

// 获取类型

const add = <T>(obj:T) => {

    let id = 25

    return { ...obj, id}

}

add({name: 'sbu', data: 'sss'}).data

// 必须有name属性

const addExtends = <T extends { name: string }>(obj:T) => {

    let id = 25

    return { ...obj, id}

}

addExtends({ name: 'saas',data: 'sss'}).name

 ```

### 范型extends
```javascript

type dataTypeReturn2<T> =  T extends string ? boolean : string

const data1:dataTypeReturn2<'aa'> // boolean

const data2:dataTypeReturn2<true> // string
```
### 范型 默认值
```javascript

type dataTypeReturn3<T = string> =  T extends string ? boolean :
string
```
### 范型 extends infer解构
```javascript
// 【类型推导 infer】是作为 extends 条件类型的自语句使用，使用 infer
声明一个类型变量，在条件类型判定为 true 时生效。

type ExtractArrayItemType<T> =  T extends (infer U)[] ? U :
boolean // 当传入为数组时 为true

 

// 条件判断都为 false，返回 boolean

type T1 = ExtractArrayItemType<string>;         // boolean

// 条件判断为 true，返回 U

type T2 = ExtractArrayItemType<Date[]>;     // Date
```
###  keyof 提取key   获取对象或者类型对象的key的类型
```javascript

const obj = {

    name: 'Niko',

    age: 18

  }

  type keys = keyof typeof obj // name|age

  let a: keys = 'name' // pass

  let b: keys = 'age'  // pass

 

  let c: keys = 'test' // error

  interface Itest{

    webName:string;

    age:number;

    address:string

 

  }

  type ant=keyof Itest;

  const ss:ant = 'age'

  interface Map {

    [key: string]: string;

  }

  let keys: keyof Map = true;//string   error

  let keyss: keyof Map = 'true';//string  pass
```
## typeof 获取变量类型
```javascript

const datass:string = 'ss'

const data: typeof datass = 'ss' // string
```
##  InstanceType 获取dom obj类型
```javascript

import fpiElTable from 'fpiElTable.vue'

const fpiElTableDom = ref<InstanceType<typeof fpiElTable>>()
```
## Omit
```javascript
interface ObjTs {
	age: string
	name: string
	text: string
}
type OmitObj = Omit<ObjTs, 'age'|'name'>
// OmitObj { text: string }
```

## 问题
### 1. 'NodeJS' is not defined.eslint[no-undef]
![在这里插入图片描述](https://img-blog.csdnimg.cn/32595f3f47ce4d18ab7869edc4344b7e.png)
后面加一个注释就好了
```javascript
timeInterval: NodeJS.Timeout | null /* global NodeJS */
或者在.eslintrc.js文件内加一句
global: {
      "NodeJS":"readonly"
 }
 ```