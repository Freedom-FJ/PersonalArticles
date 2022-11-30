@[TOC](目录)
# CSS
## animation
/*此处的rotateline是自定义的名字和后面对应，infinite在表无限循环
不加infinite的话会在页面生成的时候运行一次就结束了*/
```javascript
.Div {
animation: rotateline 10s linear infinite;
}
@keyframes rotateline {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```
Vue结合class的动态绑定切换class名字的时候就会运行一次animation从而达到动画效果
animation 属性是一个简写属性，用于设置六个动画属性：
```javascript
-   animation-name
-   animation-duration
-   animation-timing-function
-   animation-delay
-   animation-iteration-count
-   animation-direction
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/73bd8e3f5e114340bd93851d364bfb54.png)


```javascript
.animation
        animation moving 60s linear infinite
        &:hover
            animation-play-state paused
```
animation-play-state  
paused这样可以让鼠标悬浮的时候暂停，只要设置为running或者空就可以重新让动画开始  
**js控制动画**  
```javascript
let style = document.styleSheets[0]; // 获取网页样式规则表
style.insertRule（rule，index） rule 插入的规则，index插入的位置
const heights = 450
style.insertRule(`@keyframes rollings{0%{ transform:
translateY(0%);}100%{transform: translateY(-${heights}px);}}`,0)
js 控制动画开始暂停前提是已经设置了hover时state为paused暂停动画
Dom.style.animationPlayState='' // 继续动画
Dom.style.animationPlayState='paused' // 暂停动画
```
**完整动画初始化**  
```javascript
const dom = this.$refs.hiddenBody;
const num = this.PollutionMoniList.length;
let style = document.styleSheets[0];
const styleArray = [].slice.call(style.cssRules); // 将伪数组变成数组
const index = styleArray.findIndex(item => item.name ===
'rollingsPolluMoni');
if (index !== -1) style.deleteRule(index); // 如果有此动画就先删除
if (num <= 5) {
return;
}
dom.setAttribute('style', `animation: rollingsPolluMoni ${1 * num}s
linear  infinite; `);
dom.style.animationPlayState = ''; // 继续动画
const heights = num * 17;
style.insertRule(`@keyframes rollingsPolluMoni {0%{ transform:
translateY(0%);}100%{transform: translateY(-${heights}px);}}`, 0);
```
逐帧动画
![在这里插入图片描述](https://img-blog.csdnimg.cn/3536e0d5bc574a25a77ba8ee00df8355.png)

```javascript
background url('~@assets/images/waste/trans.png')  
background-repeat no-repeat
background-position 0 -4704px
animation turn steps(7) 1.5s infinite
//逐帧动画
@keyframes turn
   100%
    background-position 0 0
```
##  ::after
```javascript
element:after { [style properties]{.underline} } /* CSS2 语法 */
element::after { [style properties]{.underline} } /* CSS3 语法 */
在每个 <p> 元素的内容之后插入新内容：
p:after
{
content:"-台词";
color: green;
}
<p>我是唐老鸭。</p>
显示：我是唐老鸭。-台词
```
## background-size
background-size可以让图片的大小随父元素的变化  
background-size：100% 100%;---按容器比例撑满，图片变形；  
background-size:100%; 

方式设置的背景图片的大小,x轴会和盒子一样的宽，但是y轴由于默认为auto，所以图片原来比例还在只是超出部分会被隐藏
background-size：cover;---把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉。
当为百分比的时候，100%和100%，100%也会显示不一样的效果：
background-size:这个属性有两个值，第一个值为x轴方向的缩放比例或者px,第二个值为y轴方向的缩放比例或者px，如果只写一个值，则第二个值默认为auto(根据图片原来的比例，以及现有的宽度，来确定高度)
比方说：你有一张长宽比例为4:3的图片，有一个width:100px;height:50px;的盒子(也就是长宽比例为2:1)。
background-size:100%
100%;这种方式设置完背景图片的大小后，会完全铺满整个盒子，并且背景图片的比例会因此改变为2:1
background-size:100%;这种方式设置的背景图片的大小,x轴会和盒子一样的宽，但是y轴由于默认为auto，根据上面的理论计算得背景图片的高度为300px,但是盒子只有50px高，超出的部分隐藏，所以看两种写法的效果自然就不一样啦。
第一种效果你一定会看到完整的背景图片，但是有可能被挤压(失去图片原来的比例)
第二种效果你不一定能看到完整的图片，但是图片的比例没有发生变化。
![在这里插入图片描述](https://img-blog.csdnimg.cn/d8abdad317ea4c23b580e6848f5d5204.png)

## Background
1.  scroll是窗口内容滚动图片也跟着滚动，所以图片与其他内容相对静止。
    2.fixed是窗口内容滚动图片不滚动，所以图片与其他内容相对滚动。
    3.这个设置针对body的背景来说很有意义，其他情况下，默认都是scroll。
background: url(/static/images/home/t-bar.png) no-repeat scroll center
//no-repeat是图片引用在没沾满区域的时候不会重复使用来沾满也可以no-repeat top
center
background恰好放大到最小能覆盖显示窗口的尺寸，可以通过background-size：cover来实现；图片居中可以通过background-position：center来实现。
~@的使用
background-image: url('~@static/images/bigScreen/zs.png');
选择属于其父元素的首个子元素的每个 <p> 元素，并为其设置样式：
```javascript
p:first-child{ background-color:yellow;}
background: no-repeat url('/static/images/menu/menu_bg.png');
(background-size: cover;background-repeat: no-repeat;)
```
## bI:linear-gradient 线性颜色渐变，radial-gradient 圆性渐变
CSS 语法
```javascript
background-image: linear-gradient(direction, color-stop1, color-stop2,
...);
```
以下实例演示了从头部开始的线性渐变，从红色开始，转为黄色，再到蓝色:
```javascript
#grad { background-image: linear-gradient(red, yellow, blue); }
```
定义与用法：
linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。
创建一个线性渐变，需要指定两种颜色，还可以实现不同方向（指定为一个角度）的渐变效果，如果不指定方向，默认从上到下渐变。
```javascript
/* 从上到下，蓝色渐变到红色 */
linear-gradient(blue, red);
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);
/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);
/*
从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束
*/
linear-gradient(0deg, blue, green 40%, red);
从左到右：
background-image: linear-gradient(
        to right,
        blue,
        green
      );
```
例子:
```javascript
background: radial-gradient(220% 105% at top center, rgb(82, 81, 81)
10%, #000035 40%, #0b2570 65%, #0070aa);
  background: linear-gradient(
    to top left,
    rgb(242, 246, 253),
    rgb(209, 223, 245),
    rgb(242, 246, 253),
    rgb(199, 206, 218)
  );
background: linear-gradient(
    to right,
    rgb(242, 246, 253),
    rgb(235, 240, 248),
    rgb(242, 246, 253)
  );
```
## border
```javascript
border-style 值:
dotted: 定义一个点线边框 dashed: 定义一个虚线边框 solid: 定义实线边框
double: 定义两个边框。 两个边框的宽度和 border-width 的值相同
groove: 定义3D沟槽边框。效果取决于边框的颜色值
ridge: 定义3D脊边框。效果取决于边框的颜色值
inset:定义一个3D的嵌入边框。效果取决于边框的颜色值
outset: 定义一个3D突出边框。 效果取决于边框的颜色值
```
## box-sizing
box-sizing规定两个并排的带边框的框：属性允许您以特定的方式定义匹配某个区域的特定元素。
例如，假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为
"border-box"。这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。
```javascript
box-sizing: content-box|border-box|inherit;
+---------+------------------------------------------------------------+
| cont    | 这是由 CSS2.1 规定的宽度高度行为。                         |
| ent-box |                                                            |
|         | 宽度和高度分别应用到元素的内容框。                         |
|         |                                                            |
|         | 在宽度和高度之外绘制元素的内边距和边框。                   |
+=========+============================================================+
| bor     | 为元素设定的宽度和高度决定了元素的边框盒。                 |
| der-box |                                                            |
|         | 就是说，为元素                                             |
|         | 指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。 |
|         |                                                            |
|         | 通过从已设定                                               |
|         | 的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。 |
+---------+------------------------------------------------------------+
| inherit | 规定应从父元素继承 box-sizing 属性的值。                   |
+---------+------------------------------------------------------------+
```
## box-shadow
```javascript
box-shadow: *h-shadow v-shadow blur spread color* inset;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/b8bf167cbfe441d09e2bc8849de08127.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e384dc10a2dd4091a94447cc66d46c8a.png)

box-shadow:0px 3px 5px 7px rgb(96 98 102)　　　
水平0 向下偏移3px 阴影的模糊度5px 阴影的范围向四周7px
## clear:both
![在这里插入图片描述](https://img-blog.csdnimg.cn/adfeaaf95dd84612b9cc81b6798880b4.png)

当给左边栏设置float：left后他就部分脱离普通文档流了
此时侧边覆盖在底部栏的左边之上，但是我们想让底部栏位于侧边栏的上面此时我们只需要设置底部栏clear:both样式即可清除侧边栏对底部栏的浮动影响到达下面
![在这里插入图片描述](https://img-blog.csdnimg.cn/8ab18a8672b8413fa45f792b6845ca55.png)

在底部栏之下的div也可以随着底部栏一起进行正常的文档流排布
clear:both并不是清除浮动，而是清除浮动所造成的影响，浮动的盒子依旧是部分脱离文档流的。
而clear的取值是left还是right,在我看来是取决于想要低于的那个浮动盒子的浮动方向。而both的取值，则会低于所有在在它之前的任何浮动盒子
## /deep/
可以让某个样式作用的更深影响齐子组件的样式就可以用/deep/
配合<style lang="less" scoped>使用时在其中可以修改组建如element-UI的样式 但是不会影响到其他页面
```javascript
/deep/ .el-calendar__body {
   padding-bottom: 16px;
}
/deep/ .el-calendar .el-calendar__header {
   display: none;
}
>>> 等同于/deep/
```
## Fit-content
Width: fit-content
可以让div的宽度根据内部元素适应，也就是刚好包裹住内部元素的宽度
但是此时width不能再设置固定值了不然会冲突
## float
float的原始作用是为了实现文字环绕的作用，可以理解为部分脱离文档流。
CSS中说脱离文档流是指盒子从普通的布局排版中拿出来，其他盒子进行放置时，会当其不存在而进行布局。而脱离文档流分为两种
-   完全脱离文档流：例如position:absolute，使用绝对定位的盒子，其他盒子无论是其本身还是里面的任何元素都会无视这个绝对定位的盒子进行布局。
-   部分脱离文档流：即float盒子，使用float属性后，其他block盒子会无视float盒子进行布局，但是其他盒子内的inline元素和inline-block元素依旧会为这个浮动的盒子让出位置。
## ：global 全局
```javascript
:global .el-pagination {
      margin-top: -5px;
}
```
配合less在一定的父组件级下使用可以修改组建如element-UI的样式，但是又不会影响其他页面
要配合<style lang="less" module>使用
## height calc()函数
常常会遇到头部高度是40px，而内容页是除去头部，占满视窗的整个高度，有时候是用js来处理，现在用css的calc是非常方便的:
```javascript
.container{
    height: calc(100% - 40px); //注：减号前后要有空格，否则很可能不生效！！
}
```
只需设置样式使用calc() 函数，它支持 "+", "-", "*", "/" 运算；
扩展： vh：相对于视口的高度。视口被均分为100单位的vh
注意：
运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
任何长度值都可以使用calc()函数进行计算；
calc()函数使用标准的数学运算优先级规则；
它支持 "+", "-", "*", "/" 运算
## Hover
```javascript
.river-title
     .arrow-left
     span {{'返回上一级'}}
CSS
.river-title:hover {
color #03d5fb
}
.river-title:hover>.arrow-left {
    border-top: 1px solid  #03d5fb !important;
    border-left: 1px solid  #03d5fb  !important;
}
Stylus
.river-title
        cursor pointer
        &:hover
            color #03d5fb
            >.arrow-left
                border-top: 1px solid  #03d5fb
                border-left: 1px solid  #03d5fb
```
## inherit 关键字
inherit 关键字指定一个属性应从父元素继承它的值。
inherit 关键字可用于任何 HTML 元素上的任何 CSS 属性
```javascript
.extra span
{
color: inherit;
}
```
设置此代表span的color属性会继承.extra的color属性 其余的不变
## @media 查询
实例
如果文档宽度大于 300 像素则修改背景颜色(background-color):
```javascript
@media screen and (min-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```
同理得min-width
## :nth-child() 选择器
规定属于其父元素的第二个子元素，且如果是 p，则设置 其样式：
(如果第二个子元素不是p标签就不会生效) 还可以搭配 class id选择器使用
```javascript
.han:nth-child(2)
p:nth-child(2)
{
    background:#ff0000;
}
```
`:nth-child(*n*)` 选择器匹配属于其父元素的第 N 个子元素，不论元素的类型。
*n* 可以是数字、关键词或公式。  
Odd 和 even  
是可用于匹配下标是奇数或偶数的子元素的关键词（第一个子元素的下标是
1）。在这里，我们为奇数和偶数 p 元素指定两种不同的背景色：
```javascript
p:nth-child(odd)
{
background:#ff0000;
}p:nth-child(even)
{
background:#0000ff;
}
```
使用公式 `(*an* + *b*)`。描述：表示周期的长度，n 是计数器（从 0 开始），b
是偏移值。
在这里，我们指定了下标是 3 的倍数的所有 p 元素的背景色：
```javascript
p:nth-child(3n+0)
{
background:#ff0000;
}
```
## last-child & first-child
```javascript
.parant > .status-center:last-child {
        .bar-item {
            border-width: 0 !important;
        }
    }
```
## transition
> 属性是一个简写属性，用于设置四个过渡属性：
  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **值**                                                                                                 **描述**
  ------------------------------------------------------------------------------------------------------ ---------------------------------------------------
  [*transition-property*](https://www.w3school.com.cn/cssref/pr_transition-property.asp)                 规定设置过渡效果的 CSS 属性的名称。
  [*transition-duration*](https://www.w3school.com.cn/cssref/pr_transition-duration.asp)                 规定完成过渡效果需要多少秒或毫秒。
  [*transition-timing-function*](https://www.w3school.com.cn/cssref/pr_transition-timing-function.asp)   规定速度效果的速度曲线。
  [*transition-delay*](https://www.w3school.com.cn/cssref/pr_transition-delay.asp)                       定义过渡效果何时开始。（延迟多久）
  ----------------------------------------------------------------------------------------------------------------------------------------------------------
#### 默认值分别为：all 0 ease 0 
改变多个css属性的过渡效果时：
```javascript
a{ transition: background 0.8s ease-in 0.3s,color 0.6s ease-out 0.3s;}
-   transition-property
transition-property: none |all |property;
```
值为none时，没有属性会获得过渡效果，值为all时，所有属性都将获得过渡效果，值为指定的css属性应用过渡效果，多个属性用逗号隔开
-   transition-duration
```javascript
transition-duration：time;
```
该属性主要用来设置一个属性过渡到另一个属性所需的时间，也就是从旧属性过渡到新属性花费的时间长度，俗称持续时间
-   transition-timing-function
```javascript
transition-timing-function：linear| ease| ease-in| ease-out|
ease-in-out| cubic-bezier(n,n,n,n);
```
该属性指的是过渡的"缓动函数"。主要用来指定浏览器的过渡速度，以及过渡期间的操作进展情况，解释下：
注意：值cubic-bezier(n,n,n,n)可以中定义自己的值，如 cubic-bezier(0.42,0,0.58,1)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2c8a25e2783948e1aa12cb13732addf4.png)

#### transform
尽可能在浏览器能高效实现的属性上添加过渡和动画。
解释：
见[*本文*](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)，在可能的情况下应选择这样四种变换：
-   transform: translate(npx, npx); //移动前面是左右偏移
    后面是上下如果只有一个参数就是左右偏移 或者translateY(),translateX()
-   transform: scale(n); //缩放大小 scale(1.5)
-   transform: rotate(ndeg); 旋转度数
-   opacity: 0..1; //透明度
典型的，可以使用 translate 来代替 left 作为动画属性。
示例：
```javascript
**.box** {
transition: transform **1s**;
}
**.box**:hover {
transform: translate(**20px**); /* move right for 20px */
}
```
## Transparent 透明
CSS3中，transparent被延伸到任何一个有color值的属性上。
画一个三角形？
```javascript
.a{
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent #0099CC transparent transparent;
    /*设置四边只有一边的border显示其他都为透明*/
    transform: rotate(90deg); /*顺时针旋转90°*/
}
<div class="a"></div>
```
## transparent
transparent 它代表着全透明黑色，即一个类似rgba(0,0,0,0)这样的值。  
例如在css属性中定义：background:transparent，意思就代表背景透明。  
实际上background默认的颜色就是透明的属性，所以写和不写都是一样的。  
**transparent一般使用场景：**
如果一个元素覆盖在另外一个元素之上，而你想显示下面的元素，这时你就需要把上面这个元素的background设置为transparent CSS3中，transparent被延伸到任何一个有color值的属性上  
例子：
```javascript
<style>
.dom {
    color: transparent;
    border: 1px solid transparent;
    background: transparent;
}
</style>
<div class="dom">背景，文字颜色，border透明</div>
```
## vw属性
使用vw属性，他是参考整个viewport（视窗）的宽度【[vw 宽、vh高、vmin、vmax]{.underline}是css3新属性，支持主流浏览器且IE10以上】
```javascript
 width: 20vw;
 height: 20vw;
```
## zoom
代表缩放比例zoom：normal
| [*<number>*](http://www.w3chtml.com/css3/values/numeric/number.html) | [*<percentage>*](http://www.w3chtml.com/css3/values/other/percentage.html)
**normal： zoom: normal**
使用对象的实际尺寸。
**[*<number>*](http://www.w3chtml.com/css3/values/numeric/number.html)：
zoom: 5**
用浮点数来定义缩放比例。不允许负值
**[*<percentage>*](http://www.w3chtml.com/css3/values/other/percentage.html)：
zoom: 500%**
用百分比来定义缩放比例。不允许负值
```javascript
div{
  width: 100px;
 
  height: 100px;
 
  zoom: 1;
}
```
## 空格被读取
```javascript
style="white-space: pre;"
<th style="white-space: pre;">指 标</th>
```
输出： 指 标
## 水平垂直居中
```javascript
.div {
transform: translate(-50%, -50%);
Position: absolute;
Top: 50%;
Right: 50%
}
```
## > + ~
> [*子元素选择器（'>'）*](https://www.cnblogs.com/wenxuehai/p/11449430.html#_label2)
>
> [*相邻兄弟选择器（'+'）*](https://www.cnblogs.com/wenxuehai/p/11449430.html#_label3)
>
> [*兄弟选择器（'~'）*](https://www.cnblogs.com/wenxuehai/p/11449430.html#_label4)
**群组选择器（','）**
```javascript
h1, h2 {
  color: red;
}
```
**后代选择器（空格）**
> /* 表示 h1 下面的所有 span 元素，不管是否以 h1 为直接父元素 */
1.  h1 span {}
**子元素选择器（'>'）**
选择直接子元素
```javascript
 /* 表示 h1 下面的所有以 h1 为直接父元素的 span 元素，注意必须以 h1为直接父元素 */
  h1 > span {
   
  }
```
**相邻兄弟选择器（'+'）**
选择紧接在另一个元素后的元素，而且二者有相同的父元素。  
** 兄弟选择器（'~'）**  
选择在某元素之后的所有兄弟元素，不一定要紧跟在后面，但必须得是相同父元素，即必须是同一级元素。
```javascript
/* A之后的所有B元素，不一定要紧跟在A后面、相同父元素 */
A ~ B
input:checked ~ button { background-color: **#69C**;}
代表为checked属性的input后面的所有button
```
**CSS 属性选择器**  
[**https://www.w3school.com.cn/css/css_selector_attribute.asp**](https://www.w3school.com.cn/css/css_selector_attribute.asp)
## **3D翻折**perspective
transform: **perspective**(800**px**) **rotateY**(50**deg**); //
若是父元素应用了透视perspective xx px,
子元素的transform属性值可为perspective(yy px),
yy值越小，则焦距越小，呈现的效果就是类似广角的效果，若值越大，则焦距越远，元素看起来就像在远处一样，一般yy小于xx值，过大的yy值没有太大区别。（增加3d旋转的效果）
## **文字类**
### 文字渐变
```javascript
.value
font-size 28px
-webkit-background-clip text
color transparent
background-image linear-gradient(to right, red, blue)
```
### writing-mode
writing-mode vertical-lr 字体垂直排布  
**文字方向 | text-orientation**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/84cff77d10ce4d2b85b1b7f1e7c3aab3.png)

### letter-spacing  
设置元素的字母间距：  
```javascript
h1{ letter-spacing: 2px ;}
h1{ letter-spacing: -3px ;}
```
### text-decoration
```javascript
h1 {text-decoration:overline}
h2 {text-decoration:line-through}
h3 {text-decoration:underline}
h4 {text-decoration:blink}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/01170970b70a44e5a9a7ce6d9e09717a.png)

```javascript
  -----------------------------------------------------------------------
  **值**           **描述**
  ---------------- ------------------------------------------------------
  none             默认。定义标准的文本。
  underline        定义文本下的一条线。
  overline         定义文本上的一条线。
  line-through     定义穿过文本下的一条线。
  blink            定义闪烁的文本。
  inherit          规定应该从父元素继承 text-decoration 属性的值。
  -----------------------------------------------------------------------
```
### sans-serif
定义font-family时,最好在最后加一个sans-serif,这样如果所列出的字体都不能用，则默认的sans-serif字体能保证调用;适配浏览器和操作系统
### 字体族
#### [强制] font-family 属性中的字体族名称应使用字体的英文 Family Name，其中如有空格，须放置在引号中。
解释：
所谓英文 Family Name，为字体文件的一个元数据，常见名称如下：
示例：
```javascript
h1 { font-family: "Microsoft YaHei";}
  ------------------------------------------------------------------------
  **字体**                 **操作系统**    **Family Name**
  ------------------------ --------------- -------------------------------
  宋体 (中易宋体)          Windows         SimSun
  黑体 (中易黑体)          Windows         SimHei
  微软雅黑                 Windows         Microsoft YaHei
  微软正黑                 Windows         Microsoft JhengHei
  华文黑体                 Mac/iOS         STHeiti
  冬青黑体                 Mac/iOS         Hiragino Sans GB
  文泉驿正黑               Linux           WenQuanYi Zen Hei
  文泉驿微米黑             Linux           WenQuanYi Micro Hei
  ------------------------------------------------------------------------
引入字体
@font-face {
    font-family: "Bebas Neue";
    src: url('./assets/font/BebasNeue-Regular.ttf');
    font-weight: normal;
    font-style: normal;
}
```
## CSS 问题***
### flex和overflow一起用的问题
```javascript
div class="box"
div class="boxs"
div class="boxs"
div class="boxs"
div class="boxs"
.box
    display flex
    overflow hidden
    width 100px
    height 100px
    .boxs
        width 50px
        height 100px
```
此时div不会因为过大而隐藏而是会伸缩自适应宽度并显示每一个  
![在这里插入图片描述](https://img-blog.csdnimg.cn/5b340153eb76402db27dfd7e9ee13204.png)

加上 flex none就可以了  
```javascript
.boxs
    flex none
    width 50px
    height 100px
```
### 块级元素，行内块元素，行内元素
**行内元素：**
没有宽高，margin-top,margin-bottom它的padding-top，padding-bottom不会影响其他元素（块级，行内都包括）的布局，但是会生效（设置背景色会看到块变大了但是没有影响其他元素布局）。其他元素只会受其内部内容的影响，比如文字  
**行内块元素：**  
行内元素会受父元素的宽度影响被挤到第二行，其可以受**text-align: center**影响而左右居中。
关于[同一DIV内，两个行内块元素不对齐：的解决方案](https://www.codeprj.com/blog/7b5e851.html)设置一个vertical-align:top,就可以对齐。因为前面的盒子没有任何字符，此时它的基线就是它的底边缘，后面的盒子有文字，所以该盒子的基线就是文字的基线，二者基线对齐，现成如此效果。如果把第二个盒子line-height:0，此时文字基线的位置，就是文字的垂直中心，所以这就是为什么出现这个问题的原因，通过改变对齐方式可以达到对齐。  
行内块元素之间的空隙：  
出现空白间隙的原因是，元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，所以元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。    
解决办法：  
一、去除元素间的空白  
通过将上一个元素的闭合标签与下一个元素的开始标签写在同一行，可以去除元素间的空白，或者将两个inline-block元素间加上空白注释，或者不写元素的闭合标签等  
二、 **父元素（行内块元素的父元素）** 设置font-size为0，子元素单独再设置字体大小  
三、设置margin-right为负值  
用margin负值来抵掉元素间的空白，不过margin负值的大小与上下文的字体和文字大小相关，并且同一大小的字体，元素之间的间距在不同浏览器下是不一样的，如：font-size:16px时，Chrome下元素之间的间距为8px,而Firefox下元素之间的间距为4px。所以这个方法并不通用，也相对比较麻烦，因此不太推荐使用。  
四、给inline-block元素加float或者flex  
让行内块元素浮动起来，或者给父盒子加上display: flex;  
都可以解决空白间隙的问题，不过这样处理的三栏式布局也就没必要用inline-block啦。  
五、设置字符间距或单词间距  
这两个方法的原理有点像二所用的font-size，具体做法是给**父元素（行内块元素的父元素）**一个letter-spacing或者word-spacing的负值，子元素再调整为0即可，具体使用字符间距还是单词间距其实大同小异。  
### padding，margin
padding是算在宽高内的，div实际的高度=height+padding-top+padding-bottom  
margin是不算在宽高内的  
如果margin有三个值，第一个值表示上margin值，第二个值表示左右margin的值，第三个值表示下margin的值。  
例如：margin:10px 20px 30px; 就等于 margin:10px 20px 30px 20px;   
两个盒子的上下margin最后产生的是那个大的margin，也就是 magin 16+20=20  
### 子元素设置margin-top，父元素也受影响
父级的第一个块级（不包括行内块）子元素设置的margin-top（left，right，bottom不会影响）影响，margin-top就不会在子元素内生效，而是在父元素上生效一起往下移动。  
解决办法给父元素加上其中一个  
```javascript
padding-top: 1px; // 必须是paddingTop  
border: 1px solid red; // 必须包含border-top
overflow: hidden;
```
这个问题发生的原因是根据规范，一个盒子如果没有上补白(padding-top)和上边框(border-top)，那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。  
再说了白点就是：父元素的第一个子元素的上边距margin-top如果碰不到有效的border或者padding.就会不断一层一层的找自己  
"领导"(父元素，祖先元素)的麻烦。只要给领导设置个有效的border或者padding就可以有效的管制这个目无领导的margin防止它越级，把自己的margin当领导的margin执行。  
对于垂直外边距合并的解决方案上面已经解释了，为父元素例子中的middle元素增加一个border-top或者padding-top即可解决这个问题。  
### 清除浮动坍塌方法
1.  在使用float元素的父元素结束前（在其父元素下）加一个高为0宽为0且有clear:both样式的div
    (要放在其父元素结束前的位置)  
2.  在使用float元素的父元素添加overflow:hidden;
### 文本省略以及换行
**单行文本**
```javascript
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
值得注意的是文本省略必须要这只width，但是当我们在flex布局下，设置要省略文字的div的flex:
1;此时没有定义width则省略会失效，此时只需要设置
```javascript
**flex**: 1;
**width**: 0; // 设置width 为 0
```
即可。或者在其下嵌套一个div 设置width: 100%在设置省略属性即可
设置width为0这种情况如果其display也是flex则也不会生效，所以还是得使用再嵌套一个div的方法
**自动换行**
```javascript
display: -webkit-box;
-webkit-box-orient: vertical;
word-break: break-all;
```
**多行文本**
多行文本超过部分显示省略号，并且兼容数字或英文不换行问题
```javascript
white-space: normal;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
word-break: break-all;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/e72b6cc5ce4b46c2a39f579cea595f29.png)
## 解决flex space-bettwen最后一行问题
当一行是三个时：
给父元素增加一个after伪类就好了，注意不要设置高度
这样当最后一行只有一个的时候
伪类和最后一项就可以被分到两边，最后一行有两个的时候就可以像三个一样从左到右布局，最后一行有三个时，因为伪类没有高度下面也不会被撑开
当一行大于三个时同样的 只需要在写几个没有高度的div就好了
```javascript
.check-box::after {
    content: '';
    width: 192rpx;
}
```


# stylus
安装 npm install stylus --save npm install stylus-loader --save
有时会报错 卸载 stylus-loader 安装npm install stylus-loader@3.0.2
--save
## 选择器
,和换行不缩进一样
![在这里插入图片描述](https://img-blog.csdnimg.cn/fff307472d2c4ae8a838bd8f8fe1bc24.png)

字符&指向父选择器。如果父级是两个或者多个则都生效
![在这里插入图片描述](https://img-blog.csdnimg.cn/4ac20509ee7e4b8a9b68ed3494c6ebc4.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/59faae7e07e44ebf827e8938a72b36e2.png)

```javascript
.detail-line-header
        display: flex
        >div:nth-child(1)
            flex 1.2
```
## 选择器插值
![在这里插入图片描述](https://img-blog.csdnimg.cn/3ea0f181381f429fac82e52fa1f758b5.png)

## 变量
![在这里插入图片描述](https://img-blog.csdnimg.cn/0e8c2f3dbe6d4850940db4bb86c7c362.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b209f90622b43a187076dda419e4922.png)

## 运算：
![在这里插入图片描述](https://img-blog.csdnimg.cn/b80e0c0e8d1546289ae7e01b4709f81d.png)

```javascript
15px + 2 // 17px
a = 15%
unit(a, px) // 15px
当在属性值内使用/时候，你必须用括号包住。否则/会根据其字面意思处理（支持CSS的line-height）。
font: (14px/1.5);
```
## 迭代
![在这里插入图片描述](https://img-blog.csdnimg.cn/d2f098f38c614ad5af35e7d7686602a3.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/82a58b083f084b5b98367478f40cff90.png)


## @keyframes动画
![在这里插入图片描述](https://img-blog.csdnimg.cn/22e67be2e6e048a19f0e9e62617d4eac.png)

## @font-face
![在这里插入图片描述](https://img-blog.csdnimg.cn/53e6da6cc2804d24ab51e4c085c83913.png)


## 方法与参数
有参数的：
```javascript
border-radius(val)
-webkit-border-radius: val
-moz-border-radius: val
border-radius: val
button
border-radius(5px);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/7c9a13ace17d48a8b4812c6e9d6443b6.png)

无参数的：
```javascript
border-radius()
-webkit-border-radius: arguments
-moz-border-radius: arguments
border-radius: arguments
button
border-radius: 5px 10px;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/50b8f79b532e47f8bff52ff8c2baf43d.png)

## 继承@extend
```javascript
.message {
padding: 10px;
border: 1px solid #eee;
}
.warning {
@extend .message;
color: #E2E21E;
}
```
继承message的样式
url 内不能有中文不然会报错
## 详细操作
https://www.zhangxinxu.com/jq/stylus/extend.php
# Less
## 嵌套写法
```javascript
.xkd{
font-size: 14px;
p{
line-height: 25px;
span{
color: #ccc;
}
}
}
```
可以看到，标签选择器 P 前面没有加 & 符号，所以这个标签选择器 P 被解析为
.xkd 选择器的后代。
## & 符号的使用
```javascript
.xkd{
&one{
    font-size: 12px;
}
&:hover{
    color: #fff;
}
}
编译成 css 代码：
.xkdone {
    font-size: 12px;
}
.xkd:hover {
    color: #fff;
}
```
上面代码中，one 前面添加了一个 &
符号，这个符号就表示父选择器本身，所以解析后为.xkdone。当然 :hover
伪类前面的 & 符号也是同理。
重复引用父选择器
通过使用 & 符号，可以重复引用父类选择器。
示例：
例如下面这段 Less 代码，如果我们希望每个选择器名的前缀都为
top，可以像下面这样简写：
```javascript
.xkd{
    &-one{ /* .xkd-one*/
        font-size: 14px;
    }
    &-two{
        font-size: 16px;
    }
    &-three{
        font-size: 18px;
    }
}
```
除此之外，还可以同时使用多个 & 符号，并使用其他运算符连接起来：
```javascript
.xkd{
    &&-one{ /*.xkd.xkd-one*/
        font-size: 14px;
    }
    &,&-two{ /*.xkd,.xkd-two */
        font-size: 16px;
    }
    &, &er{ /* .xkd,.xkder*/
        font-size: 18px;
    }
}
```
更改选择器顺序
什么是更改选择器顺序呢，就是有些时候可能需要将内层选择器放在父选择器之前，此时我们可以将
& 放在当前选择器后面来完成。
示例：
例如下面这段代码，我们希望 .xkd 选择器位于 .nav 选择器之前，可以在 .xkd
选择器的后面加一个 & 符号：
```javascript
.nav{
    font-size: 14px;
    .xkd &{ /* .xkd .nav*/
        color: #fff;
    }
}
```
## 变量
![在这里插入图片描述](https://img-blog.csdnimg.cn/abcd4c74962f4cbe82f98cc37bf046ba.png)

## 字符串拼接和变量计算
```javascript
// 可以对高度、宽度、角度进行计算；
@img:'./img/';
@k:100px;
.box1{
    width:@k/2; // @k + @k @k -5px @k * @k
    height:@k;
    background:url("@{img}1.png")
}
```
## 混合
![在这里插入图片描述](https://img-blog.csdnimg.cn/80552ec46a2546b88fb5cec0c22feebd.png)

## 混合 = 函数 
```javascript
//定义一个函数；
.test(@color:red,@size:14px){
    background: @color;
    font-size:@size;
}
.box1{
//  不传参，使用默认的；
    .test()
}
.box2{
//  给函数传参；
    .test(@color:green,@size:30px)
}
```
## 匹配
```javascript
.sjx(@_,@color,@size){
    width: 0;
    height:0;
    border:@size solid @color;
    border-color:transparent;
}
//左边三角形
.sjx(l,@color,@size){
    border-left-color:@color;
}
//上边三角形
.sjx(t,@color,@size){
    border-top-color:@color;
}
//右边三角形
.sjx(r,@color,@size){
    border-right-color:@color;
}
//左边三角形
.sjx(b,@color,@size){
    border-bottom-color:@color;
}
//这里匹配调用
.box{
    .sjx(r,red,20px)
}
```
## 颜色函数
```javascript
@color:red;
background:lighten(@color,50%);
background:darken(@color,50%);
background:saturate(@color,50%); // desaturate spin mix
```
