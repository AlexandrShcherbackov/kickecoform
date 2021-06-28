<template>
  <FormInput
    ref="input"
    v-model="currentValue"
    :placeholder="placeholder"
    classes="rounded-lg overflow-hidden "
    input-class="kickeco-input text-right text-base"
    @blur="blurHandler"
    @keyup.up="increment"
    @keyup.down="decrement"
    @click="setFocus"
    @keypress.enter="$emit('enter')"
  >
    <template #prepend>
      <div class="flex items-center">
        <span class="text-gray-400 whitespace-nowrap select-none">{{prependText}}</span>
      </div>
    </template>
    <template #append>
      <div class="flex flex-row space-x-2">
        <div class="flex items-center">
          <span class="text-gray-400 select-none">{{appendText}}</span>
        </div>
        <div class="flex flex-col">
          <button
            :class="[
              'flex items-center justify-center',
              'w-8 h-1/2',
              'focus:outline-none border-l border-b border-whitesmoke bg-snow',
            ]"
            @click="increment"
          >
            <span class="vertical-arrow active"></span>
          </button>
          <button
            :class="[
              'flex items-center justify-center',
              'w-8 h-1/2',
              'focus:outline-none border-l border-whitesmoke bg-snow',
              { 'disabled': !Number(currentValue) },
            ]"
            :disabled="!Number(currentValue)"
            @click="decrement"
          >
            <span class="vertical-arrow"></span>
          </button>
        </div>
      </div>
    </template>
  </FormInput>
</template>
<script>
import FormInput from '@/components/FormInput.vue';

export default {
  name: 'KickEcoInput',
  components: {
    FormInput,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    prependText: {
      type: String,
      default: '',
    },
    appendText: {
      type: String,
      default: '',
    },
    initialFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: null,
    };
  },
  watch: {
    initialFocus(v) {
      if (v) {
        this.$refs.input.focus();
        this.$refs.input.focusInput();
      } else {
        this.$refs.input.blur();
        this.$refs.input.blurInput();
      }
    },
    value: {
      immediate: true,
      handler(v) {
        const [q1, ...q2] = String(v)
          .replace(/[^0-9,.]/g, '')
          .replace(/,/ig, '.')
          .replace(/(\d+\.\d{1,8})/ig, '$1')
          .split('.');
        this.currentValue = `${q1}${q2.length ? `.${q2.join('').slice(0, 8)}` : ''}`;
      },
    },
    currentValue(v) {
      this.$emit('input', v);
    },
  },
  methods: {
    blurHandler() {
      const lastChar = this.currentValue[this.currentValue.length - 1];

      if (lastChar === '.') {
        this.currentValue = this.currentValue.slice(0, this.currentValue.length - 1);
      }
    },
    increment() {
      if (!this.currentValue) {
        this.currentValue = '0.00000001';
        return;
      }
      const [decimalPart] = this.currentValue.match(/\d+$/);
      const modStr = '0.'.padEnd(decimalPart.length + 1, '0') + 1;

      this.currentValue = (Number(this.currentValue) + Number(modStr)).toFixed(decimalPart.length);
    },
    decrement() {
      const [decimalPart] = this.currentValue.match(/\d+$/);
      const modStr = '0.'.padEnd(decimalPart.length + 1, '0') + 1;

      this.currentValue = (Number(this.currentValue) - Number(modStr)).toFixed(decimalPart.length);
    },
    setFocus(e, rest) {
      if (e.type === 'click' && rest) {
        rest.api.focus();
        rest.api.focusInput();
      }
    },
  },
};
</script>
<style lang="scss">
.kickeco-input {
  &::placeholder {
    @apply text-right;
  }
}

button.disabled {
  opacity: 0.4;
}
</style>
