@[TOC](目录)
# Html
## 滚动条
```javascript
/*整个滚动条*/
::-webkit-scrollbar {
    width:8px;
    height:8px;
}
/*滚动滑块*/
::-webkit-scrollbar-thumb {
    background-color:#c2c2c2;
    background-clip:padding-box;
    border:1px solid #979797;
    height:8px;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    border:1px solid #636363;
    background-color:#929292;
}
```

## Iframe：
```javascript
<iframe class="code-view" name="code" scrolling="no"
src="https://login.dg-work.cn/qrlogin/webAppLogin.htm?APP_NAME=huangyan_dingoa&protocolKey=bd685824-b992-4a9b-9c38-1684e527b4c0&protocol=oauth2&BACK_URL=https://huangyan.fpi-inc.site:32080/cas/login&scope=get_user_info&authType=QRCODE&embedMode=true"></iframe>
```
刷新iframe内网页：
```javascript
document.frames('code').location.reload()
scrolling="no" 取消滚轮
```

## Input Select 
![在这里插入图片描述](https://img-blog.csdnimg.cn/d3435abcdc8a42e5975a3959192a8264.png)

## label 
#### 有文本标题的控件必须使用 label 标签将其与其标题相关联。
解释：
有两种方式：
1.  将控件置于 label 内。
2.  label 的 for 属性指向控件的 id。
推荐使用第一种，减少不必要的 id。如果 DOM结构不允许直接嵌套，则应使用第二种。
示例：
```javascript
<label>
    <input type="checkbox" name="confirm" value="on"> 
    我已确认上述条款
</label>
<label for="username">用户名：</label>
<input type="textbox" name="username" id="username">
```


## Video
```javascript
video.webm(poster="../../assets/img/home/back-default.png.png" src="../../assets/img/home/content.webm"    autoplay muted loop) //
// autoplay muted loop自动循环播放 poster默认背景图
controls如果出现该属性，则向用户显示控件，比如播放按钮。
object-fit fill //可以让视频自动适应空间
autoplay // 自动播放
controls // 视频控制器
poster // 视频未加载完成和未点击播放时的默认图片
muted // 三个结合可以做到自动循环播放（规定视频的音频输出应该被静音）
loop //如果出现该属性，则向用户显示控件，比如播放按钮。
```
## Element

### el-table
JS：
```javascript
el-table(:data="list"
    :style="{width: titleList[currentIndex].length*160 + 'px'}"
    :row-style="{color:'rgba(255,255,255,1)'}"
    :header-cell-style="headStyleFun"
    :header-row-style="{color:'rgba(255,255,255,0.6)'}"
     max-height="500")
    template(v-for="data,key in titleList[currentIndex]" )
        el-table-column( :key="key"
        :prop="keyList[currentIndex][key]"
        :label="data"
        :width="getWidth(data)")
             template( #default="scope" v-if="getSpeacialLine(data)")
              div( style="display: flex; align-items: center")
                span(style="margin-left: 10px") {{getSpeacialLineData(data,scope.row[keyList[currentIndex][key]])}}

currentIndex = 'bhcs'
titleList: {
   bhcs: ['序号', '项目内容', '牵头部门', '责任部门', '配合部门', '工作计划', '进展情况', '存在问题', '完成率', '更新日期'],
   mlhz: ['序号', '任务类别', '任务数', '已完成', '进行中', '完成比例']
},
keyList: {
   bhcs: ['xh', 'xmnr', 'qtbm', 'zrbm', 'phbm', 'gzjh', 'jzqk', 'czwt', 'wcl', 'ddyf'],
   mlhz: ['id', 'task_type', 'task_count', 'task_finished', 'task_underway', 'task_rate']
}
computed: {
    getWidth() {
        return function(val) {
            if (val === '进展情况') return 350
            if (val === '工作计划') return 200
            if (val === '任务类别') return 330
            if (val === '推进措施') return 200
            if (val === '支持事项') return 150
            if (val === '更新日期') return 135
            if (val === '序号') return 60
            if (val === '完成率') return 80
            return ''
        }
    },
    getSpeacialLine() {
        return function(val) {
            if (this.specialList.includes(val)) return true
            return false
        }
    },
    getSpeacialLineData() {
        return function(val, datas) {
            if (val === '完成率' || val === '完成比例') return datas + '%'
            if (val === '更新日期') return datas.slice(0, 10)
            if (val === '新增倾斜资金') return (datas || '--') + '万元'
            else return datas || '--'
        }
    }
}
```
TS：
```javascript
el-table(:data="list"
:style="{width:keyNameList.length*106 +318+'px'}"
:row-style="{color:'rgba(255,255,255,1)'}"
:header-cell-style="headStyleFun" // 返回样式
:cell-style="RowStyleFun"  // 返回样式
:header-row-style="headerRowStyle" // 返回样式 )
          el-table-column( prop="title" label="时间")
             template(v-for="data,key in keyNameList" :key="key")
                 el-table-column( :prop="keyCodeList[key]" :label="data")
                   template( #default="scope")
                       div( style="text-align: center;")
                         span {{ Number(scope.row[keyCodeList[key]]) ? Number(scope.row[keyCodeList[key]]).toFixed(2) : '--' }}
         el-table-column( prop="CBXM" label="超标项目" width='110')
             template( #default="scope" )
                 div( style="text-align: center;")
                         span {{ scope.row.CBXM || '--' }}
         el-table-column( prop="SZLB" label="水质类别" width='110')
             template( #default="scope" )
                 div( style="text-align: center;")
                         span {{ scope.row.SZLB || '--' }}
// table样式
const headStyleFun = () => {
   return 'background-color: rgba(255,255,255,0.06);border-bottom: none;font-size:16px;font-weight:bold;height:40px;padding:0 12px;text-align:center;'}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/694e89aa4dc746969cf1fe7edf54c77f.png)
```javascript
el-table(:data="pollutants" border size="mini" style="width: 100%"
:max-height="'260'" :header-cell-style="headStyleFun")
     el-table-column(v-for="item in colunms"  
:prop="item.prop" :label="item.label"
:min-width="item.minWidth"
:width="item.width" :key="item.label"
align="center" :sortable="item.sortable")
            template( #default="scope")
                template(v-if="item.label === '数据'")
                    span(:class="scope.row && scope.row.overProofFlag === '超标' ? 'table-value overProof': 'table-value'") {{ scope.row[item.prop] === 0 ? 0 : (scope.row[item.prop] ? scope.row[item.prop] : '--') }}
                template(v-else)
                    span {{ scope.row[item.prop] === 0 ? 0 : (scope.row[item.prop] ? scope.row[item.prop] : '--') }}
pollutants = []
const headStyleFun = () => {
            return 'background-color: transparent;border-bottom: 1px solid rgba(255,255,255,0.2);padding:4px 0px'
}
Colunms: [
    {
        prop: 'name',
        label: '监测项目',
        minWidth: 80
    },
    {
        prop: 'unit',
        label: '单位',
        minWidth: 55
    },
    {
        prop: 'lavelStr',
        label: '水质类别',
        width: 80
    },
    {
        prop: 'value',
        label: '数据',
        width: 60
    },
    {
        prop: 'limit',
        label: '标准值',
        width: 65
    },
    {
        prop: 'overProofFlag',
        label: '达标情况',
        width: 80
    }
]

样式：配合header-cell-style
    ::v-deep .el-table__body-wrapper
        overflow-x hidden !important
    // 隐藏横向滚动条
    ::v-deep .el-scrollbar__wrap
        overflow-x hidden
    ::v-deep .el-scrollbar__bar.is-vertical>div
        width 0
    ::v-deep .el-table, .el-table__expanded-cell
        background-color transparent
    ::v-deep .el-table tr
        border-right none
        background-color transparent!important
    ::v-deep .el-table th
        background-color transparent
    ::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell
        background-color transparent
    ::v-deep .el-table td, .el-table th.is-leaf
        border-bottom none
        border-right none
    ::v-deep
.el-table--border:after,.el-table--group:after,.el-table:before
        background-color transparent
    ::v-deep .el-table--border,.el-table--group
        border-color transparent
    ::v-deep .el-table--border th,.el-table--border
th.gutter:last-of-type
        border-bottom none
        border-right none
    ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td
        background-color transparent
    ::v-deep .el-table__header
        tr,td
            background transparent
    ::v-deep .el-table thead
        color $color
        font-weight 700
        font-size 14px
    ::v-deep .el-table
        color #ffffff
        font-size 14px
        font-weight 100
        border-right none
        overflow-x hidden !important
        ::v-deep .el-table__body-wrapper
            overflow-x hidden !important
        ::v-deep .el-table--scrollable-x
            overflow-x hidden !important
    ::v-deep .el-table__row .cell
        padding 0px
        display flex
        justify-content center
    // 表格滚动条改写
    ::v-deep .el-table__body-wrapper::-webkit-scrollbar
        width 6px
    ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb
        border-radius 6px
        height 50px
        background rgba(144,147,153,.3)
    ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track
        box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
        border-radius 6px
        background transparent
```
## 进度条流程
![在这里插入图片描述](https://img-blog.csdnimg.cn/5e6e73c3871e4a9d97553a44c0bf9590.png)

```javascript
el-scrollbar.process-box-scrollbar
    .process-box
        .right-boxs    
            .right-box(v-for="item, index in list" :key="index")
.left-line(:style="{'border-color': index===(list.length-1)? 'rgba(0,0,0,0)': '#00f5ff'}")
img.process-point(src="@/assets/images/antiEpidemic/process-point.png")
    .process-top-line
        .process-title {{item.siteName || '--'}}
        .process-time {{item.time || '--'}}
    .process-body
        .process-body-box
            img.process-img(src="@/assets/images/antiEpidemic/box-tranfor.png")
            .process-value {{item.volume || '--'}}
            .process-unit 箱
        .process-body-box
            img.process-img(src="@/assets/images/antiEpidemic/weight-tranfor.png")
            .process-value {{item.weight || '--'}}
            .process-unit kg
List: [
    {
        siteName: 'dasdas',
        weight: 16,
        volume: 54,
        time: '2015'
    }
]
    .process-box-scrollbar
        width: 520px;
        // height:560px;
        background-color: rgba(255,255,255,.06);
        border-radius: 8px;
        overflow-y: auto
        overflow-x: hidden
    .process-box
        width: 100%
        padding 20px 0 10px 32px
        display: flex
        .left-line
            width: 0px
            margin-top: 8px
            border-left: 2px dashed;
            border-color: #00f5ff;
            .process-point
                height: 16px
                width: 16px
                transform: translate(-9px, -5px)
                margin-bottom: 90px
        .right-boxs
            width: 90%
        .right-box
            position relative
            width: 100%
            padding-left: 16px
            padding-bottom: 16px
            .left-line
                position: absolute
                height: calc(100% - 7px)
                top 0px
                left: -8px
                border-left: 2px dashed;
                border-color: #00f5ff;
                .process-point
                    height: 16px
                    width: 16px
            .process-top-line
                display: flex
                justify-content: space-between
                .process-title
                    font-family: Microsoft YaHei;
                    font-weight: 700;
                    color: #ffffff;
                    font-size: 18px;
                .process-time
                    font-family: Microsoft YaHei;
                    color: #ffffff;
                    font-size: 16px;
            .process-body
                display: flex
                margin-top: 20px
                .process-body-box
                    display: flex
                    margin-right: 20px
                    margin-left: 32px
                    .process-img
                        width: 32px;
                        height: 30px;
                        margin-right: 12px
                        margin-top: 6px
                    .process-value
                        margin-right: 8px
                        font-family: Bebas Neue;
                        color: #03d5fb;
                        font-size: 40px;
                    .process-unit
                        margin-top: 10px
                        font-family: Microsoft YaHei;
                        color: rgba(255,255,255,.6);
                        font-size: 24px;
```
## el-date-picker
```javascript
element-plus
el-date-picker(
    type="month" // day，year
    value-format="YYYY-MM"
    @change="clickYear"
    v-model="times"
    style="width: 220px"
    :disabled-date="pickerOptions"
    placeholder="选择需求日期"
    clearable)
--------------------
pickerOptions: (time: Date) => {        
    return time.getTime() > Date.now()
},
```
组件内：
```javascript
:deep().el-pagination
    color #fff
:deep().el-pager li
    background-color transparent
    font-size 14px
:deep().el-pager li:hover
    color #03d5fb
:deep().el-pager li.active
    color #03d5fb
:deep().el-pagination .btn-prev
    background-color transparent
:deep().el-pagination .btn-next
    background-color transparent
:deep().el-pager li.btn-quicknext
    color #fff
:deep().el-pager li.btn-quickprev
    color #fff
:deep().el-pagination .btn-next
    color #fff
:deep().el-pagination .btn-prev
    color #fff
:deep().el-input__inner
    border 1px solid rgba(255,255,255, .1)
    background rgba(255,255,255, .1)
    color #fff
    font-size: 14px
    height 32px
    line-height: 32px
:deep().el-input__icon
    line-height: 32px
    height 32px
:deep().el-input
    width 240px
    height 28px
    margin-right 8px
:deep().timeChange .el-input__inner
    text-align left
input::-webkit-input-placeholder
    /* 修改字体颜色 */
    color: #909399;
    font-family:PingFangSC-Regular;
:deep().el-icon
    margin-top: 3px
```
app全局内：
```javascript
//修改picker__popper下拉文字提示样式
.el-picker__popper
    z-index 99999 !important
.el-date-picker
    background: #081d28 !important;
    border: 1px solid #2377b7;
.el-date-picker__header--bordered
    border-bottom: 1px solid #2377b7 !important;
.el-date-picker__header-label
    color: white !important
.el-picker-panel__body
    .el-icon
        color white !important
.el-picker-panel__content
    .el-month-table
        .disabled
            .cell
                background: #081d28 !important
                color: #333f46  !important
        .current
            .cell
                color: #398ee5 !important
        td
            .cell
                color: white !important
```
## el-carousel
![在这里插入图片描述](https://img-blog.csdnimg.cn/57e260a59b94475aa0bff65152c4f8df.png)

跳转轮播
```javascript
Template
el-carousel( height="280px" width="100%" direction="vertical"
:autoplay="true" indicator-position="none" arrow="never")
     el-carousel-item(v-for="item,index in getCarouselList(timeList)" :key="'carousel' + index" )
               .carousel-line(v-for="datas,ind in item" :key="'carousel-item'+ind")
                    .carousel-line-head
                        .head-name {{datas.name}}
                        .head-value {{datas.AQI}}
                        .head-box
                            .head-box-text AQI
```
Computed：
```javascript
getCarouselList() {
    return function(list) {
        var result = []
        for (var i = 0; i < list.length; i += 3) {
            result.push(list.slice(i, i + 3))
        }
        return result
    }
},
```
el-select 自定义样式
![在这里插入图片描述](https://img-blog.csdnimg.cn/9f7c6714da2946a39b09aa8c78cb589a.png)

```javascript
el-select.timeChange(v-model="selectedYear" size='mini'
:popper-append-to-body='false' @change='selectYear')
            el-option(v-for="item,index in yearList" :key="index"
:label="item.label" :value="item.value")
```
style
```javascript
:deep(.el-range-editor.el-input__inner)
    background transparent
    border none
    width 200px
:deep(.el-range-editor .el-range-input)
    background transparent
    color #fff
    font-size: 14px
    font-weight: bold
:deep(.el-date-editor .el-range__icon)
    display none
:deep(.el-range-separator)
    color #fff
:deep(.el-select)
    width: 120px
    // margin 0 10px
:deep(.el-select-dropdown)
    z-index 9999999!important
    border 1px solid #19d5fe
    background-color rgb(8,57,62)
    color rgb(255,255,255)
    text-align center
    top 24px!important
    // #19d5fe 19 56 58
    .popper__arrow
        display none
.el-select-dropdown__item
    color rgb(255,255,255)
    padding 0 40px
    font-size 18px
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover
    background-color rgba(255,255,255,.1)
.el-select-dropdown__item.selected
    color rgb(211,232,232)
:deep(.timeChange .el-input__inner)
    text-align left
    background rgba(255, 255, 255, 0.1)
    color #fff
    font-size 16px
    border none
:deep(.el-popper.is-light)
    border none
:deep(.el-popper__arrow)
    display none
```
## el-dialog+ el-form
```javascript
el-dialog( v-model="dialogVisible" :title="dialogTitle" @close="dialogClose" width="840px" :close-on-click-modal="false")
    el-form(:model="form" :rules="rules" ref="formDom" label-width="115px" class="input-width")
        el-form-item(label="计划减排因子" prop="emissionReductionFactor")
            el-input(v-model="form.emissionReductionFactor" size="mini" maxlength=50)
        el-form-item(label="减排时间" prop="reductionTime")
            el-date-picker(v-model="form.reductionTime" type="date" placeholder="选择时间" style="width: 100%")
        el-form-item(label="减排量(kg)" prop="emissionReduction")
            el-input(v-model.number="form.emissionReduction" size="mini" maxlength=50)
        el-form-item(label="是否完成" prop="isDone")
            el-radio-group(v-model="form.isDone")
                el-radio(label="是")
                el-radio(label="否")
    div(slot="footer")
        el-button(@click="cancelFun" size="mini") 取消
        el-button(type="primary" @click="okFun" size="mini") 确定
// data.formDom.resetFields() 重置
const rules = {
    reductionTime: [{ required: true, message: '请上选择日期！', trigger: 'change' }],
    isDone: [{ required: true, message: '请上选择是否完成！', trigger: 'change' }],
    emissionReduction: [
        { required: true, message: '请输入计划减排量！', trigger: 'change' },
        { type: 'number', message: '减排量必须是数字！' }
    ],
    emissionReductionFactor: [
        { required: true, message: '请输入计划减排因子!', trigger: 'change' }
    ]
}
form: {
    id: null,
    isDone: '',
    emissionReduction: '',
    emissionReductionFactor: '',
    reductionTime: ''
},
formDom: ref(),
dialogTitle: '增加数据',
```