<template>
    <div id="carousel">
        <el-carousel :interval="1500" type="card" height="480px" id="elCarousel">
            <el-carousel-item v-for="(c, index) in carousel" :key="index">
                <img @click="getIntroduce(c.id)">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data () {
        return {
            carousel : []
        }
    },
    mounted () {
        // 先加载数据
        Axios.get('http://localhost:3000/carousel').then((res => {
            this.carousel = res.data
        }))
        setTimeout(() =>{
            $(() => {
                var i, imgs = $('#carousel').find('img')
                for(i = 0;i < this.carousel.length;i ++) {
                    imgs[i].setAttribute('src', this.carousel[i].hSrc)
                }
            })
        }, 1000);// 此处时间不宜设置过短，否则页面图片将无法显示
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
