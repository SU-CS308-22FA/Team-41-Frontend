<template>
    <div class="nav">
        <div class="logo">
            <img src="../assets/tfpLogo.png" width=200px height=90px alt="">
        </div>
        <div class="navlinks">
            
            <ul>
                <li><router-link class= "navborder" to="/mainFeed">HOME</router-link></li>
                <li><router-link class= "navborder" to="/AdminHome">ADMINPANEL</router-link></li>
                <li><router-link class= "navborder" to="/feedback">CONTACT</router-link></li>
                <li v-if="!isLoggedIn()"><router-link class= "navborder" to="/login">LOGIN</router-link></li>
                <li v-if="isLoggedIn()"><router-link class= "navborder" to="/profilepage">PROFILE</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        components: {},
        methods: {
            isLoggedIn(){
                if(localStorage.isLogedIn === undefined) return false;
                return true;
            },
        },
        
    };
</script>

<style scoped>
    .nav{
        background-color: rgba(31, 28, 101, 0.818);
        height: 110px;
        width: 101.2%;
        color:white;
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin: -60px -10px -50px -10px;
    }
    .logo{
        padding: 10px 20px;
        cursor: pointer;
    }
    img {
    width: 200px;
    height: 90px;
    }

    .navlinks{
        font-size: larger;
        float:right;
        padding-right: 30px;
        cursor: pointer;
    }

    .navlinks ul li{
        display: inline-block;
        padding-right: 30px;
        cursor: pointer;
    }

    .navlinks ul li router-link{
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        text-transform: uppercase;
    }
    .navborder{
        color: white;
        text-decoration: none;
        font-size: 20px;
        
    }

    .navborder::after{
        content:"";
        width: 0;
        background-color:white;
        height:2px;
        display:block;
        transition: width 0.3s ease;
    }

    .navborder:hover::after{
        width:100%;
    }
</style>
