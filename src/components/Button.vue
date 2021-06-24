<template>
  <button
    :class="[
      'rounded-lg font-semibold flex flex-col items-center cursor-pointer',
      'focus:outline-none border',
      classes,
      { 'pointer-events-none opacity-40': disabled },
    ]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <span
      class="flex flex-row items-center justify-center"
      :class="{ 'h-0 overflow-hidden': !busy }"
    >
      <slot name="busy">
      </slot>
    </span>
    <span
      class="flex flex-row items-center justify-center"
      :class="{ 'h-0 overflow-hidden': busy }"
    >
      <slot />
    </span>
  </button>
</template>

<script>
import _sizes from '@/constants/sizes';
import _schemes from '@/constants/buttonSchemes';
import _palettes from '@/constants/palettes';
import _looks from '@/constants/buttonLooks';

export default {
  name: 'Button',
  props: {
    palette: {
      type: String,
      default: 'solid-green',
    },
    look: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'normal',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    busy: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _palette() {
      if (_palettes.includes(this.palette)) {
        return this.palette;
      }
      return 'solid-green';
    },
    _look() {
      if (_looks.includes(this.look)) {
        return this.look;
      }
      return 'default';
    },
    _size() {
      if (_sizes.includes(this.size)) {
        return this.size;
      }
      return 'normal';
    },
    _scheme() {
      return _schemes[this._palette]?.[this._look];
    },
    classes() {
      const data = [
        `bg-${this._scheme.blur.bg}`,
        `border-${this._scheme.blur.border}`,
        `text-${this._scheme.blur.text}`,
        `hover:bg-${this._scheme.hover.bg}`,
        `hover:border-${this._scheme.hover.border}`,
        `hover:text-${this._scheme.hover.text}`,
      ];
      switch (this.size) {
        case 'small':
          data.push('py-1 px-3 text-xs');
          break;
        case 'medium':
          data.push('py-3 px-5 text-sm leading-none');
          break;
        case 'normal':
          data.push('py-3 px-10 text-lg');
          break;
        default:
      }
      if (this.shadow) {
        const shadow = {
          blur: this._scheme.blur.shadow || 'none',
          hover: this._scheme.hover.shadow || 'none',
        };
        data.push(`shadow-${shadow.blur}`);
        data.push(`hover:shadow-${shadow.hover}`);
      }
      if (this._scheme.disabled) {
        data.push(`disabled:bg-${this._scheme.disabled.bg}`);
        data.push(`disabled:border-${this._scheme.disabled.border}`);
        data.push(`disabled:text-${this._scheme.disabled.text}`);
      }
      return data.join(' ');
    },
  },
};
</script>
