<script setup lang="ts">
import type { CellData } from '~/composables/useSudoku'

const props = defineProps<{
  cell: CellData
  row: number
  col: number
  isSelected: boolean
  isHighlighted: boolean
  isSameValue: boolean
  isSameBox: boolean
}>()

const emit = defineEmits<{
  select: [row: number, col: number]
}>()

const borderClasses = computed(() => {
  const classes: string[] = []
  if (props.row % 3 === 0 && props.row !== 0) classes.push('border-t-2 border-t-foreground/30')
  if (props.col % 3 === 0 && props.col !== 0) classes.push('border-l-2 border-l-foreground/30')
  return classes.join(' ')
})
</script>

<template>
  <button
    :class="[
      'relative flex items-center justify-center font-mono text-lg transition-all duration-100 outline-none aspect-square',
      'border border-border/50',
      borderClasses,
      isSelected
        ? 'bg-primary/20 ring-2 ring-primary'
        : isSameValue && cell.value !== 0
          ? 'bg-primary/10'
          : isHighlighted
            ? 'bg-accent/60'
            : isSameBox
              ? 'bg-muted/40'
              : 'bg-background',
      cell.isError ? 'text-error' : cell.isGiven ? 'text-foreground font-semibold' : 'text-primary font-medium',
    ]"
    @click="emit('select', row, col)"
  >
    <span v-if="cell.value !== 0" class="text-base sm:text-lg md:text-xl">
      {{ cell.value }}
    </span>
    <div v-else-if="cell.notes.size > 0" class="grid grid-cols-3 gap-0 w-full h-full p-0.5">
      <span
        v-for="n in 9"
        :key="n"
        class="flex items-center justify-center text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground leading-none"
      >
        {{ cell.notes.has(n) ? n : '' }}
      </span>
    </div>
  </button>
</template>
