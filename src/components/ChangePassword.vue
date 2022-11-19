
<template>
    <LoggedNavBar></LoggedNavBar>

    <div class="container">
    
            
        <div class="editp">      
            <div class="info">
                <h2 style="color: rgba(17, 73, 158, 0.818)">Change Password</h2>
                <br><br>
                <input type="password" name="" placeholder="Current password">
                <input type="password" name="" placeholder="New password">
                <input type="password" name="" placeholder="New password (again)">
                <button @click="goToProfile" style="float:left;">CANCEL</button>
                <button @click="goToProfile" style="float:left; margin-left: 4%;">DONE</button>
                
            </div>

        </div>
            
            

    </div>
</template>

<script>
    import LoggedNavBar from './LoggedNavBar.vue'

    export default {
        path: '/EditProfile',
        name: 'EditProfile',
        components: {
            LoggedNavBar,
        },
        methods: {
            goToProfile() {
                this.$router.replace("/profilepage");
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
    
    .container{
        background-color: rgba(47, 20, 109, 0.8);
        background-image: linear-gradient(to bottom, rgba(145,146,122,0.62),rgba(47, 20, 109, 0.8)),url(../assets/ball.jpg);
        background-size: cover;
        height:100vh;
        width: 136.3vh;
        margin: 3.2% -1% 0 -1%;
        
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
        margin-left: -10%;
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
        margin-top: 70%;
        margin-left: 50%;
        padding: 3px 1px -3px 1px;
        height: 40px;
        width: 180px;
    }



</style>