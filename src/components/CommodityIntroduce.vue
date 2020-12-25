<template>
    <div>
        <Banner></Banner>
        <div class="ui horizontal segments" style="margin-top: 72px;">
            <div class="ui segment" style="width: 32%">
                <Big></Big>
            </div>
            <div class="ui segment" style="width: 68%">
                <div class="ui header">{{commodity.name}}</div>
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">小白价</label>
                        <div class="col-sm-8">
                            <div class="ui inverted red label">￥{{commodity.price}}.00</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">优惠价</label>
                        <div class="col-sm-8">
                            <div>
                                <label class="list-inline">
                                    <div class="ui inverted active red label">满299减99</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui inverted green label">满499减199</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui inverted blue label">满699减299</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">选择颜色</label>
                        <div class="col-sm-8">
                            <div>
                                <label class="list-inline">
                                    <div class="ui inverted active red label">红</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui inverted green label">绿</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui inverted blue label">蓝</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-8">
                            <label class="list-inline">
                                <div class="ui inverted red button" @click="dec()">-</div>
                            </label>
                            <label class="list-inline">
                                <div class="ui inverted  red button" @click="addShopCar()">加入购物车共{{total}}件</div>
                            </label>
                            <label class="list-inline">
                                <div class="ui inverted blue button" @click="inc()">+</div>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="ui secondary pointing menu" id="menu">
            <a class="item header" @click="flag = 0">商品详情
                <div class="ui floating red label">99W+</div>
            </a>
            <a class="item header" @click="flag = 1">商品评论</a>
            <a class="item header" @click="flag = 2">商品售后</a>
        </div>
        <CommodityDetail v-if="flag == 0"></CommodityDetail>
        <CommodityAppraice v-else-if="flag == 1"></CommodityAppraice>
        <AfterSaleProtection v-else></AfterSaleProtection>
        <Footer></Footer>
    </div>
</template>
<script>
import Banner from './Banner'
import Big from './Big.vue'
import CommodityAppraice from './CommodityAppraice'
import Axios from 'axios'
import CommodityDetail from './CommodityDetail.vue'
import AfterSaleProtection from './AfterSaleProtection.vue'
import Footer from './Footer'
export default {
    components : {
        Banner,
        Big,
        CommodityDetail,
        AfterSaleProtection,
        Footer,
        CommodityAppraice,
    },
    data () {
        return {
            flag : 0,
            total : 1,
            user : {

            },
            commodity : {

            }
        }
    },
    mounted () {
        var id = this.cm.search.id
        this.user = this.cm.user
        Axios.get(`http://localhost:3000/commodity?id=${id}`).then(res => {
            this.commodity = res.data[0]
        })
    },
    methods : {
        inc () {
            if(this.total < 9) {
                this.total ++
            } else {
                swal('单次购买数量不能超过9件')
            }
        },
        dec () {
            if(this.total > 1) {
                this.total --
            } else {
                swal('购买数量不能小于1件')
            }
        },
        addShopCar () {
            if(this.user.name == null) {
                window.location.href = '/#/Login'
            } else {
                var c = this.commodity, u = this.user, url = 'http://localhost:3000/shopCar', total = this.total
                Axios.get(`${url}`, {
                    params : {
                        cID : c.id,
                        uID : u.id
                    }
                }).then(res => {
                    var s = res.data[0]
                    // 若用户商品已存在，只修改数量
                    if(s != null) {
                        Axios.delete(`${url}/${s.id}`)
                        total += s.total
                    }
                    Axios.post(`${url}`, {
                        cID : c.id,
                        uID : u.id,
                        total : total,
                        active : true,
                    }).then(res => {
                        swal('添加成功', `商品${c.name}已加入购物车`, 'success')
                    })
                })
            }
        }
    }
}
</script>
<style scoped>
#menu a{
    width: 33.333%;
}
</style>
