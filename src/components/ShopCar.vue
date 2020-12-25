<template>
    <div id="shopCar">
        <Banner></Banner>
        <div v-if="shopCar.length == 0" id="shopCarEmpty">
            <div class="item header">购物车空空如也，小白优品汇海量商品，快去<router-link to="/Home"><a>选购</a></router-link>吧！</div>
        </div>
        <div v-else>
            <div class="ui segment">
                <div style="height:36px;">
                    <a class="ui left floated header">全部商品：<span>{{shopCar.filter((s) => {if(s.active) return s}).length}}</span></a>
                    <a class="ui header">配送至：</a><span>{{user.address}}</span>
                </div>
            </div>
            <table>
                <thead>
                    <th style="width: 10%;"><input type="checkbox" checked @click="checkAll()">全<span v-show="check">不</span>选</th>
                    <th>商品</th>
                    <th>单价</th>
                    <th style="width: 25%;">数量</th>
                    <th>小计</th>
                    <th>操作</th>
                </thead>
                <tr v-for="(s, index) in page" :key="index">
                    <td style="width: 10%;"><input type="checkbox" checked @click="s.active = !s.active" class="select"></td>
                    <td>
                        <div class="item">
                            <div style="height: 268px;">
                                <img>
                            </div>
                            <div class="content" style="height: 72px;font-size:16px;">
                                <span>{{s.name.substring(0, 12)}}...</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="ui inverted red label" style="margin-top: 72px;">￥{{s.price}}.00</div>
                    </td>
                    <td style="width: 25%;">
                        <div style="margin-top: 72px;">
                            <span class="ui inverted red button" @click="dec(index)">-</span>
                            <span class="ui basic green button">共{{s.total}}件</span>
                            <span class="ui inverted blue button" @click="inc(index)">+</span>
                        </div>
                    </td>
                    <td>
                        <div class="ui inverted red label" style="margin-top: 72px;">￥{{s.price*s.total}}.00</div>
                    </td>
                    <td>
                        <div class="ui inverted red button" @click="remove(index)" style="margin-top: 72px;">移除</div>
                    </td>
                </tr>
            </table>
            <!-- pageNow保存当前页 -->
            <div @click="goPage()" id="pageNow" name="1">
                <ul class="pagination">
                    <li id="pre"><a>&laquo;</a></li>
                    <li id="after"><a>&raquo;</a></li>
                </ul>
            </div>
            <div id="order" class="ui segment">
                总价：<span class="ui item header red">￥{{totalPrice()}}.00</span>
                <div class="ui inverted active red button" @click="order()">前往支付</div>
            </div>
        </div>
    </div>
</template>
<script>

import Axios from 'axios'
import Banner from './Banner.vue'
export default {
    components: { 
        Banner
    },
    data () {
        return {
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
            shopCar : [
            ],
            page : [],
            len : 0,
            per : 3,
            pageNow : 0,
            check : true,
            user : this.cm.user
        }
    },
    methods : {
        inc (index) {
            if(this.shopCar[index].total < 9) {
                this.shopCar[index].total  ++
            } else {
                swal('单次购买数量不能超过9件')
            }
        },
        dec (index) {
            if(this.shopCar[index].total  > 1) {
                this.shopCar[index].total --
            } else {
                swal('购买数量不能小于1件')
            }
        },
        checkAll () {
            $(() => {
                this.check = !this.check
                var i, checkBoxs = $('.select')
                for(i = 0;i < this.shopCar.length;i ++) {
                    this.shopCar[i].active = this.check
                }
                if(this.check) {
                    for(i = 0;i < this.shopCar.length;i ++) {
                        checkBoxs[i].setAttribute('checked', true)
                    }
                } else {
                    for(i = 0;i < this.shopCar.length;i ++) {
                        checkBoxs[i].removeAttribute('checked')
                    }
                }
            })
        },
        remove(index) {
            var u = this.user, s = this.shopCar[index]
            // 从当前购物车删除
            this.shopCar.splice(index, 1)
            // 从用户的购物车删除
            Axios.delete(`http://localhost:3000/shopCar/${s.id}`)
            this.init()
        },
        setImg () {
            setTimeout(() => {
                var i, imgs = document.getElementsByTagName('img')
                for(i = 0;i < this.page.length && i < imgs.length;i ++) {
                    imgs[i].setAttribute('src', this.page[i].tSrc)
                }
            }, 500);// 此处时间不宜设置过短，否则页面图片将无法显示
        },
        init () {
            this.setImg()
            this.pages()
        },
        order () {
            if(this.cm.user.name == null) {
                window.location.href = '/#/Login'
            } else if (this.totalPrice() == 0){
                swal('支付失败', '商品为空', 'error')
            } else {
                var i, msg = `商品总价：￥${this.totalPrice()}`
                this.cm.shopCar = this.shopCar.filter((s) => {
                    if(s.active) {
                        return s
                    }
                })
                window.location.href = '/#/Order'
            }
        },
        pages () {
            // 分页
            var per = this.per, len = Math.ceil(this.shopCar.length/per)
            this.len = len
            $(() => {
                var i
                for(i = 0;i < len;i ++) {
                    $('#after').before('<li><a>' + (i+1) + '</a></li>')
                }
            })
            var i, lis = $('.pagination').find('li')
            for(i = 0;i < len+2;i ++) {
                var id = i
                lis[i].setAttribute('id', id)
                $('#' + id).click(function (e) {
                    var i = $(e.target).text()
                    $('#pageNow').attr('name', i)
                })
            }
        },
        goPage () {
            this.page = []
            var i, per = this.per, len = this.len, pageNow = this.pageNow, to = $('#pageNow').attr('name')
            if(to == '«') {
                if(pageNow > 0) {
                    pageNow --
                } else {
                    swal('已跳转至首页')
                }
            } else if(to == '»') {
                if(pageNow < len-1) {
                    pageNow ++
                } else {
                    swal('已跳转至末页')
                }
            } else if(to == null){
                pageNow = 1
            } else {
                pageNow = to-1 // 分页从零开始
            }
            for(i = per*pageNow;i < this.shopCar.length && i < per*pageNow+per;i ++) {
                this.page.push(this.shopCar[i])
            }
            this.pageNow = pageNow
            this.init()
        }
    },
    mounted () {
        Axios.get(`http://localhost:3000/shopCar`, {
            params : {
                uID : this.user.id,
            }
        }).then(res => {
            var i, data = res.data, id = []// 保存购物车id
            for(i = 0;i < data.length;i ++) {
                var j = 0, d = data[i], total = d.total, active = d.active // 当回调函数执行时，用j遍历id
                id.push(d.id)
                Axios.get(`http://localhost:3000/commodity`, {
                    params : {
                        id : d.cID
                    }
                }).then(res => {
                    // 回调函数执行完后才会执行这段代码
                    var  d = res.data[0]
                    d.total = total
                    d.active = active
                    d.id = id[j++]
                    this.shopCar.push(d)
                })
            }
        })
        this.goPage()
    }
}
</script>
<style scoped>
#shopCarEmpty {
    margin-top: 25%;
}
#shopCarEmpty .item {
    font-size: 24px;
}
table {
    width: 100%;
}
table tr td{
    width: 17.8%;
    padding: 36px;
    vertical-align: middle;
    line-height: 100%;
}
table thead th{
    width: 17.8%;
    line-height: 72px;
    text-align: center;
}
.ui {
    margin-bottom: 72px;
}
.pagination {
    margin-bottom: 35%;
}
#order {
    width: 100%;
    height: 72px;
    position: fixed;
    bottom: 0px;
}
ul li {
    padding: 24px;
    float: left;
    margin: -24px;
    margin-top: -24px;
}
</style>
