@[TOC](目录)
# 1.Vue3

## Attrs和 props

Attrs内可以包含所有父级传递的方法和string类型参数

Props只能是参数且需要在上面声明，一旦props声明了，arrts内就不会在现实此参数
1、props 要先声明才能取值，attrs 不用先声明
2、props 声明过的属性，attrs 里不会再出现
3、props 不包含事件，attrs 包含
4、props 支持 string 以外的类型，attrs 只有 string 类型

## toRefs()

toRefs() 可以将 reactive() 创建出来的响应式对象转换成**内容为 ref
响应式的值的普通对象**

在搞清楚 toRefs() 的用法之前，我们需要先了解一下用 reactive() 和 ref()
创建出来的响应式对象的区别：

1、用 reactive()
创建的响应式对象，整个对象是响应式的，而对象里的每一项都是普通的值。当你把它用展开运算符展开后，整个对象的普通值都不是响应式的；

2、而用 ref() 创建的响应式的值，本身就是响应式的，并不依赖于其他对象。

所以当你需要展开 reactive() 创建的响应式对象，又不想让他们失去响应式特点的时候，就需要用 toRefs() 将它进行转换：
```javascript
// 定义响应式数据对象
const state = reactive({
count: 0
})
// 定义简单的函数，使count每次+1
const add = () => {
state.count++
}
// 将setup函数的内容return出去，供外界使用
return {
// 将 state 展开导出，同时将其属性都转化为 ref 形式的响应式数据
...toRefs(state),
add
}
```
## Reactive ref

reactive：reactive的作用是将对象包装成响应式对象------通过
Proxy代理后的对象。

ref：由传入值返回一个响应式的、可变的且只有value一个属性的ref对象。

##  readonly()

传入一个响应式对象、普通对象或 ref
，返回一个**只读**的对象代理。这个代理是深层次的，对象内部的数据也是只读的。

## Watch
![在这里插入图片描述](https://img-blog.csdnimg.cn/dd1cfe45e105460eb4a2bc8be641708c.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/283bab2d3236421b8a8a7da3122cadce.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/229d4fb6fcc44cb4b64e2f707ac0c9a6.png)


## isRef()

isRef() 顾名思义，是用来判断某个值是否为 ref() 创建出来的响应式的值。
```javascript
const unwrapper = isRef(foo) ? foo.value : foo
```

## 动态img

![在这里插入图片描述](https://img-blog.csdnimg.cn/689bd44804b94eae9c6308a025c38f88.png)


## Transition

transition类名变更

-   v-enter→v-enter-from

-   v-leave →v-leave-from
```javascript
<transition name="fade">
<div v-show="visible">这是一段文本</div>
</transition>

Style：
.fade-enter-active,
.fade-leave-active {
transition: all 2s ease;
}
.fade-enter-from,
.fade-leave-to {
opacity: 0;
}
```


## 组件v-model

父组件： // 在vue3中v-model默认叫modelValue，vue2中叫value

Vue3

```javascript
VuYear(v-model="curYear" @yearChange="clickYear")
```

子组件：
```javascript
el-select(v-model="currentYear" @change="(val)=>clickYear(val)")
props:{
        modelValue:{
            type:Number,
            default: 0
        }
    },
setup(props:any, context:any) {
        const clickYear = (val:any) => {
            context.emit('yearChange',val)
        }
        const currentYear = computed({
            set(value){
              context.emit('update:modelValue',value)  
            },
            get(){
                return props.modelValue
            }
        })
        return {
            clickYear,
            currentYear
        }
```
**自定义名称：**

**父组件**
```javascript
VuYear(v-model:title="title"v-model="currentYear"@yearChange="clickYear")
```

子组件：
```javascript
el-select(v-model="currentYear" @change="(val)=>clickYear(val)")

props:{
        modelValue:{
            type:Number,
            default: 0
        }，
title:{

            type:Number,

            default: 0

        }

    },
setup(props:any, context:any) {
        const clickYear = (val:any) => {
			context.emit('update:title', val+'标题') // 更新title
            context.emit('yearChange',val)
        }
        const currentYear = computed({
            set(value){
              context.emit('update:modelValue',value)  
            },
            get(){
                return props.modelValue
            }
        })
        return {
            clickYear,
            currentYear
        }
```
## provide/inject
1.定义symbol作为全局唯一标识
symbol.ts
```javascript
import type { CloseSelectTs } from '@/types/common'

export const closeSelectKey: InjectionKey<Ref<CloseSelectTs>> = Symbol()
```
使用： 
父亲：
```javascript
import {  closeSelectKey } from '@/symbols'
const data = reactive({
    selectData: {
        year: Number(dayjs().format('YYYY')),
        areaCode: '',
        type: 0,
    }
})
// 注入筛选框数据（利用computed可以触发子组件接收到的变量也是响应式，方便自组件监听变化）
provide(closeSelectKey, computed(() => data.selectData))
```
子孙
```javascript
import { closeSelectKey, globalKey } from '@/symbols'
const selectData = inject(closeSelectKey)
// 注意不可以使用selectData.value 监听，这样会失去响应式
selectData && watch(selectData, (val) => {
    getChart({ year: val.year, areaCode: val.areaCode })
}, { deep: true })
或者：
watch(() => selectData?.value, (val) => {
    if (!val) return
    getChart({ year: val.year, areaCode: val.areaCode })
}, { deep: true })
```
为什么用方法的形式返回value就可以监听到呢？有待去解决
现在已经知道的是
```javascript
isRef(selectData) // true
isReactive(selectData) // false

isRef(selectData?.value) // false
isReactive(selectData?.value) // true
```
## 2.Vuex

目录结构：

![在这里插入图片描述](https://img-blog.csdnimg.cn/79d14d5729ae4b52ad63689e955919d7.png)

### State.ts
```javascript
export default {
    glMapPop:'close'
}
```
### Mutation.ts
```javascript
export default {
    SET_GL_MAP_POP(state:any, data:any) {
        state.glMapPop = data
    }
}
```

### Getter.ts
```javascript

export default{
    getMapPop: (state: any) => state.glMapPop
}
```
### Action.ts
```javascript
export default { // 应该封装异步这边就没写
    ADD_ACOUNTVUEX(store: any, countVuex: Number) {
        store.commit('ADD_ACOUNTVUEX', countVuex)
    }
}
```
### AppStore/Index.ts
```javascript
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const appStore = {
    state,
    mutations,
    actions,
    getters,
}
export default appStore;
export default appStore;
```
### index.ts
```javascript
import { createStore, Store } from 'vuex'

import appStore from './appStore'

export default createStore({

    modules: {

        appStore,

    },

})

// vuex数据可持续化 以及state, mutation, action监听

export const storeInit = (storePublics:Store<any>) => {

    /**

     *
全局监听，页面刷新的时候将store里state的值存到sessionStorage中，然后从sessionStorage中获取，再赋值给store。

     * 然后再把session里面存的删除即可，相当于中间件的作用。

     */

    //在页面加载时读取sessionStorage里的状态信息 '刷新后'

    if (window.sessionStorage.getItem('store')) {

        storePublics.replaceState(Object.assign({}, storePublics.state,
JSON.parse(sessionStorage.getItem('store') as string)))

        window.sessionStorage.removeItem('store')

    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里 '刷新前'

    window.addEventListener('beforeunload', () => {

        sessionStorage.setItem('store',
JSON.stringify(storePublics.state))

    })

    // 这里是store的生命周期，特殊需求的可用

      storePublics.watch((state)=>{

        state.name + state.name1

        console.log('当state值发生改变就会触发回调函数')

      },()=>{

        console.log('回调函数')

      })

      storePublics.subscribe((mutation,state)=>{

        console.log(mutation)

        console.log(mutation.payload)  // 每次传的参数

        console.log('每次调用mutations 都会执行这个函数')
      })
      storePublics.subscribeAction((action, state) => {
          console.log(action)
          console.log(action.payload) // 每次传的参数
          console.log('监听action')
      })
}
```
### Main.ts
```javascript
import vuex from "@/store/index";
app.use(vuex)
```
### app.vue
```javascript
import { useStore } from 'vuex'
import { storeInit } from "@/store/index";
store = useStore()
storeInit(store)
{...mapState(['glMapPop'])} // 括号内写名称
{...mapMutations(['SET_GL_MAP_POP'])}
{...mapActions([])} // 如果不写则为空
{...mapGetters([])}
```
## 3.Setup语法糖

### 组件引入使用 {#组件引入使用 .list-paragraph}
```javascript
import EarthLeftPanel from '@components/earth EarthLeftPanel.vue'
```
使用：
earth-left-panel 或者
EarthLeftPanel

### 模块导出到模板 {#模块导出到模板 .list-paragraph}
```javascript
const { defaultCheckedLists } = toRefs(data)
```
### 定义名称
```javascript
<script lang='ts' setup name="EarthComprehensive">
```
### defineProps 
```javascript
defineProps({
    info:{
        type:String,
        default:'--'
    },
    time:{
        type:String,
        default:'0分钟'
    },
})
```
### defineEmits
```javascript
 import {defineEmits} from 'vue'
//  使用defineEmits创建名称，接受一个数组\
let $myemit=defineEmits(['myAdd','myDel'])
let hander1Click=():void=>{
    $myemit('myAdd','新增的数据')
}

let hander2Click=():void=>
    $myemit('myDel','删除的数据')
}
```
### defineExpose
```javascript
// 将组件中的属性暴露出去，这样父组件可以获取\
defineExpose({
    sex,
    info
})
```
### v-memo

v-memod会记住一个模板的子树,元素和组件上都可以使用。
该指令接收一个固定长度的数组作为依赖值进行\[记忆比对\]。
如果数组中的每个值都和上次渲染的时候相同，则整个子树的更新会被跳过。
即使是虚拟 DOM 的 VNode 创建也将被跳过，因为子树的记忆副本可以被重用。
因此渲染的速度会非常的快。
需要注意得是:正确地声明记忆数组是很重要。
开发者有责任指定正确的依赖数组，以避免必要的更新被跳过。
```javascript
<li v-for="item in listArr"  :key="item.id"  v-memo="['valueA'，'valueB']">
    {{ item.name   }}
</li>
```
v-memod的指令使用较少，它的作用是:缓存模板中的一部分数据。\
只创建一次，以后就不会再更新了。也就是说用内存换取时间。
