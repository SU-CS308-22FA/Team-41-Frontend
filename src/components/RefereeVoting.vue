<template>
  <NavBar></NavBar>
  <div>
    <h1>Referee Voting System</h1>
    <div class="d-flex justify-content-center">
      <table class="match-box">
        <tr>
          <th>Match</th>
          <th>Score</th>
          <th>Referee</th>
          <th>Date</th>
          <th>Judgement</th>
          <th>Consistency</th>
          <th>Knowledge</th>
          <th>Toughness</th>
          <th>Vote</th>
        </tr>
        <tr v-for="match in lastMatches" :key="match.id" class="matchx">
          <td>{{ match.homeTeamName }} - {{ match.awayTeamName }}</td>
          <td>{{ match.goalHome }} - {{ match.goalAway }}</td>
          <td>{{ match.referee }}</td>
          <td>{{ match.dateAndTime.replace("T", " ") }}</td>
          <td>
            <select
              v-model="voteHolder[indexFinder(match.id)][0]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              v-model="voteHolder[indexFinder(match.id)][1]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              v-model="voteHolder[indexFinder(match.id)][2]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              v-model="voteHolder[indexFinder(match.id)][3]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <button @click="handleVote(match.id)">Vote</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from "./navbar.vue";
export default {
  path: "refereeVoting",
  name: "RefereeVoting",
  components: {
    NavBar,
  },
  data() {
    return {
      lastMatches: [],
      voteHolder: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
      current: 0,
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
          this.lastMatches = data.returnObject
            .filter((item) => item.status === "Match Finished")
            .slice(-9);
          console.log(this.lastMatches);
        }
      });
  },
  methods: {
    onChange() {
      console.log(this.voteHolder);
    },
    indexFinder(matchId) {
      return this.lastMatches.findIndex((item) => item.id === matchId);
    },
    totalFinder(matchId) {
      return (
        this.voteHolder[this.indexFinder(matchId)][0] +
        this.voteHolder[this.indexFinder(matchId)][1] +
        this.voteHolder[this.indexFinder(matchId)][2] +
        this.voteHolder[this.indexFinder(matchId)][3]
      );
    },
    handleVote(matchId) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          totalPoints: this.totalFinder(matchId),
        }),
      };
      console.log(requestOptions);
      fetch(
        "https://tfb308.herokuapp.com/api/v1/referee/refereeVote",
        requestOptions
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.status !== "200") {
            alert(res2.returnObject);
          } else {
            alert("Vote Succeed!");
          }
        });
    },
  },
};
</script>

<style scoped>
.team-info-box {
  margin-top: 100px;
  padding: 25px 25px 25px 25px;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(185, 185, 185, 0.725);
}

.card-title {
  text-align: left;
  padding-bottom: 7%;
  font-size: 40px;
}

.card-text {
  text-align: left;
  font-size: 15px;
  font-style: italic;
}

.fav-button {
  align-items: right;
  position: absolute;
  top: 20px;
  right: 25px;
  border-width: 0px;
  font-size: 50px;
  height: 30px;
}

.fav-button:hover {
  transform: scale(1.5);
  color: red;
}

.team-info-box-logo {
  border-width: 0px;
  max-height: 200px;
  max-width: 200px;
  display: inline;
}

td {
  border: 1px solid black;
  padding: 25px;
  max-width: 400px;
  height: 80px;
}

.team-info-but {
  margin: 5px;
}

.team-info-but:hover {
  transform: scale(1.1);
}

.player-box {
  border: 1px solid black;
  overflow-y: scroll;
  height: 450px;
  width: fit-content;
  display: block;
}

.match-box {
  border: 1px solid black;

  width: fit-content;
  display: block;
}

.matchx:hover {
  color: red;
  background: rgb(208, 202, 202);
}
h1 {
  padding-top: 50px;
}
</style>
