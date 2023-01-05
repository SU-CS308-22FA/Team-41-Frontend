<template>
  <div>
    <div id="myModal" ref="modal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Suggested Referees (Pick one)</h5>
          </div>
          <div class="modal-body">
            <div class="container">
              <div
                id="ref1"
                v-if="ref1 !== null"
                @click="selectRef(ref1)"
                class="row refb"
              >
                1. {{ ref1.name }}
              </div>
              <div
                id="ref2"
                v-if="ref2 !== null"
                @click="selectRef(ref2)"
                class="row refb"
              >
                2. {{ ref2.name }}
              </div>
              <div
                id="ref3"
                v-if="ref3 !== null"
                @click="selectRef(ref3)"
                class="row refb"
              >
                3. {{ ref3.name }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div
      id="myModal2"
      ref="modal"
      class="modal modal-xl"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Referee Ranking and Assignment Protocol</h5>
          </div>
          <div class="modal-body">
            <div class="row d-flex justify-content-center">
              <table class="match-box">
                <tr>
                  <th>Referee</th>
                  <th>Public Rating(/5)</th>
                  <th>Official Rating (/40)</th>
                  <th>Last Match</th>
                  <th>Last Match Date</th>
                </tr>
                <tr v-for="ref in sortedReferees" :key="ref.id" class="matchx">
                  <td>{{ ref.name }}</td>
                  <td>{{ ref.rating.toFixed(2) }}</td>
                  <td>{{ ref.refereeRating.toFixed(2) }}</td>
                  <td>
                    <container>
                      <div v-if="getLastMatch(ref)" class="row">
                        {{ getLastMatch(ref).homeTeamName }}
                        {{ getLastMatch(ref).goalHome }}
                      </div>
                      <div v-if="getLastMatch(ref)" class="row">
                        {{ getLastMatch(ref).awayTeamName }}
                        {{ getLastMatch(ref).goalAway }}
                      </div>
                    </container>
                  </td>
                  <td>
                    <container>
                      <div v-if="getLastMatch(ref)" class="row">
                        {{ getLastMatch(ref).dateAndTime.split("T")[0] }}
                      </div>
                      <div v-if="getLastMatch(ref)" class="row">
                        {{ getLastMatch(ref).dateAndTime.split("T")[1] }}
                      </div>
                    </container>
                  </td>
                </tr>
              </table>
              <h2>How suggestions work?</h2>
              <img src="../assets/e.jpeg" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="modal2Close"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal2"
              @click="closeModal2()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdminNavBar></AdminNavBar>
  <div>
    <button id="refOpen" @click="myModal2.show()" class="nodecor">
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
      >
        ?
        <span class="visually-hidden">unread messages</span>
      </span>
      <h1>Referee Assignment System</h1>
    </button>
    <div class="d-flex justify-content-center">
      <table class="match-box">
        <tr>
          <th>Match Ranking</th>
          <th>Match</th>
          <th>Date</th>
          <th>Selected Referee</th>
          <th>Get Suggestions</th>
          <th>Assignment</th>
        </tr>
        <tr v-for="match in matches" :key="match.id" class="matchx">
          <td>{{ findPos(matchImportance[indexFinder(match.id)]) }}</td>
          <td>{{ match.homeTeamName }} - {{ match.awayTeamName }}</td>
          <td>{{ match.dateAndTime.replace("T", " ") }}</td>
          <td>
            <div v-if="currentAssignees[indexFinder(match.id)] !== null">
              {{ currentAssignees[indexFinder(match.id)].name }}
            </div>
          </td>
          <td>
            <button
              :id="'suggest-' + indexFinder(match.id)"
              type="button"
              class="btn btn-primary"
              @click="getSuggestions(match.id)"
            >
              Get Suggestions
            </button>
          </td>
          <td>
            <button
              :id="'assign-' + indexFinder(match.id)"
              type="button"
              class="btn btn-primary"
              @click="assignment(match.id)"
            >
              Assign
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNavBar from "./adminNavbar.vue";
import { Modal } from "bootstrap";
export default {
  path: "/refereeAssignment",
  name: "RefereeAssignment",
  components: {
    AdminNavBar,
  },
  data() {
    return {
      matches: [],
      standings: [],
      matchImportance: [],
      ref1: null,
      ref2: null,
      ref3: null,
      myModal: null,
      myModal2: null,
      currentMatchIndex: 0,
      currentAssignees: [null, null, null, null, null, null, null, null, null],
      sortedReferees: [],
      lastMatches: [],
    };
  },
  async mounted() {
    this.myModal = new Modal(document.getElementById("myModal"));
    this.myModal2 = new Modal(document.getElementById("myModal2"));
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("https://tfb308.herokuapp.com/api/v1/match/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.matches = data.returnObject
            .filter((item) => item.referee === "")
            .slice(0, 9);
          console.log(this.matches);
        }
      });

    await fetch("https://tfb308.herokuapp.com/api/v1/standings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.standings = data.returnObject;
        }
      });

    fetch("https://tfb308.herokuapp.com/api/v1/referee/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          let sortedData = data.returnObject.sort((i1, i2) =>
            i1.refereeRating < i2.refereeRating
              ? 1
              : i1.refereeRating > i2.refereeRating
              ? -1
              : 0
          );
          this.sortedReferees = sortedData;
        }
      });

    fetch(
      "https://tfb308.herokuapp.com/api/v1/referee/lastMatches",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          this.lastMatches = data.returnObject;
          console.log(this.lastMatches[0]);
        }
      });

    this.calculateMatchImportance();
  },
  methods: {
    closeModal() {
      this.myModal.hide();
    },
    closeModal2() {
      this.myModal2.hide();
    },
    calculateMatchImportance() {
      for (const match of this.matches) {
        const total =
          this.findRank(match.homeTeamName) + this.findRank(match.awayTeamName);
        const matchRank = total <= 20 ? total : 40 - total;
        this.matchImportance.push(matchRank);
      }
    },
    findRank(team) {
      const rank = this.standings.filter((item) => team === item.teamName);
      return rank[0].rank;
    },
    findPos(val) {
      let rank = 1;
      for (const x of this.matchImportance) {
        if (val > x) {
          rank++;
        }
      }
      return rank;
    },
    indexFinder(matchId) {
      return this.matches.findIndex((item) => item.id === matchId);
    },
    getSuggestions(matchId) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      this.currentMatchIndex = this.indexFinder(matchId);
      var x = this.findPos(this.matchImportance[this.indexFinder(matchId)]);

      fetch(
        "https://tfb308.herokuapp.com/api/v1/referee/refereeSuggestion?matchImportance=" +
          x +
          "&matchId=" +
          matchId,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.ref1 = data.returnObject[0];
          this.ref2 = data.returnObject[1];
          this.ref3 = data.returnObject[2];
          this.myModal.show();
        });
    },
    selectRef(ref) {
      this.currentAssignees[this.currentMatchIndex] = ref;
      this.closeModal();
    },
    assignment(matchId) {
      const index = this.indexFinder(matchId);
      if (this.currentAssignees[index] == null) {
        alert("You haven't selected any referee yet!");
        return;
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refereeId: this.currentAssignees[index].id,
          matchId,
        }),
      };
      console.log(requestOptions);
      fetch(
        "https://tfb308.herokuapp.com/api/v1/referee/assignReferee",
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== "200") {
            alert(data.returnObject);
          } else {
            alert("Assignment Succeed!");
          }
        });
    },
    getLastMatch(ref) {
      const currentRef = this.lastMatches.filter(
        (item) => item.referee === ref.name
      );
      return currentRef[0];
    },
  },
};
</script>

<style scoped>
table {
  padding: 25px;
  border-radius: 15px;
  border: solid 1px lightgrey;
  background-color: lightgrey;
}
td {
  padding: 25px;
  border-bottom: 1px solid lightgrey;
  height: 80px;
  background-color: beige;
  cursor: pointer;
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
  cursor: pointer;
}

.refb {
  cursor: pointer;
}

.refb:hover {
  color: blue;
}

.nodecor {
  margin-top: 5%;
  padding: 0;
  border: none;
  background: none;
  position: relative;
}
</style>
