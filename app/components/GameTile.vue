<script setup lang="ts">
import type { Tile } from '~/composables/useGame2048'

const props = defineProps<{
  tile: Tile
}>()

const tileColors: Record<number, { bg: string; text: string; glow: string }> = {
  2:    { bg: 'bg-[hsl(40,25%,88%)]',    text: 'text-[hsl(232,20%,25%)]',  glow: '' },
  4:    { bg: 'bg-[hsl(38,30%,82%)]',     text: 'text-[hsl(232,20%,25%)]',  glow: '' },
  8:    { bg: 'bg-[hsl(25,75%,58%)]',      text: 'text-white',               glow: 'shadow-[0_0_12px_hsl(25,75%,58%,0.4)]' },
  16:   { bg: 'bg-[hsl(18,80%,55%)]',      text: 'text-white',               glow: 'shadow-[0_0_14px_hsl(18,80%,55%,0.5)]' },
  32:   { bg: 'bg-[hsl(8,75%,55%)]',       text: 'text-white',               glow: 'shadow-[0_0_16px_hsl(8,75%,55%,0.5)]' },
  64:   { bg: 'bg-[hsl(2,70%,48%)]',       text: 'text-white',               glow: 'shadow-[0_0_18px_hsl(2,70%,48%,0.5)]' },
  128:  { bg: 'bg-[hsl(45,80%,55%)]',      text: 'text-white',               glow: 'shadow-[0_0_20px_hsl(45,80%,55%,0.5)]' },
  256:  { bg: 'bg-[hsl(45,85%,50%)]',      text: 'text-white',               glow: 'shadow-[0_0_22px_hsl(45,85%,50%,0.6)]' },
  512:  { bg: 'bg-[hsl(45,90%,45%)]',      text: 'text-white',               glow: 'shadow-[0_0_26px_hsl(45,90%,45%,0.6)]' },
  1024: { bg: 'bg-[hsl(45,95%,42%)]',      text: 'text-white',               glow: 'shadow-[0_0_30px_hsl(45,95%,42%,0.7)]' },
  2048: { bg: 'bg-[hsl(45,100%,40%)]',     text: 'text-white',               glow: 'shadow-[0_0_40px_hsl(45,100%,40%,0.8)]' },
}

const defaultColor = { bg: 'bg-[hsl(280,60%,45%)]', text: 'text-white', glow: 'shadow-[0_0_40px_hsl(280,60%,45%,0.8)]' }

const colors = computed(() => tileColors[props.tile.value] || defaultColor)

const fontSize = computed(() => {
  if (props.tile.value >= 1000) return 'text-xl md:text-2xl'
  if (props.tile.value >= 100) return 'text-2xl md:text-3xl'
  return 'text-3xl md:text-4xl'
})

const animClass = computed(() => {
  if (props.tile.isNew) return 'animate-tile-appear'
  if (props.tile.isMerged) return 'animate-tile-merge'
  return ''
})
</script>

<template>
  <div
    class="absolute flex items-center justify-center rounded-lg font-bold font-mono transition-all duration-100 ease-in-out"
    :class="[
      colors.bg,
      colors.text,
      colors.glow,
      fontSize,
      animClass,
    ]"
    :style="{
      top: `calc(${tile.row} * (25% - 3px) + ${tile.row + 1} * 6px)`,
      left: `calc(${tile.col} * (25% - 3px) + ${tile.col + 1} * 6px)`,
      width: 'calc(25% - 9px)',
      height: 'calc(25% - 9px)',
    }"
  >
    {{ tile.value }}
  </div>
</template>
