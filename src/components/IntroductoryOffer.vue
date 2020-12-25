<template>
    <div class="ui segment">
        <!-- 展示推荐商品 -->
        <SubareaTitle :title="title"></SubareaTitle>
        <div class="ui horizontal segments" style="margin-top: 72px;">
            <div class="ui segment" style="width: 30%" id="offerCommodity">
                <div class="block">
                    <el-carousel height="360px">
                        <el-carousel-item v-for="(c, index) in commodity" :key="index">
                          <img @click="getIntroduce(c.id)">
                          <div class="ui header">{{c.name.substring(0, 24)}}...</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="ui segment" style="width: 70%" id="offerPc">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(p, index) in pc" :key="index" style="padding: 36px;">
                        <div class="ui card" @click="getIntroduce(p.id)">
                            <div class="content">
                                <div class="header" style="height: 72px;">{{p.name.substring(0, 24)}}...</div>
                            </div>
                            <div class="image" style="heigth: 299px;">
                                <img>
                            </div>
                            <div class="extra content">
                                <div class="ui inverted red label">￥{{p.price}}.00</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import SubareaTitle from './SubareaTitle'
import Axios from 'axios'
export default {
  components: {
    SubareaTitle,
  },
  data () {
    return {
      title: '小白推荐品YA',
      commodity : [],
      pc : []
    }
  },
  mounted () {
    Axios.get(`http://localhost:3000/commodity?sID=5`).then((res) => {
        this.commodity = res.data
    })
    Axios.get(`http://localhost:3000/commodity?cID=17`).then((res) => {
        this.pc = res.data
    })
    setTimeout(() => {
      $(() => {
        var i, offerCommodity = $('#offerCommodity').find('img'), offerPc = $('#offerPc').find('img')
        for (i = 0; i < this.commodity.length; i++) {
          offerCommodity[i].setAttribute('src', this.commodity[i].tSrc)
        }
        for (i = 0; i < this.pc.length; i++) {
          offerPc[i].setAttribute('src', this.pc[i].tSrc)
        }
      })
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
table tr td{
    padding: 12px;
}
</style>
