<template>
    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>
    <div class="container">
        <form class="login-form" @submit.prevent="login">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Login</h2>
            <br>

            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="Enter mail" type="text" pattern="[^@]+@[^\.]+\..+" title="Invalid email address" required on-error="Invalid email address">

            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password">

            <button class="login">
                <a>Login</a>
            </button>

            <div class="error">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                {{errorMsg}}
            </div>
            <br>
            <div class="admin">
                <div><p><a>Login as admin</a></p></div>
            </div>
            <br>
            <div class="forget">
                <div><p>Forget Password?<br> Click <a> here</a></p></div>
            </div>
            <br>
            <div class="acc">
                <div><p>Don't have an account?<br> Click <router-link class= "navborder" to="/signup">here</router-link></p></div>
            </div>
        </form>
    </div>
</template>

<script>
    import HarunNavBar from './HarunNavBar.vue'
    import SideBar from './SideBar.vue'

    export default {
        path: '/login',
        name: 'LogIn',
        components: {
            HarunNavBar,
            SideBar
        },
        data() {
            return {
                mail: "",
                password: "",
                isLoged: false,
                userId: "",
                errorMsg: "",
            };
        },
        methods: {
            login() {
                const { mail, password } = this;

                var x = document.querySelector(".error");
                x.style.display = "none";
                this.errorMsg = "";

                localStorage.userError = "";
                localStorage.passwordError = "";
                localStorage.otherError = "";
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
                        if(res2.status === "400: USER NOT FOUND!") {
                            this.errorMsg = "Email not found!";
                        } else if (res2.status === "400: WRONG PASSWORD!"){
                            this.errorMsg = "Wrong Password!";
                        } else {
                            this.errorMsg = res2.status;
                        }
                        if (x.style.display === "none") {
                            x.style.display = "block";
                        }
                        return;
                    }
                    console.log(res2.returnObject);
                    window.localStorage.setItem("isLogedIn", true);
                    window.localStorage.setItem("userId", res2.returnObject.id);
                    window.localStorage.setItem("isAdmin", res2.returnObject.admin);
                    this.$router.push("/profilepage");// user profile sayfasina yonlendirilecek.
                });
            }
        },
    };
</script>


<style scoped>
    .container{
        background-size: cover;
        height:100%;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        padding-left: 60%;
        margin-left: 0%;
        margin-bottom: 0%;
    }

    .login-form{
        background-color: rgb(138, 138, 204);
        width: 55%;
        height: 100%;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: left;

        /*background: #2980b9 url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
        -webkit-animation: 10s linear 0s normal none infinite animate;
        -moz-animation: 10s linear 0s normal none infinite animate;
        -ms-animation: 10s linear 0s normal none infinite animate;
        -o-animation: 10s linear 0s normal none infinite animate;
        animation: 10s linear 0s normal none infinite animate;*/
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
    .login:hover{
        cursor: pointer;
        transform: scale(1.1);
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
        cursor: pointer;
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
        cursor: pointer;
    }

    .error {
        display: none;
        padding: 20px;
        background-color: #f44336; /* Red */
        color: white;
        margin-bottom: 15px;
    }

        /* The close button */
    .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

        /* When moving the mouse over the close button */
    .closebtn:hover {
        color: black;
    }
</style>