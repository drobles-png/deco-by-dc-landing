<script setup lang="ts">
// Isotipo de DECO: las tres piezas del logo (camel, nogal, espresso) + el trazo de dibujo desfasado
// de sus variantes. `animate`: primero se dibuja el trazo (diseño) y luego encajan las piezas
// (fabricación). Se activa con la clase .is-in en el padre o en el propio SVG.
defineProps<{ animate?: boolean; mono?: boolean }>()
</script>

<template>
  <svg class="mark" :class="{ 'mark--animate': animate, 'mark--mono': mono }" viewBox="0 0 100 100" aria-hidden="true">
    <g class="mark__solid">
      <rect class="mark__p mark__p--top" x="6" y="10" width="56" height="21" />
      <rect class="mark__p mark__p--right" x="62" y="10" width="26" height="64" />
      <rect class="mark__p mark__p--bottom" x="6" y="74" width="82" height="21" />
    </g>
    <g class="mark__line">
      <rect x="10" y="5" width="83" height="85" pathLength="1" />
      <path d="M10 26.5 H66 V69.5 H10" pathLength="1" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.mark {
  display: block;
  overflow: visible;

  &__p--top {
    fill: $camel;
  }
  &__p--right {
    fill: $walnut;
  }
  &__p--bottom {
    fill: $espresso;
  }

  &__line {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    vector-effect: non-scaling-stroke;
  }

  &--mono .mark__solid {
    display: none;
  }

  // Animación: trazo (diseño) → piezas que encajan (fabricación)
  &--animate {
    .mark__line rect,
    .mark__line path {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 900ms $ease-in-out;
    }
    .mark__line path {
      transition-delay: 200ms;
    }
    .mark__p {
      transition: transform 700ms $ease-out;
      transform-box: fill-box;
    }
    .mark__p--top {
      transform: scaleX(0);
      transform-origin: left center;
      transition-delay: 650ms;
    }
    .mark__p--right {
      transform: scaleY(0);
      transform-origin: center top;
      transition-delay: 780ms;
    }
    .mark__p--bottom {
      transform: scaleX(0);
      transform-origin: right center;
      transition-delay: 910ms;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &--animate {
      .mark__line rect,
      .mark__line path {
        stroke-dashoffset: 0;
      }
      .mark__p {
        transform: none;
      }
    }
  }
}

</style>

<style lang="scss">
// Sin scope: el .is-in lo pone un contenedor de afuera (aparición al hacer scroll)
.is-in .mark.mark--animate .mark__line rect,
.is-in .mark.mark--animate .mark__line path,
.mark.mark--animate.is-in .mark__line rect,
.mark.mark--animate.is-in .mark__line path {
  stroke-dashoffset: 0;
}
.is-in .mark.mark--animate .mark__p,
.mark.mark--animate.is-in .mark__p {
  transform: none;
}
</style>
