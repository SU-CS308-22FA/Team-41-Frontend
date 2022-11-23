<template>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <body>
        <div class="container">
            <form class="user-info">
                <h2 style="color: rgba(17, 73, 158, 0.818)">Personal Information</h2>
                <br>
                <br>
                <br>

                Name <b>{{name}}</b>
                <br>
                <br>
                Email <b>{{mail}}</b>
                <br>
                <br>
                Gender <b>{{gender}}</b>

                <div class="edit">
                    <div class="editprofile" @click="goToEdit"><p><a>Edit Profile</a></p></div>
                    <div class="logout" @click="logOut"><p><a>Log Out</a></p></div>
                    <div class="deleteacc" @click="deleteAccount"><p><a>Delete Account</a></p></div>
                </div>
                
            </form>
        </div>
    </body>
</template>

<script>
    import NavBar from './NavBar.vue'
    import SideBar from './SideBar.vue'

    export default {
        path: '/profilepage',
        name: 'ProfilePage',
        components: {
            NavBar,
            SideBar,
        },
        data() {
            return {
                userId: "",
                name: "",
                mail: "",
                gender: "",
            };
        },
        methods: {
            goToEdit() {
                this.$router.replace("/editprofile");
            },

            logOut() {
                localStorage.clear();
                this.$router.replace("/login");
            },
            
            deleteAccount(){
                const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/" + this.userId,requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status !== "200") {
                        alert("Account Deletion Failed!\n"+data.returnObject);
                        return;
                    }
                    alert("Account Successfully Deleted");
                    localStorage.removeItem("isLogedIn");
                    localStorage.removeItem("userId");

                    this.$router.replace("/login");
                })
            }
        },
        mounted() {
            if(localStorage.userId) this.userId = localStorage.userId;

            const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/" + this.userId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === "200") {
                        this.mail = data.returnObject.mail;
                        this.name = data.returnObject.name;
                        this.gender = data.returnObject.gender;

                    }
                    else if(data.status === "400: USER NOT FOUND!") {
                        alert("User Does not exist!");
                    }
                    else {
                        alert("Invalid cridentials!");
                    }
                });
        },
    };
</script>

<style scoped>

    body{
        display: flex;
        top: 110px;
        height: 100%;
        position: absolute;
        bottom:0px;
    }
    .container{
        height:100vh;
        width: 136.3vh;
        text-align: center;
        display: flex;
        padding-left: 33%;
        align-items: center;
    }

    .user-info{
        background-color: rgb(138, 138, 204);
        width: 450px;
        height: 550px;
        padding:30px;
        margin: 1.1em 1em;
        display:grid;
        border-radius: 8px;
        text-align: center;
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

    .edit .deleteacc a{
        color: red;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        transition: 0.1s ease;
    }

    .edit a:hover{
        color:rgb(5, 5, 74);
        cursor: pointer;
    }
</style>