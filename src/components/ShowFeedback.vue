<template>
    <AdminNavBar></AdminNavBar>
    <div class="feedback-list d-flex justify-content-center">
        <div v-if="items.length === 0 && finishedLoading === true" class="not-found-feedback">
            No Feedbacks Found!
        </div>
        <div v-else-if="items.length === 0 || finishedLoading === false">
            <loadingPage></loadingPage>
        </div>
        <div v-else>
            <table class="feedback-table">
                <tr>
                    <th>User Id</th>
                    <th>Topic</th>
                    <th>Feedback</th>
                    <th></th>
                </tr>
                <tr v-for="item in items" :key="item.id" class="feedback-table-row">
                    <td class="card-title">{{ item.userId }}</td>
                    <td class="card-text">{{ item.topic }}</td>
                    <td class="card-text">{{ item.body }}</td>
                    <td>
                        <button class="btn btn-danger but" @click="removeFeedback()">remove</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import AdminNavBar from './adminNavbar.vue';
    import loadingPage from './loadingPage.vue';

    export default {
        path: '/ShowFeedback',
        name: 'ShowFeedback',
        components: {
            AdminNavBar,
            loadingPage,
        },
        data(){
            return {
                items : [],
                finishedLoading: false,
            };
        },
        mounted(){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/feedback" , requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.items = data.returnObject;
                }
                this.finishedLoading = true;
            });
        },
        methods: {
            removeFeedback() {
                //TODO
            },
        }
    };
</script>

<style scoped>

    .feedback-list{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        height: 100vh;
        background: rgba(185, 185, 185, 0.725);
    }

    .not-found-feedback{
        margin-top: 300px;
        font-weight: bold;
        font-style: italic;
        font-size: 35px;
    }

    .feedback-box{
        justify-content: space-between;
        padding: 10px 16px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        height: auto;
        background-color: white;
    }

    .feedback-table{
        border: 1px solid black;
    }

    .feedback-table-row{
        border: 1px solid black;
    }

    th {
        margin: auto;
        padding: 25px 25px 25px 25px;
        background-color: cadetblue;
    }

    .feedback-table-row td {
        border: 1px solid black;
        margin: auto;
        padding: 25px 25px 25px 25px;
        background-color: antiquewhite;
    }

    .but:hover{
        transform: scale(1.1);
    }
</style>