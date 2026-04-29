<script setup lang="ts">
import type { Difficulty } from '~/composables/useSudoku'

const props = defineProps<{
  difficulty: Difficulty
  timer: number
  mistakes: number
  progress: number
  formatTime: (s: number) => string
}>()

const emit = defineEmits<{
  newGame: [difficulty: Difficulty]
}>()

const showDifficultyMenu = ref(false)

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

function selectDifficulty(diff: Difficulty) {
  showDifficultyMenu.value = false
  emit('newGame', diff)
}

function difficultyColor(diff: Difficulty) {
  switch (diff) {
    case 'easy':
      return 'text-success'
    case 'medium':
      return 'text-primary'
    case 'hard':
      return 'text-error'
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full max-w-[450px]">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">Sudoku</h1>
      <div class="relative">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-all text-sm font-medium"
          @click="showDifficultyMenu = !showDifficultyMenu"
        >
          <span :class="difficultyColor(difficulty)">{{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div
          v-if="showDifficultyMenu"
          class="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10"
        >
          <button
            v-for="d in difficulties"
            :key="d.value"
            :class="[
              'block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
              d.value === difficulty ? 'bg-muted font-medium' : '',
            ]"
            @click="selectDifficulty(d.value)"
          >
            <span :class="difficultyColor(d.value)">{{ d.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-sm text-muted-foreground">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span class="font-mono tabular-nums">{{ formatTime(timer) }}</span>
        </div>
        <div v-if="mistakes > 0" class="flex items-center gap-1.5 text-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" />
          </svg>
          <span>{{ mistakes }} {{ mistakes === 1 ? 'error' : 'errors' }}</span>
        </div>
      </div>
      <span class="font-mono tabular-nums">{{ progress }}%</span>
    </div>

    <!-- Progress bar -->
    <div class="w-full h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        class="h-full rounded-full bg-primary transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>
