<script setup lang="ts">
// Landing (/). Todo el texto sale de LANDING en src/content/copy.ts.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
// Recurso visual propio: el logo de DECO es un cuadrado abierto de tres piezas (camel, nogal,
// espresso) con un trazo de dibujo desfasado. Aquí enmarca a Cristin en el hero, se "fabrica" en la
// banda del taller y marca los pasos del proceso: trazo = diseño, pieza sólida = fabricación.
import { onBeforeUnmount, onMounted, ref, type Directive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import DecoMark from '@/components/DecoMark.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import { IS_LOCAL, PERSON_NAME, STORAGE_PREFIX, VSL_POSTER, VSL_POSTER_FALLBACK } from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)
const heroIn = ref(false)

// Portada del video: Cloudinary → archivo local → recuadro oscuro
const poster = ref(VSL_POSTER || VSL_POSTER_FALLBACK)
function onPosterError() {
  poster.value = poster.value !== VSL_POSTER_FALLBACK ? VSL_POSTER_FALLBACK : ''
}

function openModal() {
  // Quien no calificó hace menos de 24 h vuelve a /sin-espacio
  if (!IS_LOCAL) {
    const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
    if (disqAt && Date.now() - disqAt < 24 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

// Aparición al entrar en pantalla (una sola vez). Sin IntersectionObserver el contenido queda visible.
const io =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in')
              io?.unobserve(e.target)
            }
          }),
        { rootMargin: '0px 0px -10% 0px' },
      )
    : null
const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!io) return
    el.classList.add('reveal')
    io.observe(el)
  },
}

const onScroll = () => (showSticky.value = window.scrollY > 700)

onMounted(() => {
  captureFbParams()
  window.addEventListener('scroll', onScroll, { passive: true })
  requestAnimationFrame(() => (heroIn.value = true))
  // /?editar=1 (desde "Corregir mis datos") reabre el registro con lo guardado
  if (route.query.editar) modalOpen.value = true
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <CountdownTimer />
      </div>
    </header>

    <!-- 1 · HERO: titular + Cristin dentro del cuadrado abierto del logo (portada del video) -->
    <section class="hero" :class="{ 'is-in': heroIn }" aria-labelledby="hero-title">
      <div class="wrap hero__grid">
        <h1 id="hero-title" class="hero__title">
          <span class="hero__line">{{ LANDING.headline }}</span>
          <em class="hero__line hero__accent">{{ LANDING.headlineAccent }}</em>
        </h1>

        <div class="hero__media">
          <button type="button" class="frame" data-cta="registro" aria-label="Ver el video completo" @click="openModal">
            <span class="frame__piece frame__piece--top" aria-hidden="true"></span>
            <span class="frame__piece frame__piece--right" aria-hidden="true"></span>
            <span class="frame__piece frame__piece--bottom" aria-hidden="true"></span>
            <span class="frame__line" aria-hidden="true"></span>
            <span class="frame__photo">
              <img
                v-if="poster"
                :src="poster"
                alt=""
                width="1200"
                height="1200"
                fetchpriority="high"
                decoding="async"
                @error="onPosterError"
              />
            </span>
            <span class="frame__play">
              <span class="frame__icon" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
              <span class="frame__label">
                <strong>Mira el video</strong>
                <span>{{ PERSON_NAME }} · {{ LANDING.videoCaption }}</span>
              </span>
            </span>
          </button>
        </div>

        <div class="hero__copy">
          <p class="hero__sub">{{ LANDING.sub }}</p>
          <div class="hero__cta">
            <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
              <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
            </button>
            <p class="hero__note">{{ LANDING.ctaNote }}</p>
          </div>
          <p class="hero__facts">
            <template v-for="(f, i) in LANDING.heroFacts" :key="f">
              <span>{{ f }}</span><span v-if="i < LANDING.heroFacts.length - 1" class="hero__dot" :class="`hero__dot--${i}`" aria-hidden="true"></span>
            </template>
          </p>
        </div>
      </div>
    </section>

    <!-- 2 · EL TALLER: origen en las mesas de mármol → "lo que ves es lo que llega" -->
    <section class="origin" aria-labelledby="origin-title">
      <div class="wrap origin__grid">
        <div v-reveal class="origin__story">
          <h2 id="origin-title" class="origin__kicker">{{ LANDING.origin.kicker }}</h2>
          <p v-for="p in LANDING.origin.story" :key="p">{{ p }}</p>
        </div>
        <figure v-reveal class="origin__figure">
          <img src="/materiales.webp" alt="Muestras de mármol, madera y colores sobre la mesa de trabajo de Cristin" width="1120" height="360" loading="lazy" decoding="async" />
          <figcaption>Mármol, madera, textiles y color: así empieza cada proyecto.</figcaption>
        </figure>
      </div>

      <div v-reveal class="wrap origin__statement">
        <DecoMark animate class="origin__mark" />
        <div>
          <p class="origin__big">{{ LANDING.origin.statement }}</p>
          <p class="origin__small">{{ LANDING.origin.statementSub }}</p>
        </div>
      </div>
    </section>

    <!-- 3 · EL PROCESO: línea de tiempo + referencias de inversión -->
    <section class="process" aria-labelledby="process-title">
      <div class="wrap">
        <h2 id="process-title" v-reveal class="process__title">{{ LANDING.steps.title }}</h2>

        <div class="process__grid">
          <ol v-reveal class="timeline" role="list">
            <li v-for="(s, i) in LANDING.steps.items" :key="s.title" class="step" :style="{ '--i': i }">
              <span class="step__num" aria-hidden="true">{{ pad(i + 1) }}</span>
              <div class="step__body">
                <h3 class="step__title">{{ s.title }}</h3>
                <p class="step__meta">{{ s.meta }}</p>
                <p class="step__text">{{ s.text }}</p>
              </div>
            </li>
          </ol>

          <aside v-reveal class="ledger" aria-labelledby="ledger-title">
            <h3 id="ledger-title" class="ledger__title">{{ LANDING.prices.title }}</h3>
            <dl class="ledger__rows">
              <div v-for="p in LANDING.prices.items" :key="p.space" class="ledger__row">
                <dt>
                  {{ p.space }}
                  <small v-if="p.detail">{{ p.detail }}</small>
                </dt>
                <dd>{{ p.range }}</dd>
              </div>
            </dl>
            <p class="ledger__note">{{ LANDING.prices.note }}</p>
            <p class="ledger__aside">{{ LANDING.steps.budgetNote }}</p>
          </aside>
        </div>

        <div class="process__cta">
          <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
            <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.steps.cta }}
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonios reales (vacío = no aparece) -->
    <TestimonialsSection />

    <!-- 4 · CRISTIN: presentación, cifras, la frase de los clientes y CTA -->
    <section class="about" aria-labelledby="about-title">
      <div class="wrap about__grid">
        <figure v-reveal class="about__figure">
          <img src="/cristin.webp" :alt="`${PERSON_NAME}, fundadora de DECO by DC, revisando muestras de materiales`" width="1200" height="1200" loading="lazy" decoding="async" />
        </figure>

        <div v-reveal class="about__copy">
          <h2 id="about-title" class="about__title">{{ LANDING.about.title }}</h2>
          <p class="about__role">{{ LANDING.about.role }}</p>
          <p v-for="p in LANDING.about.paragraphs" :key="p" class="about__p">{{ p }}</p>

          <dl class="stats">
            <div v-for="s in LANDING.about.stats" :key="s.label" class="stats__item">
              <dt class="sr-only">{{ s.label }}</dt>
              <dd>
                <span class="stats__value">{{ s.value }}<small>{{ s.unit }}</small></span>
                <span class="stats__label">{{ s.label }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-reveal class="wrap quote">
        <blockquote class="quote__text">«{{ LANDING.about.quote }}»</blockquote>
        <p class="quote__source">{{ LANDING.about.quoteSource }}</p>
        <p class="quote__closing">{{ LANDING.about.closing }}</p>
        <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
          <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.about.cta }}
        </button>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo -->
    <Transition name="sticky">
      <div v-if="showSticky && !modalOpen" class="sticky" role="region" aria-label="Ver el video">
        <div class="sticky__copy">
          <strong>{{ LANDING.sticky.title }}</strong>
          <span>{{ LANDING.sticky.sub }}</span>
        </div>
        <button type="button" class="btn" data-cta="registro" @click="openModal">
          {{ LANDING.sticky.cta }} <i class="fa-solid fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>

    <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<style scoped lang="scss">
// ── Aparición al hacer scroll ────────────────────────────────────────────────
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 800ms $ease-out,
    transform 800ms $ease-out;

  &.is-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: opacity 400ms ease;
  }
}

// ── Encabezado ───────────────────────────────────────────────────────────────
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $line;
  background: rgba($surface, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 68px;
  }
}

// ── 1 · Hero ─────────────────────────────────────────────────────────────────
.hero {
  padding: 40px 0 72px;

  @media (max-width: 599px) {
    padding-top: 24px;
  }
  overflow: hidden;

  &__grid {
    display: grid;
    grid-template-areas: 'title' 'media' 'copy';
    gap: 28px;

    @media (min-width: 900px) {
      grid-template-columns: 1.08fr 0.92fr;
      grid-template-areas:
        'title media'
        'copy media';
      grid-template-rows: auto 1fr;
      column-gap: 64px;
      row-gap: 28px;
      align-items: start;
      padding-top: 24px;
    }
  }

  &__title {
    grid-area: title;
    font-size: clamp(2.4rem, 7.4vw, 4.4rem);
    line-height: 1.04;
    color: $espresso;

    @media (min-width: 900px) {
      align-self: end;
    }
  }

  &__line {
    display: block;
    opacity: 0;
    transform: translateY(0.35em);
    transition:
      opacity 900ms $ease-out,
      transform 900ms $ease-out;

    & + & {
      transition-delay: 140ms;
    }
  }

  &__accent {
    margin-top: 0.12em;
    color: $accent-text;
    font-style: italic;
    font-weight: 300;
  }

  &__media {
    grid-area: media;
  }

  &__copy {
    grid-area: copy;
    max-width: 520px;
  }

  &.is-in &__line {
    opacity: 1;
    transform: none;
  }

  &__sub {
    color: $ink-muted;
    font-size: 1.1rem;
    line-height: 1.65;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 28px;

    @media (max-width: 899px) {
      align-items: stretch;
      text-align: center;
    }
  }

  &__note {
    color: $ink-muted;
    font-size: 0.875rem;
  }

  &__facts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 14px;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid $line;
    color: $espresso;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.04em;

    @media (max-width: 899px) {
      justify-content: center;
    }
  }

  &__dot {
    width: 8px;
    height: 8px;

    &--0 {
      background: $camel;
    }
    &--1 {
      background: $walnut;
    }
  }
}

// Cuadrado abierto del logo como marco del video
.frame {
  position: relative;
  display: block;
  width: calc(100% - 8px);
  max-width: 520px;
  margin: 8px auto 0 0;
  aspect-ratio: 80 / 88;
  padding: 0;
  border: 0;
  background: none;
  color: $ink-on-dark;
  font: inherit;
  text-align: left;
  cursor: pointer;

  // Las tres piezas: arriba camel, derecha nogal, abajo espresso (proporciones del logo)
  &__piece {
    position: absolute;
    transition: transform 900ms $ease-out;

    &--top {
      top: 0;
      left: 0;
      width: 68%;
      height: 9%;
      background: $camel;
      transform: scaleX(0);
      transform-origin: left;
      transition-delay: 0ms;
    }
    &--right {
      top: 0;
      right: 0;
      width: 32%;
      height: 82%;
      background: $walnut;
      transform: scaleY(0);
      transform-origin: top;
      transition-delay: 120ms;
    }
    &--bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 18%;
      background: $espresso;
      transform: scaleX(0);
      transform-origin: right;
      transition-delay: 240ms;
    }
  }

  // Trazo de dibujo desfasado (como en las variantes del logo)
  &__line {
    position: absolute;
    inset: -10px -10px 10px 10px;
    border: 1.5px solid $espresso;

    @media (max-width: 599px) {
      inset: -6px -6px 6px 6px;
    }
    clip-path: inset(0 100% 100% 0);
    transition: clip-path 900ms $ease-in-out 200ms;
    pointer-events: none;
    z-index: 2;
  }

  // La foto vive en el hueco blanco del logo
  &__photo {
    position: absolute;
    top: 9%;
    left: 0;
    width: 68%;
    height: 73%;
    overflow: hidden;
    background: $stone;
    clip-path: inset(0 0 100% 0);
    transition: clip-path 700ms $ease-in-out 150ms;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 42% 28%;
      transform: scale(1.12);
      transition: transform 900ms $ease-out 150ms;
    }
  }

  .hero.is-in & {
    .frame__piece {
      transform: none;
    }
    .frame__line {
      clip-path: inset(0 0 0 0);
    }
    .frame__photo {
      clip-path: inset(0 0 0 0);

      img {
        transform: scale(1);
      }
    }
  }

  &__play {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 18px;
    z-index: 3;
  }

  &__icon {
    display: grid;
    place-items: center;
    flex: none;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: $surface;
    color: $espresso;
    font-size: 1rem;
    transition: transform 240ms $ease-out;

    i {
      margin-left: 3px;
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    min-width: 0;
    font-size: 0.85rem;
    line-height: 1.3;
    color: $ink-on-dark-muted;

    strong {
      color: $ink-on-dark;
      font-size: 1rem;
      font-weight: 500;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .frame__icon {
      transform: scale(1.08);
    }
    &:hover .frame__photo img {
      transform: scale(1.03);
      transition-delay: 0ms;
      transition-duration: 900ms;
    }
  }

  &:active .frame__icon {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline-offset: 14px;
  }

  // Celular: marco cuadrado y columna nogal angosta para que la foto use el ancho
  @media (max-width: 599px) {
    aspect-ratio: 1 / 1;

    .frame__piece--right {
      width: 14%;
      height: 79%;
    }
    .frame__piece--top {
      width: 86%;
    }
    .frame__photo {
      width: 86%;
      height: 70%;
    }
    .frame__piece--bottom,
    .frame__play {
      height: 21%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .frame__piece {
      transform: none;
    }
    .frame__line,
    .frame__photo {
      clip-path: none;
    }
    .frame__photo img {
      transform: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__line {
    opacity: 1;
    transform: none;
  }
}

// ── 2 · El taller ────────────────────────────────────────────────────────────
.origin {
  padding: 88px 0 96px;
  background: $espresso;
  color: $ink-on-dark;

  &__grid {
    display: grid;
    gap: 40px;

    @media (min-width: 900px) {
      grid-template-columns: 0.9fr 1.1fr;
      gap: 72px;
      align-items: center;
    }
  }

  &__story {
    display: flex;
    flex-direction: column;
    gap: 16px;

    p {
      color: $ink-on-dark-muted;
      font-size: 1.05rem;
      line-height: 1.7;
    }
  }

  &__kicker {
    margin-bottom: 8px;
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.08;
    font-style: italic;
    font-weight: 300;
    color: $ink-on-dark;
  }

  &__figure {
    margin: 0;

    img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 1120 / 360;
      object-fit: cover;

      @media (max-width: 599px) {
        aspect-ratio: 4 / 3;
        object-position: 35% 50%;
      }
    }

    figcaption {
      margin-top: 12px;
      padding-left: 14px;
      border-left: 2px solid $camel;
      color: $ink-on-dark-muted;
      font-size: 0.875rem;
    }
  }

  &__statement {
    display: grid;
    gap: 28px;
    margin-top: 80px;
    padding-top: 56px;
    border-top: 1px solid rgba($ink-on-dark, 0.14);

    @media (min-width: 720px) {
      grid-template-columns: auto 1fr;
      gap: 48px;
      align-items: center;
    }
  }

  &__mark {
    width: 112px;
    height: 112px;
    color: $ink-on-dark;
  }

  &__big {
    max-width: 820px;
    font-family: $font-serif;
    font-size: clamp(1.9rem, 4.6vw, 3.25rem);
    font-weight: 300;
    font-variation-settings: 'SOFT' 50, 'opsz' 96;
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  &__small {
    max-width: 620px;
    margin-top: 16px;
    color: $ink-on-dark-muted;
    font-size: 1.05rem;
  }
}

// ── 3 · Proceso ──────────────────────────────────────────────────────────────
.process {
  padding: 96px 0;

  &__title {
    max-width: 780px;
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1.08;
    color: $espresso;
  }

  &__grid {
    display: grid;
    gap: 48px;
    margin-top: 56px;

    @media (min-width: 960px) {
      grid-template-columns: 1.25fr 0.75fr;
      gap: 72px;
      align-items: start;
    }
  }

  &__cta {
    margin-top: 56px;

    @media (max-width: 599px) {
      .btn {
        width: 100%;
      }
    }
  }
}

.timeline {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;

  // Línea vertical que se dibuja al entrar
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 27px;
    width: 1px;
    background: $line;
  }
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 27px;
    width: 1px;
    background: $walnut;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1400ms $ease-in-out 200ms;
  }
  &.is-in::after {
    transform: none;
  }

  // Los pasos llegan uno detrás de otro
  &.reveal .step {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 700ms $ease-out,
      transform 700ms $ease-out;
    transition-delay: calc(var(--i) * 140ms + 150ms);
  }
  &.reveal.is-in .step {
    opacity: 1;
    transform: none;
  }
}

.step {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
  padding-bottom: 40px;

  &:last-child {
    padding-bottom: 0;
  }

  &__num {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    background: $surface;
    border: 1px solid $espresso;
    font-family: $font-serif;
    font-size: 1.2rem;
    color: $espresso;
  }

  &:nth-child(1) &__num {
    box-shadow: inset 0 4px 0 $camel;
  }
  &:nth-child(2) &__num {
    box-shadow: inset -4px 0 0 $walnut;
  }
  &:nth-child(3) &__num {
    box-shadow: inset 0 -4px 0 $espresso;
  }
  &:nth-child(4) &__num {
    background: $espresso;
    color: $ink-on-dark;
  }

  &__body {
    padding-top: 4px;
  }

  &__title {
    font-family: $font-serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: $espresso;
  }

  &__meta {
    margin-top: 6px;
    color: $accent-text;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  &__text {
    max-width: 560px;
    margin-top: 12px;
    color: $ink-muted;
    line-height: 1.7;
  }
}

.ledger {
  padding: 32px 28px;
  background: $stone;
  border-top: 6px solid $camel;

  @media (min-width: 960px) {
    position: sticky;
    top: 100px;
  }

  &__title {
    font-family: $font-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.2;
    color: $espresso;
  }

  &__rows {
    margin: 24px 0 0;
  }

  &__row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px dashed rgba($espresso, 0.22);

    dt {
      flex: 1;
      font-weight: 500;
      color: $espresso;

      small {
        display: block;
        color: $ink-muted;
        font-size: 0.8125rem;
        font-weight: 400;
      }
    }

    dd {
      margin: 0;
      font-variant-numeric: tabular-nums;
      color: $walnut;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  &__note {
    margin-top: 16px;
    color: $ink-muted;
    font-size: 0.875rem;
  }

  &__aside {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba($espresso, 0.14);
    font-family: $font-serif;
    font-style: italic;
    font-size: 1.05rem;
    line-height: 1.5;
    color: $espresso;
  }
}

// ── 4 · Cristin ──────────────────────────────────────────────────────────────
.about {
  padding: 96px 0 104px;
  background: $stone;

  &__grid {
    display: grid;
    gap: 40px;

    @media (min-width: 900px) {
      grid-template-columns: 0.95fr 1.05fr;
      gap: 72px;
      align-items: center;
    }
  }

  &__figure {
    position: relative;
    margin: 0;

    // Pieza camel del logo asomando detrás de la foto
    &::before {
      content: '';
      position: absolute;
      top: -14px;
      left: -14px;
      width: 46%;
      height: 46%;
      background: $camel;
    }

    img {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }

  &__title {
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    line-height: 1.05;
    color: $espresso;
  }

  &__role {
    margin: 10px 0 24px;
    color: $accent-text;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  &__p {
    color: $ink-muted;
    font-size: 1.05rem;
    line-height: 1.7;

    & + & {
      margin-top: 14px;
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 36px 0 0;
  padding-top: 28px;
  border-top: 1px solid rgba($espresso, 0.16);

  dd {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
  }

  &__value {
    font-family: $font-serif;
    font-size: clamp(2.2rem, 5vw, 3rem);
    line-height: 1;
    color: $espresso;
    font-variant-numeric: lining-nums;

    small {
      margin-left: 4px;
      font-family: $font-sans;
      font-size: 0.875rem;
      color: $accent-text;
    }
  }

  &__label {
    color: $ink-muted;
    font-size: 0.875rem;
    line-height: 1.4;

    @media (max-width: 420px) {
      font-size: 0.8125rem;
    }
  }
}

.quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 96px;
  text-align: center;

  &__text {
    margin: 0;
    font-family: $font-serif;
    font-size: clamp(2.4rem, 7vw, 4.75rem);
    font-style: italic;
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: $espresso;
  }

  &__source {
    margin-top: 16px;
    color: $accent-text;
    font-size: 0.9375rem;
  }

  &__closing {
    max-width: 520px;
    margin: 40px 0 24px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  @media (max-width: 599px) {
    .btn {
      width: 100%;
    }
  }
}

// ── CTA fijo ─────────────────────────────────────────────────────────────────
.sticky {
  position: fixed;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  left: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px 10px 16px;
  border: 1px solid $line;
  border-radius: $radius-md;
  background: $raised;
  box-shadow: $shadow-modal;

  &__copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    font-size: 0.8125rem;
    color: $ink-muted;

    strong,
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    strong {
      color: $ink;
      font-size: 0.9375rem;
      font-weight: 500;
    }
  }

  .btn {
    flex: none;
  }

  @media (min-width: 900px) {
    right: auto;
    left: 50%;
    width: 560px;
    transform: translateX(-50%);
  }
}

.sticky-enter-active,
.sticky-leave-active {
  transition:
    opacity 0.24s $ease-out,
    translate 0.24s $ease-out;
}
.sticky-enter-from,
.sticky-leave-to {
  opacity: 0;
  translate: 0 12px;
}
</style>
