import { observe } from "./observer/index"

// vue的数据 data computed watch....
export function initState(vm) {
  // 将所有数据都定义在 vm属性上， 并且后续修改， 需要触发视图更新
  const opts = vm.$options // 获取用户属性

  if(opts.data) { // 数据的初始化
    initData(vm)
  }
}
// 数据代理，当用户直接访问vm的属性时，读取_data的值，修改同理
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newVal) {
     vm[source][key] = newVal 
    }
  })
}

function initData(vm) {
  // 数据劫持 Object.defineProperty
  let data = vm.$options.data
  // 对data类型进行判断 如果是函数 获取函数返回值作为对象
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 通过vm._data 获取劫持后的数据， 用户就可以拿到_data
  // 将_data中的数据全部放到vm上
  for(let key in data) {
    proxy(vm, '_data', key) // vm.name => vm._data.name
  }
  // 观测这个数据
  observe(data)
}
