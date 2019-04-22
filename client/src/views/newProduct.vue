<template>
    <v-card>
      <v-card-title>
        <h2>Add a new Product</h2>
      </v-card-title>
      <v-form class="px-3">
        <v-text-field label="Product Name" v-model="product_name"></v-text-field>
        <v-text-field label="quantity" v-model="product_quantity"></v-text-field>
        <v-text-field label="price" v-model="product_price"></v-text-field>
        <input type="file" v-on:change="getImage"><br>
        <v-btn flat class="success mx-0 mt-3" @click="submit">Submit</v-btn>
      </v-form>
    </v-card>

</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3000`

  export default {
    props: ['isLogin', 'isAdmin'],
    data() {
      return {
        product_name: '',
        image: null,
        product_price: 0,
        product_quantity: ''
      }
    },
    methods: {
      getImage(event) {
        this.image = event.target.files[0]
      },

      submit() {
        let fd = new FormData()
        fd.append('name', this.product_name)
        fd.append('image', this.image)
        fd.append('price', this.product_price)
        fd.append('stock', this.product_quantity)

        axios
          .post(`${baseUrl}/products`, fd, {
            headers: {
              token: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(({
            data
          }) => {
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Success Add Product',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(data)
          })
          .catch(err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            console.log(err.message)
          })
      },

    },
    
  }

</script>

<style>

</style>