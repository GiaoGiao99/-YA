<template>
    <div>
        <div id="countDown">{{countDown()}}</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    methods : {
        getDate () {
            var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds()
            if(h < 10) {
                h = '0' + h
            }
            if(m < 10) {
                m = '0' + m
            }
            if(s < 10) {
                s = '0' + s
            }
            document.getElementById('countDown').innerHTML = h+':'+m+':'+s
        },
        countDown () {
            setInterval(this.getDate, 1000)
        }

    }
}
</script>
<style scoped>
</style>
