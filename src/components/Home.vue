<template>
    <NavBar></NavBar>
    <div>
        <body>
            <h1>HOME PAGE</h1>
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

<style scoped></style>
