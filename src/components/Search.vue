<template>
    <div class="ui icon input">
        <i class="search large icon"></i>
        <input type="text" placeholder="查询" @keyup.enter="search()" id="search">
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    methods: {
        search () {
            this.cm.search.cID = 0 // 将cID置零
            this.cm.search.name = document.getElementById('search').value
            document.getElementById('search').value = ''
            window.location.href = '/#/Classify'
        }
    }
}
</script>
<style scoped>
</style>


