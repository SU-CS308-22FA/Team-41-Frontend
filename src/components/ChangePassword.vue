<template>
    <NavBar></NavBar>
    <div class="edit-pass-page">
        <div class="col d-flex justify-content-center">
            <form class="edit-pass-form">
                <div class="row col-sm-3" style="margin: auto; width: 300px;">
                    <h2 class="edit-pass-form-title">Change Password</h2>
                    <input type="text" name="email" value="" autocomplete="email" style="display: none;">
                    <input class="form-pass-elem" v-model="oldPassword" type="password" name="" placeholder="current password" minlength="8" autocomplete="current-password">
                    <input class="form-pass-elem" v-model="password" type="password" name="" placeholder="new password" minlength="8" autocomplete="new-password">
                    <input class="form-pass-elem" v-model="repassword" type="password" name="" placeholder="new re-password"  minlength="8" autocomplete="new-password">
                </div>
                <div class="row row-sm-3" style="margin: auto; width: fit-content;">
                    <button class="btn btn-secondary but-pass" @click="goToProfile()">CANCEL</button>
                    <button class="btn btn-danger but-pass" :disabled="!fine()" @click="updatePassword()">SAVE</button>
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
        data() {
            return{
                oldPassword: "",
                password: "",
                repassword: "",
                id: "",
            }
        },
        mounted() {
            if(localStorage.userId) this.id = localStorage.userId;
        },
        methods: {
            fine() {
                return this.diffPass() && this.sameNewPass() && this.password.length >= 8;
            },
            diffPass() {
                return this.password !== this.oldPassword && this.oldPassword.length >= 8;
            },
            sameNewPass() {
                return this.password === this.repassword;
            },
            goToProfile() {
                this.$router.replace("/profilepage");
            },
            updatePassword() {
                const {oldPassword, password, id} = this;

                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id,
                        password,
                        oldPassword
                    })
                };

                fetch("https://tfb308.herokuapp.com/api/v1/user/changePassword", requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data.status + '');
                    if (data.status !== "200"){
                        alert("Error!\n" + data.returnObject);
                        console.log(data.status + '');
                    }
                });
            },
        }
    };
</script>

<style scoped>
    .edit-pass-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .edit-pass-form{
        background-color: ghostwhite;
        width: fit-content;
        height: fit-content;
        padding:30px;
        margin: auto;
        display:grid;
        border-radius: 8px;
        text-align: center;
    }

    .edit-pass-form-title{
        color: rgba(17, 73, 158, 0.818);
        margin-bottom: 100px;
        text-align: center;
    }

    .form-pass-elem{
        margin-bottom: 20px;
        text-align: center;
    }

    .but-pass{
        margin-top: 60px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 25px;
        width: 210px;
    }

    .but-pass:hover{
        transform: scale(1.1);
    }
</style>