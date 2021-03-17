<template>
  <div class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    <form @submit.prevent="formSubmit">
      <h1 class="text-3xl border-b py-4 mb-4">Bannery options generator</h1>
      <SchemaForm
        class="bg-white shadow-lg rounded-lg overflow-hidden p-7 mb-7"
        :schema="schema"
        v-model="data"
      />
      <SchemaForm
        class="bg-white shadow-lg rounded-lg overflow-hidden p-7 mb-7"
        :schema="displaySchema"
        v-model="data"
      />
      <SchemaForm
        class="bg-white shadow-lg rounded-lg overflow-hidden p-7 mb-7"
        :schema="styleSchema"
        v-model="data"
      />
    </form>
    <div class="json relative">
      <pre
        class="overflow-auto"
        v-highlightjs
      ><code class="language-json rounded-lg p-5">{{ cleanData }}</code></pre>
      <div class="py-5">
        <button
          class="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-8 py-2 mr-4 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          @click="clear"
          type="button"
        >
          Reset
        </button>

        <button
          class="border border-gray-700 bg-gray-700 text-white rounded-md px-8 py-2 mr-4 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          @click="show"
        >
          Show
        </button>
        <button
          class="border border-blue-400 bg-blue-400 text-white rounded-md px-8 py-2 transition duration-500 ease select-none hover:bg-blue-500 focus:outline-none focus:shadow-outline"
          @click="copy"
          type="button"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef, ref, onMounted, onUnmounted, computed } from 'vue';
import { SchemaForm } from 'formvuelate';
import Bannery from 'bannery';
import * as clipboard from 'clipboard-polyfill/text';
import { useToast } from 'vue-toastification';

import Text from '@/components/Text.vue';
import Textarea from '@/components/Textarea.vue';
import Select from '@/components/Select.vue';
import Checkbox from '@/components/Checkbox.vue';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const DEFAULT_DATA = {
  title: '**Bannery**',
  description: 'Simple embeddable component for displaying a banner',
  position: 'bottom',
  enabled: true,
  buttons: {
    primaryLink: 'https://github.com/embedmode/bannery/releases',
    primaryText: 'Join us',
    secondaryText: 'Close',
  },
  display: {
    startDate: today,
    endDate: tomorrow,
    mode: '',
  },
  themeClass: 'bannery-default-theme',
  animation: 'slide-up-fade',
  css:
    '.bannery-default-theme {\n  background: #4b5971;\n  font-family: Roboto;\n}\n\n.bannery-default-theme .bannery__buttons__primary {\n  color: white;\n  background: #ed8b00;\n}\n\n.bannery-default-theme .bannery__buttons__primary:hover {\n  background: #c77500;\n}\n\n.bannery-default-theme .bannery__buttons__secondary {\n  color: white;\n  background: transparent;\n}\n\n.bannery-default-theme .bannery__buttons__secondary:hover {\n  text-decoration: none;\n}\n\n.bannery-default-theme .bannery__title {\n  color: white;\n}\n\n.bannery-default-theme .bannery__description {\n  color: white;\n}',
};

const DISPLAY_SCHEMA = {
  display: {
    component: SchemaForm,
    schema: {
      startDate: {
        component: Text,
        label: 'Start date',
        type: 'datetime-local',
      },
      endDate: {
        component: Text,
        label: 'End date',
        type: 'datetime-local',
      },
      mode: {
        component: Select,
        label: 'Mode',
        options: ['session', 'cookie'],
      },
    },
  },
};

const STYLES_SCHEMA = {
  themeClass: {
    component: Text,
    label: 'Theme class',
  },
  animation: {
    component: Text,
    label: 'Animation',
  },
  css: {
    component: Textarea,
    label: 'CSS',
  },
};

const SCHEMA = {
  title: {
    component: Text,
    label: 'Title',
  },
  description: {
    component: Text,
    label: 'Description',
  },
  position: {
    component: Select,
    label: 'Position',
    options: ['top', 'bottom'],
  },
  enabled: {
    component: Checkbox,
    label: 'Enabled',
  },
  buttons: {
    component: SchemaForm,
    schema: {
      primaryLink: {
        component: Text,
        label: 'Primary link',
        type: 'url',
      },
      primaryText: {
        component: Text,
        label: 'Primary text',
      },
      secondaryText: {
        component: Text,
        label: 'Secondary text',
      },
    },
  },
};

export default {
  components: { SchemaForm },
  setup() {
    const data = ref({ ...DEFAULT_DATA });
    const schema = shallowRef(SCHEMA);
    const displaySchema = shallowRef(DISPLAY_SCHEMA);
    const styleSchema = shallowRef(STYLES_SCHEMA);

    function clearEmpties(o) {
      for (var k in o) {
        if (typeof o[k] === 'object' && Object.keys(o[k]).length) clearEmpties(o[k]);
        else if (
          typeof o[k] !== 'boolean' &&
          Object.prototype.toString.call(o[k]) !== '[object Date]' &&
          (Object.keys(o[k]).length === 0 || o[k] === '')
        ) {
          delete o[k];
          continue;
        }
      }
    }

    function clear() {
      data.value = { ...DEFAULT_DATA };
    }

    function jsonScroll() {
      if (window.innerHeight + window.pageYOffset - 100 >= document.body.offsetHeight) return;
      const jsonEl = document.querySelector('.json');
      jsonEl.style.marginTop = window.innerWidth < 768 ? 0 : window.scrollY + 'px';
    }

    const cleanData = computed(() => {
      const newData = JSON.parse(JSON.stringify(data.value));
      clearEmpties(newData);
      return newData;
    });

    function show() {
      Bannery({
        options: cleanData.value,
      });
    }

    function copy() {
      const toast = useToast();
      clipboard.writeText(JSON.stringify(cleanData.value, null, 2));
      toast.success('Copied!', {
        timeout: 1500,
        hideProgressBar: true,
      });
    }

    onMounted(() => {
      window.addEventListener('scroll', jsonScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', jsonScroll);
    });

    return {
      data,
      schema,
      displaySchema,
      styleSchema,
      clear,
      copy,
      show,
      cleanData,
    };
  },
};
</script>

<style lang="scss">
code {
  white-space: pre;
}

.json {
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3e4a5b;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #001f38;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #002f54;
  }
}
</style>
