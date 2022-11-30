/*
 * @Author: mjh
 * @Date: 2022-11-29 17:24:41
 * @LastEditors: mjh
 * @LastEditTime: 2022-11-29 17:33:57
 * @Description: 
 */
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