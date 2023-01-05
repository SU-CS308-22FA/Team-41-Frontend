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
              :id="'judge-' + match.id"
              v-model="voteHolder[indexFinder(match.id)][0]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              :id="'con-' + match.id"
              v-model="voteHolder[indexFinder(match.id)][1]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              :id="'know-' + match.id"
              v-model="voteHolder[indexFinder(match.id)][2]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <select
              :id="'t-' + match.id"
              v-model="voteHolder[indexFinder(match.id)][3]"
              @change="onChange"
            >
              <option v-for="x in 10" :key="x" :value="x">{{ x }}</option>
            </select>
          </td>
          <td>
            <button
              :id="'but' + match.id"
              type="button"
              class="btn btn-primary"
              @click="handleVote(match.id)"
            >
              Vote
            </button>
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
table {
  padding: 50px;
  border-radius: 15px;
  border: solid 1px lightgrey;
  background-color: lightgrey;
}
td {
  padding: 25px;
  border-bottom: 1px solid lightgrey;
  height: 80px;
  background-color: beige;
}

th {
  padding-bottom: 25px;
}

.match-box {
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

.refb {
  cursor: pointer;
}

.refb:hover {
  color: blue;
}
</style>
