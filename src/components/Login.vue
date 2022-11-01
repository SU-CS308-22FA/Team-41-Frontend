<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="login-form">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Login</h2>
            Email: <input type="email" placeholder="Enter email">
            Password: <input type="password" placeholder="Enter password">
            <button class="login">
                <a href="">Login</a>
            </button>
            <div class="admin">
                <div><p><a href="">Login as admin</a></p></div>
            </div>
            <div class="forget">
                <div><p>Forget Password?<br> Click <a href=""> here</a></p></div>
                </div>
            <div class="acc">
                <div><p>Don't have an account?<br><a href="">Sign Up</a></p></div>
            </div>
        </form>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/Login',
        name: 'LogIn',
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
        margin: 50px -10px 0 -10px;
        text-align: center;
        display: flex;
        padding-left: 60%;
        align-items: center;
    }

    .login-form{
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

    .login{
        background-color: rgba(17, 73, 158, 0.818);
        padding:10px;
        border:none;
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 5px;
        transition: 0.5s ease;
    }

    .login a{
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        font-size: medium;
    }

    .forget{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .forget a {
        color:rgba(17, 73, 158, 0.818);
        text-decoration: none;
        transition: 0.1s ease;
    }

    .forget a:hover{
        color:rgb(5, 5, 74);
    }

    .acc{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .acc a {
        color:rgba(17, 73, 158, 0.818);
        text-decoration: none;
        transition: 0.1s ease;
    }

    .acc a:hover{
        color:rgb(5, 5, 74);
    }

    .admin{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .admin a {
        color:rgba(17, 73, 158, 0.818);
        text-decoration: none;
        font-weight: bold;
        transition: 0.1s ease;
    }

    .admin a:hover{
        color:rgb(5, 5, 74);
    }
</style>