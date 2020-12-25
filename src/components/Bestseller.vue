<template>
    <div id="bestseller">
        <SubareaTitle :title="title"></SubareaTitle>
        <!-- 展示热销商品 -->
        <el-row :gutter="20">
            <el-col :span="6" v-for="(c, index) in commodity" :key="index" style="padding: 36px;">
                <div class="ui card" @click="getIntroduce(c.id)">
                    <div class="image" style="heigth: 399px;">
                        <img>
                    </div>
                    <div class="content">
                        <div class="header" style="height: 72px;">{{c.name.substring(0, 12)}}...</div>
                        <div class="ui inverted red label">￥{{c.price}}.00</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Axios from 'axios'
import SubareaTitle from './SubareaTitle'
export default {
  components: {
    SubareaTitle
  },
  data () {
    return {
      title: '小白热销品YA',
      commodity: []
    }
  },
  mounted () {
    // 获取数据
    Axios.get(`http://localhost:3000/commodity?sID=1`).then((res) => {
        this.commodity = res.data
    })
    // 500毫秒后，给图片设置src
    setTimeout(() => {
      var i, imgs
      $(() => {
        imgs = $('#bestseller').find('img')
      })
      for (i = 0; i < this.commodity.length; i++) {
        imgs[i].setAttribute('src', this.commodity[i].tSrc)
      }
    }, 1000)
  },
  methods : {
    getIntroduce (id) {
      this.cm.search.id = id
      window.location.href = '/#/CommodityIntroduce'
    }
  }
}
</script>
<style scoped>

</style>
