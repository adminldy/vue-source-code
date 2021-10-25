import { initState } from "./state"

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    let vm = this
    vm.$options = options // 实例上有一个属性$options 表示用户传入的属性
    // 初始化状态
    initState(vm)
  }
}


