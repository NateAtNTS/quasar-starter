<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Users" icon="people"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Users</q-toolbar-title>
          <q-btn flat round dense icon="add" to="/users/adduser/" />
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="user in users"  :key="user.id">
            <q-item-section>
              <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
              <q-item-label caption>{{ user.email }}</q-item-label>
            </q-item-section>
            <q-item-section avatar v-if="((user.admin == 'Y') || (user.admin == 'S'))">
              <q-icon name="fas fa-user-cog" />
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="edit" :to="'/edituser/' + user.id + '/'" />
            </q-item-section>
          </q-item>
        </q-list>

      </div>
    </div>

  </q-page>
</template>

<script>
    import { mapGetters } from 'vuex'


    export default {

        name: 'UsersPage',

        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                "users" : "users/getUsers",
                "usersLoaded" : "users/usersLoaded"
            })
        },

        created() {

            if (this.usersLoaded === false) {
                this.$store.dispatch("users/getUsers")
            }

        },

    }
</script>
