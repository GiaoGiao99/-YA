<template>
    <div id="order">
        <Banner></Banner>
        <!-- 展示订单详情 -->
        <!-- 收货人信息 -->
        <div class="ui segment" style="margin-top: 72px;">
            <div class="ui header">校验信息</div>
            <div>
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="昵称/号码/邮箱" id="account" v-model="user.name" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="password" v-model="user.tel" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">收货地址</label>
                        <div class="col-sm-6">
                            <input type="text" placeholder="如右图" class="form-control"  id="verificationCode" v-model="user.address" required>
                        </div>
                    </div>
                    <!-- 支付方式 -->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">支付方式</label>
                        <div class="col-sm-6">
                            <div>
                                <label class="list-inline">
                                    <div class="ui basic active white label">在线付款</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui basic green label">货到付款</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- 配送方式 -->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">配送方式</label>
                        <div class="col-sm-6">
                            <div>
                                <label class="list-inline">
                                    <div class="ui basic active white label">小白快递</div>
                                </label>
                                <label class="list-inline">
                                    <div class="ui basic green label">就近自提</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- 送货清单 -->
        <div>
            <div class="ui header">送货清单</div>
                <el-row :gutter="20">
                <el-col :span="8" v-for="(s, index) in shopCar" :key="index" style="padding: 36px;">
                    <div class="ui card">
                        <div class="image" style="heigth: 399px;">
                            <img>
                        </div>
                        <div class="content">
                            <div style="height: 72px;">{{s.name.substring(0, 24)}}...</div>
                            <div class="ui inverted red label">￥{{s.price}}.00<span> × {{s.total}}</span></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="order ui segment">
            总价：<span class="ui item header red">￥{{totalPrice()}}.00</span>
            <div class="ui inverted active red button" @click="order()">提交订单</div>
        </div>
    </div>
</template>
<script>
import Banner from './Banner.vue';
import Footer from './Footer.vue';
export default {
  components: { Banner, Footer },
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
            }
        }
    },
    mounted () {
        this.user = this.cm.user
        this.shopCar = this.cm.shopCar
        setTimeout(() => {
            var i, imgs
            $(() => {
                imgs = $('#order').find('img')
            })
            for (i = 0; i < this.shopCar.length; i++) {
                imgs[i].setAttribute('src', this.shopCar[i].tSrc)
            }
        }, 500)
    },
    methods : {
        order () {
            window.location.href = '/#/Pay'
        }
    }
}
</script>
<style scoped>

.order {
    width: 100%;
    height: 72px;
    position: fixed;
    bottom: 0px;
}
.col-sm-3 label {
    margin-left: 24px;
}
</style>
