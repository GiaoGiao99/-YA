<template>
    <div id="bgimg">
        <div>
            <h2>注 册</h2>
            <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-2 control-label">姓 名</label>
                    <div class="col-sm-3">
                        <input type="text" placeholder="姓名" class="form-control" id="name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">号 码</label>
                    <div class="col-sm-3">
                        <input type="tel" placeholder="例：13277882939" class="form-control" id="tel" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">邮 箱</label>
                    <div class="col-sm-3">
                        <input type="email" placeholder="例：3142526250@QQ.COM" class="form-control" id="email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">密 码</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">确 认 密 码</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="checkPassword" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">验 证 码</label>
                    <div class="col-sm-3">
                        <input type="text" placeholder="如右图" class="form-control"  id="verificationCode" required>
                    </div>
                    <div class="col-sm-1">
                        <input type="text" class="form-control" readonly  id="generateCode" v-model="generateCode">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">已有账号？<router-link to="/Login">前往登录</router-link></label>
                    <div class="col-sm-1">
                        <div class="ui inverted blue button form-control" @click="register()">注 册</div>
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
  components: {
    Footer
  },
  data () {
      return {
          generateCode : 123
      }
  },
  methods : {
      $(id) {
          return document.getElementById(id).value;
      },
      register () {
          var name = this.$('name')
          var tel = this.$('tel')
          var email = this.$('email')
          var password = this.$('password')
          var checkPassword = this.$('checkPassword')
          var verificationCode = this.$('verificationCode')
          var generateCode = this.$('generateCode')
          if(password != checkPassword) {
              swal('注册失败', '请检查密码和确认密码是否匹配', 'error')
          }
          else if(verificationCode != generateCode) {
              swal('注册失败', '请检查验证码是否匹配', 'error')
              this.generateCode = (Math.floor(Math.random()*1000))%900+100
          } else {
                var url = 'http://localhost:3000/user'
                Axios.get(url).then(res => {
                    var i, user = res.data, len = user.length
                    for(i = 0;i < len;i ++) {
                        var u = user[i]
                        if(u.name == name || u.tel == tel || u.email == email) {
                            swal('注册失败', '账户名重复，可能是用户名或电话号码或邮箱', 'error')
                            break
                        }
                    }
                    var m = require('mockjs').Random, address = m.region() +  m.county(true), zip = m.zip()
                    if(i == len) {
                        Axios.post(url, {
                            name : name,
                            tel : tel,
                            email : email,
                            password : password,
                            address : address,
                            zip : zip,
                            balance : 999999
                        });
                        swal('注册成功', '已自动跳转至登录界面', 'success')
                        window.location.href = '/#/Login'
                    }
                })
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
