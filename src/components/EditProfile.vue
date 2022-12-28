<template>
    <NavBar></NavBar>
    <div class="edit-profile-page">
        <form class="edit-form">
            <h2 style="color: rgba(17, 73, 158, 0.818)">Edit Profile</h2>
            <br>
            <br>
            <input ref="name" v-model="name" type="text" name="" placeholder="Name" :value="name">
            <br>
            <input v-model="mail" type="email" name="" placeholder="Email">
            <br>
            <input v-model="gender" type="text" name="" placeholder="Gender">
            <br>
            <br>
            <div class="row-mb-3">
                <button class="col btn btn-secondary but" @click="goToProfile">CANCEL</button>
                <button class="col btn btn-danger but" @click="updateUser">SAVE</button>
            </div>
        </form>
    </div>
</template>

<!-- 
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
-->

<script>
    import NavBar from './navbar.vue';

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
                password: "",
            };
        },
        beforeMount: function() {
            this.name = this.$el.querySelector('[ref="name"]').value;
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
                    this.name = data.returnObject.name;
                }
            })

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
    .edit-profile-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .edit-form{
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
        padding: 6px;
    }

    .fan-team-but:hover{
        background-color: rgba(33, 66, 114, 0.818);
        color: white;
        border-radius: 10px;
    }
</style>