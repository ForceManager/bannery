<template>
  <transition name="slide-fade">
    <div class="bannery__container" v-if="canShow">
      <div class="bannery__texts">
        <div v-if="banner.texts.title" class="bannery__title">
          {{ banner.texts.title }}
        </div>
        <div v-if="banner.texts.content" class="bannery__content">
          {{ banner.texts.content }}
        </div>
      </div>
      <div class="bannery__buttons">
        <a v-if="banner.texts.secondaryButton" class="bannery__buttons__secondary" @click="hide">
          {{ banner.texts.secondaryButton }}
        </a>
        <a
          v-if="banner.link && banner.texts.primaryButton"
          class="bannery__buttons__primary"
          :href="banner.link"
          target="_blank"
        >
          {{ banner.texts.primaryButton }}
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import { getBanner } from '@/lib/services/banner';

export default {
  name: 'Banner',
  inject: ['key'],
  setup() {
    const dataUrl = inject('url');
    const banner = ref();
    const canShow = ref(false);

    const fetchBanner = async () => {
      try {
        // Cleaning
        document.getElementById('bannery-styles')?.remove();
        canShow.value = false;

        // Getting banner
        banner.value = await getBanner(dataUrl);

        // Checking can show
        if (!banner.value.enabled) return;

        const currentDate = new Date();
        const startDate = new Date(banner.value.startDate);
        const endDate = new Date(banner.value.endDate);

        if (startDate === 'Invalid date' || endDate === 'Invalid date') return;
        if (startDate && endDate && (currentDate < startDate || currentDate > endDate)) return;
        if (!banner.value.texts) return;

        // Injecting css
        document.getElementById('bannery-styles')?.remove();
        const styleTag = document.createElement('style');
        styleTag.setAttribute('id', 'bannery-styles');
        styleTag.appendChild(document.createTextNode(banner.value.css));
        document.head.appendChild(styleTag);

        canShow.value = true;
      } catch (e) {
        canShow.value = false;
        throw e;
      }
    };

    onMounted(fetchBanner);

    function hide() {
      canShow.value = false;
    }

    return {
      banner,
      canShow,
      hide,
    };
  },
};
</script>

<style lang="scss">
.bannery {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

.bannery__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.bannery__title,
.bannery__content {
  padding: 0.25rem 0;
}

.bannery__buttons {
  a {
    box-shadow: 0px 0px 0px transparent;
    border: none;
    text-shadow: 0px 0px 0px transparent;
    outline: 0;
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 0.25rem;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.2s, text-decoration 0.2s;
  }

  a:hover {
    box-shadow: 0px 0px 0px transparent;
    border: none;
    text-shadow: 0px 0px 0px transparent;
  }

  a:active {
    outline: none;
    border: none;
  }

  a:focus {
    outline: 0;
  }

  .bannery__buttons__secondary:hover {
    text-decoration: underline;
  }
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.35s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
