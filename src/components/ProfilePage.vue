<template>
    <NavBar></NavBar>
    <div class="profile-page">
        <form class="user-info">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Personal Information</h2>
            <br>
            <br>
            Name<b>{{name}}</b>
            <br>
            Email<b>{{mail}}</b>
            <br>
            Birthdate <b>{{birthdate}}</b>
            <br>
            Gender <b>{{gender}}</b>
            <br>
            Fan Team <a class="fan-team-but"><b>{{fanTeam}}</b></a>
            <br><br>

            <div class="row-mb-3">
                <button class="col btn btn-secondary but" @click="goToEdit">Edit Profile</button>
                <button class="col btn btn-danger but" @click="deleteAccount">Delete Account</button>
            </div>
            
        </form>
    </div>
</template>

<script>
    import NavBar from './navbar.vue'

    export default {
        path: '/profilepage',
        name: 'ProfilePage',
        components: {
            NavBar,
        },
        data() {
            return {
                userId: "",
                name: "",
                mail: "",
                gender: "",
                birthdate: "",
                fanTeam: "",
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
                        this.birthdate = data.returnObject.birthdate.replace('T', ' ');
                        this.gender = data.returnObject.gender;
                        this.fanTeam = data.returnObject.fanTeam;
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
    .profile-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .user-info{
        background-color: ghostwhite;
        width: auto;
        height: fit-content;
        padding:30px;
        margin: auto;
        display:grid;
        border-radius: 8px;
        text-align: center;
    }

    .but{
        margin: 20px 20px 20px 20px;
        width: 210px;
    }

    .but:hover{
        transform: scale(1.1);
    }

    .fan-team-but{
        text-decoration: none;
        color: black;
        width: fit-content;
        margin: auto;
        padding: 3.5px;
    }

    .fan-team-but:hover{
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
        border-radius: 10px;
    }
</style>