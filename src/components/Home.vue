<template>
        <!-- 商品导航 -->
    <div id="home">
        <Banner></Banner>
        <SecondaryMenu id="secondaryMenu"></SecondaryMenu>
        <Carousel id="carousel"></Carousel>
        <Bestseller></Bestseller>
        <IntroductoryOffer></IntroductoryOffer>
        <Footer></Footer>
    </div>
</template>
<script>
import SecondaryMenu from './SecondaryMenu'
import Banner from './Banner'
import Carousel from './Carousel'
import Bestseller from './Bestseller'
import IntroductoryOffer from './IntroductoryOffer'
import Footer from './Footer'
import Axios from 'axios'
export default {
    components: {
        SecondaryMenu,
        Banner,
        Carousel,
        Bestseller,
        IntroductoryOffer,
        Footer
    },
    data () {
        return {
            bgcolor : 'white'
        }
    },
    updated () {
        this.bgcolor = this.cm.bgcolor
        alert(this.bgcolor)
    }
}
</script>
<style scoped>
#carousel{
    position: absolute;
    width: 72%;
    right: 0px;
    top: 76px;
}
#secondaryMenu{
    /* height: 480px; */
    margin-bottom: 299px;
    z-index: 999;
}
</style>
