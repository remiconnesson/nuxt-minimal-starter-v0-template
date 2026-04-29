<script setup lang="ts">
defineProps<{
  gameOver: boolean
  gameWon: boolean
}>()

const emit = defineEmits<{
  restart: []
  continue: []
}>()
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="gameOver || gameWon"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-background/80 backdrop-blur-sm"
    >
      <h2 class="text-3xl font-bold font-sans" :class="gameWon ? 'text-primary' : 'text-foreground'">
        {{ gameWon ? 'You Win!' : 'Game Over' }}
      </h2>
      <div class="flex gap-3">
        <button
          v-if="gameWon"
          class="rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 font-sans"
          @click="emit('continue')"
        >
          Keep Playing
        </button>
        <button
          class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 font-sans"
          @click="emit('restart')"
        >
          Try Again
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active {
  transition: opacity 0.3s ease;
}
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
