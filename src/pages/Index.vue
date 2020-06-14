<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">

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
