@[TOC](uniapp H5嵌套通讯方案-webview&iframe)
# 背景
在我们使用uniapp制作app的项目的时候往往会有很多的场景需要使用到嵌入H5页面，比如需要渲染地图，会大量操作dom节点，或者echarts，以及一些依赖不适配app，但是很多功能H5页面是无法独立完成的，比如获取定位，比如在线浏览word文档，或者打开外部程序等，这时候我们就需要使用H5与外部的app建立通讯以下我将提供两个通讯方案的具体方法

 1. **webview**

2. **iframe**

# webview方案
值得注意的是webview方案会导致占满整个屏幕，这样app内的上边距就会消失，整个会很不好看，比如你是苹果刘海屏幕，那你的app嵌入的页面就会在顶部有一部分被遮挡。所以我们需要创建dom后设置webview的上边距以及高度，利用uniapp的条件编译语句判断是否是app-plus情况
以下直接上代码：
## 父级
### 手机app调试情况

父级app内的代码
```javascript
<template>
    <view class="content">
        <web-view ref="webViewDom" :id="webviewId" src="http://..." @message="handleMessage"></web-view>
    </view>
</template>
<script>
// 我定义的通讯标识符字典，方便通讯的全局管理
import { WEB_VIEW_EVENT } from '@/api/AppEvent';
export default {
    data () {
        return {
            wv: null, // 计划创建的 webview
            webviewId: 'web-view', // 记录webview的id  
        }
    },
    onLoad () {
        let height = 0; //定义动态的高度变量
        let statusbar = 0; // 动态状态栏高度
        uni.getSystemInfo({ // 获取当前设备的具体信息
            success: (sysinfo) => {
                statusbar = sysinfo.statusBarHeight;
                height = sysinfo.windowHeight;
            }
        });
        // #ifdef APP-PLUS
        let currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
        const that = this
        setTimeout(function () {
            that.wv = currentWebview.children()[0];
            that.wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
                top: statusbar,
                height: height - statusbar,
            })
        }, 500);
        // #endif
		
		// 如果想向webview发送事件就调用postMessage方法
    },
    methods: {
        // webview向外部发送消息--app 接收到的消息
        handleMessage (event) {
            console.log('接收到的消息：' + JSON.stringify(event.detail.data));
            this.detailMessage(event) // 处理信息
        },
		/**
         * 处理 webview 向客户端传递 事件
         */
        detailMessage (dataRes) {
            let data = JSON.parse(JSON.stringify(dataRes));
            const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
            // #ifndef H5
            data = dataRes.detail.data[0];
            try {
                if (deviceEnvIsH5) {
                    data = dataRes;
                }
            } catch (e) {
                console.log(e);
            }
            // #endif
            switch (data.action) {
                case WEB_VIEW_EVENT.WEBVIEW_SUCCESS:
                    console.log('webView加载成功', data);
                    break;
                case WEB_VIEW_EVENT.MAP_SUCCESS:
                    console.log('地图MAP_SUCCESS', data);
                    ...
                    break;
                default: 
                	break;             
            }
        },
        /**
         * 向webview 发送消息
         * @param action
         * @param data
         */
        postMessage (action, data) {
            const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
            // #ifdef H5
            this.wv?.contentWindow?.postMessage({ action: action, data: data }, '*');
            // #endif
            // #ifndef H5
            if (deviceEnvIsH5) {
                // 宿主机在非h5中，但其实是嵌套的webview 还是走传统 webview 通信
                this.wv?.contentWindow.postMessage({ action: action, data: data }, '*');
            } else {
                switch (action) {
                    case WEB_VIEW_EVENT.SEND_LOCATION: // 发送坐标
                        const str = JSON.stringify({ action: action, data: data });
                        this.wv.evalJS(`window.getFatherMessage(${str})`);
                        break;
                    default: 
                		break;  
                }
            }
            // #endif
        },
    }
 }
</script>
```
父级app整个流程是：
接收消息：初始化获取webview dom 保存在wv变量内-->webview触发@message事件-->**handleMessage** -->在**detailMessage**方法内我们通过对我们自定义的action标识对不同情况做出不同的处理

发送事件：调用**postMessage**-->判断是否h5-->非h5（也就是app情况）调用**this.wv.evalJS**发送事件
### H5情况
以上也提到了会有h5的情况，那是因为我们app不只是会在手机上调试，也会在我们的电脑h5页面上调试也是为了更好的对数据处理，或者我们本身嵌套的外层就是一个嵌入的H5页面，所以我们针对H5的情况进行处理：
为了方便我们区分我把处理h5情况的代码放入mounted内，同样也需要用到条件编译判断是否是H5的情况
```javascript
	mounted() {
        const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
        // #ifdef H5
        this.initH5Message();
        // #endif
        // #ifndef H5
        if (deviceEnvIsH5) {
            this.initH5Message();
        }
        // #endif
    },
    methods: {
    	/**
         * 初始化h5下的消息机制
         */
        initH5Message() {
        	const currentWebview = document.querySelectorAll('#' + this.webviewId);
            for (let i = 0; i < currentWebview.length; i++) {
                //  h5 下获取iframe 元素
                if (currentWebview[i].nodeName === 'IFRAME' && currentWebview[i].id === this.webviewId) {
                    that.wv = currentWebview[i];
                }
            }
            const that = this;
             window.addEventListener('message', event => {
                 if (event.data?.data?.arg) {
                    this.detailMessage(event.data?.data?.arg);
                }
            });
            
        },
    }
```
在h5下接收消息就会变得很简单直接用**addEventListener**就可以监听到，发送消息还是调用我们之前的**postMessage**方法即可，不同的是获取**webview**节点的方式，我们可以直接用id获取消息接收

发送流程是：获取webview实例保存在wv变量中 --> 判断是否H5 --> 是H5  this.wv?.contentWindow?.postMessage发送消息

接收消息：初始化获取webview实例保存在wv变量内 -->判断是否H5 --> 是H5 **window.addEventListener监听**message
 
## 子级（嵌套页面） 
在index.html 页面内引入我们的webview文件
```javascript
<script type="text/javascript" src="./src/static/WebView/uni.webview.js"></script>
<script type="module" src="/src/main.ts"></script>
```
注意要在**main.ts**之前引入
这边的webview文件可以点击我下方的链接下载，官方的会有问题，**因为官方的暴露名称也是叫uni这和uniapp自带的全局对象重复名称了，所以会导致无法无法调用webview.js的api的问题**，如果下载了官方的需要自己手动去将webview.js文件内的uni名称改成其他的，我这边改成了**webUni**
官网下载链接：
[https://gitee.com/dcloud/uni-app/raw/dev/dist/uni.webview.1.5.4.js](https://gitee.com/dcloud/uni-app/raw/dev/dist/uni.webview.1.5.4.js)
我的链接：
[https://github.com/572031690/vue3-uniapp-template/blob/main/src/static/WebView/uni.webview.js](https://github.com/572031690/vue3-uniapp-template/blob/main/src/static/WebView/uni.webview.js)

发送消息
```javascript
webUni.postMessage({
        data: {
            action: WEB_VIEW_EVENT.MAP_SUCCESS, // 地图初始化完毕
            data: true
        }
    })
```
接收消息需要在app初始化的时候将我们的接收消息方法挂在到window对象上，用与我们在手机app使用的时候父级app调用我们window全局上的方法来给我们发送消息
### 手机app调试情况

**app.vue**内：
```javascript
window.getFatherMessage = getFatherMessage
/**
 * @name 消息机制 App 版本
 * @param str 消息数据
 */
const getFatherMessage = (str: { action: string, data: any }) => {
    detailMessage(str)
}
/**
 * @name 处理消息机制
 */
const detailMessage = (event: { action: string, data: any }) => {
    console.log(event, 'event')
    switch (event.action) {
        case WEB_VIEW_EVENT.SEND_LOCATION:
            systemStore.setMapCenter(event.data)
            break
        default:
            console.log("default Message:", { event })
    }
}
```
实现步骤：

发送消息给父亲app：在**main.ts**前加入**webview**插件 -->**webUni.postMessage**方法发送事件

接收消息：初始化window挂载自定义方法（需要与父级调用方法名称一致） -->该方法被调用并通过传参接收到消息
### 父节点是H5情况
发送消息还是和上面app情况一样
接收消息:（需要注意的是接收消息我们需要在app内监听UniAppJSBridgeReady方法以及加载完毕，不然使用webUni发送事件会报错）
app.vue
```javascript
onLaunch(function () {
	useLoadUniAppScript()
})
/**
 * 消息机制
 */
function useLoadUniAppScript() {
    document.addEventListener('UniAppJSBridgeReady', function () {
        // 接受子页面发来的信息
        window.addEventListener('message', event => {
            if (event.data) {
                detailMessage(event.data)
            }
        })
        webUni.postMessage({
            data: {
                action: WEB_VIEW_EVENT.WEBVIEW_SUCCESS, // webview加载成功
                data: true
            }
        })
    })
}
```
发送消息给父亲app：在**main.ts**前引入**webview**插件 --> **document.addEventListener**监听**UniAppJSBridgeReady**加载完毕-->**webUni.postMessage**方法发送事件

接收消息：window.addEventListener监听**message**


## 完整代码：
### 父亲
```javascript
<template>
    <view class="content">
        <web-view ref="webViewDom" id="web-view" src="http://..." @message="handleMessage"></web-view>
    </view>
</template>

<script>
import { WEB_VIEW_EVENT } from '@/api/AppEvent';

export default {
    data () {
        return {
            wv: null, // 计划创建的 webview
            webviewId: 'web-view',          
        }
    },
    mounted() {
        const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
        // #ifdef H5
        this.initH5Message();
        // #endif
        // #ifndef H5
        if (deviceEnvIsH5) {
            this.initH5Message();
        }
        // #endif
    },
    onLoad() {
        let height = 0; //定义动态的高度变量
        let statusbar = 0; // 动态状态栏高度
        uni.getSystemInfo({ // 获取当前设备的具体信息
            success: (sysinfo) => {
                statusbar = sysinfo.statusBarHeight;
                height = sysinfo.windowHeight;
            }
        });
        // #ifdef APP-PLUS
        let currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
        const that = this
        setTimeout(function () {
            that.wv = currentWebview.children()[0];
            that.wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
                top: statusbar,
                height: height - statusbar,
            })
        }, 1000);
        // #endif
    },
    methods: {
        // webview向外部发送消息
        handleMessage(event) {
            console.log('接收到的消息：' + JSON.stringify(event.detail.data));
            this.detailMessage(event)
        },
        /**
         * 处理 webview 向客户端传递 事件
         */
        detailMessage(dataRes) {
            let data = JSON.parse(JSON.stringify(dataRes));
            const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
            // #ifndef H5
            console.log('h5');
            data = dataRes.detail.data[0];
            try {
                if (deviceEnvIsH5) {
                    data = dataRes;
                }
            } catch (e) {
                console.log(e);
            }
            // #endif
            switch (data.action) {
                case WEB_VIEW_EVENT.WEBVIEW_SUCCESS:
                    console.log('webView加载成功', data);
                    break;
                case WEB_VIEW_EVENT.MAP_SUCCESS:
                    console.log('地图MAP_SUCCESS', data);
                    ...
                    break;
                default:
                    break;
                    
            }
        },
        /**
         * 向webview 发送消息
         * @param action
         * @param data
         */
        postMessage (action, data) {
            const deviceEnvIsH5 = getApp().globalData.deviceEnvIsH5;
            // #ifdef H5
            this.wv?.contentWindow?.postMessage({ action: action, data: data }, '*');
            // #endif
            // #ifndef H5
            if (deviceEnvIsH5) {
                // 宿主机在非h5中，但其实是嵌套的webview 还是走传统 webview 通信
                this.wv?.contentWindow.postMessage({ action: action, data: data }, '*');
            } else {
                switch (action) {
                    case WEB_VIEW_EVENT.SEND_LOCATION: // 发送坐标
                        const str = JSON.stringify({ action: action, data: data });
                        this.wv.evalJS(`window.getFatherMessage(${str})`);
                        break;
                }
            }
            // #endif
        },
        /**
         * 初始化h5下的消息机制
         */
        initH5Message() {
        	const currentWebview = document.querySelectorAll('#' + this.webviewId);
            for (let i = 0; i < currentWebview.length; i++) {
                //  h5 下获取iframe 元素
                if (currentWebview[i].nodeName === 'IFRAME' && currentWebview[i].id === this.webviewId) {
                    that.wv = currentWebview[i];
                }
            }
            const that = this;
             window.addEventListener('message', event => {
                 if (event.data?.data?.arg) {
                    this.detailMessage(event.data?.data?.arg);
                }
            });
        },
    }
}
</script>
```
### 孩子
**index.html**
```javascript
<script type="text/javascript" src="./src/static/WebView/uni.webview.js"></script> // 在main之上
<script type="module" src="/src/main.ts"></script>
```
**app.vue**
```javascript
onLaunch(function () {
    useLoadUniAppScript()
})

/**
 * 消息机制
 */
function useLoadUniAppScript() {
    document.addEventListener('UniAppJSBridgeReady', function () {
        // 接受子页面发来的信息
        window.addEventListener('message', event => {
            if (event.data) {
                detailMessage(event.data)
            }
        })
        webUni.postMessage({
            data: {
                action: WEB_VIEW_EVENT.WEBVIEW_SUCCESS, // webview加载成功
                data: true
            }
        })
    })
}

/**
 * @name 消息机制 App 版本
 * @param str 消息数据
 */
const getFatherMessage = (str: { action: string, data: any }) => {
    detailMessage(str)
}
window.getFatherMessage = getFatherMessage
/**
 * @name 处理消息机制
 */
const detailMessage = (event: { action: string, data: any }) => {
    console.log(event, 'event')
    switch (event.action) {
        case WEB_VIEW_EVENT.SEND_LOCATION:
            systemStore.setMapCenter(event.data)
            break
        default:
            console.log("default Message:", { event })
    }
}
```
# iframe 方案
使用iframe方案可以有效的避免嵌入网站占满整个屏幕的问题,但是也有弊端就是如果此方案想在H5页面下调试等等会报跨域的问题，直接无法显示子页面,不过对方页面如果全部放开跨域的话，使用方法还是和app-h5方案一致的
## 手机调试情况（app-plus）
由于我们手机上无法直接使用window，document方法来通讯以及监听message，所以我们需要借助官方的[render.js](https://uniapp.dcloud.io/tutorial/renderjs.html)方法

### 父亲（app）
```javascript
<template lang="pug">
	<view style="height:100vh !important;">
        <iframe id="iframeId" style="margin-top: 40rpx; width:100%;height: calc(100% - 40rpx); " ref="iframeDom" src="..."></iframe>
        <view :message="message" :change:dataItem="renderModal.messageChange"></view>
    </view>
</template>
<script>
import { WEB_VIEW_EVENT } from '../../static/AppEvent'
export default {
    data() {
        return {
            message: ''
        }
    },
    mounted() {
        window.receiveRenderData = this.receiveRenderData
    },
    methods: {
        receiveRenderData(e) {
            //接收的值
            console.log(e, '-father-event')
            switch (e.action) {
                case WEB_VIEW_EVENT.REQUEST_LOCATION:
                    ...
                    break
                case WEB_VIEW_EVENT.OPEN_FILE:
                    ...
                default:
                    break

            }
        },
        // 发送事件
        snedMessage(action, data) {
            this.message = {
                action,
                data
            }
        },
    }
}
</script>
<script module="renderModal" lang="renderjs">
	export default {
		data() {
			return {
				dom: '',
			}
		},
		mounted() {
			this.dom = document.getElementById('iframeId')
			// 接收iframe传过来的值
			window.addEventListener('message',  (e)=> {
				this.emitData(e.data) 
			});
		},
		methods: {
			emitData(e) {
				// 将值传到当前页面
			  	this.$ownerInstance.callMethod('receiveRenderData',e)
			},
			// data的值发生改变时会触发dataChange并且将值传到iframe页面中
			messageChange(e) {
				const param = {data:e}
				this.dom.contentWindow.postMessage(param,'*')
			}
		}
	}
</script>
```
整个流程是：
**接收子页面发送事件**：页面内将**receiveRenderData**挂载到window对象上 --> 加载render.js --> mounted内获取iframe节点保存在dom变量内 -->  **window.addEventListener**监听message --> 将讯息通过**this.$ownerInstance.callMethod**传给页面内的receiveRenderData方法 --> 处理讯息

**发送事件**：创建一个view节点绑定响应式变量**message** --> 节点上绑定自定义属性变量change事件为render.js内的messageChange方法 --> renderjs内mounted获取iframe节点保存在dom变量内 --> 父亲改变message变量 --> 调用messageChange方法 --> 通过this.dom.contentWindow.postMessage(param,'*')发送讯息

### 孩子（H5）
H5页面可以直接操作window，所以我们可以直接调用window.parent.postMessage方法将变量发送给父亲app
```javascript
// 给父亲发送消息
window.parent.postMessage(
   {
        action: 'REQUEST_LOCATION', // 请求获取定位
        data: true
    },
    '*'
);


// 接收消息：
onLaunch() {
    this.getInfo()
},
methods: {
	getInfo() {
	    const that = this
		//接受父页面发来的消息
		window.addEventListener('message', event => {
			// 根据上面制定的结构来解析iframe内部发回来的数据
			const data = event.data;
			that.detailMessage(data)
		});
	},
}
```
发送消息： 调用**window.parent.postMessage**方法

接收消息：**window.addEventListener**监听 message
## 父亲页面也是H5情况
### 父亲H5
发送事件：
```javascript
const msg = {
	data: '12'
}
dom.contentWindow.postMessage(msg, '*')
```
接收事件：
```javascript
window.addEventListener('message', (event) => {
    console.log(event, '---msg')
})
```
### 子H5
发送事件：
```javascript
const msg = {
	data: '12'
}
window.parent.postMessage(msg, '*');
```
接收事件：
```javascript
window.addEventListener('message', (event) => {
    console.log(event, '---msg')
})
```



#  总结
**webview**

优点：
 1. 适配性好，对于个个设备使用友好
 2. 方便app的H5调试
 
缺点：

 1. 书写逻辑较为繁琐
 2. 需要引入外部js包
 3. 会占满整个屏幕，需要手动设置边距

**iframe**

优点：
 1. 使用起来书写逻辑方便
 2. 可以自适应父级dom大小
 
 缺点：
 
 4. 父亲H5本地调试不友好，会报跨域问题
 5. 对设备兼容性不高
