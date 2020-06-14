<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="View Profile" icon="person" to="/viewprofile"/>
          <q-breadcrumbs-el label="Edit Profile" icon="person_outline"/>
        </q-breadcrumbs>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-py-lg">
      <div class="row justify-center q-mt-lg">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Update Profile</q-toolbar-title>
          </q-toolbar>

          <div class="row items-start content-start q-col-gutter-x-sm q-col-gutter-y-sm q-pt-lg">

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="First Name"
                v-model="firstName"
                type="text"
                filled
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Last Name"
                v-model="lastName"
                type="text"
                filled
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Username"
                v-model="username"
                type="text"
                filled
                @keyup="resetUsernameStatus"
                no-error-icon
                :rules="[val => (val.length > 4) || 'Username must be at least 5 characters.']"
              >

                <template v-slot:prepend v-if="usernameUnique === true">
                  <q-icon color="green" name="check" />
                </template>
                <template v-slot:prepend v-else-if="usernameError === true">
                  <q-icon color="red" name="close" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6 q-pb-lg">
              <q-btn
                :disable="username.length < 5"
                label="Check Username Availability"
                @click="checkUsername"
                color="primary"
                style="padding:10px;"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                outlined
                label="Email"
                v-model="email"
                type="text"
                filled
                no-error-icon
                :rules="[val => val.match(emailRegEx) || 'Not a Valid Email']"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                outlined
                label="Password"
                v-model="password"
                type="password"
                filled
                no-error-icon
                hint="Only enter a password if you are seeking to change the current password"
                :rules="[val => ((val.length == 0) || val.match(passwordRegEx)) || 'At least: Length 8, 2 Capitals, 1 ! @ # $ &, 3 Lowercase']"
              >
              </q-input>
            </div>

            <div class="col-12">
              <q-toggle
                v-model="admin"
                label="Admin"
                color="green"
                v-if="user.admin != 'S'"
              />
            </div>

            <div class="col-12 q-mt-lg text-red" v-if="!usernameUnique">
              Check username availability before this new user can be added.
            </div>

            <div class="col-12">
              <q-btn :disable="!usernameUnique" type="submit" color="primary" label="Save" class="q-mt-lg" />
            </div>

          </div>

        </div>
      </div>
    </q-form>

  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default {

    name: 'AddUserPage',

    data () {
      return {
        firstName: '',
        lastName : '',
        email : '',
        username : '',
        password : '',
        admin : false,
        emailRegEx : '',
        passwordRegEx : '',
        usernameUnique : true,
        usernameError: false,
      }
    },

    computed: {
      ...mapGetters({
        "user" : "access/getUser",
      })
    },

    methods: {

      onSubmit() {

        let updateProfilePayload = {
          "id" : this.user.id,
          "firstName" : this.firstName,
          "lastName" : this.lastName,
          "username" : this.username,
          "email" : this.email,
        }

        if (this.user.admin == 'Y') {
          updateProfilePayload['admin'] = 'Y'

        } else if (this.user.admin == 'N') {
          updateProfilePayload['admin'] = 'S'
        }

        if (this.password != '') {
          updateProfilePayload['password'] = this.password
        }


        this.$store.dispatch("users/updateUser", updateProfilePayload).then( updateProfileResponse => {
          if (updateProfileResponse.data.success) {
            this.$store.commit("access/setUser", updateProfilePayload)
            this.$router.push("/")
          } else {
            this.$router.push("/")
            this.$q.notify({
              message: 'Profile Update Failed!',
              color: 'red',
              position: "top",
              timeout: 5000
            })
          }
        })

      },

      checkUsername() {
        this.$store.dispatch("users/checkUsername", { "username" : this.username }).then( checkUsernameResponse => {
          if (checkUsernameResponse.data.hasOwnProperty("usernameUnique")) {
            if (checkUsernameResponse.data.usernameUnique === true) {
              console.log("got here")
              this.usernameUnique = true
              this.usernameError = false
            } else {
              this.usernameUnique = false
              this.usernameError = true
            }
          }
        })
      },

      resetUsernameStatus() {
        if (this.username.length < 5) {
          this.usernameUnique = false
          this.usernameError = false
        }

        if (this.usernameUnique == true) {
          this.usernameUnique = false
          this.usernameError = false
        }

        if (this.usernameError === true) {
          this.usernameError = false
        }
      }


    },

    created() {

      let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.emailRegEx = emailRegEx

      let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*(.)\1{2,}).{10,}$/
      this.passwordRegEx = passwordRegEx

      if (this.user.hasOwnProperty("id")) {

        this.firstName = this.user.firstName
        this.lastName = this.user.lastName
        this.username = this.user.username
        this.email = this.user.email

        if ((this.user.admin == 'Y') || (this.user.admin == 'S')) {
          this.admin = true
        } else {
          this.admin = false
        }

      } else {
        this.$store.commit("access/logout")
        this.$q.notify({
          message: 'Unable to find profile!',
          color: 'red',
          position: "top",
          timeout: 5000
        })
      }

    },

  }
</script>
