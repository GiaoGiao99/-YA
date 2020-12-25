<template>
    <div class="ui segment">{{title}}</div>
</template>
<script>
export default {
  props: [
    'title'
  ]
}
</script>
<style scoped>
.ui{
    font-size: 24px;
    text-align: center;
    font-weight: bolder;
}
</style>
