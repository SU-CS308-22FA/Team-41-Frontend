<template>
    <NewNav></NewNav>
    <body>
        <MainFeed></MainFeed>
    </body>
</template>

<script>
    import NewNav from './newNav.vue'
    import MainFeed from './MainFeed.vue';
    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NewNav,
            MainFeed
        },
    };
</script>

<style scoped>
img{
    height:500px;
    width:500px;
}
div{
    display: flex;
}
</style>