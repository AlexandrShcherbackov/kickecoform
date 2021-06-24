<template>
  <div id="app" class="flex items-center justify-center h-screen">
    <div class="flex flex-col p-8">
      <div class="flex flex-row items-center space-x-4">
        <img src="@/assets/folder.svg" alt="" class="w-6 h-6">
        <ul class="flex flex-col items-start ">
          <li>{{kick}} <span class="text-limegreen">KICK</span></li>
          <li>{{eth}} <span class="text-indianred">ETH</span></li>
        </ul>
      </div>
      <div class="flex flex-col w-440px space-y-4 mt-4">
        <KickEcoInput
          v-model="price"
          prependText="Price"
          appendText="ETH"
        />
        <KickEcoInput
          v-model="amount"
          prependText="Amount"
          appendText="KICK"
        />
        <KickEcoInput
          v-model="total"
          prependText="Total ~"
          appendText="ETH"
          placeholder="min 0.005"
        />
      </div>
    </div>
  </div>
</template>

<script>
import KickEcoInput from '@/components/KickEcoInput.vue';

export default {
  name: 'App',
  components: {
    KickEcoInput,
  },
  data() {
    return {
      price: '',
      amount: '',
      total: '',
      kick: 0,
      eth: 0,
    };
  },
  watch: {
    price(v) {
      if (this.amount !== '') {
        this.total = Number(v) * Number(this.amount);
      }
    },
    amount(v) {
      if (this.price !== '') {
        this.total = Number(v) * Number(this.price);
      }
    },
    total(v) {
      if (this.price !== '') {
        this.amount = Number(v) / Number(this.price);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
