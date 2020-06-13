<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar square>
          <img src="statics/icons/favicon-128x128.png">
        </q-avatar>
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>

        <q-btn flat round dense icon="person" clickable tag="a" to="/viewprofile/" />
        <q-btn flat round dense icon="settings" clickable tag="a" to="/settings/" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'MyLayout',

    data () {
      return {
        appName: process.env.APP_NAME,
        leftDrawerOpen: false
      }
    },

    computed: {
      ...mapGetters({
        "user" : "access/getUser"
      })
    },

    methods: {
      logout() {
        this.$store.commit("access/logout")
      },
    },
  }
</script>
