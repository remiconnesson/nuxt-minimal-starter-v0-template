<script setup lang="ts">
import type { CellData } from '~/composables/useSudoku'

const props = defineProps<{
  board: CellData[][]
  selectedCell: [number, number] | null
}>()

const emit = defineEmits<{
  selectCell: [row: number, col: number]
}>()

function isSelected(row: number, col: number) {
  return props.selectedCell?.[0] === row && props.selectedCell?.[1] === col
}

function isHighlighted(row: number, col: number) {
  if (!props.selectedCell) return false
  const [sr, sc] = props.selectedCell
  return row === sr || col === sc
}

function isSameBox(row: number, col: number) {
  if (!props.selectedCell) return false
  const [sr, sc] = props.selectedCell
  return (
    Math.floor(row / 3) === Math.floor(sr / 3) &&
    Math.floor(col / 3) === Math.floor(sc / 3)
  )
}

function isSameValue(row: number, col: number) {
  if (!props.selectedCell) return false
  const [sr, sc] = props.selectedCell
  const selectedVal = props.board[sr]?.[sc]?.value
  if (!selectedVal || selectedVal === 0) return false
  return props.board[row]?.[col]?.value === selectedVal
}
</script>

<template>
  <div class="inline-block rounded-lg overflow-hidden border-2 border-foreground/30 shadow-lg bg-background">
    <div class="grid grid-cols-9" style="width: min(85vw, 450px); height: min(85vw, 450px)">
      <SudokuCell
        v-for="(cell, idx) in board.flat()"
        :key="idx"
        :cell="cell"
        :row="Math.floor(idx / 9)"
        :col="idx % 9"
        :is-selected="isSelected(Math.floor(idx / 9), idx % 9)"
        :is-highlighted="isHighlighted(Math.floor(idx / 9), idx % 9)"
        :is-same-value="isSameValue(Math.floor(idx / 9), idx % 9)"
        :is-same-box="isSameBox(Math.floor(idx / 9), idx % 9)"
        @select="(r: number, c: number) => emit('selectCell', r, c)"
      />
    </div>
  </div>
</template>
