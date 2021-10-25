// vue2.0中就是一个构造函数

import { initMixin } from "./init"

function Vue(options) {
  this._init(options) // 当用户new Vue时调用init方法进行vue的初始化操作
}

// 可以拆分逻辑到不同的文件中，更利于代码维护，模块化概念

initMixin(Vue)


export default Vue