<script setup lang="ts">
const { allTiles, score, bestScore, gameOver, gameWon, move, initGame, continueGame } = useGame2048()

let touchStartX = 0
let touchStartY = 0

function handleKeydown(e: KeyboardEvent) {
  const keyMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
  }
  const dir = keyMap[e.key]
  if (dir) {
    e.preventDefault()
    move(dir)
  }
}

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  const threshold = 30

  if (Math.max(absDx, absDy) < threshold) return

  if (absDx > absDy) {
    move(dx > 0 ? 'right' : 'left')
  } else {
    move(dy > 0 ? 'down' : 'up')
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
  <main
    class="flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-background"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div class="w-full max-w-md flex flex-col gap-5">
      <!-- Header -->
      <div class="flex items-end justify-between">
        <div>
          <h1 class="text-5xl font-bold text-primary font-mono tracking-tight">2048</h1>
          <p class="text-sm text-muted-foreground font-sans mt-1">Join the tiles, get to 2048!</p>
        </div>
        <div class="flex gap-2">
          <ScoreCard label="Score" :value="score" />
          <ScoreCard label="Best" :value="bestScore" />
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between">
        <p class="text-xs text-muted-foreground font-sans">
          <span class="hidden sm:inline">Use arrow keys or WASD to play</span>
          <span class="sm:hidden">Swipe to play</span>
        </p>
        <button
          class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 font-sans"
          @click="initGame"
        >
          New Game
        </button>
      </div>

      <!-- Board -->
      <div class="relative">
        <GameBoard :tiles="allTiles" />
        <GameOverlay
          :game-over="gameOver"
          :game-won="gameWon"
          @restart="initGame"
          @continue="continueGame"
        />
      </div>

      <!-- Footer hint -->
      <p class="text-center text-xs text-muted-foreground font-sans">
        Merge tiles with the same number to reach 2048
      </p>
    </div>
  </main>
</template>
