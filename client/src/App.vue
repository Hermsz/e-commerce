<template>
  <v-app class="grey lighten-4">

    <Navbar
    v-bind:isLogin="isLogin"
    v-bind:isAdmin="isAdmin"
    v-on:success-logout="isLogin = false"
    ></Navbar>

    <v-content class="mx-4 mb-4">

      <router-view
        v-on:success-login=signIn
        v-on:admin-login="isAdmin = true"
        :isAdmin='isAdmin'
        :isLogin='isLogin'
      ></router-view>
      
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {
      isLogin: false,
      isAdmin: false
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
    }
    if(localStorage.getItem('role')) {
      if(localStorage.getItem('role').toLowerCase() == 'admin') {
        this.isAdmin = true
      }
    }
  },
  methods: {
    signIn() {
      this.isLogin = true
    }
  }
}
</script>