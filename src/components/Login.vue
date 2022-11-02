<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="login-form" @submit.prevent="login">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Login</h2>

            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="Enter mail" type="email">

            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password" >

            <button class="login">
                <a>Login</a>
            </button>
            
            <div class="admin">
                <div><p><a>Login as admin</a></p></div>
            </div>
            <div class="forget">
                <div><p>Forget Password?<br> Click <a> here</a></p></div>
                </div>
            <div class="acc">
                <div><p>Don't have an account?<br><router-link class= "navborder" to="/signup">Sign Up</router-link></p></div>
            </div>
        </form>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/login',
        name: 'LogIn',
        components: {
            NavBar,
        },
        data() {
            return {
                mail: "",
                password: "",
                isLoged: false,
                userId: "",
            };
        },
        methods: {
             login() {
                const { mail, password } = this;
                
                localStorage.pressed = true;
                
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mail,  password})
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/login", requestOptions).
                then((res) => res.json()).
                then((res2) => {
                    if(res2.status !== "200") {
                        alert("Login Failed\n"+res2.status)
                        return;
                    }
                    window.localStorage.setItem("isLogedIn", true);
                    window.localStorage.setItem("userId", res2.returnObject);
                    this.$router.push("/profilepage");// user profile sayfasina yonlendirilecek.
                });
            }
        }
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

        background: #2980b9 url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
        -webkit-animation: 10s linear 0s normal none infinite animate;
        -moz-animation: 10s linear 0s normal none infinite animate;
        -ms-animation: 10s linear 0s normal none infinite animate;
        -o-animation: 10s linear 0s normal none infinite animate;
        animation: 10s linear 0s normal none infinite animate;
    }
    
    @-webkit-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-moz-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-ms-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @-o-keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
    }
    
    @keyframes animate {
        from {background-position:0 0;}
        to {background-position: 500px 0;}
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