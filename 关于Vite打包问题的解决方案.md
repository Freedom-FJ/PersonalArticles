@[TOC](目录)
# Vite打包图片丢失问题
export const imgsGlob =
import.meta.globEager('../assets/map/mapStyle/*.svg')
如上是vite模块化导入工具的使用，用于导入mapStyle文件夹下所有的以.svg结尾的文件，当配置了vite的resolve引入后
![](media/image1.png){width="4.895833333333333in" height="2.75in"}
我们通常有三种路径导入写法：
../assets/map/mapStyle/*.svg
/src/assets/map/mapStyle/*.svg
@/assets/map/mapStyle/*.svg（此方法是无效的）
以上前两种写法在开发环境手动运行build打包时都不会出现问题，但是在线上CI打包时部分第二种获取路径方法只会获得空而且不会报错，所以要采取第一种相对路径导入文件比较保险。
有一个值得忽视的问题是线下模块导入时vite对于路径中地址的大小写不敏感，也就是当识别到mapStyle文件夹不存在的时候其可以模块导入mapstyle，Mapstyle等等文件夹下的svg文件，此问题在开发环境手动打包时也不会有问题，但是在线上CI环境打包时会更加严格，不会识别小写字母的文件夹，会直接返回空的对象且不会有任何的报错，这很容易在排查的时候无法准确定位问题原因。
# Vite关于使用问题Echarts问题
## 引入问题
在vue内我们一般推荐使用以下方式引入并使用
import * as echarts from 'echarts'
但是在制作echarts和mapbox结合的效果时也就是使用glMap时此方式在Vite打包后会无法显示（开发环境可以），所以使用在此类场景使用echarts时要使用以下方式导入
import echarts from 'echarts'
## 获取dom问题
Echarts获取dom时我们有时候会采用document.getElementByclassName()方法来获取一个或多个echarts的dom节点，在开发环境手动打包生成镜像是没什么问题。但是这存在隐患，如果之前的class的dom节点没有销毁会无法获取指定元素。
在线上CI打包时，用class类名获取节点会出现第一次打开页面可以获得dom节点生成echarts图表，但是在第二次打开同样组件时就算之前已经销毁改组件，class类名没有重复，但是还是无法获取到改节点，echarts无法正常生成，且不会报错，线上存在vite+vue3的兼容性问题，推荐使用vue3的ref获取节点获取方法：
1.直接引用
.echart-box(ref="echartPie")
Setup内：
const echartPie = ref('')
return {
      echartPie
}
使用：
const chartone = echarts.init(echartPie.value)
chartone.setOption(getChartOption())
2.Data模块绑定响应式引用
SetUp内：
const data = reactive({
            echartPie: '',
........// 其他变量
})
return {
     ...toRefs(data),
}
使用 ：
const chartone = echarts.init(data.echartPie)
chartone.setOption(getChartOption())
3.for循环获取多个dom
<div class="star-spot-anima" v-for="(item, key) in [0,1,2,3]"
:key="key" :ref="el => (star[key] = el)" ></div>
Setup内
const star: any[] = reactive([])
return {
      star
}
start内的每一项就是一个dom节点以此方法可以将dom节点绑定到数组的任何变量上，变量原来定义的类型不会影响dom节点的绑定，会直接覆盖。
# turf使用问题
在Vue3+Vite内使用turf时我们的导入方式一般是采用
import * as turf from '@turf/turf'
在使用turf方法时，开发环境不会有什么问题，但是在vite打包后线上环境会导致整个页面白屏，就算代码内一开始并不会调用此方法的相关文件，需要点击特殊组件才会调用，但是还是会导致页面一打开就白屏。打开控制台显示如下错误：
TypeError: Cannot read properties of undefined (reading 'default')
点击定位代码位置后会发现是关于turf的问题
![](media/image2.png){width="5.768055555555556in"
height="0.7497134733158355in"}
尝试其他方式import
turf和定位到turf部分方法使用报错，但是始终无法解决，最后采用html页面直接导入turf.js文件代替后不会出现此问题
<script type="text/javascript"
src="/static/turf.min.js"></script>
# Vite打包警告过多问题
我们只争对对项目运行不会影响，线上线下不会报错的警告进行讨论：
以下警告主要是一些规范问题
如果没有遵守可能在项目启动和打包的时候动则几十条警告，甚至几百条，严重影响对于开发人员对有用信息的定位和判断所以需要解决：
warning: "@charset" must be the first rule in the file
warning: Unexpected ")"
.el-table :deep() .el-table__body-wrapper {
the >>> and /deep/ combinators have been deprecated. Use :deep()
instead.
第一种是提示@charset必须在文件夹的样式第一行使用，这个警告一单出现就是几十条起步的。这个一般是vite版本对于stylus，SCSS预处理语言和element使用时的兼容性问题，原因，sass编译的时候，因为被编译的文件里有中文导致的，比如element的样式文件。但是在less和element一起使用的时候不会出现以下问题。网上说在vite.config.js 内设置css的charset:
false
，但是发现没用所以采用以下配置：
css: {
postcss: {
> plugins: [
>
> {
>
> postcssPlugin: 'internal:charset-removal',
>
> AtRule: {
>
> charset: (atRule) => {
>
> if (atRule.name === 'charset') {
>
> atRule.remove();
>
> }
>
> }
>
> }
>
> }],
},
}
第二第三条主要是深度选择器的样式规范问题
不使用 /deep/和 >>>,因为已经淘汰
::v-deep()
是element推荐的选择器，测试发现其可以有效的降低打包以后的文件大小，网上说可以提高运行速度还没有证实，经过测试：
使用规范
::v-deep(.table) 正确 功能生效
::v-deep() .table 警告 功能生效
但是还是推荐使用:deep()
使用规范
: deep (.table) 正确 功能生效
: deep () .table 警告 功能生效
我们一般采取vite模块化导入工具import.meta.globEager和import.meta.glob来模块化导入图片，js文件等等，其可以实现对于路由，api的模块化封装。globEager是直接引入，而glob是动态引入，其会生产一个()
=>
import("**")对象，调用对应属性时才会按需引入。以下的使用是导入mapStyle文件夹下所有的以.svg结尾的文件：
