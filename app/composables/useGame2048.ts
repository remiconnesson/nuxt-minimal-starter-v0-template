import { ref, computed } from 'vue'

export interface Tile {
  id: number
  value: number
  row: number
  col: number
  isNew: boolean
  isMerged: boolean
}

type Grid = (Tile | null)[][]
type Direction = 'up' | 'down' | 'left' | 'right'

let tileIdCounter = 0

function createEmptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(null))
}

function getEmptyCells(grid: Grid): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!grid[r][c]) cells.push({ row: r, col: c })
    }
  }
  return cells
}

function addRandomTile(grid: Grid): Grid {
  const empty = getEmptyCells(grid)
  if (empty.length === 0) return grid
  const { row, col } = empty[Math.floor(Math.random() * empty.length)]
  const newGrid = grid.map(r => [...r])
  newGrid[row][col] = {
    id: ++tileIdCounter,
    value: Math.random() < 0.9 ? 2 : 4,
    row,
    col,
    isNew: true,
    isMerged: false,
  }
  return newGrid
}

function cloneGrid(grid: Grid): Grid {
  return grid.map(r => r.map(t => (t ? { ...t, isNew: false, isMerged: false } : null)))
}

function slideLine(line: (Tile | null)[]): { tiles: (Tile | null)[]; score: number } {
  const filtered = line.filter(Boolean) as Tile[]
  const result: (Tile | null)[] = []
  let score = 0
  let i = 0

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i].value === filtered[i + 1].value) {
      const mergedValue = filtered[i].value * 2
      result.push({
        id: ++tileIdCounter,
        value: mergedValue,
        row: 0,
        col: 0,
        isNew: false,
        isMerged: true,
      })
      score += mergedValue
      i += 2
    } else {
      result.push({ ...filtered[i], isNew: false, isMerged: false })
      i++
    }
  }

  while (result.length < 4) {
    result.push(null)
  }

  return { tiles: result, score }
}

function moveGrid(grid: Grid, direction: Direction): { grid: Grid; score: number; moved: boolean } {
  let newGrid = cloneGrid(grid)
  let totalScore = 0
  let moved = false

  if (direction === 'left') {
    for (let r = 0; r < 4; r++) {
      const { tiles, score } = slideLine(newGrid[r])
      totalScore += score
      for (let c = 0; c < 4; c++) {
        if (tiles[c]) {
          tiles[c]!.row = r
          tiles[c]!.col = c
        }
        if (newGrid[r][c]?.value !== tiles[c]?.value) moved = true
        newGrid[r][c] = tiles[c]
      }
    }
  } else if (direction === 'right') {
    for (let r = 0; r < 4; r++) {
      const reversed = [...newGrid[r]].reverse()
      const { tiles, score } = slideLine(reversed)
      totalScore += score
      const restored = tiles.reverse()
      for (let c = 0; c < 4; c++) {
        if (restored[c]) {
          restored[c]!.row = r
          restored[c]!.col = c
        }
        if (newGrid[r][c]?.value !== restored[c]?.value) moved = true
        newGrid[r][c] = restored[c]
      }
    }
  } else if (direction === 'up') {
    for (let c = 0; c < 4; c++) {
      const col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]]
      const { tiles, score } = slideLine(col)
      totalScore += score
      for (let r = 0; r < 4; r++) {
        if (tiles[r]) {
          tiles[r]!.row = r
          tiles[r]!.col = c
        }
        if (newGrid[r][c]?.value !== tiles[r]?.value) moved = true
        newGrid[r][c] = tiles[r]
      }
    }
  } else if (direction === 'down') {
    for (let c = 0; c < 4; c++) {
      const col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]]
      const { tiles, score } = slideLine(col)
      totalScore += score
      const restored = tiles.reverse()
      for (let r = 0; r < 4; r++) {
        if (restored[r]) {
          restored[r]!.row = r
          restored[r]!.col = c
        }
        if (newGrid[r][c]?.value !== restored[r]?.value) moved = true
        newGrid[r][c] = restored[r]
      }
    }
  }

  return { grid: newGrid, score: totalScore, moved }
}

function canMove(grid: Grid): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!grid[r][c]) return true
      if (c < 3 && grid[r][c]?.value === grid[r][c + 1]?.value) return true
      if (r < 3 && grid[r][c]?.value === grid[r + 1]?.[c]?.value) return true
    }
  }
  return false
}

function hasWon(grid: Grid): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c]?.value === 2048) return true
    }
  }
  return false
}

export function useGame2048() {
  const grid = ref<Grid>(createEmptyGrid())
  const score = ref(0)
  const bestScore = ref(0)
  const gameOver = ref(false)
  const gameWon = ref(false)
  const keepPlaying = ref(false)

  const allTiles = computed(() => {
    const tiles: Tile[] = []
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid.value[r][c]) tiles.push(grid.value[r][c]!)
      }
    }
    return tiles
  })

  function initGame() {
    tileIdCounter = 0
    let newGrid = createEmptyGrid()
    newGrid = addRandomTile(newGrid)
    newGrid = addRandomTile(newGrid)
    grid.value = newGrid
    score.value = 0
    gameOver.value = false
    gameWon.value = false
    keepPlaying.value = false
  }

  function move(direction: Direction) {
    if (gameOver.value) return
    if (gameWon.value && !keepPlaying.value) return

    const result = moveGrid(grid.value, direction)
    if (!result.moved) return

    score.value += result.score
    if (score.value > bestScore.value) {
      bestScore.value = score.value
    }

    let newGrid = addRandomTile(result.grid)
    grid.value = newGrid

    if (!keepPlaying.value && hasWon(newGrid)) {
      gameWon.value = true
      return
    }

    if (!canMove(newGrid)) {
      gameOver.value = true
    }
  }

  function continueGame() {
    keepPlaying.value = true
    gameWon.value = false
  }

  initGame()

  return {
    grid,
    score,
    bestScore,
    gameOver,
    gameWon,
    allTiles,
    move,
    initGame,
    continueGame,
  }
}
