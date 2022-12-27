<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="content">
      <div class="cards">
        <div class="card">
          <div class="box">
            <h1>214</h1>
            <h3>Users</h3>
          </div>
          <div class="icon-case">
            <img src="../assets/user.png" width="55px" height="55px" alt="" />
          </div>
        </div>
        <div class="card" @click="goToReferee">
          <div class="box">
            <h1>33</h1>
            <h3>Referees</h3>
          </div>
          <div class="icon-case">
            <img
              src="../assets/referee.png"
              width="55px"
              height="55px"
              alt=""
            />
          </div>
        </div>
        <div class="card">
          <div class="box">
            <h1>4</h1>
            <h3>Matches</h3>
          </div>
          <div class="icon-case">
            <img
              src="../assets/calendar.png"
              width="50px"
              height="50px"
              alt=""
            />
          </div>
        </div>
        <div class="card" @click="goToFeedback">
          <a>
            <div class="box">
              <h1>11</h1>
              <h3>Feedback</h3>
            </div>
          </a>
          <a>
            <div class="icon-cased">
              <img
                src="../assets/feedback.png"
                width="50px"
                height="50px"
                alt=""
              />
            </div>
          </a>
        </div>
      </div>
      <div class="content-2">
        <div class="week">
          <div class="title">
            <h2>This Week's Matches</h2>
            <a href="/fixturePage" class="btn">View All</a>
          </div>
          <table>
            <tr v-for="match in matches" :key="match.id">
              <td>{{ match.homeTeamName }}</td>
              <td>{{ match.goalHome }}</td>
              <td>-</td>
              <td>{{ match.goalAway }}</td>
              <td>{{ match.awayTeamName }}</td>
              <td>{{ match.referee }}</td>
              <td>{{ match.stadiumName }}</td>
              <td><a href="#" class="btn">View</a></td>
            </tr>
          </table>
        </div>
        <div class="reports">
          <div class="title">
            <h2>User Reports</h2>
            <a href="#" class="btn" @click="goToComments">View All</a>
          </div>
          <table>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.comment.username }}</td>
              <td>{{ item.comment.body }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./navbar.vue";

export default {
  path: "/AdminHome",
  name: "AdminHome",
  components: {
    NavBar,
  },
  date() {
    return {
      matches: [],
      items: [],
    };
  },
  mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("https://tfb308.herokuapp.com/api/v1/match/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.matches = data.returnObject;
        }
      });

    fetch("https://tfb308.herokuapp.com/api/v1/report/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.items = data.returnObject;
          console.log(this.items);
        }
      });
  },
  methods: {
    goToFeedback() {
      this.$router.replace("/ShowFeedback");
    },
    goToReferee() {
      this.$router.replace("/referees");
    },
    goToComments() {
      this.$router.replace("/ShowComments");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}

a {
  text-decoration: none;
}
li {
  list-style: none;
}
h1,
h2 {
  color: rgba(218, 38, 152, 0.978);
}
h3 {
  color: rgba(16, 16, 16, 0.532);
}

.side-menu {
  position: fixed;
  background: rgba(31, 28, 101, 0.818);
  width: 31.5vh;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 6.5vh;
  margin-left: -1%;

  flex-direction: column;
}

.side-menu li {
  font-size: 24px;
  padding: 15px 40px;
  color: white;
  display: flex;
  align-items: center;
}
.side-menu li:hover {
  background: white;
  color: rgba(31, 28, 101, 0.818);
  cursor: pointer;
  font-weight: bold;
}
.container {
  display: flex;
  background: rgba(185, 185, 185, 0.725);
  width: 100%;
  height: 100%;

  padding-top: 4.7%;
  margin-left: 0;
}
.container .content {
  position: flex;
  margin-top: 5vh;
  margin-left: 4%;
}

.container .content .cards {
  padding: 20px 25px;
  display: flex;

  justify-content: space-between;
  flex-wrap: wrap;
}
.container .content .cards .card {
  width: 250px;
  height: 150px;
  background: white;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.18);
}
.container .content .cards .card:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.container .content .cards .card .icon-case img {
  width: 55px;
  height: 55px;
}
.container .content .cards .card .icon-cased img {
  width: 65px;
  height: 65px;
}
.container .content .content-2 {
  min-height: 50vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-left: 3vh;
  margin-right: 2vh;
  margin-top: 5vh;
}
.container .content .content-2 .week {
  min-height: 40vh;
  flex: 5;
  background: white;
  margin: 0 25px 25px 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
}
.container .content .content-2 .reports {
  flex: 3;
  background: white;
  min-height: 40vh;
  margin: 0 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.18);
}
.btn {
  background: rgba(218, 38, 152, 0.978);
  color: white;
  padding: 5px 10px;
  text-align: center;
}
.btn:hover {
  color: rgba(218, 38, 152, 0.978);
  background: white;
  padding: 3px 8px;
  border: 2px solid rgba(218, 38, 152, 0.978);
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px 10px;
  border-bottom: 2px solid #9999;
}
.table {
  padding: 10px;
}
th,
td {
  text-align: left;
  padding: 8px;
}
</style>
