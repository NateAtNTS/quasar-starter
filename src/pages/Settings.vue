<template>
  <q-page class="q-pt-lg">
    <div class="row justify-center">

      <div class="col-shrink q-ma-md">
        <q-btn icon="home" label="Home" stack color="primary" type="a" to="/home/" class="q-pa-md" style="width:125px; height:100px;" />
      </div>

      <div class="col-shrink q-ma-md">
        <q-btn icon="fas fa-users" label="Users" stack color="primary" type="a" to="/users/" class="q-pa-md" style="width:125px; height:100px;" v-if="((user.admin == 'Y') || (user.admin == 'S'))" />
      </div>

      <div class="col-shrink q-ma-md">
        <q-btn icon="exit_to_app" label="Logout" stack color="primary" @click="logout" class="q-pa-md" style="width:125px; height:100px;" />
      </div>

    </div>


  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default {

    name: 'SettingsPage',

    data () {
      return {
      }
    },

    computed: {
      ...mapGetters({
        "users" : "users/getUsers",
        "usersLoaded" : "users/usersLoaded",
        "user" : "access/getUser",
      })
    },

    methods: {
      logout() {
        this.$store.commit("access/logout")
      },
    },

    created() {

    },

  }
</script>
