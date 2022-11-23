<template>
    <div class="nav">
        <div class="logo">
            <img src="../assets/tfpLogo.png" alt="">
        </div>
        <div class="navlinks">
            
            <ul>
                <li><router-link class= "navborder" to="/">HOME</router-link></li>
                <li><router-link class= "navborder" to="/AdminHome">ADMINPANEL</router-link></li>
                <li><router-link class= "navborder" to="/feedback">CONTACT</router-link></li>
                <li v-if="showProfile === false"><router-link class= "navborder" to="/login">LOGIN</router-link></li>
                <li v-else><router-link class= "navborder" to="/profilepage">PROFILE</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        components: {},
        data() {
            return {
                showProfile: false,
            }
        },
        mounted (){
            if(localStorage.isLogedIn) this.showProfile = localStorage.isLogedIn;
        },
        
    };
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-align: left;
    }
    .nav{
        background-color: rgb(110, 175, 197);
        width: 100%;
        color:white;
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -4%;
    }
 
    img {
        width: 200px;
        height: 90px;
        padding-right:60%;
        cursor:pointer;
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
