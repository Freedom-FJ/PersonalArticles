<!--
 * @Author: mjh
 * @Date: 2023-01-18 15:25:09
 * @LastEditors: mjh
 * @LastEditTime: 2023-01-18 16:39:22
 * @Description: 
-->
执行顺序相关：
同步->微任务->nextTick->宏任务
```javascript
onMounted(async () => {
    setTimeout(() => { // 4
       z.value = 1
    })
    await (() => { z.value = 2 }) // 2
    nextTick(() => { // 3
        z.value = 3 
    })
    z.value = 4 // 1
})
```

```__v_raw```直接获取原始对象 同toRaw
```javascript
data.__v_raw === toRaw(data) // true
```
其他还有
```javascript
export declare const enum ReactiveFlags {
    SKIP = "__v_skip",  // 是否被响应式初始化
    IS_REACTIVE = "__v_isReactive", // 是否是reactive
    IS_READONLY = "__v_isReadonly", // 只读
    IS_SHALLOW = "__v_isShallow", // 浅层响应
    RAW = "__v_raw" // 原始数据
}
```