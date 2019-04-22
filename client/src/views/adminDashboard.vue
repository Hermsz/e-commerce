<template>
  <v-container grid-list-md text-xs-center v-if="isLogin">
    <v-layout row wrap>
      <v-flex>
        <router-link to="/admin" style="textDecoration: none">
          <v-btn class="primary">Admin Dashboard</v-btn>
        </router-link>
        <router-link to="/admin/add" style="textDecoration: none">
          <v-btn class="primary">Add New Product</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
      <Card
        v-bind:products = "products"
        v-bind:isLogin="isLogin"
        v-bind:isAdmin="isAdmin"
        v-if="this.$route.name == 'adminDashBoard'"
      >
      </Card>
        <router-view></router-view>
  </v-container>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card.vue'
let baseUrl = `http://localhost:3000`

export default {

    props: ['isLogin', 'isAdmin'],
  data() {
    return {
      products : []
    }
  },
  created() {
    this.getProducts()
    console.log(this.$route.name)
    // console.log(this.$route)
  },
  components: {
    Card
  },
  methods: {
    getProducts() {
      axios.get(`${baseUrl}/products`)
      .then(({data })=> {
        this.products = data
        this.getProducts()
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
