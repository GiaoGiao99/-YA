<template>
    <div id="banner" class="ui secondary pointing menu">
        <router-link to="/Home" class="item"><h2>小白优品汇</h2></router-link>
        <Search></Search>
        <a class="item" @click="check(0)">
            购物车
            <div>
                <i class="cart large icon"></i>
                <div class="ui floating red label">{{total}}</div>
            </div>
            
        </a>
        <a class="item" @click="check(1)">
            我的
            <i class="user large icon"></i>
        </a>
        <a class="item">
            <span>黑/白</span>
            <!-- <span></span> -->
            <div @click="setBg()">
                <el-switch v-model="value" active-color="green" inactive-color="black"></el-switch>
            </div>
        </a>
    </div>
</template>
<script>
import Axios from 'axios'
import Search from './Search'
export default {
    components: {
        Search
    },
    data () {
        return {
            counter : 0,
            value : true,
            total : 0
        }
    },
    methods : {
        init () {
            if(this.cm.user != null) {
                Axios.get(`http://localhost:3000/shopCar?uID=${this.cm.user.id}`).then(res => {
                    this.total = res.data.length;
                })
            }
        },
        check (flag) {
            var to = 'ShopCar'
            if(flag) {
                to = 'Myself'
            }
            if(this.cm.user.name == null) {
                to = 'Login'
            }
            window.location.href = `/#/${to}`
        },
        setBg () {
            var bgcolor = 'white'
            if((this.counter ++)%2 != 0) {
                bgcolor = 'black'
            }
            document.querySelector('body').setAttribute('style', 'background-color:'+bgcolor)
        }
    },
    created () {
        this.init()
    }
}
</script>
<style scoped>
#banner{
    z-index: 1;
    position: fixed;
    top: -5px;
    width: 100%;
    background-color: white;
    height: 80px;
}
a{
    font-weight: bolder;
    font-size: 18px;
}
</style>
