<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Users" icon="people" to="/users"/>
          <q-breadcrumbs-el label="Update User" icon="person_outline"/>
        </q-breadcrumbs>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-py-lg">
      <div class="row justify-center q-mt-lg">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Update User</q-toolbar-title>
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
                disable
                type="text"
                filled
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
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

            <div class="col-12 q-mt-md">
              <q-toggle
                v-model="admin"
                label="Admin"
                color="green"
                v-if="user.admin != 'S'"
              />
            </div>

            <div class="col-12">
              <q-btn type="submit" color="primary" label="Save" class="q-mt-lg" />
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
                "users" : "users/getUsers",
                "usersLoaded" : "users/usersLoaded",
                "usersById" : "users/usersById",
                "user" : "access/getUser",
            })
        },

        methods: {

            onSubmit() {

                let updateUserPayload = {
                    "id" : this.$route.params.id,
                    "firstName" : this.firstName,
                    "lastName" : this.lastName,
                    "email" : this.email,
                }

                if (this.admin) {
                    updateUserPayload['admin'] = 'Y'
                } else {
                    updateUserPayload['admin'] = 'N'
                }

                if (this.password.length > 0) {
                    updateUserPayload['password'] = this.password;
                }

                this.$store.dispatch("users/updateUser", updateUserPayload).then( updateUserResponse => {
                    this.$store.commit("users/clearUsers")
                    this.$router.push("/users/")
                })

            }

        },

        created() {

            let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            this.emailRegEx = emailRegEx

            let passwordRegEx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
            this.passwordRegEx = passwordRegEx

            if (! this.usersLoaded) {
                this.$router.push("/users/")
            }

            if ((this.$route.params.id !== undefined) && (this.usersById !== undefined)) {

                this.firstName = this.usersById[this.$route.params.id].firstName
                this.lastName = this.usersById[this.$route.params.id].lastName
                this.email = this.usersById[this.$route.params.id].email
                this.username = this.usersById[this.$route.params.id].username

                if (this.usersById[this.$route.params.id].admin == 'Y') {
                    this.admin = true
                }

                if (this.usersById[this.$route.params.id].admin == 'N') {
                    this.admin = false
                }

                if (this.usersById[this.$route.params.id].admin == 'S') {
                    this.admin = true
                    this.superAdmin = true
                }
            }

        },

    }
</script>
