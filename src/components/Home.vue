<template>
    <NavBar></NavBar>
    <div>
        <body>
            <br><br><br>
            <h1>HOME PAGE</h1>
            <img src="../assets/renovate.jpg" alt="">
        </body>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NavBar,
        },
    };
</script>

<style scoped>
img{
    height:500px;
    width:500px;
}
</style>
