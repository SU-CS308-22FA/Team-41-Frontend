<template>
    <NavBar></NavBar>
    <SideBar></SideBar>
    
    <div class="container">
        <form class="signup-form" @submit.prevent="signup">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Sign Up</h2>
            <br>
            
            <label for="name">Name</label>
            <input name="name" v-model="name" placeholder="Name" type="text">
        
            <label for="mail">Mail</label>
            <input name="mail" v-model="mail" placeholder="Enter mail" type="email">
        
            <label for="password">Password</label>
            <input name="password" v-model="password" placeholder="Enter password" type="password" minlength="8" required autocomplete="current-password" >
        
            <label for="birthday">Birthdate</label>
            <input type="date" name="birthdate" v-model="birthdate">

            <a></a>

            <div>
                <input type="radio" id="male" value="Male" v-model="gender">
                <label for="male">Male</label>
                &nbsp;
                <input type="radio" id="Female" value="female" v-model="gender">
                <label for="female">Female</label>
                &nbsp;
                <input type="radio" id="Other" value="other" v-model="gender">
                <label for="other">Other</label>
            </div>

            <a></a>

            <label for="team">Choose your team</label>
            <select name="fanTeam" v-model="fanTeam" >
                <option v-for="item in items" :key="item.id" :value="item.name"> {{ item.name }} </option>
            </select>
            
            <button class="signup">
                <a>REGISTER</a>
            </button>
           
        </form>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue';
    import SideBar from './SideBar.vue';

    export default {
        path: '/signup',
        name: 'SignUp',
        components: {
            NavBar,
            SideBar,
        },
        data() {
            return {
                mail: "",
                name: "",
                password: "",
                birthdate: "",
                gender: "",
                fanTeam: "",
                items: [],
            };
        },
        mounted() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/team/all", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items = data.returnObject;
                }
            });
        },
        methods: {
            signup() {
                const { mail, name, password, gender, fanTeam } = this;
                const birthdate = this.birthdate.replaceAll("/", "-");

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mail,
                        name,
                        password,
                        gender,
                        birthdate,
                        fanTeam,
                    })
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/signup", requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if(data.status !== "200") {
                        alert("Signup Failed\n"+data.returnObject);
                        return;
                    }
                    this.$router.push("/login");
                    alert("Signup Succeed.");
                })
                
                
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
        position: absolute;
        bottom:0px;
    }
    .container{
        background-size: cover;
        height:100%;
        width: 100%;
        text-align: center;
        display: flex;
        margin-top: 2.5%;
        padding-left: 50%;
        align-items: center;
    }

    .signup-form{
        background-color: rgb(138, 138, 204);
        width: 60%;
        height: 100%;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: left;

        /*background: rgb(137, 200, 148) url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
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
    input[type=date]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 7px;
    }
    input[type=radio]{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 7px;
    }
    select{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 7px;
    }
    option{
        margin-bottom: 20px;
        border-radius: 7px;
        padding:6px;
        margin-top: 7px;
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

    .signup:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
</style>
