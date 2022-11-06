<template>
    <NavBar></NavBar>
    <div>
        <body>
            <br><br><br>
            <button type="button" v-on:click="getData()">get data</button>
            <h1>{{msg}}</h1>
        </body>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        path: '/HomePage',
        name: 'HomePage',
        components: {
            NavBar,
        },
        data() {
            return {
                msg: "",
            };
        },
        methods: {
            getData() {
                const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                };
                /*
                #mw-content-text > div.mw-parser-output > table:nth-child(30) > tbody > tr:nth-child(1) > td:nth-child(1) > a
                */
                fetch('https://en.wikipedia.org/api/rest_v1/page/html/S%C3%BCper_Lig', requestOptions)
                .then(res => {
                    alert(res);
                    console.log(res);
                })
                    //window.localStorage.msg = (res2.substr(res2.find("<table>"), res2.find("</table>")));
            }
        },
    };
</script>

<style scoped>
img{
    height:500px;
    width:500px;
}
</style>
