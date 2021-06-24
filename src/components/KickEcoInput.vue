<template>
  <FormInput
    v-model="currentValue"
    :placeholder="placeholder"
    classes="rounded-lg overflow-hidden "
    input-class="kickeco-input text-right text-base"
    @blur="blurHandler"
    @keyup.up="increment"
    @keyup.down="decrement"
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
  },
  data() {
    return {
      currentValue: null,
    };
  },
  watch: {
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
      this.currentValue = this.currentValue.replace(/\d+$/, (m) => parseInt(m, 10) + 1);
    },
    decrement() {
      this.currentValue = this.currentValue.replace(/\d+$/, (m) => parseInt(m, 10) - 1);
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
