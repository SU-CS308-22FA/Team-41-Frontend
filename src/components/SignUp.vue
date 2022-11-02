<template>
    <NavBar></NavBar>
    <div class="container">
        <form class="signup-form" @submit.prevent="signup">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Sign Up</h2>
            
            <label for="name">Name</label>
            <input name="name" v-model="name" placeholder="Enter name" type="text">
        
            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="Enter mail" type="email">
        
            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="Enter password" type="password">
        
            <div>
                <input type="radio" id="male" value="Male" v-model="gender">
                <label for="male">Male</label>
                
                <input type="radio" id="Female" value="female" v-model="gender">
                <label for="female">Female</label>

                <input type="radio" id="Other" value="other" v-model="gender">
                <label for="other">Other</label>

            </div>
            <button class="signup">
                <a href="">REGISTER</a>
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
        data() {
            return {
                mail: "",
                name: "",
                password: "",
                gender: "",
            };
        },
        methods: {
            async signup() {
                const { mail, name, password, gender } = this;
                

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mail,
                        name,
                        password,
                        gender,
                    })
                };
                const response = await fetch("https://tfb308.herokuapp.com/api/v1/user/signup", requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    
                    alert("Welcome!");
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
                alert(response.status);
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
        margin-top: 7px;
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
