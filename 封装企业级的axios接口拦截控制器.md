@[TOC](目录)
# 前言
对于接口拦截的使用场景我们一般是在一些场景组件切换的时候，内部接口请求以及异步任务并不会被执行队列销毁，而是会继续执行，所以就会导致当你路由或者组件切换的时候一些接口任然被执行。🦐

比如我们在写地图大屏的时候，我们的路由以及组件切换并不会让地图组件切换，也就是地图组件是一直存在的。⛽️如果我们切换到一个页面请求接口会渲染一些点位，但是如果这个时候接口比较慢，我们又很快的切换到了其他页面，这个时候vue组件虽然被销毁，但是里面的异步任务以及被推入了执行队列，所以并不会被销毁，那上一个页面的地图点位就很容易无法被清除而带到了我们当前的页面来，这是一个很棘手的问题，这个时候就需要引入我们的axios的接口拦截功能了🐛。
# 技术栈
**axios**，**vue2**，**vue3**，**TS**，**pinia**
# 1.实现路由切换接口拦截
> 技术栈：vue2 JS

💰我们先来实现一个比较简单的接口拦截全局控制方法，也就是在我们路由切换的时候实现全部接口的拦截，因为我们一般的应用场景只是会在路由切换的时候需要用到接口拦截功能。
## axios请求拦截方法
```javascript
import axios from 'axios'
const axiosCancel = ''
/**
 * @description 基于axios的二次封装
 */
const Instance = axios.create({
    timeout: 60 * 1000   
})
/**
 * 请求拦截
 */
Instance.interceptors.request.use(
	config=> {        
	const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        config.cancelToken = source.token // 将token注入到请求中
        axiosCancel = source        
        return config
	}
)
```
我们在接口拦截里面将接口的赋值给了我们```source token```定义的变量```axiosCancel```，这样我们只需要调用```axiosCancel```的```cancel```方法就可以实现接口的拦截
```javascript
axiosCancel.cancel('取消了接口‘)
```
👀这边注意到我们在使用```cancel```的时候还传入了字符串，此字符串也会被我们```axios```的响应拦截所拦截，并会跳入```error```,这样我们就可以通过判断```message```的名称来知道此接口异常的原因是被接口拦截了，那我们一般会封装此情况的接口不会在界面出现错误提示 

```javascript
/**
 * 接口响应拦截
 */
Instance.interceptors.response.use(
    response => {
        	....省略此处代码
    },
    error => {
        if (error.message !== '取消了请求') {
            Message.error({ message: '服务异常，请稍后再试' })
        }
        return Promise.reject(error)
    }
)
```
## 实现路由切换拦截所有接口
现在我们😯只需要将这个装有拦截token的变量注入到我们任何想拦截他的地方就可以了，我们可以将它赋值给window对象，也可以赋值给vuex变量都可以。一下以window对象为例🌰
```javascript
Instance.interceptors.request.use(
	config=> {
		!window.axiosCancel && (window.axiosCancel = [])
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        config.cancelToken = source.token // 将token注入到请求中
        window.axiosCancel.push(source)
        return config
	}
)
```
再配置一下我们的路由守卫，判断如果是初始化也就是'/'地址，那么就设置```window.axiosCancel = []```,🀄️在路由切换的时候将所有的接口都遍历拦截即可：
```javascript
const router = new VueRouter({
	routes: newRoutes // 这是我们的路由数据 再此就不写了
})
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    if (from.path === '/') {
        window.axiosCancel = []
        return next()
    } else {
        const cancelArr = window.axiosCancel
        cancelArr.forEach(ele => {
            ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
        })
        window.axiosCancel = []
        return next()
    }
})
```
基本上以上方法可以解决一些简单的接口拦截应用情况，像我们公司的老项目基本上上这个就够了，但是新项目我们可以不止于此。🦕
此封住还是有很多弊端，比如如果我们在初始化项目的时候马上手动切换路由，就容易导致一些不应该被拦截的接口被拦截，以及拦截的实际比较单一，只能在路由切换的时候，所以我们针对以下两个点进行优化：👬
>- 自定义拦截接口
>- 自定义拦截时机
# 2.最终：实现高度自定义接口拦截功能
> 技术栈：vue3 TS pinia
## 准备拦截接口存储以及方法
首先我们需要用一个全局的变量来管理我们需要被拦截的接口，并封装一些方法用于控制接口的拦截以及队列清空，所以就需要用到```store```的思想我们就可以引入```pinia（vue2的话可以使用vuex）```
安装：
```
yarn add pinia
```
main.ts
```javascript
import { createPinia } from 'pinia'
// 。。。此处省略代码
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```
创建我们的axios文件📁：src/store/axios.ts
```javascript

/*
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-23 23:46:45
 * @Description:
 */
import { defineStore } from 'pinia'
import type { Canceler } from 'axios'

export const useAxiosStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'axios',
    state: () => ({
        countIntercept: 0, // 存放当前拦截队列里的接口数量
        interceptArray: [] as Canceler[] // 存放拦截接口
    }),
    // getters
    getters: {
        countInterceptData: state => state.countIntercept,
        interceptArrayData: state => state.interceptArray
    },
    actions: {
    	// 添加接口进入拦截队列
        async addIntercept(cancel: Canceler) {
            // 可以做异步
            this.countIntercept++
            this.interceptArray.push(cancel)
        },
        // 拦截队列内的接口并删除
        async clearIntercept(num?: number) {
            if (num) {
                const length = this.interceptArray.length
                this.interceptArray.slice(-num).forEach((cancel) => {
                    cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
                })
                this.countIntercept = this.countIntercept - num
                this.interceptArray = this.interceptArray.slice(0, length - num)
                return
            }
            this.interceptArray.forEach((cancel) => {
                cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
            })
            this.countIntercept = 0
            this.interceptArray = []
        }
    }
})
```
这样我们就完成了拦截接口的存放以及拦截方法定义工作，我们可以在任意需要拦截接口的地方调用pinia的方法即可对接口进行拦截，接下来我们需要封装一下我们的axios请求使用方法，来完成自定义的将我们需要拦截的接口推入pinia的拦截队列中去👋
## 封装axios
我设想的是在我们请求的时候可以加入一个配置参数用来识别此接口是需要被推入拦截队列的，所以我们就需要对axios暴露方法进行二次封装
src/service/request.ts
```javascript
import axios from 'axios'
import { useAxiosStore } from '@/store/axios'
import BaseList from '@/service/baseServe'
import type { apiObjTs, apiReturnTs } from '@/service/types'
import Config from '@/config'

/* 实例化请求配置 */
const instance: AxiosInstance = axios.create({
    baseURL: Config.domain, // '/api'
    // 请求时长
    timeout: 60 * 1000,
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [
        (data) => {
            if (
                typeof data === 'string'
                && (data.startsWith('{') || data.startsWith('['))
            )
                data = JSON.parse(data)

            return data
        }
    ]
})

const request = instance.request
const CancelToken = axios.CancelToken
const requestControl = <T, R = false>(option: apiObjTs) => {
	// 替换拼接url的服务地址
    if (option.server) option.url = BaseList[option.server] + option.url
    // isIntercept 接口拦截标识代表此接口需要被拦截
    if (option.isIntercept) {
        option.cancelToken = new CancelToken((cancel) => {
            const axiosStore = useAxiosStore()
            axiosStore.addIntercept(cancel)
        })
    }
    return request<any, apiReturnTs<T, R>>(option)
}
```
这边就不放入axios的响应拦截和请求拦截了，与本文的核心逻辑无关  

src/service/type.ts
```javascript
import type { AxiosRequestConfig } from 'axios'
import type BaseList from '@/service/baseServe'
// 入参类型
export interface apiObjTs extends AxiosRequestConfig {
    url?: string // 请求地址
    server?: keyof Omit<typeof BaseList, 'prototype'> // 请求服务
    isIntercept?: boolean // 是否推入全局的请求拦截栈
    baseURL?: string // 本地调试时 接口特殊代理
}
// 返回值类型
export type apiReturnTs<T, X> = X extends true ? T : {
    code: number
    data: null | T
    message: string
}
```
api文件配置：
src/api/public/index.ts
```javascript
import type { ApiObjTs } from '@/service/types'
import Request from '@/service/request'
// 示例接口
export const getSystemMenus = (data: PUBLIC_API_REQUEST.getSystemMenus, option:ApiObjTs={} ) => {
    return Request<PUBLIC_API_RESPONSE.getSystemMenus>({
        url: '/api/v1.0/permissions/systemMenus',
        server: 'bspPermissionServer',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data,
        ...option
    })
}
```
src/api/public/types.d.ts
```javascript
// 请求传参校验 命名空间
declare namespace PUBLIC_API_REQUEST {
	type getSystemMenus = { 
		systemCode: 'wgmsAnalysisDiagnose' 
	}
}
// 请求响应参数
declare namespace PUBLIC_API_RESPONSE {
    type getSystemMenus = {
        entries: string[]
    }
}
```
在此我们axios以及接口的封装就完成了，接下来终于到我们的使用阶段了！💩
我们只需要在我们请求的时候第二个参数传入对象属性```isIntercept```为true即可被推入我们的拦截队列了
```javascript
import { getSystemMenus } from '@/api/public' // 单个请求导入
const res = await publicApi.getSystemMenus({ systemCode }, { isIntercept: true }) 
```
我们在任何想用的时候只需要引入```pinia```的```axiosStore```调用相应的方法就可以了👴
```javascript
import { useAxiosStore } from '@/store/axios';
const axiosStore = useAxiosStore()
axiosStore.clearIntercept(1) // 拦截最新一条请求，并删除
axiosStore.clearIntercept() // 拦截全部并清空拦截队列
```