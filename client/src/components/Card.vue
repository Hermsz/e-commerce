<template>
  <div class="listProduct" v-if="isLogin">
    <h1 class="subheading grey--text">Team</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="tug in products" :key="tug.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-img v-bind:src="tug.image" aspect-ratio="2.75">
              </v-img>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ tug.name }}</div>
              <div class="grey--text">Price $ {{ tug.price }}</div>
              <div class="grey--text">Stock: {{ tug.stock }}</div>
            </v-card-text>
            <v-card-actions>
              <CardDetail v-if="isLogin && isAdmin == false" v-bind:productId="tug._id" />
              <v-btn color="error" v-on:click="deleteTug(tug._id)" v-if="isAdmin">
                <v-icon small right>close</v-icon>
                <span>DELETE</span>
              </v-btn>

              <UpdateProduct v-if="isAdmin" v-bind:productName="tug.name"
                v-bind:productQty="tug.stock" v-bind:productPrice="tug.price"
                v-bind:productImage="tug.image" v-bind:productId="tug._id" />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import UpdateProduct from '@/components/UpdateProduct.vue'
  import CardDetail from '@/components/CardDetail.vue'
  import axios from 'axios'

  let baseUrl = `http://localhost:3000`

  export default {
    props: ['products', 'isLogin', 'isAdmin'],
    components: {
      UpdateProduct,
      CardDetail
    },
    methods: {
      deleteTug(id) {
        this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result) => {
            if (result.value) {
              axios
                .delete(`${baseUrl}/products/${id}`, {
                  headers: {
                    token: localStorage.getItem('token')
                  }
                })
              this.$swal(
                'Deleted!',
                'Your Product has been deleted.',
                'success'
              )
            }
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
