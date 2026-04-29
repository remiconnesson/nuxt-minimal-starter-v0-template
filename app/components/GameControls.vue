<script setup lang="ts">
const props = defineProps<{
  isNotesMode: boolean
}>()

const emit = defineEmits<{
  undo: []
  erase: []
  toggleNotes: []
  hint: []
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-[450px]">
    <button
      class="flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all active:scale-95"
      @click="emit('undo')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
      </svg>
      <span class="text-xs font-medium">Undo</span>
    </button>

    <button
      class="flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all active:scale-95"
      @click="emit('erase')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
        <path d="M22 21H7" /><path d="m5 11 9 9" />
      </svg>
      <span class="text-xs font-medium">Erase</span>
    </button>

    <button
      :class="[
        'flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border transition-all active:scale-95',
        isNotesMode
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background text-foreground border-border hover:bg-muted',
      ]"
      @click="emit('toggleNotes')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <span class="text-xs font-medium">Notes</span>
    </button>

    <button
      class="flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all active:scale-95"
      @click="emit('hint')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
      <span class="text-xs font-medium">Hint</span>
    </button>
  </div>
</template>
