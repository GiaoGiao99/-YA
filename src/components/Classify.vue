<template>
    <div>
        <Banner></Banner>
        <!-- 展示该分类商品的全部商品 -->
        <div class="ui header" v-if="!commodity.length" style="line-height: 72px;">该类商品<span style="color:red;">售罄</span>，采购员正加紧备货......</div>
        <div v-else>
            <el-row :gutter="8">
                <el-col :span="6" v-for="(c, index) in commodity" :key="index">
                    <div class="ui card" style="height:399px;margin-top: 24px;" @click="setID(c.id)">
                        <div class="image">
                            <img src="">
                        </div>
                        <div class="content">
                            <div class="header" style="height: 72px">{{c.name.substring(0, 24)}}......</div>
                            <div class="ui inverted red label">￥{{c.price}}.00</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
import Banner from './Banner.vue';
export default {
    components : {
        Banner
    },
    data () {
        return {
            commodity : []
        }
    },
    mounted () {
        // 先加载数据
        if(this.cm.search.cID != 0) {
            this.commodity = this.cm.commodity
        } else {
            var i, name = this.cm.search.name
            Axios.get('http://localhost:3000/commodity').then(res => {
                this.commodity = res.data
                for(i = 0;i < this.commodity.length;i ++) {
                    if(this.commodity[i].name.toLowerCase().indexOf(name.toLowerCase()) == -1) {
                        this.commodity.splice(i--, 1)
                    }
                }
            })
        }
        // 过段时间后给图片设置src
        setTimeout(() =>{
            var i, imgs = document.getElementsByTagName('img')
            for(i = 0;i < this.commodity.length;i ++) {
                imgs[i].setAttribute('src', this.commodity[i].tSrc)
            }
        }, 500);// 此处时间不宜设置过短，否则页面图片将无法显示
    },
    methods : {
        setID (id) {
            this.cm.search.id = id
            window.location.href = '/#/CommodityIntroduce'
        }
    }

}
</script>
<style scoped>

</style>