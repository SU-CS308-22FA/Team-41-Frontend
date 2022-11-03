<template>
    <NavBar></NavBar>
    <div>
        <body>
            <br><br><br><br>
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
    head{
        box-sizing: border-box;
        padding:0;
        margin:0;
       
    }

    body{
        margin: 0;
        height: 100%;
        align-items: center;
        justify-content: center;
       
    }
    img{
        width: 500px;
        height: 500px;
    }

</style>
