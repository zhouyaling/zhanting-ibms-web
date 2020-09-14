<template>
    <div class="page-header">
        <div v-if="projectName" class="header-name">{{projectName}}</div>
    </div>
</template>
<script>
export default {
    props:['projectName']
}
</script>
<style scoped>
    .page-header{
        width: 100%;
        height: 100px;
        text-align: center;
        color: #fff;
        position: relative;
    }

    
</style>