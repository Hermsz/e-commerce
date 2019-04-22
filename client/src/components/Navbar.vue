<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Vessel</span>
        <span>Listt</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" v-if="isLogin == false" @click="changePage('/register')">
        <span>Register</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-btn flat color="grey" v-if="!isLogin" @click="changePage('/login')">
        <span>Login</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <router-link to="/carts" style="textDecoration: none">
        <v-btn flat color="grey" v-if="isLogin == true && isAdmin == false">
          <span>Cart</span>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/admin" style="textDecoration: none">
      <v-btn flat color="grey" v-if="isLogin == true && isAdmin == true" >
        <span>Manage</span>
      <v-icon right>build</v-icon>
      </v-btn>
      </router-link>
      <v-btn flat color="grey" v-if="isLogin" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app class="light-blue darken-3">
      <v-layout column align-center>
        <v-flex class="mt4 mb-3">
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text"> {{ link.text }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- Sidebar -->
  </nav>
</template>

<script>

  export default {
    props: ['isLogin', 'isAdmin'],
    data() {
      return {
        drawer: false,
        links: [{
            icon: 'dashboard',
            text: 'Homepage',
            route: '/'
          },
          {
            icon: 'directions_boat',
            text: 'Vessels',
            route: '/products'
          },
        ],
        product_name: '',

      }
    },
    methods: {
      changePage(path) {
        this.$router.push(path)
      },
      getUserId() {
        localStorage.getItem('userId')
      },
      logout() {
        this.isLogin = false
        this.$emit('success-logout')
        this.$router.push('/')
        localStorage.clear()
        this.$swal({
          position: 'center',
          type: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

</script>

<style>

</style>
