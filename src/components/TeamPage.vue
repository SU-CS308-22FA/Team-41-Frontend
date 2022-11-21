<template>
    <SideBar></SideBar>
    {{teamName}}
    {{teamId}}
</template>

<script>
    import SideBar from './SideBar.vue';
    //import loadingPage from './loadingPage';
    export default {
        props: ["teamId"],
        path: '/teamPage/:teamId',
        name: 'TeamPage',
        components: {
            SideBar,
            //loadingPage
        },
        data(){
            return {
                teamName: "",
            }
        },
        mount() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/team/" + this.teamId.toString(10), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.teamName = data.returnObject.name;
                }
            });
        },
    };
</script>

<style></style>