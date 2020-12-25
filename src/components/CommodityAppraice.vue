<template>
    <div id="appraice">
      <!-- 评论分类 -->
      <div class="ui horizontal segments" style="margin-top: 72px;">
          <div class="ui statistic" style="width: 11%">
            <div class="ui red value">
              99%
            </div>
            <div class="label">好评率</div>
          </div>
          <div style="width: 89%">
              <div v-for="(c, index) in appraiceClassify" :key="index">
                  <div class="ui left floated compact menu" style="margin: 24px;padding:6px;">
                    <a class="item">
                      {{c.classify}}
                      <div class="ui floating red label">{{c.total}}W+</div>
                    </a>
                  </div>
              </div>
          </div>
      </div>
      <!-- 评论内容 -->
      <div>
        <div v-for="(a, index) in appraice" :key="index">
          <!-- 用户头像/名称等 -->
          <div style="width: 11%;float: left;heigth: 288px;">
            <div>
            </div>
              <div class="ui card" style="heigth: 288px;">
                    <div class="image">
                        <img class="ui avatar circular image">
                        <span>{{a.name}}</span>
                    </div>
                    <div class="ui floating red label" v-show="a.isMember">超级会员</div>
              </div>
            </div>
            <!-- 评论内容 -->
            <div style="width: 89%;height: 288px;">
              <div class="ui card" style="width: 90%;float: right;heigth: 144px; margin-top: 12px;">
                    <div class="content" style="heigth: 288px;">
                      <el-rate v-model="a.star" disabled show-score text-color="red"></el-rate>
                        <div style="text-align: left;">{{a.content}}</div>
                    </div>
                    <div class="">
                      <i class="el-icon-chat-round"></i>
                      <span>{{a.chat}}</span>
                      <i class="el-icon-edit"></i>
                      <span>{{a.edit}}</span>
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data () {
      return {
        appraice: [],
        appraiceClassify : []
      }
    },
    methods : {
      init () {
        var i, m = require('mockjs').Random
        for(i = 0;i < m.natural(11, 67);i ++) {
          this.appraice.push({
            name : m.cname(),
            img : m.image('200x100'),
            isMember : m.boolean(),
            content : m.cparagraph(11, 13),
            star : m.natural(4, 5),
            chat : m.natural(40, 50),
            edit : m.natural(80, 150)
          })
          console.log(this.appraice[i].img)
        }
        for(i = 0;i < m.natural(5, 12);i ++) {
          this.appraiceClassify.push({
            classify : m.ctitle(4, 4),
            total : m.natural(30, 50)
          })
        }
        setTimeout(() => {
          $(() => {
            var i, imgs = $('#appraice').find('img')
            for(i = 0;i < imgs.length;i ++) {
              imgs[i].setAttribute('src', 'https://storage.360buyimg.com/i.imageUpload/d7f4b2d6c7a7b4fabdb431353732393637313739393733_sma.jpg')
            }
          })
        }, 500)
      }
    },
    created () {
      // 此时可以初始化数据
      this.init()
    }
}
</script>
<style scoped>
a{
    color: rgba(235, 134, 19, 0.911);
}
.header {
    font-size: 18px;
}
</style>