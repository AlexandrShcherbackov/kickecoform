<template>
  <div class="flex flex-col space-y-4">
    <template v-if="$slots.label">
      <FormLabel>
        <slot name="label" />
      </FormLabel>
    </template>
    <span
      :class="_classes"
      class="flex flex-row items-stretch justify-between space-x-2 border"
      @click="$emit('click', $event, {
        api: {
          focus,
          blur,
          focusInput,
          blurInput,
        },
      })"
    >
      <template v-if="$slots.prepend || $scopedSlots.prepend">
        <slot
          name="prepend"
        />
      </template>
      <slot>
        <input
          :ref="focusRef"
          :class="_inputClasses"
          :value="value"
          :type="type"
          :placeholder="placeholder"
          class="flex-grow font-semibold bg-transparent outline-none leading-4 min-w-0"
          v-on="{
            ...$listeners,
            input: ($event) => $emit('input', $event.target.value, $event),
            focus: () => focus(),
            blur: () => blur(),
          }"
        />
      </slot>
      <template v-if="$slots.append || $scopedSlots.append">
        <slot
          name="append"
        />
      </template>
    </span>
  </div>
</template>
<script>
import FormLabel from '@/components/FormLabel.vue';
import _sizes from '@/constants/sizes';
import _schemes from '@/constants/inputSchemes';

const _palettes = [];

export default {
  name: 'FormInput',
  components: {
    FormLabel,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    palette: {
      type: String,
      default: 'neutral-50',
    },
    size: {
      type: String,
      default: 'small',
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    mask: {
      type: [Object, String],
      default: () => ({}),
    },
    focusRef: {
      type: String,
      default: 'input',
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    hasPrependSlot() {
      return this.$slots.prepend || this.$scopedSlots.prepend;
    },
    hasAppendSlot() {
      return this.$slots.append || this.$scopedSlots.append;
    },
    _palette() {
      if (_palettes.includes(this.palette)) {
        return this.palette;
      }
      return 'white';
    },
    _scheme() {
      return _schemes[this._palette];
    },
    _size() {
      if (_sizes.includes(this.size)) {
        return this.size;
      }
      return 'small';
    },
    _inputClasses() {
      const classes = [this.inputClass];
      const inputVariants = new Map([
        ['small', 'py-3 px-3 text-sm'],
        ['normal', 'py-5 px-5'],
        ['auto', 'py-5 px-5'],
      ]);
      const currentVariant = inputVariants.get(this._size);

      classes.push(currentVariant);

      return classes.join(' ');
    },
    _classes() {
      const classes = [this.classes];

      if (this.invalid) {
        classes.push('bg-white border-red-700 text-red-700');
      } else if (this.focused) {
        classes.push(`bg-${this._scheme?.focus?.bg}`);
        classes.push(`border-${this._scheme?.focus?.border}`);
        classes.push(`text-${this._scheme?.focus?.text}`);
      } else {
        classes.push(`bg-${this._scheme?.blur?.bg}`);
        classes.push(`border-${this._scheme?.blur?.border}`);
        classes.push(`text-${this._scheme?.blur?.text}`);
      }

      switch (this._size) {
        case 'small':
          classes.push('h-10');
          if (this.hasPrependSlot) {
            classes.push('pl-3');
          }
          break;
        case 'auto':
          classes.push('h-auto');
          if (this.hasPrependSlot) {
            classes.push('pl-3');
          }
          if (this.hasAppendSlot) {
            classes.push('pr-3');
          }
          break;
        case 'normal':
          classes.push('h-12');
          if (this.hasPrependSlot) {
            classes.push('pl-5');
          }
          if (this.hasAppendSlot) {
            classes.push('pr-5');
          }
          break;
        default:
          classes.push('h-12');
          if (this.hasPrependSlot) {
            classes.push('pl-5');
          }
          if (this.hasAppendSlot) {
            classes.push('pr-5');
          }
          break;
      }

      return classes.join(' ');
    },
    input() {
      const data = this.$refs[this.focusRef];
      if (!data) {
        const defaultSlot = this.$scopedSlots.default();
        if (defaultSlot) {
          const { context } = defaultSlot[0];
          return context.$refs[this.focusRef];
        }
      }
      return data;
    },
  },
  methods: {
    focus() {
      this.focused = true;
      this.$emit('focus');
    },
    blur() {
      this.focused = false;
      this.$emit('blur');
    },
    focusInput() {
      if (typeof this.input?.focus === 'function') {
        this.input.focus();
      }
    },
    blurInput() {
      if (typeof this.input?.blur === 'function') {
        this.input.blur();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  &::placeholder {
    @apply font-normal;
  }
  &:-webkit-autofill,
  &:-webkit-autofill::first-line,
  &:-webkit-autofill:hover {
    @apply font-semibold;
    @apply font-sans;
    @apply text-black;
    font-size: 16px !important;
  }
  &:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
  }
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset;
  }
  &.caret-transparent {
    caret-color: transparent;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
