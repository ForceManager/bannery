<template>
  <div class="mb-5">
    <label class="text-gray-700" :for="uuid" v-html="labelHtml" />
    <input
      class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      :type="type"
      :value="modelValue"
      :required="required"
      :id="uuid"
      :disabled="readOnly"
      @input="update($event.target.value)"
    />
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
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
    label: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({ type: 'text' }),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    uuid: {
      type: Number,
      default: 0,
    },
    validation: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'text',
    },
    validations: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    labelHtml() {
      const requiredHtml =
        this.validations._exclusive && this.validations._exclusive.required
          ? ' <span class="label--required">*</span>'
          : '';
      return this.label + requiredHtml;
    },
  },
  methods: {
    update(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
