<template>
  <q-page class="q-pt-lg">

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
