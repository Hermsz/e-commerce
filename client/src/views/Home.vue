<template>
  <div class="home">
    <h1>Sell Ships Online</h1>
    <p>Vessell Listt is revolutionizing the future of buying and selling vessels by changing the slow, complex and rigid traditional method of selling and purchasing vessels into a simple, fast, flexible (and fun) process.
    We are an online marketplace connecting vessel sellers (ship owners, ship brokers, and ship builders) with vessel buyers (individuals, companies, and ship brokers).</p>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://cdn.pixabay.com/photo/2016/01/19/18/05/shipping-containers-1150062__480.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2018/09/13/13/34/hvide-sande-3674767__480.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2014/04/24/15/48/shipyard-331463__480.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2017/06/22/23/29/freighter-2432936__480.jpg'
          }
        ]
      }
    }
  }
</script>
