<template>
    <div>
        <div class="ui primary button">Put</div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data () {
        return {
            user : {
                name : '小白',
                tel : '123456789',
                id : 1
            }
        }
    },
    mounted () {
        Axios.delete('http://localhost:3000/shopCar/'+1)
    }
}
</script>