@[TOC](目录)
# 安装
老版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/558fe942454f40b0800378bfc7123c9c.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/91f559c11e104527aaae0ba849228f9d.png)


## Vue-cli安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/9160a6f975b442aa8dce9178804edfdd.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e01472c3453a4b91ac0b9565f59b4aeb.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e0fa9ebe60db4469888b60273c66a1e4.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/5cff49d04e834251a2961c6e407a6498.png)

安装依赖和插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/8917640833904debb75fb6818215d250.png)

# 运行单个vue文件
在目录下控制台运行vue serve xxx.vue （vue文件名）
# v-if和v-show
if等于false时是直接删除这个节点，在网页源代码中都找不到了
而show是隐藏这个节点，只是将display='none'
```javascript
<div v-show='myshow'>
    动态的显示和隐藏
</div>
<div v-if='myid '>
    动态的创建和删除
</div>
```
# 数据引用. 
```javascript
<template>
<!-- vue的模板里面 所有的内容要被一个根节点包含起来 -->
  <div id="app">
    <h3>{{obj.name}}</h3>
    <ul>
      <li v-for="item in list">
          {{item}}
      </li>
    </ul>
     <ul>
      <li v-for="item in list1">
          {{item.title}}
      </li>
    </ul>
     <ul>
      <li v-for="item in list2">
          {{item.cate}}
          <ul>
            <li v-for="news in item.list">
              {{news.title}}
            </li>
          </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      obj:{
        name:"张三"
      },
      list:['1111','222','333'],
      list1:[
        {'title':'111'},
        {'title':'222'},
        {'title':'333'},
      ],
      list2:[
        {
          "cate":"国内新闻",
          "list":[
            {'title':'国内新闻11111'} ,
            {'title':'国内新闻12211'}             
          ]
        },
        {
           "cate":"国际新闻",
          "list":[
            {'title':'guoji 新闻11111'} ,
            {'title':'国际新闻12211'}             
          ]
        }
      ]
    }
  }
}
</script>
<style>
</style>
```
## v-for的key的应用

```javascript
<!-- 这边的key可以跟踪每个节点的身份，从而重用和重新排序现有的元素 
 理想的key值是每项都有的且唯一的id不会随元素位置的调换而改变 -->
<li v-for='(data,index) in shopcar' key="data.id">{{data}}------{{index}}</li>
v-for有时候还可以对数字
<i class="point" v-for="i in divCount" :key="i">{{ i }}</i>
 return {
    divCount: 6,
 };
 ```
生成： 注意是从1开始不是从0
123456
同样对字符串也可以for循环
divCount: "6dsada",
生成：
6dsada

# 动态Class style的绑定

```javascript
<template>
<!-- vue的模板里面 所有的内容要被一个根节点包含起来 -->
  <div id="app">
    <div v-bind:title="title">鼠标描上去看看</div>
    <img src="https://pics1.baidu.com/feed/77094b36acaf2edde3ac92c2814c3ce139019324.jpeg?token=eed2a5a834a701d1838dab7ec01a0570" >
    <br>
    <!-- 绑定属性 -->
    <img v-bind:src="url" >
    <img :src="url" >
    {{h2}}
    <!-- 绑定html -->
    <div v-html="h2">
    </div>
          <!-- 绑定数据 -->
    <div v-text="msg">
    </div>
    <ul>
        <li v-for="it in list">
          {{it}}
        </li>
    </ul>
    <!-- v-blind:class :class的使用 -->
    <div v-bind:class="{'red':flag}">
      我是一个div 
    </div>
     <div :class="{'red':flag,'blue':!flag}">
      我是一个div 
    </div>
    <!-- 循环数据 第一个数据高量 -->
    <ul>
      <li v-for="(item,key) in list">
        {{key}}------{{item}}
      </li>
    </ul>
     <ul>
      <li v-for="(item,key) in list" :class="{'red':key==0,'blue':key==1}">
        {{key}}------{{item}}
      </li>
    </ul>
    <!-- v-blind:style :style -->
    <div class="box"  :style="{width:boxwidth+'px'}">
      我是一个div 
    </div>
  </div>
</template>
<script>
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      title:'我是一个title',
      url:'https://pics1.baidu.com/feed/77094b36acaf2edde3ac92c2814c3ce139019324.jpeg?token=eed2a5a834a701d1838dab7ec01a0570'
      ,h2:'<h2>我是h2123</h2>'
      ,list:['111','222','3333']
      ,flag:false
      ,boxwidth:500
    }
  }
}
</script>
<style>
  .red{
    color: red;
  }
  .blue{
    color: blue;
  }
  .box{
    height: 100px;
    width: 100px;
    background-color:red;
  }
</style>
```

# :style和:class ,src的动态绑定
**Style:**

```javascript
1.  :style="item.key !=='myname1'?'width:'+item.width+';':'width:100%;'"
2.  :style="{
        background: statusList[industrys.dataStatus].background,
        color: statusList[industrys.dataStatus].textColor
      }"
3.  :style="{ opacity: index === jurmodulesData.length - 1 ? 0 : 1 }"
4.  :style="{ backgroundImage: 'url(' + imgUrl + ')'}"
imgUrl: require("@assets/new-home/box-bgc.png")
5.:style="{ left: mouse.left, top: mouse.top }" //
当设置绝对定位的时候
```
**Class:**
```javascript
1.  :class="[`position${i}`,item.type == 1 ? 'type1' : item.type ==
    2 ? 'type2' : 'type3']"
2.:class="{'myactive': i === index}
3.
:class="{
    [areaTopLeftLebal]: true,
    [plateformTopLeftActive]: currentRouterName(item.url),
    [plateformTopLeftDisable]: item.disable
}"
4.:class="{ 'disabled-style': getCodeBtnDisable }"
getCodeBtnDisable = false
```

**Src:**

```javascript
1.  :src="item.imgSrc"
imgSrc: require("@/assets/department.png")
2.<img :src="getImg" alt="" />
computed: {
    getImg: function() {
      return require('../../../assets/images/' + this.imgSrc + '.png');
    }
  },
return {
imgList: ['logo', 'logo', 'logo', 'logo', 'logo', 'logo'],
   imgSrc: 'logo'
}
3.
<img :src="imgUrl" alt="" />
imgUrl: '/static/images/bigScreen/ptjye.png'
4.
<img
    :src="
    require(`@static/images/bigScreen/bottomLog/${
    tabIndex === index ? item.icon.slice(0, 4) : item.icon
     }.png`)
     "
     alt=""
/>
当地址是@开头的时候就需要require 修改后
<img
    :src="
    '/static/images/bigScreen/bottomLog/' +
    (tabIndex == index ? item.icon.slice(0, 4) : item.icon) +
    '.png'
    "
    alt=""
/>
item.icon = 'nav1-default'
图片有两种 nav1.png 和 nav1-default.png
5.
let theme = 'blue'
this.imgbgUrl =
require(`./assets/images/theme/${theme}/header-background.png.png`);
div内
:style="{backgroundImage: 'url(' + imgbgUrl + ')'}"
```

# Ref

```javascript
<div ref="mydiv"></div>
This.$refs['mydiv'].style.display 或者
This.$refs.mydiv.style.display
动态绑定的时候：
myref= 'mydiv'
<div :ref="myref"></div>
This.$refs[myref].style.display 或者 This.$refs.mydiv.style.display
但是当v-for循环的ref在取的时候需要改成
This.$refs[myref][0].style.display
或者This.$refs.mydiv[0].style.display
```

## getBoundingClientRect（）
```javascript
getBoundingClientRect()获取元素坐标位置
this.$refs.centerbody.getBoundingClientRect()
1.  bottom: 448
2.  height: 322 // dom高度
3.  left: 101 // 距离左边
4.  right: 1283
5.  top: 126 // 距离顶部
6.  width: 1182 // dom宽度
7.  x: 101
8.  y: 126
```

# 双向数据绑定

```javascript
<template>
  <div id="app">
    <h2> {{msg}}</h2>
    <input type="text" v-model='msg'>
    <button  v-on:click="getMsg()"> 获取表单里面的数据</button>
    <button  v-on:click="setMsg()"> 设置表单的数据</button>
    <hr> 
    <input type="text" ref="userInfo" >  
    <br>
    <button v-on:click="getIputValue()">获取第二个表单里面的数据</button>
    <br>
    <div ref="box">我是一个box</div>
  </div>
</template>
<script>
/*双向数据绑定 MVVM vue就是一个MVVM的框架
M model
V view
MVVM model改变会影响视图view ，view视图改变会反过来影响model
双向数据绑定必须在表单里面使用
*/
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      msg:'你好vue'
    }
  },
   methods:{  //放方法的地方
    getMsg(){
        // alert('方法成功');
        //从方法里面获取data里面的数据
        alert(this.msg);
    },
    setMsg(){
        this.msg="我是改变后的数据";
    },
    getIputValue(){
        //获取ref定义的dom节点
        console.log(this.$refs.userInfo);
        alert(this.$refs.userInfo.value);
        this.$refs.box.style.background='red';
    }
  }
}
</script>
```

# 定义方法执行方法，获取数据，改变数据，自定义属性及获取

```javascript
<template>
  <div id="app">
   {{msg}}
   <br>
   <button v-on:click="run1()">执行事件的第一种方法</button>
  <br>
  <button @click="run2()">执行事件的第二种方法</button>
  <button @click="getMsg()">获取data里面的msg</button>
  <br>
   <button @click="setMsg()">改变data里面的msg</button>
    <br>
  <br>
   <button @click="requestData()">请求数据</button>
   <hr>
   <ul>
     <li v-for="(item,key) in list">
       {{key}}----{{item}}
     </li>
   </ul>
   <button @click="deleteData('111')">执行方法传值111</button>
   <br>
  <button data-aid="123" @click="eventFn($event)">事件对象</button> 
  </div>
</template>
<script>
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      msg:'你好vue',
      list:[]
    }
  },
  methods:{
    run1:function(){
      alert('这是第一个方法');
    },
    run2(){
      alert('这是第二种方法');
    },
    getMsg(){
      alert(this.msg);
    },
    setMsg(){
      this.msg="我是改变后的数据";
    },
    requestData(){
      for(var i=0;i<10;i++){
          this.list.push('我是第'+i+'条数据');
      }
    },
    deleteData(val){
        alert(val);
    },
    eventFn(e){
      // console.log(e);
      // e.srcElement 获取dom节点
      e.srcElement.style.background='red'; 
      console.log(e.srcElement.dataset.aid); //获取自定义属性的值
    }
  }
}
</script>
```

## @mousewheel="handleScroll" 鼠标滚轮事件绑定在dom上

```javascript
handleScroll(e) {
if (e.deltaY > 0) {
this.carouselIndex++;
console.log(e.deltaY);
} else {
this.carouselIndex--;
console.log(e.deltaY);
}
}
```
监听鼠标滚轮，方法调用 handleScroll（e） e.deltaY
为100就是滚轮向下滚了一格，-100就是向上滚
## @mouse鼠标事件

```javascript
@click//单击
@mousedown//按下
@mouseup//抬起
@dblclick//双击
@mousemove//移动
@mouseleave//离开
@mouseout //移出
@mouseenter//进入
@mouseover//在
<div class="box-center" @mousemove="touch">
// 方法
touch(e) {
      console.log(e.clientX + "," + e.clientY);
}
```

鼠标事件（click也可以）自动会返回一个e里面包含了很多关于鼠标坐标位置的信息
## 鼠标touch事件 (移动端使用)
  事件名     | 功能
-------- | -----
touchstart  | 鼠标点击时，触发该事件一次。
touchmove  | 当鼠标移动时，会多次调用该事件。
touchend | 当鼠标停止移动时，触发该事件一次。

  ```javascript
Template：
<div id="app">
<div class="circle" @touchstart="touchstart"
@touchmove="touchmove" >
</div>
</div>
Javascript：
methods: {
// 当鼠标点击时触发，类似onclick事件
touchstart(e) {
console.log('touchstart')
},
// 当鼠标移动时触发
touchmove(e) {
console.log('touchmove')
}
```

**如何获取鼠标的x,y坐标**
这就要利用事件回调中的 [e.targetTouches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/targetTouches) 属性了。

  ```javascript
// 获取x 坐标
e.targetTouches[0].clientX
// 获取y 坐标
e.targetTouches[0].clientY
  ```
  
## Click事件
用法 click.stop="getData" 也可以连续使用 click.prevent.stop
.capture: 使用事件的捕获模式 当点击子盒子的时候 在父盒子上加这个属性 可以先让父盒子的方法执
行在执行子盒子的方法 事件捕获就是冒泡的相反
.passive: 事件的默认行为立刻执行，无需等待事件回调执行完毕。
.self可以阻止子元素执行冒泡方法使本方法也被执行，只能单独点击自己的时候才能被促发
.stop后就可以直接内部执行stopPropagation()阻止冒泡方法。如当li内的方法被执行的时候ul内的
也会被执行，可以用stop
.once的方法只能被触发一次
.prevent此方法可以阻止标签的默认提交方法走后面的click，如a标签的href就不会执行而是执行
click 也可以用于submit等等
.native
就是在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加'.
native'事件是无法触  发的。
# Totolist：

  ```javascript
<template>
  <div id="app">
    <input type="text" v-model="tobo" @keydown="doAdd($event)">
    <!-- <button @click="doAdd()">+增加</button> -->
    <hr>
    <h2>进行中</h2>
    <ul>
      <li v-for="(item,key) in list" v-if="!item.flag">
        <input type="checkbox" v-model='item.flag' @change="savelist()"> {{item.title}}----
        <button @click="removeData(key)">删除</button>
      </li>
    </ul>
    <br>
    <h2>已完成</h2>
     <ul class="finish">
      <li v-for="(item,key) in list" v-if="item.flag">
        <input type="checkbox" v-model='item.flag' @change="savelist()"> {{item.title}}----
        <button @click="removeData(key)">删除</button>
      </li>
    </ul>
    <h2 v-if="ok">ok</h2>
    <h2 v-if="!ok">no</h2>
  </div>
</template>
<script>
import storage from './model/storage.js'; //引入封装的方法
// console.log(storage);
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      ok:false,
      tobo:"",
      list:[
        {
          title:'mjh',
          flag:true
        },
        {
          title:'zzh',
          flag:false
        }
      ]
    }
  },
  methods:{
    doAdd(e){
      if(e.keyCode==13){ //13代表回车得按键
      // 获取文本框输入的值 把文本框的值push到list里面
      this.list.push({
        title:this.tobo,
        flag:false
      });
      this.tobo="";
      }
      storage.set('list',this.list);
    }, 
    removeData(key){
          // alert(key);
          this.list.splice(key,1); //此方法用于操作数组，可以在数组的某个位置增加或者删除一项
          storage.set('list',this.list);
      },
      savelist(){
          storage.set('list',this.list);
      }
  },
  mounted(){  //生命周期函数 vue页面一刷新就会被触发的方法
//JSON.parse将获取得字符串转化为对象 获取本地缓存得list
      var list = JSON.parse(localStorage.getItem('list'));
      if(list){ //注意判断list是不是为空
        this.list = list;
      }
  }
}
</script>
<style >
  .finish  li {
    background-color: #eee;
  }
</style>
  ```
  
# 生命周期函数及Vue组件：
**什么是生命周期**：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期！
1，创建一个vue实例对象
2，初始化 一些默认的声明周期函数和默认的事件 　-> beforeCreate(),这时候，data和methods中的数据都没初始化
3，初始化 数据 -> created（）data和methods中的数据都被初始化好了
4，编译模板 -> beforeMount()即 

  ```javascript
<div id="app">{{msg}} </div> ->

在内存中生成一个编译好的最终模板字符串 ->
把这个模板字符串渲染为内存中dom注意：只是在内存中渲染好了模板，并没有把模板挂载到页面上去，此时页面还是旧的, 简单的说 结果就是在内存中渲染了一个 
<div id="app">ok</div> 
的dom元素,但是页面上还是 
<div id="app">{{msg}}</div>
  ```
5，将运行编译好的模板真实提换到页面中去 -> mounted() 即 将内存中渲染好的dom元素即 < div id="app">ok< /div>已经提换了页面上的 < div id="app">{{msg}} < /div>
6，当数据改变时 即完成data(model层) ->view(视图层)的更新
6.1 先在内存中渲染一份最新的dom树 -> beforeUpdate()
页面上的数据还是旧的，但是data中的数据都是最新的，页面和最新的数据尚未保存同步
6.2 将最新的dom树重新渲染到真实的页面上去 -> updated()
页面上的数据和data中的数据都是最新的，页面和最新的数据保存同步销毁
7，销毁之前，实例上的data和所有methods，以及过滤器、指令都处于可用状态，还未真正销毁
-> beforeDestroy()
8，销毁，实例上的data和所有methods，以及过滤器、指令。。。都处于不可用状态，还未真正销毁
-> destroyed()
![在这里插入图片描述](https://img-blog.csdnimg.cn/76696fe3f1314813b40fd3808f343f57.png)


### App.vue
  ```javacript
<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <v-home></v-home>
    <br>
  </div>
</template>
<script>
import Home from './components/Home.vue';
export default {
  data () {  //业务逻辑里面定义的数据
    return {
      ok:false,
      tobo:"",
      msg:'hello world'
    }
  },
  methods:{
  },
  mounted(){  //生命周期函数 vue页面一刷新就会被触发的方法
  },
  components:{ //前面的组件名称不能和html标签一致
      'v-home':Home
  }
}
</script>
  ```
### Home.vue

  ```javascript
<template>
    <div>
        <v-header></v-header>
        <hr>
        <h2>这是一个首页组件</h2>
        <button @click="run()">点击我</button>
        <br>
        <v-lifes v-if="flag"></v-lifes>
        <br>
        <button @click="flag=!flag">挂载以及卸载life组件</button>
    </div>
</template>
<script>
//生命周期函数/生命周期钩子：
//组件挂载以及组件更新组件销毁的时候触发的一系列方法 这些方法就叫作生命周期函数
import Header from './Header.vue';
import Life from './Lifes.vue';
export default {
    data(){
        return{
            msg:'我是一个首页'
            ,flag:true
        }
    },
    methods:{   
        run(){
            alert(this.msg);
        }
    },
    components:{
        'v-header':Header,
        'v-lifes':Life
    }
}   
</script>  
<style scoped>  
h2{
       color: red;
/* scoped是css局部作用域，让style只能在home内有效 */
    }
</style>
```
### Lifes.vue
```javascript
<template>
    <div>
       生命周期函数的演示  == {{msg}}
       <br>
       <button @click="setMsg()">点击我改变MSG</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'我是一个生命周期函数组件'
        }
    },
    methods:{
        setMsg(){
            this.msg="我是改变后的数据";
        }
    },mounted(){  // 生命周期函数 请求数据，操作dom，放在这里面 
        console.log('模板编译完成时')
    },
    beforeDestroy(){ //页面销毁之前的时候要保存一些数据，就可以监听这个生命周期函数
        console.log('实例销毁之前');
    },
    destroyed(){
        console.log('实例销毁完成');
    }
}
</script>
```
## Vue加载顺序
props - > methods - > data - > computed - > watch> created
-> mounted 
# 父子组件传值
##  props父组件给子组件传值
![](https://img-blog.csdnimg.cn/ae9dd7027ffb4134be9e896773262dd8.png)

```javascript
props: {
    dataYear: [Object, Number] // 支持多种数据类型
},
Props得到的父亲传过来的变量是只读属性不可以修改，要修改只能在本页面内赋值变量，在对赋值变量进行使用和修改
子组件也可以直接在界面上{{$attrs.title}} 获得父组件传过来的title
或者this.$attrs.title 这样就不需要在子组件里面用props注册了
设置默认值：
像对象和数组这种如果没有值会报错的时候给他一个默认值
props: {
    tapList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
  ```
  
### Header.vue

```javascript
<template>
    <div>
        <h2 class="header">{{msg}}----{{title}}</h2>
> //执行父组件的方法给父组件传值
<button @click="run('123')">执行父组件的方法</button>
        <button @click="runHome('123')">点击我</button>
        <br>
        <button @click="getParent()">获取父组件</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'我是一个头部组件'
        }
    },
    methods:{
        getParent(){
            // alert(this.title);
            this.runHome('123');
        }
},
//接受父组件传过来的数据，如定义title是父组件的title
    props:['title','runHome','home','this']
    // props:{
    //     'title':String  //验证父子组件的合法性
    // }
}
</script>
```

### Home.vue

```javascript
<template>
    <div>
       首页组件
        <v-header :title="title" :runHome="run" :home="this"></v-header>
    </div>
</template>
<script>
import Header from './Header.vue';
export default {
    data(){
        return{
            msg:'我是一个首页',
            title:'头头'
        }
    },
    methods:{    //函数方法块
        run(data){
            alert("我Home组件里面的run"+data);
        }
    },
    components:{  //组件块
        'v-header':Header,
        // 'v-lifes':Life
    }
}   
</script> 
<style scoped></style>/* scoped是css局部作用域，让style只能在home内有效 */
```

## 父组件主动获取子组件的数据和方法
1.第一种
![](https://img-blog.csdnimg.cn/a2c731f65f6c4b7fbc60e44dc6024a55.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/9ce23477310f4bcfbe2b85e10a620cab.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/f408fb1dad064a5c91cf8c68a0d5e21a.png)


父组件也可以直接this.$children.（数据 / 方法）
## 子组件获取父组件方法使用$emit
父组件：
```javascript
<vue-as @fatherEvent="handleEvent"></vue-as>//定义传给子组件的方法名字fatherEvent
handleEvent(e){
     console.log("获得给父组件钱了"+e)
}
```

子组件：

```javascript
<button @click="chileEvent()">获取父组件的事件</button>
chileEvent(){
    this.$emit("fatherEvent",1000)
}
```
输出 获得父组件钱了1000
或者也可以把子组件里面的 改成data里面的值调用name传进去
this.$emit("fatherEvent",this.name)
## $attrs $listeners
`vm.$attrs` 是一个属性，其包含了父作用域中不作为 prop 被识别 (且获取)
的特性绑定 (class 和 style除外)。这些未识别的属性可以通过` v-bind="$attrs" `传入内部组件。未识别的事件可通过`v-on="$listeners"`传入（.native绑原生事件是没用的）
`v-bind="$attrs"  v-on="$listeners"`
使用 `this.$attrs this.$listeners`
在父亲内：

```javascript
<father>
<children @getData="getData" :a="a" :b="b"></children>
<son @getList="getList" :c="c"></son>
</father>
```

在children 内

```javascript
<children >
<my-childrens v-bind="$attrs"
 v-on="$listeners"></my-childrens>
</children >
export defult {
props:{
  a: {
  type: String,
  default: ' '
  },
}
}
```
在my-childrens内:

```javascript
export defult {
mounted() {
  控制台打印这两个：
  this.$attrs // 可以获得b
  但是a不行因为a已经在children内被props了就不能传给子组件了
  this.$listeners // 可以获得 getList() getData() 这两个方法都可以获得
}
}
```
## 子组件v-model
Vue2
1.v-model
父：
```javascript
div( v-model="showPop")
// 等同于 div( :value="showPop")
```
子：

```javascript
div(v-show="value")
props: {
        value: {
            type: Boolean,
            default: false
        }
    },
//更新：
backPop() {
            this.$emit('input', false)
 },
 ```
 
2. .sync
父：

```javascript
div( :showPop.sync="showPop" @closePop="close")
```

子：

```javascript
div(v-show="showPop")
props: {
        showPop: {
            type: Boolean,
            default: false
        }
},
// 更新
this.$emit('update:showPop', false)
```

# Bus非父子组件传值------中央事件总线
1.  创建Bus.js文件

```javascript
import Vue from 'vue'
const Bus = new Vue()
export default Bus
```
2.  在其中A子组件中引入Bus
```javascript
import Bus from './Bus.js'
在生命周期函数内写入监听bus
Bus.$on('weixingmessage',ms => {
   console.log("获得数据"+ms)
})
```
3.  在B子组件中引入bus
```javascript
import Bus from './Bus.js'
在方法内定义的函数内写入发生bus
Bus.$emit("weixingmessage",this.msg)
注意名字要一样哦weixinmessage可以自定义，后面的就是传递过去的值
```
4.在vue生命周期beforeDestroy或者destroyed中用vue实例的$off方法清除eventBus
```javascript
beforeDestroy(){
bus.$off("weixingmessage")
}
也可以将bus挂载到全局使用,在main.js中添加以下代码
import Bus from './bus'
Vue.prototype.$bus = Bus
使用时直接调用就可以了，this.$bus.$emit()，this.$bus.$on()。
```
# 多级父子组件传值 provide，inject
父组件：

```javascript
provide() {
    return {
      getIndexRef: () => {
        return this;
      }
    };
  },
  ```
  
子组件：

```javascript
inject: ['getIndexRef'], // 获取总父组件的this
使用：
this.getIndexRef().query.dataYear
或者
provide {
return {
datas: this.datas
}
}
```
子组件：

```javascript
export default {
inject: ['datas']
}
使用 this.datas
该方法只能父provide 子 inject 不能反过来
```

# Solt插槽
**单个插槽：匿名插槽**
父组件：
```javascript
<div name="fa">
<span>父亲组件</span>
<child>
<button>父组件的按钮</button>
<child>
</div>
//<child>是一个子组件，正常显示的话由于button是在父组件中放到<child>里面的所以不会被显示，但是如果要他显示的话只需要在子组件里面放一个插槽solt
```
子组件：

```javascript
<div id="child">
<span>子组件</span>
<slot></slot>
</div>
//这样父组件的button就会被放在子组件slot插槽的位置
```

**多个插槽：具名插槽**
父组件：

```javascript
<child>
<button name="up">父组件的按钮上</button> //或者可以写成 slot="up"
<button name="down">父组件的按钮下</button>
<child>
```

子组件：

```javascript
<div id="child">
<slot name="up"></slot>
<span>子组件</span>
<slot name="down"></slot>
</div>
//就会被插入对应名字的插槽
```

**作用域插槽 | 带数据的插槽**
父组件：调用 HelloWorld
```javascript
<HelloWorld >
<div slot="app" slot-scope="user"> //
slot-scope定义获取的子组件插槽作用域的名字
slot--{{user.data}} // user.data 调用子组件的data数据
</div>
<!-- <template slot-scope="user">
<div class="tmpl">
<span v-for="item in user.data">{{item}}</span>
</div>
</template> -->
</HelloWorld>
```
子组件： 插槽

```javascript
<li>
<slot name="app" **:data**="data1"></slot> //
绑定data的数据是data1
</li>
return {
data1: 'mjh'
}
输出： slot---mjh
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/e698f0ff1ed443f8951db4432fa5601e.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/377c5c43eacc4962874bd2d013499f2d.png)

一句话概括就是v-slot ：后边是插槽名称，=后边是组件内部绑定作用域值的映射。
# 路由
![](https://img-blog.csdnimg.cn/efef965e270d4e29aceb5aa765cebb95.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/324665e8c333457b9b1477a9925811e5.png)


npm install vue-router --save
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能(在main中声明)：
## Main.js
```javascript
import Vue from 'vue';
import App from './App.vue';
//引入
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//1.创建组件
import Home from './components/Home.vue';
import News from './components/News.vue';
//2.配置路由
const routes = [
  {path:'/home',component:Home},
  {path:'/news',component:News},
{path:'/content/:aid',component:Content}, //动态路由
  {path:'/pcontent',component:Pcontent}, //get方法传值配置
   {path:'*',redirect:'/home'}  //默认跳转路由
]
//3.实例化VueRouter
const router = new VueRouter({
  routes //缩写 相当于 routes: routes
})
//4.挂载路由
new Vue({ 
  el:'#app',
  router,
  render:h => h(App)
})
//5.<router-view></router-view>放在app.vue里面
//6.在app.vue 内引入连接<router-link to="/home">首页</router-link>
```

## App.vue

```javascript
<div id="app">
    <!-- <h2>{{msg}}</h2> -->
    <router-view></router-view>
   <hr>
   <router-link to="/home">首页</router-link>
   <br>
   <router-link to="/news">新闻</router-link>
  </div>
  ```
  
  
# 动态路由
![在这里插入图片描述](https://img-blog.csdnimg.cn/19c7314f8970465ab82a87272d2ab35b.png)
1.  **动态路由传值：**
**router.js**
```javascript
配置 routes：[
//此时的user后面必须加参数才能跳转 不然无法识别User组件
{path:'/user/:id',component:User}
]
```
**Home.vue**
```javascript
<router-link :to="'/user/'+this.key"></router-link> 传递key
记得在to前面要加 ： 因为这是绑定动态数据了
或者 this.$router.push(`/user/${111}`) //这里用到了转义字符 ``
```
**User.vue**

```javascript
//这边的id是router里面定义的名字
This.$route.params.id 获取值
```
2.  **get传值**
Main.js
```javascript
配置 routes：[
{path:'/pcontent',component:Pcontent}
]
```
Home.vue
```javascript
<router-link :to="'/pcontent?aid='+this.key" ></router-link>
Pcontent.vue
this.$route.query.id
```
## Home.vue
```javascript
//首页
<div>
       首页组件
        <ul>
            <li v-for="(item,key) in list">
<router-link  :to="'/pcontent?id='+key"> {{key}}---{{item}}</router-link>
<!--get方法 -->
            </li>
        </ul>
    </div>
    ```
## Pcontent.vue
```javascript
//详情页面
 mounted(){
         //获取get传值
        console.log(this.$route.query);
}
```
## Main.js
```javascript
const routes = [
  {path:'/home',component:Home},
  {path:'/news',component:News},
  {path:'/content/:aid',component:Content}, //动态路由
  {path:'/pcontent',component:Pcontent}, //get方法传值配置
  {path:'*',redirect:'/home'}  //默认跳转路由
]
```
# 路由结合请求数据
安装
Npm install vue-resource --save
// 引入resource main.js文件内
import VueResource from 'vue-resource';
Vue.use(VueResource);
## News.vue文件
```javascript
 data(){
        return{
            list:[]
        }
    },
methods:{
        RequestData(){
            //jsonp请求的话 后台api接口要支持jsonp
            var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
            this.$http.jsonp(api).then((response)=>{
                console.log(response);
                this.list = response.body.result;
            },function(err){
                console.log(err);
            })
        }
}
<template>
    <div>
        这是News组件<br>
        <ul class="newslist">
            <li v-for="(item,key)  in list">
             <router-link :to="'/content/'+item.aid">{{key+1}}--------{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>
```
## Content.vue
```javascript
<template>
    <div id="content">
        <h2>{{list.title}}</h2>
          <div v-html="list.content">    <!--解析html代码  -->
             {{list.content}}
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                msg:'数据'
                ,list:[]
            }
        },
        mounted(){
          // console.log(this.$route.params); //获取动态路由传值
            var aid = this.$route.params.aid;
            console.log(this.list);
            //调用请求数据的方法
            this.requestData(aid);
        },
        methods:{
            requestData(aid){
  //get请求如果跨区域的话后台php java里面要允许跨区域请求
             var api='http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid='+aid;
                this.$http.get(api).then((response)=>{
                    console.log(response);
                    this.list=response.body.result[0];
                },(err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>
```
## Index.html
```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vuedemo02</title>
    <!-- 百度的适口 -->
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  </head>
  <body>
    <div id="app"></div>
    <script src="/dist/build.js"></script>
  </body>
</html>
```
## /assets/CSS/basic.css
```javascript
在basic.css里面配置：
/* 全局配置 */
html{
    font-size: 62.5%;
}
在main.js内引入
//引入公共CSS
import './assets/CSS/basic.css';
```
# 路由返回上级
2.在方法体内现价back方法
```javascript
methods:{
back(){
this.$router.go(-1);//返回上一层
},
},
```
第二种方法
```javascript
@click="$router.back(-1)"
```
# JS来跳转路由
```javascript
<button @click="getNews()">通过js跳转</button>
 methods:{
        getNews(){
            // this.$router.push({path:'news'});  //直接跳转网页
            // this.$router.push({path:'/content/507'});//push跳转动态路由传值
//this.$router.push('/news'); //也可以直接用地址跳转
            this.$router.push({name:'news'}); //命名js跳转路由
> //如果路由内配置了/news/:aid 就可以带参数了
this.$router.push({name:'news',params:{aid:id}});
        }
    }
  ```
## Main
```javascript
//2.配置路由
const routes = [
  {path:'/home',component:Home},
  {path:'/news',component:News,name:'news'},//命名路由js跳转
  {path:'/content/:aid',component:Content}, //动态路由
  {path:'/pcontent',component:Pcontent}, //get方法传值配置
  {path:'*',redirect:'/home'}  //默认跳转路由
]
```
## [路由传参 params 与 query](https://www.cnblogs.com/robinunix/p/11065968.html)
** router文件下index.js**
```javascript
{
path:"/detail",
name:"detail",
component:home
}
```
用params来传参 params只能用name来引入路由
```javascript
this.$router.push({
name:"detail",
params:{
name:'nameValue',
code:10011
}
});
```
**query**
```javascript
this.$router.push({
path:"/detail",
query:{
name:'nameValue',
code:10011
}
});
```
query要用path来引入，params要用name来引入，接收参数都是类似的，分别是this.$route.query.name和this.$route.params.name。//这边用的是$route
query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示params传参不会显示在地址栏，但是页面刷新的时候参数会丢失
为了避免params传参刷新页面或者后退的时候丢失参数在，
router下面的index.js文件（配置路由路径的文件）的路径后面添加上参数
```javascript
{
path:"/detail/:aid",
name:"detail",
component:home
}
```
3.注意跳转是用的$router  接收参数是用的$route
# History模式

```javascript
//3.实例化VueRouter
const router = new VueRouter({
  mode:'history',   //将原来的hash模式换成histrory模式 会需要一些后端的配置配合，还是默认hash模式比较好
  routes //缩写 相当于 routes: routes
})
地址栏 hash localhost8080/#/home 纯前端解决地址问题
History localhost8080/home 需要后端做适配
```
# 路由的嵌套 children
![在这里插入图片描述](https://img-blog.csdnimg.cn/a09d23458ff64441ab294189db9a872c.png)

## Main.vue
```javascript
//1.创建组件
import User from './components/User.vue';
import Home from './components/Home.vue';
import UserList from './components/Users/UserList.vue';
import UserAdd from './components/Users/UserAdd.vue';
//2.配置路由
const routes = [
  {path:'/home',component:Home}, 
  {
    path:'/users', // users前面要加'/'
    component:User,
    children:[
      {path:'useradd',component:UserAdd},
      {path:'userlist',component:UserList}//userlist前面没有'/'
    ]
  },
  {path:'*',redirect:'/home'}  //默认跳转路由
]
```
## User.vue
```javascript
<div id="user">
    <div class="left">
        <ul>
              <li>
                <router-link to="/user/useradd">添加用户</router-link>
              </li>
              <li>
                <router-link to="/user/userlist">用户列表</router-link>
              </li>
        </ul>
    </div>
    <div class="right">
        <router-view></router-view>
    </div>
</div>
```

# Components is

```javascript
父组件中引入
import User from './components/User.vue'
import Home from './components/Home.vue'
import DemoVuex from './components/DemoVuex.vue'
import News from './components/News.vue'
component里面引入
components: {User,Home,News,DemoVuex},
界面直接使用
<component is="DemoVuex"></component>
只需要修改is里面的值就可以做到动态绑定路由：
<span @click="goCom(index)" v-for="(item, index) in ComponentList" :class="{'myactive':i === index}">{{item}}</span>
<component :is="ComponentName"></component>
Data：
return {
ComponentList:['User','Home','News','DemoVuex'],
      i: 0,
      ComponentName: 'User'
    };
方法：
goCom(e) { // 组件is跳转
      this.i = e
      this.ComponentName = this.ComponentList[e]
},
```

# 计算机属性
```javascript
<!-- toUpperCase() 将字母变成大写 
       substring(0,1) 从字符串的第0位开始取一个字符 
           substring(1) 从字符串的第一位开始取到完-->
<!-- {{name.substring(0,1).toUpperCase() + name.substring(1)}}   当时这样维护性差，同事看不懂-->
 <!-- **********区别：计算机属性利用率更高一点，计算属性会缓存，当同一个地方多次调用同一个属性时，方法会每一次调用都会执行一次，而计算属性只需要执行一次************** -->
计算属性：{{getmyname}} <br>
 方法：{{getmy()}}
//定义的像个方法，但是其实是一个变量所以后面引用的时候不能加（）
computed:{ 
getmyname(){
        console.log("计算属性被调用了")
 return this.name.substring(0,1).toUpperCase() + this.name.substring(1)
     }//依赖的状态改变了计算属性会重新计算一遍
}
其他格式：
computed: {
normalizedSize: function () {
return this.size.trim() // trim()去掉字符串两边的空格 tab等字符
}
}
Function格式
computed: {
        getCarouselList() {
            return function(list) {
                var result = []
                for (var i = 0; i < list.length; i += 3) {
                    result.push(list.slice(i, i + 3))
                }
                return result
            }
        }
    },
 ```
# watch

```javascript
 watch: {
propsData(val) {
            console.log(val, 'val')
        },
        deep: true
}，
    resultDataAnalyze: {
            handler: val => {
                debugger
            },
            deep: true
        },
titleActive: {
     countryName(val) {
       if (val === 1) { // val就是countyName的值
         this.getData();
       }
}
immediate: true
}
}
data() {
return {
  searchCange: 1,
  countryName: 2
}
}
```
一但这两个值被改变就会触发watch从而调用里面的方法
`$watch()`监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！！
*首先确认 watch是一个对象，一定要当成对象来用。 对象就有键，有值。*
*键：就是你要监控的那个家伙，比如说$route，这个就是要监控路由的变化。或者是data中的某个变量。*
*值可以是函数：就是当你监控的家伙变化时，需要执行的函数，这个函数有两个形参，第一个是当前值，第二个是变化后的值。*
*值也可以是函数名：不过这个函数名要用单引号来包裹。*
*值是包括选项的对象：选项包括有三个，如下*
** 第一个handler ** 其值是一个回调函数。即监听到变化时应该执行的函数。
可以传两个值第一个是当前值，第二个是过去旧的值*
***第二个是deep：**其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。如
list{ name：'mjh'，age：18} 他是不能监听到name值的变化 加了deep
true就可以了）*
***第三个是immediate：**其值是true或false；确认是否以当前的初始值执行handler的函数。*
*监听对象内的属性*

```javascript
watch: {
   'propsData.data.openType'(val) {
           this.showPop = false
    },
   deep: true
},
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/0d9ee0d4de5147ea86eb149a0271e239.png)

# 计算机属性配合watch
```javascript
computed: {
    searchChange() {
      return this.query;
    }
  },
  watch: {
    searchChange(val) {
      this.getAreaData();
    }
  },
  ```
  
用计算机属性实时得到变化的query 改变searchChange的返回值
从而促发watch调用getAreaData()方法
```javascript
Data() {
	return {
 	 	countryName: ''
	}
}
countryName(val) {
      this.$refs['base-grid'].reloadGrid();
}
 ```
Watch可以监督变量 一旦改变就运行内部的方法

# elementUI技术心得
## el-input rules
```javascript
tel: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            {pattern:/^1[3456789]d{9}$/,message:'手机号格式不正确'}, //手机号码验证！！！！
            // { type: 'number', message: '电话为数字值',trigger: 'blur'},
            // { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
          ],
Messges方法
this.$message({
                        type: 'success',
                        message: '注册成功!'
                    });
  ```
## 设置el-dialog标题title样式 
只需要在el-dialog标签下面加入一个temlpate
用solt属性绑定title标签，那其内的内容就是title标签的内容直接在里面加div配置style就好啦

```javascript
 <el-dialog  :visible.sync="dialogFormVisible" :modal-append-to-body='false' :close-on-click-modal="false" :show-close="false" center  width="35%">
<template slot="title">
> <div  style="color:#409EFF;font-size:26px;font-weight:bold;margin-top:9px;">注册用户</div>
</template>
<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">   
```
##  el-dialog 
center 内部标题title和footer居中
##  element-resize监听div宽高变化
```javascript
安装
npm install element-resize-detector --save
页面引入
import elementResizeDetectorMaker from "element-resize-detector";
Vue界面使用
mounted() {
const _this = this;
const erd = elementResizeDetectorMaker();
erd.listenTo(document.getElementById("aa"), element => {
_this.$nextTick(() => {
//监听到事件后执行的业务逻辑
});
});
},
一旦监听的aa的dom发生了变化就会调用里面
```
# 路由的模块化分类
## 1.创建文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/671f0fcda3e84780b693bc396f27fb6c.png)

## 2.放入路由模块内容到router.js里面

```javascript
import Vue from 'vue';  //注意把vue引入后面要用到Vue.use
//引入router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//1.创建组件   注意分离router后把前面的路径改一下 是../ 而不是./ 
import Home from '../components/Home.vue';   
import Elementui from '../components/Elementui.vue';
import News from '../components/News.vue';
import Cnew from '../components/Cnew.vue';
import Content from '../components/Content.vue';
import Pcontent from '../components/Pcontent.vue';
import User from '../components/User.vue';
  import UserAdd from '../components/User/UserAdd.vue';
  import UserList from '../components/User/UserList.vue';
//2.配置路由
const routes = [
  {path:'/home',component:Home}, // user前面要加'/'
  {
    path:'/users',
    component:User,
    children:[
      {path:'useradd',component:UserAdd},
      {path:'userlist',component:UserList} //userlist前面没有'/' 
    ]
  },
  {path:'/elementui',component:Elementui},
  {path:'/news',component:News,name:'news'},
  {path:'/cnew',component:Cnew},
  {path:'/content/:aid',component:Content}, //动态路由
  {path:'/pcontent',component:Pcontent}, //get方法传值配置
  {path:'*',redirect:'/home'}  //默认跳转路由
]
//3.实例化VueRouter
const router = new VueRouter({
  mode:'history',   //将原来的hash模式换成histrory模式 会需要一些后端的配置配合，还是默认hash模式比较好
  routes //缩写 相当于 routes: routes
})
export default router;
//***别忘了暴露router出去方便main引用*******!!!!!!!!!!!!!!!!!!!!!!!!
//5.<router-view></router-view>放在app.vue里面
//6.在app.vue 内引入连接<router-link to="/home">首页</router-link>
```

## 3.main.js中引入并挂载
```javascript
import router from './router/router.js'
//4、挂载路由
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

# Vuex
## 详情
<https://www.cnblogs.com/yaowen/p/8927343.html> 参考
① Vue Components 是我们的 vue
组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions；
② 我们在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex
中，数据是集中管理的，我们不能直接去更改数据，所以会把这个动作提交（Commit）到
Mutations 中；
③ 然后 Mutations 就去改变（Mutate）State 中的数据；
④ 当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components
中去，组件展示更新后的数据，完成一个流程。
Vuex 的核心是 Store（仓库），相当于是一个容器，一个 Store
实例中包含以下属性的方法：
state 定义属性（状态 、数据）
mapGetters 用来获取属性（数据）mapActions 用来获取方法（动作）
actions 定义方法（动作）,可以使异步的发送请求。
commit 提交变化，修改数据的唯一方式就是显示的提交 mutations
mutations 定义变化，处理状态（数据）的改变
![在这里插入图片描述](https://img-blog.csdnimg.cn/c540522e32c84ba3a6a4741ad0bcea81.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/320ea10c406445848ae765f4099903e8.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/f30d5386b4a44c3984892aba0d02a831.png)
action: 存放异步请求 调用mutations里面的方法修改state里面的值
使用 `this.$store.dispatch(‘getList’)`
```javascript
state： 使用 this.$store.state.activeIndex
mutition：使用 this.$store.commit("ChangeActive",5); // 后面的是数据，可以省略
```
## Store.js

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//1.state主要用于存储数据
var state={
    count:1
}
// 2.mutations里面放的是方法,方法主要用于改变state里面的数据
var mutations={
    incCount(){
        ++state.count;
    }   
}
//vuex 实例化Vuex.store
const  store = new Vuex.Store({
    // state:{
    //     count:1
    // },
    state,  //上面的简写
    // mutations:{
    //     increment(state){
    //         //变更状态
    //         state.count++;
    //     }
    // }
    mutations //上面的简写
})
//暴露出去
export default  store;
```

## Vue文件

```javascript
//1.引入store 建议名字不要改
import store from '../vuex/store.js';
//2.组件
export default {
  data(){
      return{
          msg:'132'
      }
  },
//   store:store 
  store,  //上面的简写
  methods:{
      addcount(){
          //改变vuex store里面的数据
          this.$store.commit('incCount');//触发mutations 改变state里面的数据
      }
  }
}
这个store里面state的数据是在所有vue文件里面共享的，改变后其他组件引用也会改变
```

## 用vuex实现数据可持续化
### Store.js

```javascript
//1.state主要用于存储数据
var state={
    count:1,
    list:[]
}
// 2.mutations里面放的是方法,方法主要用于改变state里面的数据
var mutations={
    incCount(){
        ++state.count;
    }  ,
    addlist(state,data){
        state.list=(data);
    } 
}
```

### News.vue

```javascript
<script>
import store from '../vuex/store.js';
export default {
    data(){
        return{
            msg:123,
            list:[]
        }
    },store,
    methods:{
        requestData(){
            var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
            this.$http.get(api).then((response)=>{
                console.log(response);
                //注意this指向
                this.list=response.body.result;
                //数据放在store里面
                this.$store.commit('addlist',response.body.result);
            },(err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        //判断store里面有没有数据
        var listData = this.$store.state.list;
        console.log(this.$store.state.list.length);
        if(listData.length>0){
            this.list=listData;
        }else{
            this.requestData();
        }
    }
}
```

# mixins 混入
混入 (mixins)： 是一种分发 Vue
组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
定义一个混入对象:
![在这里插入图片描述](https://img-blog.csdnimg.cn/283ff25e50ef44e193f8a7d93af0264a.png)把混入对象混入到当前的组件中:
![在这里插入图片描述](https://img-blog.csdnimg.cn/f38f0a80381245dfbeb6dbec7fe3ec08.png)

mixins的特点
1 方法和参数改变在各组件中不共享
A组件中引入了c mixins文件，改变了里面的c里面的num
但B组件内引入的c里面的num不会改变， 还是初始状态
2
值为对象的选项，如methods,components等，选项会被合并，键冲突的组件会把混入的对象覆盖
3
值为函数的选项，如created,mounted等，就会被合并调用（就是都会执行），混合对象里的钩子函数会
在组件里的钩子函数之前调用
# Axios
1.安装 npm install axios
2.创建request.js文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/fcb43fd69945447b9b75032fb7ba323e.png)

3.配置 request.js
```javascript
import axios from 'axios'
// 创建一个axios对象
const instance = axios.create({
    baseURL:"https://api.cat-shop.penkuoer.com",
    timeout:5000
});
//请求拦截
//所有网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的内容
instance.interceptors.request.use(
    function(config){
        console.group("全局请求拦截");  //分组展示
        console.log(config);
        config.headers.token="123456"; // 可以自定义的传一些数据，但是这个token命名不是自定义的，要看请求服务器的格式要求，是和服务器端约定好的
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
);
//响应拦截
// 所有的网络请求返回数据之后都会先执行此方法
//  此处可以根据服务器的返回状态码做相应的数据处理
// 404 401 50X 等等
instance.interceptors.response.use(
    function(response){
        console.group("全局响应拦截");
        console.log(response);
        console.groupEnd()
        return response;
    },
    function(err){
        return Promise.reject(err);
    }
);
export function get(url,params){
    return instance.get(url,{
        params
    });
}
// export function post(url,data){
//     return axios.post(url,data);
// }
export function post(url,data){
    return instance.post(url,data);
}
export function del(url,data){
    return instance.delete(url);
}
export function put(url,data){
    return instance.put(url,data);
}
```
## App.vue
```javascript
//调用
import axios from 'axios';
import {get} from './utils/request.js'
js
methods:{
    getHandle(){
      //axios.get 发起get请求
      //  参数一 表示请求地址
      //  参数二 表示配置信息
      //    params 表示传递到服务器的数据，以url参数的形式拼接在请求地址后面
      //        {page:1,per:3}
      //        比如：https://api.cat-shop.penkuoer.com/api/v1/products
      //        最终生成的URL为
      //        https://api.cat-shop.penkuoer.com/api/v1/products?page=1&per=3
      //    headers表示表头
      axios.get("https://api.cat-shop.penkuoer.com/api/v1/products",{
        params:{
          page:3,  //显示3页
          per:2 //每页显示2条数据
        },
        headers:{}
      }).then(res=>console.log(res));
    },
    postHandle(){
      //post 请求传递三个参数
      //  请求地址
      //  传递的数据 在请求体中传递
      //    axios默认发送的数据是json格式
      //  配置信息
      //    headers
      //      conttent-type：'application/json'默认
      // 登陆
        axios.post(
          "https://api.cat-shop.penkuoer.com/api/v1/auth/login",
          {
            userName:"xiaoming",
            password:"1111" 
          },
          { //params可以不加 直接大括号里面空就好了
            params:{   
              a:123,
              b:"hahaha"
            }
          }
          )
          .then(res=>console.log(res))
          .catch(err=>console.log(err));
          // axios.put()
          //axios.delete()
    },
    getByMineHandle(){
        get("/api/v1/products",{}).then(res=>
        console.log(res)
        );
    }
  }
在vue-cli 3.0以上版本中的配置（前提安装项目的时候已经安装了axios的插件）
```
## Main.js cli
```javascript
import axios from 'axios' //引入axios
Vue.prototype.$ajax=axios //作为vue对象的属性，并起个名字 ，后面要调用就直接this.$ajax
```
## Login.vue 

```javascript
const url = "#";
this.$ajax.get(url,{params:{uname:this.logindata.uname,pass:this.logindata.pass}})
.then(res => {
// if(res.data==0){
//  this.$message.error('用户名输入不正确');  //判断后端项目传回值的结果
// }
window.sessionStorage.setItem("storeData",res.data);//将数据存储到浏览器内嵌的数据库内
me.$router.push({path:'home/homewel'}); //页面跳转
this.$notify({   //element登陆成功提示框右上边
title: '登陆成功',
message: '欢迎管理员！',
type: 'success'
});
})
.catch(error => {
this.$message.error('网络异常') //element失败提示框上部
// console.error(error); 
```

# nextTick
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
我们了解到数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个
tick。当我们在实际开发中，比如从服务端接口去获取数据的时候，数据做了修改，如果我们的某些方法去依赖了数据修改后的
DOM 变化，我们就必须在 nextTick 后执行。如下：
```javascript
getData(res).then(()=>{
this.xxx = res.data
this.$nextTick(() => {
// 这里我们可以获取变化后的 DOM
})
})
```
有时在watch监听数据触发绘画echarts的时候，ecahrts会init获得页面的dom来绘画，但是可能会发生在dom渲染更新之前，所以必须在方法前套上nextTick
<http://www.bubuko.com/infodetail-3219154.html> 详细参考
# render
```javascript
{
prop: 'industryName',
label: '行业',
render: (h, row, column, index) => {
> // h 整个页面
>
> // row返回整个列的数据
>
> // column 这一数列当前格的数据
>
> // index 索引
return h(
'el-tooltip',
{
class: 'item',
props: {
content: row[column.property],
effect: 'light',
placement: 'top'
}
},
[h('div', { style: { cursor: 'pointer' } },
row[column.property])]
);
}
},
这个rander函数相当于：
<el-tooltip class: 'item', :content: "row[column.property]",
:effect:"'light'", :placement: "'top'">
<div style: "cursor: 'pointer';" >{{row[column.property]}}
</div>
</el-tooltip>
row[column.property] 就是代表当前格的内容信息
h(
  'span',
  {
     style: {
      color: 'rgba(19, 182, 240, 100)',
      border: '1px solid rgb(170, 226, 246)',
      'background-color': 'rgb(222, 241, 249)'
   },
     class: 'rendertagtips'
  },
  '系统推荐'
)
renderHeader: h => {
    return h('span', {
        domProps: { innerHTML: '<span>能耗强度<br/>(吨标煤/万元)</span>' }
    });
}
render: (h, row) => {
     return row.consumeIntensity ? row.consumeIntensity.toFixed(2) : '-';
}
```

# innerHTML 
属性用于设置或返回指定标签之间的 HTML 内容。
```javascript
<p id="test"><font color="#000">嗨豆壳
www.hi-docs.com</font></p>
```
设置段落p的 innerHTML（html内容）:
```javascript
document.getElementById("test").innerHTML =
"<strong>设置标签的html内容</strong>";
获取段落p的 innerHTML（html内容）:<font color="#000">嗨豆壳
www.hi-docs.com</font>
alert(document.getElementById("test").innerHTML);
```
# Iconfont
阿里网站下载代码 并放入项目的asset文件夹下
![在这里插入图片描述](https://img-blog.csdnimg.cn/e8b5624d452043cabe8c753c16a5490a.png)

Main.js
引入
```javascript
import './assets/icont/iconfont.css'
```
页面使用
```javascript
<i class="iconfont">&#xe775;</i>
```
样式修改
![在这里插入图片描述](https://img-blog.csdnimg.cn/536727ea32954213be283ff1520997b1.png)

# 路由守卫
防止直接在浏览器地址输入首页的网址

Router/index.js
```javascript
router.beforeEach((to, from, next) => { // 路由守卫，类似java服务器端编写过滤器
  const store = window.sessionStorage.getItem('storeData') // 获取浏览器缓存值
  if(to.path === '/login'){ 
    next() // 正常放行
  }else if(!store){
    next('/login') // 判断如果里面的值为空则跳回登陆界面
  }else{
next() // 判断如果里面的值不为空则正常放行
  }
})
```
# Json-server虚拟服务器
1.安装npm install -g json-server
2.创建db.json文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/9120b223638e423089314b7cacc1cf25.png)
db.json
```javascript

{
    "posts": [ 
      { "id": 1, "title": "json-server", "author": "typicode" },
      { "id": 2, "title": "清华大学", "author": "马佳辉" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
}
```

3.启动服务
json-server --watch db.json
访问只需要 <http://localhost:3000/posts/2> 访问posts里面的id为2的数据
# Vue-cli
安装
cnpm install -g @vue/cli
# jquery 在vue中的使用
1.安装
npm install jquery --save
2.在需要使用的界面引入
import $ from 'jquery'
3.在生命周期函数mounted内使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/76fed9fbd2d24060a8489582d061cdb5.png)

jquery中的触发事件可以自己定义在mounted中，如果需要使用vue中data的数据，直接使用this.msg是无法使用的，需要另外定义const
_this = this,
# vue问题报错
## You are using the runtime-only build of Vue where the template compiler is not available
原因分析：
在项目配置的时候，默认 npm 包导出的是运行时构建，即 runtime版本，不支持编译 template 模板。
vue 在初始化项目配置的时候，有两个运行环境配置的版本：Compiler版本、Runtime 版本。
其主要区别在于：
Compiler 版本：
可以对 template 模板内容进行编译（包括字符串模板和可以绑定的 html
对象作为模板），例如：
```javascript
new Vue({
el: "#box",
template: "<div>{{msg}}</div>",
data: {
msg: "hello"
}
});
```
Runtime 版本：
使用 vue-loader 加载.vue 文件（组件文件）时，webpack在打包过程中对模板进行了渲染。
解决方法：
修改项目根目录中的配置文件：vue.config.js，具体代码如下：
```javascript
// vue.config.js
module.exports = {
runtimeCompiler: true,
```
