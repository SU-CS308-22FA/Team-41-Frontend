<template>
  <!-- Modal -->
  <div>
    <div id="myModal" ref="modal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Error</h5>
          </div>
          <div class="modal-body">
            <p>{{ errorMsg }}</p>
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

  <AdminNavBar></AdminNavBar>

  <div class="users-list-page d-flex justify-content-center">
    <div class="users-list">
      <div v-if="users.length === 0 || finishedLoading === false">
        <loadingPage></loadingPage>
      </div>
      <div>
        <div class="headingss">
          <table>
            <tr class="col">
              <th>ID</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th>Fanteam</th>
            </tr>
            <tr class="user-userslist" v-for="user in users" :key="user.userId">
              <td>{{ user.userId }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.mail }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.birthdate }}</td>
              <td>{{ user.fanTeam }}</td>
              <td v-if="map.get(user.userId)">
                <button class="btn btn-primary" @click="banUser(user.userId)">
                  BAN
                </button>
              </td>
              <td v-else>
                <button class="btn btn-secondary" @click="unbanUser(user.userId)">
                  UNBAN
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from "./adminNavbar.vue";
import { Modal } from "bootstrap";

export default {
  path: "/usersList",
  name: "UsersList",
  components: {
    AdminNavBar,
  },
  data() {
    return {
      users: [],
      map: new Map(),
      userId: "",
      errorMsg: "",
      error: false,
      myModal: null,
    };
  },
  methods: {
    banUser(user2banId) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        "https://tfb308.herokuapp.com/api/v1/user/" +
          this.userId +
          "/ban/" +
          user2banId,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.finishedLoading = true;
          if (data.status === "200") {
            this.map.set(user2banId, true);
            location.reload();
          } else {
            this.errorMsg = data.returnObject;
            this.error = true;
            this.myModal.show();
          }
        });
    },
    
    closeModal() {
      this.myModal.hide();
    },

    unbanUser(user2banId) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        "https://tfb308.herokuapp.com/api/v1/user/" +
          this.userId +
          "/unban/" +
          user2banId,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.finishedLoading = true;
          if (data.status === "200") {
            this.map.set(user2banId, false);
            location.reload();
          } else {
            this.errorMsg = data.returnObject;
            this.error = true;
            this.myModal.show();
          }
        });
    },
  },
  mounted() {
    let admin = false;
    if(localStorage.isAdmin) admin = localStorage.isAdmin === "true";
    if(!admin) {
      this.$router.replace("/");
    }
    else{
      if (localStorage.userId) this.userId = localStorage.userId;
      this.myModal = new Modal(document.getElementById("myModal"));

      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        "https://tfb308.herokuapp.com/api/v1/user/" + this.userId + "/users",
        requestOptions
      )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "200") {
          let sortedData = data.returnObject.sort((i1, i2) => (i1.userId < i2.userId) ? -1 : (i1.userId > i2.userId) ? 1 : 0);
          this.users = sortedData;

          for (let i = 0; i < this.users.length; i++) {
            fetch(
              "https://tfb308.herokuapp.com/api/v1/user/" +
                this.users.at(i).userId +
                "/ban_status",
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                this.map.set(
                  this.users.at(i).userId,
                  data.returnObject !== "banned"
                );
              });
          }
        } else {
          this.errorMsg = data.returnObject;
        }
        this.finishedLoading = true;
      });
    }
  },
};
</script>

<style scoped>
  .users-list-page{
        margin-top: 70px;
        padding: 25px 25px 25px 25px;
        display: flex;
        overflow: hidden;
        display: flexbox;
        min-height: calc(100vh - 70px);
        background: rgba(185, 185, 185, 0.725);
    }

  .users-list {
    display: flex;
    margin: auto;
  }

  .users-list th {
    padding: 10px;
    font-weight: bold;
  }
  .users-list td {
    padding: 20px;
    font-weight: bold;
  }
  .headingss {
    text-align: center;
    text-decoration: none;
    color: black;
    margin: 30px;

    display: block;
    background: ghostwhite;
  }

  .user-userslist {
    color: black;
    background: ghostwhite;
    border-bottom: 2px solid black;
  }
  .user-userslist .uefarank {
    background-color: rgb(32, 178, 170);
    color: black;
  }

  .user-userslist:hover td {
    color: red;
    background: rgb(208, 202, 202);
  }

  .col th {
    padding-top: 1%;
    padding-bottom: 2%;
    padding-left: 1%;
    padding-right: 1%;
  }

  .ban-btn {
    background: red;
    color: white;
    width: 80px;
    height: 40px;
  }
  .ban-btn:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
</style>
