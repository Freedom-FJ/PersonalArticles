@[TOC](目录)

# 前言
本文的讨论是主要对mapbox 的图层交集的使用，在我们一些业务中往往我们需要用到一个范围内的河流json数据，或者是一个范围内的行政区划交集等，那本文以绘制一定范围公里内流域的数据进行插值显示为例，为大家带来`两个面交集`的使用，下面上效果图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/eab0366a9e584568ae9e1bd02dddf5b7.png)
具体这个圆圈怎么绘制我们这边暂时不讨论，本文讨论的重点是怎么取到两个面的交集，并绘制差值图
# 生成圆圈面JSON
直接上代码：

```javascript
export const createCircle = (center, radius, points) => {
    if (!points) points = 64

    const coords = {
        longitude: center[0],
        latitude: center[1]
    }

    const km = radius / 1000.0

    const ret = []
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180))
    const distanceY = km / 110.574

    let theta, x, y
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI)
        x = distanceX * Math.cos(theta)
        y = distanceY * Math.sin(theta)

        ret.push([coords.longitude + x, coords.latitude + y])
    }
    ret.push(ret[0])

    return {
        type: 'FeatureCollection',
        bbox: [coords.longitude - distanceX, coords.latitude - distanceY, coords.longitude + distanceX, coords.latitude + distanceY],
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [ret]
                }
            }
        ]
    }
}
```
第一个参数`coordinates`是经纬度中心坐标，第二个参数是`distance`周围多少公里数，单位是米，第三个参数`points`是代表生成多少个坐标点来绘制此愿圆圈，我们可以直接调用此方法来得到一个圆圈面

```javascript
const circleData = createCircle(coordinates, distance, 64)
```
生成的面数据格式大致如此：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ff560afe661845ada4c8bc24d32abf53.png)
其是一个单面也就是`Polygon`数据，此数据也就是代表着这个面的GeoJson数据。
# 使用turf.intersect
在查阅官方turf intersect 的 api后
![在这里插入图片描述](https://img-blog.csdnimg.cn/adc083db0ffc496fb1311e38f99c320a.png)
发现其使用只需要将两个面传入即可获取交集，但是有一点要点就是传入的格式是`feature`格式，而我们上面获取的到圆圈格式是`FeatureCollection`格式，所以需要传入他的第一个fearure，也就是`circleData.features[0]`。
另外要注意的是传入进去的数据格式必须是`Polygon`，也就是单面，比如我这边拿到的流域数据是`MultiPolygon`也就是多面数据，此数据调用`intersect`取交集方法会直接导致报错
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f609f491e0d48e2ab0c7bd4c2ab90a8.png)
单面和多面的最大区别是`coordinates`内部是否包裹了多组坐标面。可以看到如下的数据结构：`Polygon`是三层结构，coordinates数组的长度是1，`MultiPolygon`是四层结构，coordinates数组是大于1的
![在这里插入图片描述](https://img-blog.csdnimg.cn/e7a5e6fe0d254d07a36e47e8fd3139e2.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/84858c196c5a45dea30c394e55397d43.png)
# 数据处理
## 处理多面
对于`Polygon`要素我们可以直接将feature传入方法内，但是`MultiPolygon`我们需要做一些特殊处理。
方法1: 将静态数据进行处理，通过软件或者在线工具转化成单面要素并存储本地，此方法会是对于前端处理比较节省性能的方法，减少前端js的运算，但是注意的是工具转化的多面容易出现产生怪异面，比如一个自相交的扭曲面，所以这些脏数据记得要剔除。
方法2: 通过运算将多面coordinates数组一个一个抽离出来，放入`Polygon`要素内，进行运算，再重新放回`MultiPolygon`内如下：

```javascript
const featureList = []
feature.geometry.coordinates.forEach((coord) => {
	const currFeature = {
	  	"type": "Feature",
	  	"properties": {},
	  	"geometry": {
		   	type: 'polygon',
		   	coordinates: [
			   	[ ...coord ]
			]
		}
	}	
	const intersection = intersect(currFeature, circleData.features[0])
	intersection && featureList.push(intersection)
 })

```
## 处理多feature
由于我们的`turf.intersect`方法传入的必须是单个`features`，所以我们不能直接将我们的流域树放入传参，所以我们需要巡航比对每一个`features`获得交集并重新塞入到GeoJson数据内，生成新的流域交集数据，如下：

```javascript
const geoJson = {
    crs: {
        type: 'name',
        properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
        }
    },
    features: [],
    name: 'hz_water_l_grid',
    type: 'FeatureCollection'
}
// lineGridRiver 是流域数据 circleData是圆数据
lineGridRiver.features.forEach((item, index) => {
    const intersection = turf.intersect(circleData.features[0], item)
    intersection && geoJson.features.push(intersection)
})
```
这样我们就得到了我们的交集面啦！✌️