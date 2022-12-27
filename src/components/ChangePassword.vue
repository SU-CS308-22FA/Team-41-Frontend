
<template>
    <NewNav></NewNav>

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
    import NewNav from './newNav.vue';

    export default {
        path: '/EditProfile',
        name: 'EditProfile',
        components: {
            NewNav,
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
    }

    body{
        margin: 0;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom:0px;
    }
    
    .container{
        background-size: cover;
        height:100%;
        width: 100%;
        align-items: center;
        display: flex;
        padding-left: 33%;
        margin-top: 5%;
        margin-left: 5%;
    }

    .editp{
        background-color: rgb(138, 138, 204);
        width: 35%;
        height: 55%;
        padding: 7%;
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