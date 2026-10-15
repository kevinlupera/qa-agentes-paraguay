<script setup lang="ts">
// ponytail: ids de YouTube vacíos hasta subir los videos; muestra placeholder en vez de iframe roto
const props = defineProps<{
  videoId?: string
  layer: string
  expected: string
}>()
const url = props.videoId ? `https://youtu.be/${props.videoId}` : ''
</script>

<template>
  <div class="demo grid grid-cols-[1.5fr_1fr] gap-6 items-center">
    <div class="frame">
      <iframe
        v-if="videoId"
        :src="`https://www.youtube.com/embed/${videoId}`"
        title="Demo"
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      />
      <div v-else class="pending">
        <div class="text-4xl">🎬</div>
        <div class="mono-note pt-2">Video pendiente de subir</div>
      </div>
    </div>
    <div class="space-y-3">
      <div class="plate plate--ok">
        <div class="mono-note pb-1">Capa · {{ layer }}</div>
        <div class="text-sm">{{ expected }}</div>
      </div>
      <div v-if="videoId" class="plate flex items-center gap-3">
        <div class="qr-mini">
          <QRCode :width="96" :height="96" type="canvas" :data="url" :margin="4"
            :dots-options="{ type: 'square', color: '#172033' }"
            :background-options="{ color: '#ffffff' }"
            :corners-square-options="{ type: 'square', color: '#172033' }" />
        </div>
        <div class="mono-note">Sin internet en la sala:<br>escanea y míralo en tu celular</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .22);
  background: #0d1424;
}
.frame iframe { width: 100%; height: 100%; border: 0; }
.pending { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.qr-mini { background: #fff; padding: .3rem; border-radius: 10px; line-height: 0; position: relative; z-index: 50; }
</style>
