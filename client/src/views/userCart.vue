<template>
    <v-card v-if="isLogin">

      <!-- DELETE USER CART -->
      <div class="text-xs-center mt-2" v-if="usercart">
        <v-btn round color="error" dark @click="deleteCart">Delete This Cart</v-btn>
      </div>
      <!-- DELETE USER CART END -->

      <v-card-title>
        User Cart
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details>
        </v-text-field>
      </v-card-title>


      <!-- USER CART TABLE DISPLAY -->
      <!-- <div v-if="usercart.length > 0" > -->
      <v-data-table :headers="headers" :items="usercart">

        <template v-slot:items="props">
          <td>{{ props.item.productId.name }}</td>
          <td class="text-xs-left">{{ props.item.amount }}</td>
          <td class="text-xs-left">{{ props.item.productId.price }}</td>
          <td class="text-xs-left"> {{ props.item.productId.price  *  props.item.amount }} </td>
          <td class="text-xs-left">
            <v-btn flat class="danger" @click="addProduct(props.item.productId._id, 1)">Add</v-btn>
          </td>
          <td class="text-xs-left">
            <v-btn flat class="danger" @click="deleteProduct(props.item.productId._id)">Delete
            </v-btn>
          </td>
        </template>

        <v-alert v-slot:no-results :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
      <!-- </div> -->
      <!-- <div v-else>
        <h1 >{{ errorMessage }}</h1>
      </div> -->
      <!-- USER CART TABLE DISPLAY END -->
      <div class="text-xs-center mt-2" v-if="usercart">
        <v-btn round color="primary" dark @click="deleteCart"> Checkout </v-btn>
      </div>
    </v-card>

</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3000`
  let userCartId = ''

  export default {
    props: ['isLogin'],
    data() {
      return {
        errorMessage: '',
        usercart: [],
        search: '',
        headers: [{
            text: 'Ship Ordered',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Quantity',
            value: 'amount'
          },
          {
            text: 'Price',
            value: 'price'
          },
          {
            text: 'Subtotal',
            value: 'subtotal'
          },
          {
            text: 'Action',
            value: 'action'
          },
          {
            text: 'Delete',
            value: 'delete'
          }
        ],
        userId: '',
      }
    },
    created() {
      this.getCartDetails()
    },
    methods: {
      getCartDetails() {
        axios.get(`${baseUrl}/carts`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            // console.log(data._id, 'masuk success getCartDetails getCartDetails di userCart.vue')
            // console.log(data.listProduct)
            this.usercart = data.listProduct
          })
          .catch(err => {
            this.errorMessage = err.response.data
          })
      },
      addProduct(id, value) {

        axios({
            method: 'put',
            url: `${baseUrl}/carts/${id}`,
            headers: {
              token: localStorage.getItem('token')
            },
              data: {
                amount : value
              }
          })
          .then(() => {
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Success Add Product',
              showConfirmButton: false,
              timer: 500
            })
            console.log(`Success Add`)
            this.getCartDetails()
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

      deleteProduct(id) {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            axios
              .delete(`${baseUrl}/carts/${id}`, {
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(() => {
                this.getCartDetails()
              })
              .catch(err => {
                this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
              })
            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })

      },
      deleteCart() {
        axios
          .delete(`${baseUrl}/carts`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(`Success Delete cart`)
            this.$swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.value) {
                this.getCartDetails()
                this.$swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          })
          .catch(err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            console.log(err, 'Masuk error')
          })
      },
      checkout() {
        axios
          .delete(`${baseUrl}/carts`, {
            headers: {
              token: localStorage
            }
          })
      }
    },

  }

</script>

<style>

</style>
