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
          :value="price"
          :initial-focus="focusedEl === 'price'"
          prependText="Price"
          appendText="ETH"
          @input="handlePrice"
          @enter="focusedEl = 'amount'"
        />
        <KickEcoInput
          :value="amount"
          :initial-focus="focusedEl === 'amount'"
          prependText="Amount"
          appendText="KICK"
          @input="handleAmount"
          @enter="focusedEl = 'total'"
        />
        <KickEcoInput
          :value="total"
          :initial-focus="focusedEl === 'total'"
          prependText="Total ~"
          appendText="ETH"
          placeholder="min 0.005"
          @input="handleTotal"
          @enter="focusedEl = 'price'"
        />
      </div>
      <div class="flex flex-row items-center justify-between space-x-4 mt-12">
        <Button
          :disabled="!total"
          class="w-3/4"
          @click="postData('buy')"
        >
          BUY
        </Button>
        <Button
          palette="outline-red"
          size="normal"
          :disabled="kick === 0 || eth === 0 || !total"
          @click="postData('sell')"
        >
          SELL
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import KickEcoInput from '@/components/KickEcoInput.vue';
import Button from '@/components/Button.vue';
import postCryptoOperation from '@/api/';

export default {
  name: 'App',
  components: {
    KickEcoInput,
    Button,
  },
  data() {
    return {
      price: '',
      amount: '',
      total: '',
      kick: 0,
      eth: 0,
      focusedEl: null,
    };
  },
  methods: {
    handlePrice(v) {
      this.price = v;
      this.calcTotal();
    },
    handleAmount(v) {
      this.amount = v;
      this.calcTotal();
    },
    handleTotal(v) {
      this.total = v;

      if (this.total === '' || this.price === '') {
        this.amount = '';
        return;
      }

      const decimalPart = String(this.amount).match(/\.\d+$/);
      const decimalLength = decimalPart ? decimalPart[0].length - 1 : 0;
      const newAmount = parseFloat(this.total) / parseFloat(this.price);
      this.amount = decimalLength > 0 ? (newAmount).toFixed(decimalLength) : newAmount;
    },
    calcTotal() {
      if (this.amount === '' || this.price === '') {
        this.total = '';
        return;
      }

      const price = String(this.price).replace(/\.$/, '');
      const amount = String(this.amount).replace(/\.$/, '');
      this.total = parseFloat(price) * parseFloat(amount);
    },
    buyCrypto() {
      this.kick += Number(this.amount);
      this.eth += Number(this.total);
    },
    sellCrypto() {
      const newKick = this.kick - this.amount;
      const newEth = this.eth - this.total;

      if (newKick >= 0 && newEth >= 0) {
        this.kick = newKick;
        this.eth = newEth;
        return true;
      }

      throw new Error('Can\'t be bellow 0');
    },
    postData(operationType) {
      const operations = new Map([
        ['buy', () => this.buyCrypto()],
        ['sell', () => this.sellCrypto()],
      ]);
      const cb = operations.get(operationType);

      postCryptoOperation(cb)
        .then(() => {
          this.setDefaultInputs();
        });
    },
    setDefaultInputs() {
      this.price = '';
      this.amount = '';
      this.total = '';
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
