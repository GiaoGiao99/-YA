<template>
    <div>
        <Banner></Banner>
        <div class="ui segment">
            <h2>个人信息</h2>
            <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-2 control-label">姓 名</label>
                    <div class="col-sm-6">
                        <input type="text" v-model="user.name" placeholder="姓名" class="form-control" id="name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">号 码</label>
                    <div class="col-sm-6">
                        <input type="tel" v-model="user.tel" placeholder="例：13277882939" class="form-control" id="tel" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">邮 箱</label>
                    <div class="col-sm-6">
                        <input type="email" v-model="user.email" placeholder="例：3142526250@QQ.COM" class="form-control" id="email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">密 码</label>
                    <div class="col-sm-6">
                        <input type="text" v-model="user.password" class="form-control" id="password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">收货地址</label>
                    <div class="col-sm-6">
                        <input type="text" v-model="user.address" class="form-control" id="address" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">邮政编码</label>
                    <div class="col-sm-6">
                        <input type="text" v-model="user.zip" class="form-control" id="zip" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">操作</label>
                    <div class="col-sm-6">
                        <router-link to="/Login">
                            <div class="ui inverted green button">切换账号</div>
                        </router-link>
                        <div class="ui inverted blue button" @click="update()">更新信息</div>
                    </div>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from './Footer'
import Banner from './Banner.vue';
import Axios from 'axios';
export default {
    components : {
        Footer,
        Banner
    },
    data () {
        return {
            user : {

            }
        }
    },
    mounted () {
        this.user = this.cm.user
    },
    methods : {
        $ (id) {
            return document.getElementById(id).value
        },
        update () {
            var name = this.$('name'), tel = this.$('tel'), email = this.$('email'), password = this.$('password'), zip = this.$('zip'), address = this.$('address')
            if(name != '' && tel != '' && email != '' && password != '' && zip != '') {
                Axios.delete(`http://localhost:3000/user/${this.user.id}`)
                Axios.post('http://localhost:3000/user', {
                    name : name,
                    tel : tel,
                    email : email,
                    password : password,
                    balance : this.user.balance,
                    id : this.user.id,
                    zip : zip,
                    address : address
                })
                swal('更新成功', '请记住自己的信息，牢记密码', 'success')
            } else {
                swal('更新失败', '信息填写不全， 请不要留空', 'error')
            }
        }
    }
}
</script>
<style scoped>
</style>
 