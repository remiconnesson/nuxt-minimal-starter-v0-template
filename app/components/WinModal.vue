<script setup lang="ts">
import type { Difficulty } from '~/composables/useSudoku'

defineProps<{
  timer: number
  difficulty: Difficulty
  formatTime: (s: number) => string
}>()

const emit = defineEmits<{
  newGame: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div class="bg-background rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        <div class="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-success"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-foreground mb-2">Puzzle Complete</h2>
        <p class="text-muted-foreground mb-1">
          Difficulty: <span class="font-medium capitalize text-foreground">{{ difficulty }}</span>
        </p>
        <p class="text-muted-foreground mb-6">
          Time: <span class="font-mono font-medium text-foreground">{{ formatTime(timer) }}</span>
        </p>
        <button
          class="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all active:scale-95"
          @click="emit('newGame')"
        >
          New Game
        </button>
      </div>
    </div>
  </Teleport>
</template>
