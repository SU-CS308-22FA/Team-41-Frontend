<template>

    <HarunNavBar></HarunNavBar>
    <SideBar></SideBar>

    <div class="whole">
        <div class="standings">
            <div v-if="users.length === 0 || finishedLoading === false">
                <loadingPage></loadingPage>
            </div>
            <div >
                <div class="headings">
                    <table >
                        <tr class="col">
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Gender</th>
                            <th>Birthdate</th>
                            <th>Fanteam</th>
                        </tr>
                        <tr class= "uefa" v-for="user in users" :key="user.userId">
                            <td>{{user.userId}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.mail}}</td>
                            <td>{{user.gender}}</td>
                            <td>{{user.birthdate}}</td>
                            <td>{{user.fanTeam}}</td>
                            <td>
                                <button @click="banUser(user.userId)">deactivate</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import HarunNavBar from './HarunNavBar.vue';
    import SideBar from './SideBar.vue';
    //import loadingPage from './loadingPage';

    export default{
        path: "/usersList",
        name: "UsersList",
        components: {
            HarunNavBar,
            SideBar
        },
        data(){
            return {
                users: [],
                userId: ""
            }
        },
        methods: {
            banUser(user2banId) {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                };
                fetch("https://tfb308.herokuapp.com/api/v1/user/" + this.userId + "/ban/" + user2banId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    alert(data.returnObject);
                    this.finishedLoading = true;
                });
            }
        },
        mounted() {
            if(localStorage.userId) this.userId = localStorage.userId;

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch("https://tfb308.herokuapp.com/api/v1/user/" + this.userId + "/users", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === "200") {
                    this.users = data.returnObject;
                }
                this.finishedLoading = true;
            });
        }
    }


</script>



<style>

.standings{
    display: flex;
    margin: auto;
}


.standings th{
    
    padding: 10px;
    font-weight: bold;
}
.standings td{
    padding: 30px;
    font-weight: bold;
    
}
.headings{
	text-align: center;
	text-decoration: none;
	color: black;
	margin: 30px;
	display: block;
    background: ghostwhite;
}



.pos {
    color: black;
    background: ghostwhite;
    border-bottom: 2px solid black;
}
.pos .posrank{
    color:black;
    background: grey;
}
.pos:hover{
	background-color: grey;
}

.pos:hover td{
	color: #000000;
    
}

.down {
    color: red;
    background: ghostwhite;
    border-bottom: 2px solid black;
}
.cl{
    color: rgb(50,205,50);
    border-bottom: 2px solid black;
}
.cl .clrank{
    background: rgb(50,205,50);
    
    color: black;
}
.cl:hover{
	background-color: rgb(50,205,50);
    
}
.cl:hover::after{
    transition: width 0.3s ease;
}

.cl:hover td{
	color: #000000;
    
}

.down:hover{
	background-color: red;
}

.uefa {
    color: rgb(32,178,170);
    background: ghostwhite;
    border-bottom: 2px solid black;;
}
.uefa .uefarank{
    background-color: rgb(32,178,170);
    color: black;
}
.uefa:hover{
	background-color: rgb(32,178,170);
}

.uefa:hover td{
	color: #000000;
    
}

.down:hover td{
	color: #000000;
    
}
.down .downrank{
    background: red;
    color: black;
}
.grid-container {
  display: grid;
  grid-template-columns: 5% 95%;
  width: 50%;
  padding: 10px 10px 10px 10px;
  
}
.grid-item {
  color: black;
  
  padding-left: 5%;
  font-size: 20px;
  text-align: left;

}
.grid-item-cl {
  background-color: rgb(50,205,50);
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10%;
  margin-right: 5%;
  margin-top: 10%;
  font-size: 30px;
  text-align: center;
}
.grid-item-uefa {
  
  border: 1px solid rgba(0, 0, 0, 0.8);
  background-color: rgb(32,178,170);
  font-size: 30px;
  text-align: center;
  margin-bottom: 10%;
  margin-right: 5%;
  margin-top: 10%;
}
.grid-item-down {
  background-color: red;
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10%;
  margin-right: 5%;
  font-size: 30px;
  margin-top: 10%;
  text-align: center;
}
.col th{
    padding-top: 1%;
    padding-bottom: 2%;
    padding-left: 1%;
    padding-right:1%;
}



</style>