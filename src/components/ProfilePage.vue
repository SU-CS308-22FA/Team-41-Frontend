<template>
    <LoggedNavBar></LoggedNavBar>

    <div class="container">
        <form class="user-info">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Personal Information</h2>
            <img src="../assets/pp.jpg" alt="" class="center">
            <br>
            <br>
            <br>

            Name <b>UserName</b>
            <br>
            <br>
            Email <b>UserEmail</b>
            <br>
            <br>
            Gender <b>UserGender</b>

            <div class="edit">
                <div><p><a href="">Edit Profile</a></p></div>
            </div>
            
        </form>
    </div>
</template>

<script>
    import LoggedNavBar from './LoggedNavBar.vue'

    export default {
        path: '/ProfilePage',
        name: 'ProfilePage',
        components: {
            LoggedNavBar,
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
        padding-left: 33%;
        align-items: center;
    }

    .user-info{
        background-color: ghostwhite;
        width: 450px;
        height: 550px;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: center;
    }

    img{
        box-sizing: border-box;
        width: 149px;
        height: 149px;
        border-radius: 50%;
        margin:0;
        border:5px solid rgba(31, 28, 101, 0.818);
        padding:3px;
        background-color: white;
        
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 37%;
    }
    

    .edit{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .edit a {
        color:rgba(17, 73, 158, 0.818);
        text-decoration: none;
        font-weight: bold;
        transition: 0.1s ease;
    }

    .edit a:hover{
        color:rgb(5, 5, 74);
    }
</style>