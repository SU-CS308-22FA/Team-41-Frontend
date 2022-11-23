<template>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <div class="container">
        <div class="content">
            <div class="cards">
                <div v-for="item in items[0]" :key="item.id" class="card">
                    <div class="box">                 
                        <h2>{{item.userId}} - {{item.topic}}</h2> 
                        <h3>{{item.body}}</h3>
                    </div>
                    <div class="icon-case">
                        <button><img src="../assets/likee.png" width=45px height=45px alt=""></button> 
                        <br><br><br>
                        <button><img src="../assets/trashh.png" width=45px height=45px alt=""></button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from './NavBar.vue';
    import SideBar from './SideBar.vue';

    export default {
        path: '/ShowFeedback',
        name: 'ShowFeedback',
        components: {
            NavBar,
            SideBar,
        },
        data(){
            return {items : []};
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
                    this.items.push(data.returnObject);
                }
                
            });
        },

        
    };
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: left;
}

body{
    min-height: 100vh;
    max-width: 10vh;
}
a{
    text-decoration: none;
}
li{
    list-style: none;
}
h2{
    color:rgba(218, 38, 152, 0.978);
    padding-top: 10px;
    padding-bottom: 10px;
}

h3{
    color: black(16, 16, 16, 0.532);
    padding-top: 10px;
    padding-bottom: 10px;
}

.side-menu{
    position: fixed;
    background: rgba(31, 28, 101, 0.818);
    width:31.5vh;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-top: 6.5vh;
    margin-left: -1%;
    
    flex-direction: column;
}

.side-menu li{
    font-size: 24px;
    padding: 15px 40px;
    color: white;
    display: flex;
    align-items: center;
}
.side-menu li:hover{
    background: white;
    color: rgba(31, 28, 101, 0.818);
    cursor: pointer;
    font-weight: bold;
}
.container{
    position: fixed;
    right:-28px;
    width: 85vw;
    height: 85.2vh;
    background: rgba(185, 185, 185, 0.725);
    margin-right: 3.7vh;
    margin-top: 6.7vh;
    overflow-y:auto;
    
    
    
}
.container .content{
    position:relative;
    margin-top:5vh;

}

.container .content .cards{
    padding: 20px 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.container .content .cards .card{
    width:530px;
    height:200px;
    background: white;
    margin: 30px 10px;
    padding: 10px 20px;
    display:flex;
    
    justify-content: space-around;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0, 0.18);
}
.container .content .cards .card .icon-case{
   padding-top: 20px;
   

}
.container .content .cards .card .icon-case img:hover{
    cursor: pointer;
    transform: scale(1.1);

}
button{
    background-color: white;
    border: none;
    
}

</style>