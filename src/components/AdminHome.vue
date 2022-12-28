<template>
  <AdminNavBar></AdminNavBar>
</template>

<script>
import AdminNavBar from "./adminNavbar.vue";

export default {
  path: "/AdminHome",
  name: "AdminHome",
  components: {
    AdminNavBar,
  },
  date() {
    return {
      matches: [],
      items: [],
    };
  },
  mounted() {
    
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
