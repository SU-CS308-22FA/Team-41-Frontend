<template>
    <div
      class="sidebar"
      :class="isOpened ? 'open' : ''"
      :style="cssVars"
    >
      <div
        class="logo-details"
        style="margin: 6px 14px 0 14px;"
      >
        <img
          v-if="menuLogo"
          :src="menuLogo"
          alt="menu-logo"
          class="menu-logo icon"
        >
        <i
          v-else
          class="bx icon"
          :class="menuIcon"
        />
        <div class="logo_name">
          {{ menuTitle }}
        </div>
        <i
          class="bx"
          :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
          id="btn"
          @click="isOpened = !isOpened; "
        />
      </div>
  
      <div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
        <div
          id="my-scroll"
          style="margin: 6px 14px 0 14px;"
        >
          <ul
            class="nav-list"
            style="overflow: visible;"
          >
  
            <span
              v-for="(menuItem, index) in menuItems.slice(1)"
              :key="index"
            >
              <li @click="goTo(menuItem.link)">
                <a>
                  <i
                    class="bx"
                    :class="menuItem.icon || 'bx-square-rounded'"
                  />
                  <span class="links_name">{{ menuItem.name }}</span>
                </a>
                <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
              </li>
            </span>
            <div v-if="showAdminTools === true || true">
              <br>
              <li>
                <a>
                  Admin Toools
                </a>
              </li>
              <span
              v-for="(menuItem, index) in adminTools"
                :key="index"
              >
                <li @click="goTo(menuItem.link)">
                  <a>
                    <i
                      class="bx"
                      :class="menuItem.icon || 'bx-square-rounded'"
                    />
                    <span class="links_name">{{ menuItem.name }}</span>
                  </a>
                  <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                </li>
              </span>
            </div>
          </ul>
        </div>
        
        
          <i
            v-if="isExitButton"
            class="bx bx-log-out"
            id="log_out"
            @click.stop="$emit('button-exit-clicked')"
          />
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'SideBar',
      props: {
        //! Menu settings
        isMenuOpen: {
          type: Boolean,
          default: true,
        },
        menuTitle: {
          type: String,
          default: 'TFP',
        },
        menuLogo: {
          type: String,
          default: '',
        },
        menuIcon: {
          type: String,
          default: '',
        },
        isPaddingLeft: {
          type: Boolean,
          default: true,
        },
         menuOpenedPaddingLeftBody: {
          type: String,
          default: '250px'
        },
        menuClosedPaddingLeftBody: {
          type: String,
          default: '78px'
        },
  
        
      },
      data() {
        return {
          isOpened: false,
          showAdminTools: false,
          adminTools: [
              {
                link: '/AdminHome',
                name: 'Dashboard',
                tooltip: 'Dashboard',
                icon: 'bxs-dashboard',
              },
              {
                link: '/usersList',
                name: 'Users',
                tooltip: 'Users',
                icon: 'bx-user-check',
              },
              {
                link: '#',
                name: 'Referee Assignment',
                tooltip: 'Referee Assignment',
                icon: 'bx-run',
              },
              {
                link: '#',
                name: 'Schedule',
                tooltip: 'Schedule',
                icon: 'bx-calendar-check',
              },
              {
                link: '/addMatch',
                name: 'Add Match',
                tooltip: 'Add Match',
                icon: 'bx-bookmark-plus',
              },
              {
                link: '/showFeedBack',
                name: 'Feedback',
                tooltip: 'Feedback',
                icon: 'bx-comment-detail',
              },
              {
                link: '/matchPage',
                name: 'Settings',
                tooltip: 'Settings',
                icon: 'bx-cog',
              },
          ],
          menuItems: [
              {
                link: '/profilepage',
                name: 'Profile',
                tooltip: 'Profile',
                icon: 'bx-user',
              },
              {
                link: '/todaysMatches',
                name: 'Today\'s Matches',
                tooltip: 'Today\'s Matches',
                icon: 'bx-timer',
              },
              {
                link: '/fixturePage',
                name: 'Fixture',
                tooltip: 'Fixture',
                icon: 'bx-calendar',
              },
              {
                link: '/teamsList',
                name: 'Teams',
                tooltip: 'Teams',
                icon: 'bx-group',
              },
              {
                link: '/referees',
                name: 'Referees',
                tooltip: 'Referees',
                icon: 'bx-walk',
              },
              {
                link: '/standings',
                name: 'Standings',
                tooltip: 'Standings',
                icon: 'bx-bar-chart-alt',
              },
              {
                link: '/favoriteTeams',
                name: 'Favorite Teams',
                tooltip: 'Favorite_Teams',
                icon: 'bx-heart',
              },
            ],
        }
      },
      mounted() {
        if(localStorage.isAdmin) this.showAdminTools = localStorage.isAdmin;
        this.isOpened = this.isMenuOpen;
      },
      methods: {
        goTo(route) {
          this.$router.push(route);
        }
      },
      watch: {
        isOpened() {
          window.document.body.style.paddingLeft = this.isOpened && this.isPaddingLeft ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody
        },
        showAdminTools() {
          if(localStorage.isAdmin) this.showAdminTools = localStorage.isAdmin;
        }
      }
    }
  </script>
  
  <style>
    /* Google Font Link */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
    @import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }
    body {
      transition: all 0.5s ease;
    }
    .menu-logo {
      width: 30px;
      margin: 0 10px 0 10px;
    }
    .sidebar {
      position: relative;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      min-height: min-content;
      /* overflow-y: auto; */
      width: 78px;
      background: rgba(33, 66, 114, 0.818);
      /* padding: 6px 14px 0 14px; */
      z-index: 99;
      transition: all 0.5s ease;
      text-decoration: none;
    }
    .sidebar.open {
      width: 250px;
      background-color: rgba(33, 66, 114, 0.818);
    }
    .sidebar .logo-details {
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .sidebar .logo-details .icon {
      opacity: 0;
      transition: all 0.5s ease;
    }
    .sidebar .logo-details .logo_name {
      color: white;
      font-size: 40px;
      font-weight: 600;
      opacity: 0;
      transition: all 0.5s ease;
    }
    .sidebar.open .logo-details .icon,
    .sidebar.open .logo-details .logo_name {
      opacity: 1;
    }
    .sidebar .logo-details #btn {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      font-size: 22px;
      transition: all 0.4s ease;
      font-size: 23px;
      text-align: center;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .sidebar.open .logo-details #btn {
      text-align: right;
    }
    .sidebar i {
      color: black;
      height: 60px;
      min-width: 50px;
      font-size: 28px;
      text-align: center;
      line-height: 60px;
    }
    .sidebar .nav-list {
      margin-top: 20px;
      /* margin-bottom: 60px; */
      /* height: 100%; */
      /* min-height: min-content; */
    }
    .sidebar li {
      position: relative;
      margin: 8px 0;
      list-style: none;
      text-decoration: none;
    }
    .sidebar li .tooltip {
      position: absolute;
      top: -20px;
      left: calc(100% + 15px);
      z-index: 3;
      background: red;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 400;
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
      transition: 0s;
    }
    .sidebar li:hover .tooltip {
      opacity: 1;
      pointer-events: auto;
      transition: all 0.4s ease;
      top: 50%;
      transform: translateY(-50%);
    }
    .sidebar.open li .tooltip {
      display: none;
    }
    .sidebar input {
      font-size: 15px;
      color: red;
      font-weight: 400;
      outline: none;
      height: 50px;
      width: 100%;
      width: 50px;
      border: none;
      border-radius: 12px;
      transition: all 0.5s ease;
      background: red;
    }
    .sidebar.open input {
      padding: 0 20px 0 50px;
      width: 100%;
    }
    .sidebar .bx-search {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: 22px;
      background: red;
      color: red;
    }
    .sidebar.open .bx-search:hover {
      background: red;
      color: red;
    }
    .sidebar .bx-search:hover {
      background: red;
      color: red;
    }
    .sidebar li a {
      display: flex;
      height: 100%;
      width: 100%;
      border-radius: 12px;
      align-items: center;
      text-decoration: none;
      transition: all 0.4s ease;
      background: var(--bg-color);
    }
    .sidebar li a:hover {
      background: whitesmoke;
      text-decoration: none;
      cursor: pointer;
    }
    .sidebar li a .links_name {
      color: black;
      font-size: 15px;
      font-weight: 400;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: 0.4s;
    }
    .sidebar.open li a .links_name {
      opacity: 1;
      pointer-events: auto;
    }
    .sidebar li a:hover .links_name,
    .sidebar li a:hover i {
      transition: all 0.5s ease;
      color: darkcyan;
    }
    .sidebar li i {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      border-radius: 12px;
    }
    .sidebar div.profile {
      position: relative;
      height: 60px;
      width: 78px;
      /* left: 0;
      bottom: 0; */
      padding: 10px 14px;
      background: red;
      transition: all 0.5s ease;
      overflow: hidden;
    }
    .sidebar.open div.profile {
      width: 250px;
    }
    .sidebar div .profile-details {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
    .sidebar div img {
      height: 45px;
      width: 45px;
      object-fit: cover;
      border-radius: 6px;
      margin-right: 10px;
    }
    .sidebar div.profile .name,
    .sidebar div.profile .job {
      font-size: 15px;
      font-weight: 400;
      color: red;
      white-space: nowrap;
    }
    .sidebar div.profile .job {
      font-size: 12px;
    }
    .sidebar .profile #log_out {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background: red;
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 0px;
      transition: all 0.5s ease;
    }
    .sidebar.open .profile #log_out {
      width: 50px;
      background: red;
      opacity: 0;
    }
    .sidebar.open .profile:hover #log_out {
      opacity: 1;
    }
    .sidebar.open .profile #log_out:hover {
      opacity: 1;
      color: red;
    }
    .sidebar .profile #log_out:hover {
      color: red;
    }
    .home-section {
      position: relative;
      background: red;
      min-height: 100vh;
      top: 0;
      left: 78px;
      width: calc(100% - 78px);
      transition: all 0.5s ease;
      z-index: 2;
    }
    .sidebar.open ~ .home-section {
      left: 250px;
      width: calc(100% - 250px);
    }
    .home-section .text {
      display: inline-block;
      color: red;
      font-size: 25px;
      font-weight: 500;
      margin: 18px;
    }
    .my-scroll-active {
      overflow-y: auto;
    }
    #my-scroll {
      overflow-y: auto;
      height: calc(100% - 60px);
    }
    #my-scroll::-webkit-scrollbar{
      display:none;
      /* background-color: rgba(255, 255, 255, 0.2); 
      width: 10px;
      border-radius:5px  */
    }
    /* #my-scroll::-webkit-scrollbar-thumb{
      background-color: red;
      border-radius:5px 
    }
    #my-scroll::-webkit-scrollbar-button:vertical:start:decrement{
      display:none;
    }
    #my-scroll::-webkit-scrollbar-button:vertical:end:increment{
      display:none;
    } */
    @media (max-width: 420px) {
      .sidebar li .tooltip {
        display: none;
      }
  }
  
  
  </style>
  