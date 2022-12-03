<!--
 * @Author: mjh
 * @Date: 2022-11-19 16:58:15
 * @LastEditors: mjh
 * @LastEditTime: 2022-12-03 14:12:55
 * @Description: 
-->
@[TOC](目录)

# Unt跳转
## **uni.navigateTo(OBJECT)**
保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。OBJECT参数说明：参数类型必填说明urlString是需要跳转的应用内非
tabBar 的页面的路径 ,
路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；
不可到tabBar 页
```javascript
uni.navigateTo({
    url: 'test?id=1&name=uniapp'
});
```
## **uni.redirectTo(OBJECT)** 
关闭当前页面，跳转到应用内的某个页面。OBJECT参数说明参数类型必填说明urlString是需要跳转的应用内非
tabBar的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；不可到tabBar页
```javascript
uni.redirectTo({
    url: 'test?id=1' // 传递参数 id，值为1
});
```

## **uni.reLaunch(OBJECT)**
关闭所有页面，打开到应用内的某个页面。OBJECT参数说明：参数类型必填说明urlString是需要跳转的应用内页面路径,路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；不可到tabBar页
```javascript
uni.reLaunch({
    url: 'test?id=1'
});
```
## **uni.switchTab(OBJECT)**
跳转到 tabBar 页面，并关闭其他所有非 tabBar页面。  
OBJECT参数说明：参数类型必填说明urlString是需要跳转的 tabBar页面的路径(需在 app.json 的 tabBar 字段定义的页面)，路径后不能带参数
# Uview 
## Form表单
显示必填*字符号 :required="true"  
Rules 必须在onReady赋值  
```javascript
uFormRef.value.setRules(data.rules)
```

## upload
显示已经上传的图片需要绑定fileList属性
```javascript
:file-list="sitePhotosList"
```
[格式如下]{.underline}

```javascript
  fileList: [{
  url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
  error: false,
  progress: 100
}],
```

# 报错问题
![在这里插入图片描述](https://img-blog.csdnimg.cn/b49515d57b8c446ebe6032be1b33e000.png)

解决：
定位到对应文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/fa53a2ca3a2747a9b393307fa1172b2d.png)
修改此句为：
```javascript
[v: string]: string | number | undefined
```
