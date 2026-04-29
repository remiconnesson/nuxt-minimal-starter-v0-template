<script setup lang="ts">
defineProps<{
  label: string
  value: number
}>()
</script>

<template>
  <div class="flex flex-col items-center rounded-lg bg-secondary px-4 py-2 min-w-[80px]">
    <span class="text-xs uppercase tracking-wider text-muted-foreground font-sans">{{ label }}</span>
    <span class="text-xl font-bold font-mono text-foreground tabular-nums">{{ value }}</span>
  </div>
</template>
