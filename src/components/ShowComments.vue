<template>
	<AdminNavBar></AdminNavBar>
    <div class="reports-page">
        <div v-if="finishedLoading">
            <div v-if="items.length > 0" class="row row-cols-2">
                <div class="col-6 card report-box" v-for="item in items" :key="item.id">
                    <div class="card-body">
                        <h4 class="card-title">Username: <b>{{ item.comment.username }}</b></h4>
                        <h6 class="card-text">Reason: <b>{{ item.type }}</b></h6>
                        <p class="card-text">Comment: <i>{{ item.comment.body }}</i></p>
                        <div class="col">
                            <button class="btn btn-danger but" @click="banUser()">Ban {{ item.comment.username }}</button>
                            <button class="btn btn-primary but" @click="delRep()">Delete Report</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="not-found-report">
                No Reports Found!
            </div>
        </div>
        <div v-else>
            <loadingPage></loadingPage>
        </div>
    </div>

</template>

<script>
    import AdminNavBar from "./adminNavbar.vue";
    import loadingPage from "./loadingPage.vue";

    export default {
        path: "/ShowComments",
        name: "ShowComments",
        components: {
            AdminNavBar,
            loadingPage
        },
        data() {
            return { 
                items: [],
                finishedLoading: false,
            };
        },
        mounted() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/report/all", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "200") {
                    this.items = data.returnObject;
                    this.finishedLoading = true;
                }
            });
        },
        methods: {
            banUser() {
                //TODO
            },

            delRep() {
                //TODO
            },
        }
    };
</script>

<style scoped>
    .reports-page {
        margin-top: 70px;
        padding: 25px;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

    .not-found-report{
        margin-top: 300px;
        font-weight: bold;
        font-style: italic;
        font-size: 35px;
    }

    .report-box{
        width: 46%;
        margin: 1% 2% 1% 2%;
        height: 200px;
    }

    .but{
        padding: auto;
        margin: 10px;
        width: fit-content;
    }

    .but:hover{
        font-weight: bold;
        font-style: italic;
        transform: scale(1.1);
    }
</style>