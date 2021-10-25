import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
export default { // 用于打包的配置
  input: './src/index.js', // 入口
  output: { // 出口
    file: 'dist/vue.js',
    name: 'Vue', // 全局名字是vue
    format: 'umd', // window.Vue
    sourcemap: true // es6 -> es5
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // 这个目录不需要用babel转化 
    }),
    serve({
      open: true, // 自动打开
      openPage: "/public/index.html", // 打开html
      port: 3000, // 端口号
      contentBase: '' // 以当前根目录为准
    })
  ]
}