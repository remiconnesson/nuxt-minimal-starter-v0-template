<script setup lang="ts">
const props = defineProps<{
  numberCounts: Record<number, number>
}>()

const emit = defineEmits<{
  place: [num: number]
}>()
</script>

<template>
  <div class="grid grid-cols-9 gap-1.5 sm:gap-2 w-full max-w-[450px]">
    <button
      v-for="n in 9"
      :key="n"
      :class="[
        'relative flex flex-col items-center justify-center rounded-lg font-mono text-lg sm:text-xl font-semibold py-2.5 sm:py-3 transition-all duration-100',
        numberCounts[n] >= 9
          ? 'bg-muted text-muted-foreground/40 cursor-not-allowed'
          : 'bg-background text-primary border border-border hover:bg-primary/10 hover:border-primary/40 active:scale-95 cursor-pointer',
      ]"
      :disabled="numberCounts[n] >= 9"
      @click="emit('place', n)"
    >
      {{ n }}
      <span class="absolute bottom-0.5 text-[9px] text-muted-foreground font-sans font-normal">
        {{ numberCounts[n] }}/9
      </span>
    </button>
  </div>
</template>
