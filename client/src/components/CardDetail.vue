<template>
  <div>
    <v-container>
      <v-dialog max-width="600px">
        <v-btn flat color="grey" slot="activator">
          <span>View Detail</span>
        </v-btn>
        <v-card>
          <v-card-title>
            <h2>Order</h2>
            <v-form class=px-3>
              <v-btn flat color="green" v-on:click="addQty">
                <v-icon>arrow_upward</v-icon>
                <span>Add</span>
              </v-btn>
              <v-btn flat color="red" v-on:click="subtractQty">
                <v-icon>arrow_downward</v-icon>
                <span>Subtract</span>
              </v-btn>
              <div class="cart">
                <p>{{ quantity }}</p>
              </div>
              <v-btn flat color="grey" v-on:click="addToCart">Submit</v-btn>
            </v-form>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3000`

  export default {
    props: ['isLogin', 'productId'],
    data() {
      return {
        quantity: 0
      }
    },
    methods: {
      addQty() {
        this.quantity++
      },
      subtractQty() {
        if (this.quantity > 0) {
          this.quantity--
        } else {
          console.log(`Not Allowed`)
        }
      },
      addToCart() {
        axios
          .post(`${baseUrl}/carts`, {
            productId: this.productId,
            amount: this.quantity
          }, {
            headers: {
              token: localStorage.getItem('token')
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
            console.log(`Success`)
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
