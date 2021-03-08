<template>
  <teleport to="body">
    <transition :name="banner?.animation">
      <div
        :id="key"
        class="bannery"
        :class="[
          banner.themeClass,
          banner.position === 'bottom' ? 'bannery--bottom' : 'bannery--top',
        ]"
        v-if="display"
      >
        <div class="bannery__container">
          <div class="bannery__texts">
            <div v-if="banner.title" class="bannery__title" v-html="banner.title" />
            <div v-if="banner.description" class="bannery__content" v-html="banner.description" />
          </div>
          <div class="bannery__buttons">
            <a
              v-if="banner.buttons.secondaryText"
              class="bannery__buttons__secondary"
              :href="banner.buttons.secondaryLink"
              target="_blank"
              @click="onSecondary"
            >
              {{ banner.buttons.secondaryText }}
            </a>
            <a
              v-if="banner.buttons.primaryText"
              class="bannery__buttons__primary"
              :href="banner.buttons.primaryLink"
              target="_blank"
              @click="onPrimary"
            >
              {{ banner.buttons.primaryText }}
            </a>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import { shouldDisplay, injectCss, transformMarkdown, getOptions } from '@/lib/features';

export default {
  name: 'Banner',
  setup() {
    const url = inject('url');
    const key = inject('key');
    const options = inject('options');
    const hooks = inject('hooks');
    const teleportEl = inject('teleportEl');

    const banner = ref();
    const display = ref(false);

    const fetchBanner = async () => {
      try {
        // Cleaning
        document.getElementById('bannery-styles')?.remove();
        display.value = false;

        // Getting and composing options
        banner.value = await getOptions({ url, options, hooks, key });

        // Markdown
        banner.value.title = transformMarkdown(banner.value.title);
        banner.value.description = transformMarkdown(banner.value.description);

        // css
        injectCss(banner.value.css);

        // Display
        display.value = shouldDisplay(banner.value, key);
        hooks.onOpen && hooks.onOpen();
      } catch (e) {
        display.value = false;
        console.error(e);
        throw e;
      }
    };

    onMounted(fetchBanner);
    onUnmounted(() => {
      teleportEl.remove();
    });

    function onPrimary(e) {
      display.value = false;
      hooks.onPrimary && hooks.onPrimary(e);
    }

    function onSecondary(e) {
      display.value = false;
      hooks.onSecondary && hooks.onSecondary(e);
    }

    return {
      key,
      banner,
      display,
      confirm,
      onPrimary,
      onSecondary,
    };
  },
};
</script>

<style lang="scss">
.bannery {
  position: fixed;
  left: 0;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;

  p {
    margin: 0;
  }

  &--top {
    top: 0;
  }

  &--bottom {
    bottom: 0;
  }
}

.bannery__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;

  @media (max-width: 750px) {
    display: block;
    padding: 1rem;
  }
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

  @media (max-width: 750px) {
    display: flex;
    margin-top: 1rem;
    justify-content: flex-end;
  }

  @media (max-width: 250px) {
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
}

/* default animations */
.slide-up-fade-enter-active,
.slide-down-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-up-fade-leave-active,
.slide-down-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-up-fade-enter-from,
.slide-up-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-down-fade-enter-from,
.slide-down-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
