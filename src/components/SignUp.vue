<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="signup-form" @submit.prevent="signup">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Sign Up</h2>
            
            <label for="name">Name</label>
            <input name="name" v-model="name" placeholder="name" type="text">
        
            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="mail" type="email">
        
            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="password" type="password">
        
            <div>
                <input type="radio" id="male" value="Male" v-model="gender">
                <label for="male">Male</label>
                
                <input type="radio" id="Female" value="female" v-model="gender">
                <label for="female">Female</label>
            </div>
            
            <input class="signup" type="submit" value="register">
        </form>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/SignUp',
        name: 'SignUp',
        components: {
            NavBar,
        },
    };
</script>

<style scoped></style>