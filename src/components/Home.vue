<template>
    <NavBar></NavBar>
    <body>
        <MainFeed></MainFeed>
    </body>
</template>

<script>
    import NavBar from './navbar.vue'
    import MainFeed from './MainFeed.vue';
    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NavBar,
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