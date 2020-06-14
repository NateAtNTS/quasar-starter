<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="View Profile" icon="person"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>User Profile</q-toolbar-title>
        </q-toolbar>

        <q-card flat bordered class="my-card bg-grey-1">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{user.firstName}}  {{user.lastName}}</div>
                <div class="text-subtitle2">{{user.email}}</div>
                <div v-if="user.admin == ('S' || 'Y')" class="text-subtitle2 text-red q-mt-md">Administrator</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="edit" to="/editprofile/" />
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>
    </div>

  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default {

    name: 'EditUserPage',

    data () {
      return {
        firstName: '',
        lastName : '',
        email : '',
        password : '',
        admin : false,
        emailRegEx : '',
        passwordRegEx : '',
        superAdmin : false,
      }
    },

    computed: {
      ...mapGetters({
        "user" : "access/getUser",
      })
    },

    created() {

    },

  }
</script>
