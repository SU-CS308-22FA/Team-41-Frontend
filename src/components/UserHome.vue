<template>
    <LoggedNavBar></LoggedNavBar>
    <div class="container">
        <div id="div1">

        </div>
        <div id="div2">

        </div>
        <div id="div3">

        </div>
        <div id="div4">

        </div>
    </div>
</template>

<script>
    import LoggedNavBar from './LoggedNavBar.vue'

    export default {
        path: '/UserHome',
        name: 'UserHome',
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
        position: absolute;
        bottom:0px;
        padding: 0;
    }
    .container{


    }

    div1 { 
        top: 0;
        left: 0;   
        background: orange;
        position: fixed;
        width: 50%; 
        height: 50%;
    }
    .div2 { 
        top: 0;
        left: 50%;   
        background: blue;
        position: fixed;
        width: 50%; 
        height: 50%;
    }
    .div3 { 
        top: 50%;
        left: 0;   
        background: green;
        position: fixed;
        width: 50%; 
        height: 50%;
    }
    .div4 { 
        top: 0;
        left: 0;   
        background: red;
        position: fixed;
        width: 50%; 
        height: 50%;
    }


    

</style>