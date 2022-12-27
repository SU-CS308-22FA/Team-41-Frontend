<template>
  <NewNav></NewNav>
  <div class="whole">
    <div class="standings">
      <div v-if="standings.length === 0 || finishedLoading === false">
        <loadingPage></loadingPage>
      </div>
      <div>
        <div class="headings">
          <table>
            <tr class="col">
              <th>Position</th>
              <th>Club Name</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Goal Difference</th>
              <th>Points</th>
            </tr>
            <tr
              class="cl"
              v-for="item in standings.slice(0, 1)"
              :key="item.teamId"
              @click="navToTeam(item.teamId)"
            >
              <td class="clrank">{{ item.rank }}</td>
              <td>{{ item.teamName }}</td>
              <td>{{ item.winCount + item.drawnCount + item.loseCount }}</td>
              <td>{{ item.winCount }}</td>
              <td>{{ item.drawnCount }}</td>
              <td>{{ item.loseCount }}</td>
              <td>{{ item.goalsFor }}</td>
              <td>{{ item.goalsAgainst }}</td>
              <td>{{ item.average }}</td>
              <td>{{ item.points }}</td>
            </tr>
            <tr
              class="uefa"
              v-for="item in standings.slice(1, 3)"
              :key="item.teamId"
              @click="navToTeam(item.teamId)"
            >
              <td class="uefarank">{{ item.rank }}</td>
              <td>{{ item.teamName }}</td>
              <td>{{ item.winCount + item.drawnCount + item.loseCount }}</td>
              <td>{{ item.winCount }}</td>
              <td>{{ item.drawnCount }}</td>
              <td>{{ item.loseCount }}</td>
              <td>{{ item.goalsFor }}</td>
              <td>{{ item.goalsAgainst }}</td>
              <td>{{ item.average }}</td>
              <td>{{ item.points }}</td>
            </tr>
            <tr
              class="pos"
              v-for="item in standings.slice(3, -4)"
              :key="item.teamId"
              @click="navToTeam(item.teamId)"
            >
              <td class="posrank">{{ item.rank }}</td>
              <td>{{ item.teamName }}</td>
              <td>{{ item.winCount + item.drawnCount + item.loseCount }}</td>
              <td>{{ item.winCount }}</td>
              <td>{{ item.drawnCount }}</td>
              <td>{{ item.loseCount }}</td>
              <td>{{ item.goalsFor }}</td>
              <td>{{ item.goalsAgainst }}</td>
              <td>{{ item.average }}</td>
              <td>{{ item.points }}</td>
            </tr>
            <tr
              class="down"
              v-for="item in standings.slice(-4)"
              :key="item.teamId"
              @click="navToTeam(item.teamId)"
            >
              <td class="downrank">{{ item.rank }}</td>
              <td>{{ item.teamName }}</td>
              <td>{{ item.winCount + item.drawnCount + item.loseCount }}</td>
              <td>{{ item.winCount }}</td>
              <td>{{ item.drawnCount }}</td>
              <td>{{ item.loseCount }}</td>
              <td>{{ item.goalsFor }}</td>
              <td>{{ item.goalsAgainst }}</td>
              <td>{{ item.average }}</td>
              <td>{{ item.points }}</td>
            </tr>
          </table>
        </div>
        <div class="grid-container">
          <div class="grid-item-cl"></div>
          <div class="grid-item">Champions League Qualifiers</div>
          <div class="grid-item-uefa"></div>
          <div class="grid-item">UEFA League Qualifiers</div>
          <div class="grid-item-down"></div>
          <div class="grid-item">Relegation</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewNav from "./newNav.vue";

export default {
  path: "/standings",
  name: "AllStandings",
  components: {
    NewNav,
  },
  data() {
    return {
      standings: [],
    };
  },
  mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("https://tfb308.herokuapp.com/api/v1/standings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.standings = data.returnObject;
        }
        this.finishedLoading = true;
      });
  },
  methods: {
    navToTeam(id) {
      this.$router.push({ name: "TeamPage", params: { teamId: id } });
    },
  },
};
</script>

<style>
.standings {
  display: flex;
  margin: auto;
}

.standings th {
  padding: 10px;
  font-weight: bold;
}
.standings td {
  padding: 30px;
  font-weight: bold;
}
.headings {
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
.pos .posrank {
  color: black;
  background: grey;
}
.pos:hover {
  background-color: grey;
}

.pos:hover td {
  color: #000000;
}

.down {
  color: red;
  background: ghostwhite;
  border-bottom: 2px solid black;
}
.cl {
  color: rgb(50, 205, 50);
  border-bottom: 2px solid black;
}
.cl .clrank {
  background: rgb(50, 205, 50);

  color: black;
}
.cl:hover {
  background-color: rgb(50, 205, 50);
}
.cl:hover::after {
  transition: width 0.3s ease;
}

.cl:hover td {
  color: #000000;
}

.down:hover {
  background-color: red;
}

.uefa {
  color: rgb(32, 178, 170);
  background: ghostwhite;
  border-bottom: 2px solid black;
}
.uefa .uefarank {
  background-color: rgb(32, 178, 170);
  color: black;
}
.uefa:hover {
  background-color: rgb(32, 178, 170);
}

.uefa:hover td {
  color: #000000;
}

.down:hover td {
  color: #000000;
}
.down .downrank {
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
  background-color: rgb(50, 205, 50);
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 10%;
  margin-right: 5%;
  margin-top: 10%;
  font-size: 30px;
  text-align: center;
}
.grid-item-uefa {
  border: 1px solid rgba(0, 0, 0, 0.8);
  background-color: rgb(32, 178, 170);
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
.col th {
  padding-top: 1%;
  padding-bottom: 2%;
  padding-left: 1%;
  padding-right: 1%;
}
</style>
