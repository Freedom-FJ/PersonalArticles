# 效果图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a4c947a024234a798d8a63a0e4a69522.png)
思路是：
通过数组循环生成多个echarts实例盒子，生成的柱形图只有一条数据，是由多个图表设置`barGap: '-100%'`实现重叠，并通过设置柱形图中间颜色到边上颜色的渐变形成类似3d的视觉效果，实际每一个柱形图是由以下几个图表实现的：⛽️
1. 内层背景的body（bar） 
2. 内层背景的顶部圆圈 （pictorialBar）
3. 外层绿色的实际值柱形图 （bar）
4. 外层顶部的圆圈 （pictorialBar）
5. 外层底部的圆圈 （pictorialBar）
以及底部的圆盘是一个切图🥺
![在这里插入图片描述](https://img-blog.csdnimg.cn/31f6f890698b41f5b8bcda92d56703a7.png)
## 技术栈
> vue3 TypeScript echarts
准备：
需要安装echarts和echarts-gl
```cmd
yarn add echarts
yarn add echarts-gl
```


代码：
template:
```javascript
<div class="bottom-bar">
    <div v-for="item, index in barList" :key="index" class="bottom-item">
        <img class="bar-bottom" src="@/assets/images/fiveWater/bar-bottom.png" alt="">
        <div class="top-rate num-18 mgb12">
            {{ item.rate }}%
        </div>
        <div :ref="ref => item.dom = ref" class="bar-box mgb12" />
        <div class="bottom-name pang-18">
            {{ item.name }}
        </div>
    </div>
</div>
```
javascript: 
```javascript
import 'echarts-gl'
import * as echarts from 'echarts'

const barList = reactive([
	{ name: '基本能力', rate: 98, total: 100, done: 98, dom: ref() },
	{ name: '考核情况', rate: 100, total: 100, done: 100, dom: ref() },
	{ name: '推进情况', rate: 90, total: 100, done: 90, dom: ref() },
])
onMounted(() => {
    initBar()
})

const initBar = () => {
    data.barList.forEach((item) => {
        const series = [item.done]
        const staticData = toRaw(item)
        const output_3DBarCharts = echarts.init(item.dom)
        const options = get3DOptions(staticData, series)
        output_3DBarCharts.setOption(options)
        window.addEventListener('resize', () => {
            output_3DBarCharts.resize()
        })
    })
}
const get3DOptions = (xData: { name: string; rate: number; total: number; done: number }, seriesData: number[]) => {
    const { total, done } = xData
    const options = {
        grid: {
            left: 0,
            right: 0,
            top: 7,
            bottom: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                fontFamily: 'TRENDS'
            },
            formatter: (params: any[]) => {
                let str = `<div>${params[0].axisValue}:</div>`
                str += `<div>完成数：${done}个</div>`
                str += `<div>总数：${total}个</div>`
                return str
            }
        },
        legend: {
            show: true,
            icon: 'circle',
            orient: 'horizontal',
            top: '90.5%',
            right: 'center',
            itemWidth: 16.5,
            itemHeight: 6,
            textStyle: {
                color: '#C9C8CD',
                fontSize: 14
            }
        },
        xAxis: [{
            show: false,
            data: [xData.name],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#aaaaaa',
                    fontSize: 12
                },
                margin: 30, // 刻度标签与轴线之间的距离。
            },
            axisLine: {
                show: false // 不显示x轴
            },
            axisTick: {
                show: false // 不显示刻度
            },
            boundaryGap: true,
            splitLine: {
                show: false,
                width: 1,
                lineStyle: {
                    type: 'solid',
                    color: '#03202E'
                }
            }
        }],
        yAxis: [{
            show: false,
            axisLabel: {
                interval: 'auto',
                show: true,
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(49,176,255,0.05)',
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(49,176,255,0.5)',
                },
            },
        }],
        series: [
        // 柱顶圆片 背景
            {
                name: '',
                type: 'pictorialBar',
                symbolSize: [52, 20], // 调整截面形状
                symbolOffset: [0, -6],
                z: 12,
                symbolPosition: 'end',
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: () => {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(0, 58, 77, 1)' },
                                { offset: 1, color: 'rgba(0, 158, 209, 1)' },
                            ])
                        },
                    }
                },
                data: [total]
            },
            // 柱体 背景
            {
                name: '',
                type: 'bar',
                barWidth: '100%',
                itemStyle: {
                    color: () => {
                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: 'rgba(0, 58, 77, 1)' },
                            { offset: 0.5, color: 'rgba(0, 58, 77, 0)' },
                            { offset: 1, color: 'rgba(0, 58, 77, 1)' },
                        ])
                    },
                    opacity: 1
                },
                data: [total]
            },

            { // 顶部园片 数据实体
                name: '',
                type: 'pictorialBar',
                symbolSize: [52, 20], // 调整截面形状
                symbolOffset: [0, -6],
                z: 13,
                symbolPosition: 'end',
                itemStyle: {
                    normal: {
                        color: () => {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(159, 255, 224, 0.8)' },
                                { offset: 1, color: 'rgba(75, 210, 187, 0.8)' },
                            ])
                        },
                    }
                },
                data: seriesData || []
            },
            { // 柱体 数据实体
                name: '',
                type: 'bar',
                barWidth: '100%',
                barGap: '-100%',
                itemStyle: {
                    normal: {
                        color: () => {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: 'rgba(0, 58, 77, 1)' },
                                { offset: 0.5, color: 'rgba(113,286,181, .7)' },
                                { offset: 1, color: 'rgba(0, 58, 77, 1)' },
                            ])
                        },
                    }
                },
                data: seriesData || []
            },
            { // 柱底圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [58, 18], // 调整截面形状
                symbolOffset: [0, 8],
                z: 12,
                itemStyle: {
                    color: () => {
                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: 'rgba(0, 58, 77, 1)' },
                            { offset: 0.5, color: 'rgba(113,286,181, .7)' },
                            { offset: 1, color: 'rgba(0, 58, 77, 1)' },
                        ])
                    },
                },
                data: seriesData || []
            },
        ]
    }
    return options
}
```
css样式
```css
.bottom-bar {
   display: flex;
   justify-content: space-between;
   margin-top: 25px;

   .bar-bottom {
       position: absolute;
       bottom: 27px;
       left: 50%;
       z-index: -1;
       width: 80px;
       transform: translateX(-50%);
   }

   .bottom-item {
       position: relative;
       display: flex;
       flex-direction: column;
       align-items: center;
   }

   .bar-box {
       width: 52px;
       height: 80px;
   }
}
```
