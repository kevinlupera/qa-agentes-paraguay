<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideRoute } = useNav()
// slide 1 = portada: lleva su propio logo grande
const isCover = computed(() => currentSlideRoute.value.no === 1)
</script>

<template>
  <!-- logo del evento: mismo lugar que en la diapo 10 del template (centrado, abajo) -->
  <img v-if="!isCover" class="event-logo" src="/logo-event.png" alt="AWS Community Day Paraguay 2026" />
</template>

<style scoped>
.event-logo {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  height: 44px;
  z-index: 30;
  pointer-events: none;
}
</style>
