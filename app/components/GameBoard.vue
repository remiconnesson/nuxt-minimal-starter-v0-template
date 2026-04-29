<script setup lang="ts">
import type { Tile } from '~/composables/useGame2048'

defineProps<{
  tiles: Tile[]
}>()
</script>

<template>
  <div class="relative w-full aspect-square rounded-xl bg-secondary p-1.5 select-none">
    <!-- Background grid cells -->
    <div class="grid grid-cols-4 gap-1.5 w-full h-full">
      <div
        v-for="i in 16"
        :key="i"
        class="rounded-lg bg-muted"
      />
    </div>

    <!-- Animated tiles layer -->
    <div class="absolute inset-1.5">
      <GameTile
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
      />
    </div>
  </div>
</template>
