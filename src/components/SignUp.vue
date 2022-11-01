<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="signup-form">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Sign Up</h2>
            First Name: <input type="text" placeholder="Enter First Name">
            Last Name: <input type="text" placeholder="Enter Last Name">
            Email: <input type="email" placeholder="Enter email">
            Password: <input type="password" placeholder="Enter password">
            Re-Password: <input type="password" placeholder="Enter password Again">
            <button class="signup">
                <a href="">Create Account</a>
            </button>
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

<style scoped>
    head{
        box-sizing: border-box;
        padding:0;
        margin:0;
    }

    body{
        margin: 0;
        height: 100%;
    }
    .container{
        background-image: linear-gradient(to bottom, rgba(145,146,122,0.62),rgba(47, 20, 109, 0.8)),url(../assets/ball.jpg);
        background-size: cover;
        height:100%;
        margin-top: 50px;
        
        text-align: center;
        display: flex;
        padding-left: 60%;
        align-items: center;
    }

    .signup-form{
        background-color: ghostwhite;
        width: 450px;
        height: 550px;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: left;
    }

    input[type=text]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }
    input[type=email]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }
    input[type=password]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 3px;
    }

    .signup{
        background-color: rgba(17, 73, 158, 0.818);
        padding:10px;
        border:none;
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .signup a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        font-size: medium;
    }
</style>
