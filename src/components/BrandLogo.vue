<script setup lang="ts">
// Logo DECO by DC redibujado: isotipo de tres piezas + wordmark geométrico espaciado.
import DecoMark from '@/components/DecoMark.vue'
import { BRAND_NAME } from '@/config/funnel'

defineProps<{ light?: boolean }>()
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light }" role="img" :aria-label="BRAND_NAME">
    <DecoMark class="logo__mark" :mono="light" />
    <span class="logo__word" aria-hidden="true">
      <span class="logo__deco">DECO</span>
      <span class="logo__by">by <b>DC</b></span>
    </span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: $espresso;

  &__mark {
    width: 34px;
    height: 34px;
  }

  &__word {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1;
  }

  &__deco {
    font-weight: 300;
    font-size: 1.35rem;
    letter-spacing: 0.32em;
    margin-right: -0.32em; // compensa el espaciado de la última letra
  }

  &__by {
    margin-top: 3px;
    font-size: 0.75rem;
    letter-spacing: 0.02em;

    b {
      font-weight: 700;
    }
  }

  &--light {
    color: $ink-on-dark;
  }
}
</style>
