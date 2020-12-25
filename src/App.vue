<template>
  <div id="app">
    <router-view></router-view>
    <!-- <JsonTest></JsonTest> -->
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'App',
  mounted () {
      // 此处初始化数据到内存
      Axios.get(`http://localhost:3000/subarea`).then( res => {
          this.cm.subarea = JSON.parse(JSON.stringify(res.data))
      })
      Axios.get(`http://localhost:3000/classify`).then( res => {
          this.cm.classify = JSON.parse(JSON.stringify(res.data))
      })
      Axios.get(`http://localhost:3000/commodity`).then( res => {
          this.cm.commodity = JSON.parse(JSON.stringify(res.data))
      })
      Axios.get(`http://localhost:3000/carousel`).then( res => {
          this.cm.carousel = JSON.parse(JSON.stringify(res.data))
      })
      window.location.href = '/#/Home'
  }
}
</script>

<style>
*{
  margin: auto;
  padding: 0px;
  text-decoration: none;
  list-style: none;
  font-family: '微软雅黑';
  font-size: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
