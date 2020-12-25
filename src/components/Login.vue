<template>
    <div id="bgimg">
        <div id="login">
            <h2>登 录</h2>
            <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-2 control-label">账 号</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" placeholder="昵称/号码/邮箱" id="account">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">密 码</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">验 证 码</label>
                    <div class="col-sm-3">
                        <input type="text" placeholder="如右图" class="form-control"  id="verificationCode">
                    </div>
                    <div class="col-sm-1">
                        <input type="text" class="form-control" readonly  id="generateCode" v-model="generateCode">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">暂无账号？<router-link to="/Register">即刻注册</router-link></label>
                    <div class="col-sm-1">
                        <div class="ui inverted blue button form-control" id="login" @click="login()">登 录</div>
                    </div>
                </div>
            </form>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
import Footer from './Footer'
export default {
    components:{
        Footer
    },
    data () {
        return {
            generateCode : 123
        }
    },
    methods : {
        $ (id) {
            return document.getElementById(id).value;
        },
        login () {
            var account = this.$('account');
            var password = this.$('password');
            var verificationCode = this.$('verificationCode');
            var generateCode = this.$('generateCode')
            if(verificationCode == generateCode) {
                Axios.get('http://localhost:3000/user').then(res => {
                    var i, user = res.data, len = user.length;
                    for(i = 0;i < len;i ++) {
                        var u = user[i]
                        if((u.name == account || u.tel == account || u.email == account) && u.password == password) {
                            this.cm.user = u
                            window.location.href = '/#/Home'
                            break
                        }
                    }
                    if(i == len) swal('登录失败', '请检查账号或密码是否正确', 'error')
                })
            } else {
                this.generateCode = (Math.floor(Math.random()*1000))%900+100
                swal('登录失败', '请检查验证码是否正确', 'error')
            }
        }
    }
}
</script>
<style scoped>
h2{
    text-align: center;
}
#bgimg {
    color: white;
    background-image: url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2409420263,3371021185&fm=26&gp=0.jpg);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
}
</style>

