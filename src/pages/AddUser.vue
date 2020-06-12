<template>
  <q-page class="q-pa-sm">
    <q-form @submit="onSubmit" class="q-py-lg">
      <div class="row justify-center q-mt-lg">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Add User</q-toolbar-title>
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
                :rules="[val => ((val.length > 0) || val.match(passwordRegEx)) || 'At least: Length 8, 2 Capitals, 1 ! @ # $ &, 3 Lowercase']"
              />
            </div>

            <div class="col-12">
              <q-toggle
                v-model="admin"
                label="Admin"
                color="green"
              />
            </div>

            <div class="col-12 q-mt-lg text-red" v-if="!usernameUnique">
              Check username availability before this new user can be added.
            </div>

            <div class="col-12">
              <q-btn :disable="!usernameUnique" type="submit" color="primary" label="Add" class="q-mt-lg" />
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
                usernameUnique : false,
                usernameError: false,
            }
        },

        computed: {
            ...mapGetters({
                "users" : "users/getUsers",
                "usersLoaded" : "users/usersLoaded",
                "usersById" : "users/usersById"
            })
        },

        methods: {

            onSubmit() {

                let addUserPayload = {
                    "firstName" : this.firstName,
                    "lastName" : this.lastName,
                    "username" : this.username,
                    "email" : this.email,
                    "password" : this.password,
                }

                if (this.admin) {
                    addUserPayload['admin'] = 'Y'
                } else {
                    addUserPayload['admin'] = 'N'
                }

                this.$store.dispatch("users/addUser", addUserPayload).then( updateUserResponse => {
                    this.$store.commit("users/clearUsers")
                    this.$router.push("/users/")
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

            let passwordRegEx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
            this.passwordRegEx = passwordRegEx

        },

    }
</script>
