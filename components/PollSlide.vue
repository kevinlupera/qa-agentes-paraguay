<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{
  tag: string
  question: string
  options?: string[]
  url?: string
}>(), { options: () => [], url: '' })

// one shared poll event: set pollUrl / pollCode once in the headmatter
const cfg = useSlideContext().$slidev.configs as Record<string, string>
const pollUrl = computed(() => props.url || cfg.pollUrl || '')
const pollCode = computed(() => cfg.pollCode || '')

// guard: a placeholder URL must never reach the room as a working-looking QR
const missing = computed(() => pollUrl.value.includes('REEMPLAZAR') || !pollUrl.value)
</script>

<template>
  <div class="poll">
    <div class="mono-note">{{ tag }}</div>
    <h1 class="question">{{ question }}</h1>

    <div class="body">
      <div class="left">
        <slot />
        <ol v-if="options.length" class="options">
          <li v-for="(o, i) in options" :key="o">
            <span class="letter">{{ String.fromCharCode(65 + i) }}</span>{{ o }}
          </li>
        </ol>
      </div>

      <div class="plate plate--ok qr-box">
        <div v-if="missing" class="missing">FALTA URL<br><small>pollUrl</small></div>
        <div v-else class="qr">
          <QRCode
            :width="320"
            :height="320"
            type="canvas"
            :data="pollUrl"
            :margin="8"
            :dots-options="{ type: 'square', color: '#06080a' }"
            :background-options="{ color: '#ffffff' }"
            :corners-square-options="{ type: 'square', color: '#06080a' }"
          />
        </div>
        <div v-if="pollCode" class="code">{{ pollCode }}</div>      </div>
    </div>
  </div>
</template>

<style scoped>
.question { font-size: 2rem; line-height: 1.2; margin: .4rem 0 1rem; }
.body { display: flex; gap: 2rem; align-items: center; justify-content: space-between; }
.left { flex: 1; min-width: 0; }
.options { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; gap: .6rem; font-size: 1.15rem; }
.letter {
  display: inline-block; width: 1.8rem; height: 1.8rem; line-height: 1.8rem; margin-right: .7rem;
  text-align: center; border-radius: 6px; border: 1px solid currentColor; font-weight: 700;
}
.qr-box { text-align: center; padding: 1rem; flex: none; }
.code { font-size: 1.6rem; font-weight: 800; letter-spacing: .15em; padding-top: .4rem; color: #fff; }
.missing { width: 320px; height: 320px; display: grid; place-content: center; font-weight: 800; color: #f87171; border: 2px dashed #f87171; }
</style>
