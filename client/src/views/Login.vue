<template>
  <div class="login px-5">
    <v-card-title>
      <h2>Login to your Account</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3">
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password"></v-text-field>
        <v-btn flat class="success mx-0" @click="submit">Login</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3000`

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      submit() {
        axios.post(`${baseUrl}/users/webLogin`, {
            email: this.email,
            password: this.password
          })
          .then(({
            data
          }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.foundUser._id)
            localStorage.setItem('firstName', data.foundUser.firstName)
            localStorage.setItem('role', data.foundUser.role)
            this.$router.push('/products')
            this.$emit('success-login')
            if (data.foundUser.role.toLowerCase() == 'admin') {
              this.$emit('admin-login')
            }
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Success Login',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            console.log(err)
          })
      }
    }
  }

</script>

<style>

</style>
