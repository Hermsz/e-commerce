<template>
  <Card
  v-bind:products = "products"
  v-bind:isLogin="isLogin"
  v-bind:isAdmin="isAdmin"
  >
  </Card>
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
  },
  components: {
    Card
  },
  methods: {
    getProducts() {
      axios.get(`${baseUrl}/products`)
      .then(({data })=> {
        this.products = data
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