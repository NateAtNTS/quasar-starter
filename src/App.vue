<template>

  <!-- The Login form only shows up when the state says we aren't logged in -->
  <q-layout v-if="loggedIn === false">
    <q-page-container>
      <q-page class="flex flex-center row">

        <div class="row justify-center q-ma-md" style="width:100%">
          <div class="col-xs-12 col-sm-6 col-md-5 col-lg-3 col-xl-2">
            <q-form @submit="onSubmit">
              <q-input
                outlined
                label="Username"
                v-model="username"
                ref="input"
                no-error-icon

                :rules="[val => !!val || 'Field is required']"
              />

              <q-input
                class="q-mt-lg"
                outlined
                label="Password"
                v-model="password"
                ref="input"
                no-error-icon
                type="password"
                :rules="[val => !!val || 'Field is required']"
              />

              <q-btn type="submit" color="primary" label="Login" class="q-mt-lg" />
            </q-form>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>

  <!-- if we are logged in, show the app -->
  <div v-else id="q-app">
    <router-view />
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

export default {

    name: 'App',

    data () {
        return {
            username: '',
            password: '',
        }
    },

    computed: {
      ...mapGetters({
          "loggedIn" : "access/loggedIn"
      })
    },

    methods: {
        onSubmit() {
            let loginPayload = {
                "username" : this.username,
                "password" : this.password
            }
            this.$store.dispatch("access/loginRequest", loginPayload).then( loginResponse => {
                if (loginResponse.data.loggedIn === true) {
                    localStorage.setItem("SignOnByNTS", JSON.stringify(loginResponse.data))
                    this.$store.commit("access/setUser", loginResponse.data.user)
                    this.$store.commit("access/setToken", loginResponse.data.token)
                    this.$store.commit("access/login")
                    this.$router.push("/")
                } else {
                    this.$q.notify({
                        message: 'Login Failed!',
                        color: 'red',
                        position: "top",
                        timeout: 5000
                    })
                }
            })
        }
    }, // methods

    created() {

      // the signOnBaseURL variable is set in the /index.template.html
      if (process.env.API_BASEURL !== null) {
          this.$store.commit("access/setBaseURL", process.env.API_BASEURL)
      } // if signOnBaseURL

      // see if there is a login object in the local storage.  If there is, load it into the state
      if (localStorage.getItem("SignOnByNTS") !== null) {
          let obj = JSON.parse(localStorage.getItem("SignOnByNTS"))
          this.$store.commit("access/setUser", obj.user)
          this.$store.commit("access/setToken", obj.token)
          this.$store.commit("access/login")
      } // if local storage

    } // created
}
</script>
