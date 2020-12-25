<template>
    <div>
        <div class="detail">
            <div class="ui card" v-for="(c, index) in commodity" :key="index">
                <div class="image" style="heigth: 399px;">
                    <img @click="getIntroduce(c.id)">
                </div>
                <div class="content">
                    <div class="header" style="height: 72px;">{{c.name.substring(0, 12)}}...</div>
                    <div class="ui inverted red label">￥{{c.price}}.00</div>
                </div>
            </div>
        </div>
        <div class="detailTitle">
            <!-- 此处展示商品参数 -->
            <table class="ui large table">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>编号</th>
                        <th>产地</th>
                    </tr>
                    <tr>
                        <td>{{commodityNow.name}}</td>
                        <td>100008243247</td>
                        <td>中国大陆</td>
                    </tr>
                </thead>
            </table>
            <img class="ui centered img">
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data () {
        return {
            commodityNow : {

            },
            commodity : []
        }
    },
    methods : {
        init () {
            var id = this.cm.search.id
            var url = `http://localhost:3000/commodity?id=${id}`
            Axios.get(url).then( res => {
                this.commodityNow = res.data[0]
            })
            Axios.get(`http://localhost:3000/commodity`).then(res => {
                this.commodity = res.data
            })
            setTimeout (() => {
                $(() => {
                    var i, img = $('.detailTitle').find('img'), imgs = $('.detail').find('img')
                    img[0].setAttribute('src', this.commodityNow.dSrc)
                    for(i = 0;i < imgs.length;i ++) {
                        imgs[i].setAttribute('src', this.commodity[i].tSrc)
                    }
                })
            }, 1500)
        },
        getIntroduce (id) {
            console.log(id)
            this.cm.search.id = id
            window.location.href = '/#/CommodityIntroduce'
        }
    },
    created () {
        this.init()
    }
}
</script>
<style scoped>
.detail {
    width: 32%;
    float: left;
}
.detailTitle {
    width: 68%;
    float: right;
}
</style>
