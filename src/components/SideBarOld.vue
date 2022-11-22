<template>
     
        <div class="sidebar">
            <div class="sidebar__brand">
                <i class="fa fa-twitter"></i>
            </div>

            <router-link to="profilepage">
                <a  class="sidebar__item">
                    <i class="sidebar__item__icon fa fa-home"></i>
                    <span class="sidebar__item__text">Profile</span>
                </a>
            </router-link>

            <router-link to="todaysMatches">
                <a  class="sidebar__item">
                    <i class="sidebar__item__icon fa fa-compass"></i>
                    <span class="sidebar__item__text">Today's Matches</span>
                </a>
            </router-link>

            <a href="#" class="sidebar__item">
                <i class="sidebar__item__icon fa fa-bell"></i>
                <span class="sidebar__item__text">Fixture</span>
            </a>

            <router-link to="teamsList">
                <a href="#" class="sidebar__item">
                    <i class="sidebar__item__icon fa fa-envelope"></i>
                    <span class="sidebar__item__text">Teams</span>
                </a>
            </router-link>

            <a href="#" class="sidebar__item">
                <i class="sidebar__item__icon fa fa-envelope"></i>
                <span class="sidebar__item__text">Referees</span>
            </a>

            <a href="#" class="sidebar__item">
                <i class="sidebar__item__icon fa fa-bookmark"></i>
                <span class="sidebar__item__text">Standings</span>
            </a>
            <router-link to="favoriteTeams">
            <a href="#" class="sidebar__item">
                <i class="sidebar__item__icon fa fa-list-alt"></i>
                <span class="sidebar__item__text">Favorite Teams</span>
            </a>
            </router-link>
        </div>
    
</template>

<script>
    export default {
        name: 'SideBar',
        components: {},
    };
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');


.sidebar {
    text-decoration: none;
    max-width: 15%;
    display: block;
    cursor: pointer;
    border-radius: 25px;
    padding-bottom: 35px;
    background-color: lightblue;
    height: fit-content;
}

.sidebar__brand {
    text-decoration: none;
    color: #1DA1F2;
    font-size: 38px;
    padding-left: 35px;
    padding-top: 35px;
}

.sidebar__item {
    display: flex;
    text-decoration: none;
    margin-top: 25px;
    padding-right: 15px;
    margin-left: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px
}

.sidebar__item:hover {
    text-decoration: none;
    background-color: #519BDF33;
    border-radius: 100px;
    width: fit-content;
}

.sidebar__item:hover i,
.sidebar__item:hover span {
    text-decoration: none;
    color: #1DA1F2 !important;
}



.sidebar__item__text {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #5B5C5E;
    font-weight: bold;
    padding-left: 25px;
    font-size: 20px;
}


</style>