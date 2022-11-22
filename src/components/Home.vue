<template>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <MainFeed></MainFeed>>
</template>

<script>
    import NavBar from './NavBar.vue';
    import SideBar from './SideBar.vue';
    import MainFeed from './MainFeed.vue';
    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NavBar,
            SideBar,
            MainFeed,
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