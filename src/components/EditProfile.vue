<template>
    <NavBar></NavBar>
    <div class="edit-profile-page">
        <div class="col d-flex justify-content-center">
            <form class="edit-form">
                <div class="row col-sm-3" style="margin: auto; width: 250px;">
                    <h2 class="edit-form-title">Edit Profile</h2>
                    <input class="form-elem" v-model="name" type="text" name="" placeholder="Name">
                    <input class="form-elem" v-model="mail" type="email" name="" placeholder="Email">
                    <input class="form-elem" v-model="gender" type="text" name="" placeholder="Gender">
                    <button class="btn btn-info but" @click="this.$router.replace('ChangePassword')">Change Password</button>
                </div>
                <div class="row row-sm-3" style="margin: auto; width: fit-content;">
                    <button class="btn btn-secondary but" @click="goToProfile()">CANCEL</button>
                    <button class="btn btn-danger but" :disabled="!isChanged()" @click="updateUser()">SAVE</button>
                </div>
            </form>
        </div>
    </div>
</template>

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
                gender: "",
                myUser: {},
            };
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
                    this.mail = data.returnObject.mail;
                    this.gender = data.returnObject.gender;
                    this.myUser = data.returnObject;
                }
            })

        },
        methods: {
            goToProfile() {
                this.$router.replace("/profilepage");
            },
            isChanged() {
                let i = 0;
                if(this.name === this.myUser.name) {
                    i = i + 1;
                }
                if(this.mail === this.myUser.mail) {
                    i = i + 1;
                }
                if(this.gender === this.myUser.gender) {
                    i = i + 1;
                }
                return i !== 3;
            },
            updateInfo(){
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
                    }
                    location.reload();
                });
            },
            updateUser() {
                this.updateInfo();
                this.goToProfile();
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
        width: fit-content;
        height: fit-content;
        padding:30px;
        margin: auto;
        display:grid;
        border-radius: 8px;
        text-align: center;
    }

    .edit-form-title{
        color: rgba(17, 73, 158, 0.818);
        margin-bottom: 30px;
        text-align: center;
    }

    .form-elem{
        margin-bottom: 20px;
        text-align: center;
    }

    .but{
        margin: 20px 20px 20px 20px;
        width: 210px;
    }

    .but:hover{
        transform: scale(1.1);
    }
</style>