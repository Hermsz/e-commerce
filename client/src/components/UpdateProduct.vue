<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success" > Update </v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit Product</h2>
      </v-card-title>
      <v-form class="px-3">
        <v-text-field label="Product Name" v-model="product_name"></v-text-field>
        <v-text-field label="quantity" v-model="product_quantity"></v-text-field>
        <v-text-field label="price" v-model="product_price"></v-text-field>
        <input type="file" v-on:change="getImage"><br>
        <v-btn flat class="success mx-0 mt-3" @click="editProduct">Submit</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3000`

export default {
  props: ['productName', 'productQty', 'productPrice', 'productImage', 'productId'],
  data() {
    return {
      product_name: this.productName,
      image: this.productImage,
      product_price: this.productPrice,
      product_quantity: this.productQty,
      id: this.productId
    }
  },
  methods: {
    editProduct() {
      // console.log(this.productImage, '=======')
      let fd = new FormData()
      fd.append('name', this.product_name)
      fd.append('image', this.image)
      fd.append('price', this.product_price)
      fd.append('stock', this.product_quantity)

      axios.put(`${baseUrl}/products/${this.id}`, fd, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log('success Update')
      })
      .catch(err => {
        console.log(`Error di update`)
        console.log(err.response)
      })

    },
     getImage(event) {
      this.image = event.target.files[0]
    },

  }
}
</script>

<style>

</style>

