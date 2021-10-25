import { arrayMethods } from "./array"

class Observer {
  constructor(value) { // 需要对这个value属性重新定义

    // value可能是对象， 可能是数组， 分类处理

    if(Array.isArray(value)) {
      // 数组不用defineProperty来进行代理 性能不好

      // push shift reverse sort 我要重写这些方法增加更新逻辑
     // value.__proto__ = arrayMethods
      Object.setPrototypeOf(value, arrayMethods) // Object.setPrototypeOf方法设置一个指定的对象的原型
      this.observeArray(value) // 原有数组的对象 Object.freeze()
    }else {
      this.walk(value)
    }
  }

  observeArray(value) {
    for(let i = 0;i < value.length;i++) {
      observe(value[i]) // 监测数组中的对象
    }
  }
  
  walk(data) {
    // 将对象中的所有key 重新用defineProperty定义成响应式的
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

// 把对象设置为响应式
export function defineReactive(data, key, value) { // vue2中数据嵌套不要过深， 过深浪费性能

  // value 可能也是一个对象
  observe(value)

  Object.defineProperty(data, key, { 
    get() {
      return value
    },
    set(newVal) {
      if(newVal === value) return
      observe(newVal) // 如果用户设置的是一个对象，就继续将用户设置的对象变成响应式的
      value = newVal
    }
  })
}

export function observe(data) {
  // 只对对象类型进行观测 非对象类型无法观测
  if(typeof data !== 'object' || data === null) {
    return
  }
  // 通过类来对实现对数据的观测， 类可以方便扩展， 会产生实例
  return new Observer(data)
}