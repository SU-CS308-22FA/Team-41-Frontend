<template>
    <NavBar></NavBar>

    <div class="container">
    
            
        <div class="editp">      
            <div class="info">
                <h2 style="color: rgba(17, 73, 158, 0.818)">Edit Profile</h2>
                <input v-model="name" type="text" name="" placeholder="Name">
                <input v-model="mail" type="email" name="" placeholder="Email">
                <input v-model="gender" type="text" name="" placeholder="Gender">
                <button @click="goToProfile" style="float:left;">CANCEL</button>
                <button @click="updateUser" style="float:left; margin-left: 4%;">SAVE</button>
                
            </div>
            <div class="photo">
                <img src="../assets/pp.jpg" alt="" class="center">
                <br><br>
                <div class="editphoto">
                    <input type="file" name="" id="file" accept="image/*">
                    <label for="file">Edit Photo</label>
                    <button class="change"><router-link class= "navborder" to="/ChangePassword">Change Password</router-link></button>
   

                </div>
                
       
            </div>
        </div>
            
            

    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/EditProfile',
        name: 'EditProfile',
        components: {
            NavBar,
        },
        data(){
            return {
                name: "",
                mail: "",
                password: ""
            };
        },
        methods: {
            goToProfile() {
                this.$router.replace("/profilepage");
            },
            updateUser(){
                const {name, mail, gender} = this;

                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mail,
                        name,
                        gender,
                    })
                };

                fetch("https://tfb308.herokuapp.com/api/v1/user/" + localStorage.userId, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== "200"){
                        alert("Data Couldn't be Changed!\n"+data.returnObject);
                        return;
                    }
                    alert("Data Updated Successfully!");
                    this.$router.replace("/profilepage");
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
        background-color:rgba(47, 20, 109, 0.8);
    }

    body{
        margin: 0;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: rgba(47, 20, 109, 0.8);
        position: absolute;
        bottom:0px;
    }
    h2{
        margin-left: -70%;
    }
    .navborder{
        color:white;
        text-decoration: none;
        font-size: 15px;
    }
    
    .container{
        background-color: rgba(47, 20, 109, 0.8);
        background-image: linear-gradient(to bottom, rgba(145,146,122,0.62),rgba(47, 20, 109, 0.8)),url(../assets/ball.jpg);
        background-size: cover;
        height:100vh;
        margin: 3.2% -1% 0 -1%;
        width: 136.3vh;
        display: flex;
        padding-left: 33%;
        
    }

    img{
        box-sizing: border-box;

        width: 149px;
        height: 149px;
        border-radius: 50%;
        margin-bottom: -50%;

        border:5px solid rgba(31, 28, 101, 0.818);
        padding:3px;
        background-color: white;
        
    }
    .editp{
        background-color: ghostwhite;
        width: 450px;
        height: 550px;
        padding:40px;
        margin: 1.1em 1em;
        display: flex;
        border-radius: 8px;
        text-align: center;
    }
    .center {
       
        margin-left: 60%;
        margin-top: 5%;
        margin-bottom: 20%;
        width: 100%;
    }

    input[type="text"],
    input[type="password"],
    input[type="file"],
    input[type="email"]{
        display:block;
        box-sizing: border-box;
        background: none;
        margin-bottom: 60px;
        padding:4px;
        width:220px;
        height:32px;
        border:none;
        border-bottom: 1px solid;
        font-weight: 400;
        font-size: 15px;
        transition: 0.2;

    }
    h2{
        margin-left: -40%;
        margin-top: 5%;
        margin-bottom: 20%;
    }

    input[type="text"]:focus,
    input[type="password"]:focus,
    input[type="file"]:focus,
    input[type="email"]:focus{
        border-bottom: 2px solid;
        border-bottom-right-radius: 20px;
        transition: 0.2 ease;
    }

    button{
        border:1px solid;
        background-color: rgba(17, 73, 158, 0.818);
        color:white;
        height: 30px;
        width: 105px;
        border-radius: 5px;
        margin:0px;
        transition:all 0.3s;
    }

    button:hover{
        transform: scale(1.1);
        cursor:pointer;
    }

    input[type="file"]{
        display:none;
    }

    label{
        display:block;
        margin-left: 70%;
        margin-right: -60%;
        margin-top:-30%;
        font-size: 20px;
        background-color: rgba(17, 73, 158, 0.818);
        color:white;
        border:1px ;
        padding: 3px 0px;
        border-radius:5px;
        transition: all 0.3s;
    
      
    }
    label:hover{
        transform: scale(1.1);
        color:white;
        cursor:pointer;
    }
    .editphoto{
        width:140px;
        
    }
    .change{
        margin-top: 110%;
        margin-left: 50%;
        padding: 3px 1px -3px 1px;
        height: 40px;
        width: 180px;
    }



</style>