<!--
 * @Author: mjh
 * @Date: 2022-11-19 16:58:15
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-29 17:43:23
 * @Description: 
-->
@[TOC](目录)

# Unt跳转
## **uni.navigateTo(OBJECT)**
保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。OBJECT参数说明：参数类型必填说明urlString是需要跳转的应用内非
tabBar 的页面的路径 ,
路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；
不可到tabBar 页
uni.navigateTo({
url: 'test?id=1&name=uniapp'
});
## **uni.redirectTo(OBJECT)** 
关闭当前页面，跳转到应用内的某个页面。OBJECT参数说明参数类型必填说明urlString是需要跳转的应用内非
tabBar的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；不可到tabBar
页
uni.redirectTo({
    url: 'test?id=1' // 传递参数 id，值为1
});
## **uni.reLaunch(OBJECT)**
关闭所有页面，打开到应用内的某个页面。OBJECT参数说明：参数类型必填说明urlString是需要跳转的应用内页面路径
,
路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；不可到tabBar
页
uni.reLaunch({
    url: 'test?id=1'
});
## **uni.switchTab(OBJECT)**
跳转到 tabBar 页面，并关闭其他所有非 tabBar
页面。OBJECT参数说明：参数类型必填说明urlString是需要跳转的 tabBar
页面的路径(需在 app.json 的 tabBar 字段定义的页面)，路径后不能带参数
# Uview 
## Form表单
显示必填*字符号
:required="true"
Rules 必须在onReady赋值
uFormRef.value.setRules(data.rules)
## upload
显示已经上传的图片需要绑定fileList属性
:file-list="sitePhotosList"
[格式如下]{.underline}
  fileList: [{
  url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
  error: false,
  progress: 100
}],
# 报错问题
![文本
中度可信度描述已自动生成](media/image1.png){width="5.768055555555556in"
height="2.158333333333333in"}
解决：
定位到对应文件
![文本 描述已自动生成](media/image2.png){width="5.768055555555556in"
height="1.7506944444444446in"}
修改此句为：
[v: string]: string | number | undefined
