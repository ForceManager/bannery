<template>
  <div class="mb-5">
    <label class="text-gray-700 inline-flex items-center">
      <input
        class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 mr-2"
        type="checkbox"
        :checked="modelValue"
        @input="update($event.target.checked)"
      />
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { required: true },
    required: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    update(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
