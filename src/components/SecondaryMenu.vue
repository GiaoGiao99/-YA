<template>
    <div id="secondaryMenu">
        <el-row class="tac">
            <el-col :span="6">
                <el-menu default-active="6" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>手机</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(1)">游戏手机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(2)">5G手机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(3)">拍照手机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(4)">全面屏手机</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>电脑</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(5)">笔记本</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(6)">游戏本</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(7)">平板电脑</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(8)">台式机</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu  index="3">
                        <template slot="title">
                            <span>手机配件</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(9)">手机壳</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(10)">数据线</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(11)">充电器</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu  index="4">
                        <template slot="title">
                            <span>电脑配件</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(12)">显示器</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(13)">CPU</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(14)">主板</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(15)">显卡</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu  index="5">
                        <template slot="title">
                            <span>相机</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(16)">数码相机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(17)">微单相机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(18)">单反相机</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu  index="6">
                        <template slot="title">
                            <span>电视</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(19)">超薄电视</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(20)">全面屏电视</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu  index="7">
                        <template slot="title">
                            <span>游戏设备</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <a @click="getClassify(21)">游戏耳机</a>
                            </el-menu-item>
                            <el-menu-item>
                                <a @click="getClassify(22)">游戏机</a>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    methods : {
        getClassify (id) {
            Axios.get(`http://localhost:3000/commodity?cID=${id}`).then(res => {
                this.cm.commodity = res.data
                this.cm.search.cID = id
                window.location.href = '/#/Classify'
            })
        }
    }
}
</script>
<style scoped>
span, a{
    font-weight: bolder;
    line-height: 72px;
}
</style>
