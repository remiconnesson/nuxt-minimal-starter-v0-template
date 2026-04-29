<script setup lang="ts">
import type { Difficulty } from '~/composables/useSudoku'

const {
  board,
  selectedCell,
  difficulty,
  isNotesMode,
  timer,
  isComplete,
  mistakes,
  progress,
  numberCounts,
  newGame,
  selectCell,
  placeNumber,
  eraseCell,
  undo,
  toggleNotes,
  getHint,
  formatTime,
} = useSudoku()

onMounted(() => {
  newGame('easy')
})

function handleNewGame(diff?: Difficulty) {
  newGame(diff ?? difficulty.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key >= '1' && e.key <= '9') {
    placeNumber(parseInt(e.key))
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    eraseCell()
  } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    undo()
  } else if (e.key === 'n' || e.key === 'N') {
    toggleNotes()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <main class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="flex flex-col items-center gap-4 sm:gap-5">
      <GameHeader
        :difficulty="difficulty"
        :timer="timer"
        :mistakes="mistakes"
        :progress="progress"
        :format-time="formatTime"
        @new-game="handleNewGame"
      />

      <SudokuBoard
        :board="board"
        :selected-cell="selectedCell"
        @select-cell="selectCell"
      />

      <GameControls
        :is-notes-mode="isNotesMode"
        @undo="undo"
        @erase="eraseCell"
        @toggle-notes="toggleNotes"
        @hint="getHint"
      />

      <NumberPad
        :number-counts="numberCounts"
        @place="placeNumber"
      />

      <WinModal
        v-if="isComplete"
        :timer="timer"
        :difficulty="difficulty"
        :format-time="formatTime"
        @new-game="handleNewGame()"
      />
    </div>
  </main>
</template>
