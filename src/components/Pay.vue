<template>
    <div>
        <Banner></Banner>
        <!-- 展示订单详情 -->
        <div class="ui segment" style="margin-top: 72px;">
            <div class="ui header">支付订单</div>
            <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-2 control-label">支付方式</label>
                    <div class="col-sm-3">
                        <div>
                            <label class="list-inline">
                                <div class="ui basic active white label">支付宝</div>
                            </label>
                            <label class="list-inline">
                                <div class="ui basic green label">微信</div>
                            </label>
                            <label class="list-inline">
                                <div class="ui basic blue label">网银</div>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <div id="pay" class="ui segment">
                <div id="pay1">
                    <a class="item header">寄送至：</a>
                    <span class="description">{{user.address}}</span>
                    <a class="item header">收货人：</a>
                    <span class="description">{{user.name}}&nbsp;&nbsp;&nbsp;{{user.tel}}</span>
                    <a class="item header">邮编：</a>
                    <span class="description">{{user.zip}}</span>
                </div>
                <div id="pay2">
                    总价：<span class="ui item header red">￥{{totalPrice()}}.00</span>
                    <div class="ui inverted active red button" @click="pay()">即刻支付</div>
                </div>
            </div>
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
            user : {

            },
            shopCar : [],
            totalPrice: () => {
                var i, totalPrice = 0;
                for(i = 0;i < this.shopCar.length;i ++) {
                    var s = this.shopCar[i]
                    if(s.active) {
                        totalPrice += s.price*s.total
                    }
                }
                return totalPrice
            },
        }
    },
    mounted () {
        this.user = this.cm.user
        this.shopCar = this.cm.shopCar
    },
    methods : {
        pay () {
            var u = this.user
            if(u.balance < this.totalPrice()) {
                swal('支付失败', `当前${u.name}的账户余额不足，账户余额${u.balance}<${this.totalPrice()}`, 'error')
            } else {
                // 更新用户账户金额
                var i, s = this.shopCar, url = 'http://localhost:3000/'
                u.balance -= this.totalPrice()
                Axios.delete(`${url}user/${u.id}`).then(res => {
                    Axios.post(`${url}user`, {
                        name : u.name,
                        tel : u.tel,
                        email : u.email,
                        password : u.password,
                        address : u.address,
                        zip : u.zip,
                        balance : u.balance,
                        id : u.id
                    })
                    // 将该用户已购买的商品清空
                    for(i = 0;i < s.length;i ++) {
                        Axios.delete(`${url}shopCar/${s[i].id}`)
                    }
                })
                //                                                                                                                                                                                                                     uID=${u.id}`)
                swal ('支付成功', `感谢${u.name}的信任，您的商品将尽快送达，欢迎您下次选购`, 'success')
                window.location.href = '/#/Home'
            }
        }
    }
}
</script>
<style scoped>

#pay {
    width: 100%;
    height: 72px;
    position: fixed;
    bottom: 0px;
}
.col-sm-3 label {
    margin-left: 24px;
}
#pay1 {
    width: 68%;
    float: left;
}
#pay2 {
    width: 32%;
    float: right;
}
a {
    color: black;
}
span {
    color: black;
}
</style>
