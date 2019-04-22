<template>
  <div class="register px-5">
    <v-card-title>
      <h2>Register</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3">
        <v-text-field label="First Name" v-model="firstName"></v-text-field>
        <v-text-field label="Last Name" v-model="lastName"></v-text-field>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password"></v-text-field>
        <v-btn flat class="success mx-0" @click="login">Submit</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import axios from 'axios'

let baseUrl = `http://localhost:3000`

// import axios from “axios”
// axios.defaults.baseURL = ’http://localhost:3000';
// Vue.prototype.$axios = axios;

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.post(`${baseUrl}/users/register`, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
      .then(newUser => {
        console.log(newUser)
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
