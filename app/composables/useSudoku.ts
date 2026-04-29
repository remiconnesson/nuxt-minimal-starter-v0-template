import { ref, computed } from 'vue'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface CellData {
  value: number
  isGiven: boolean
  notes: Set<number>
  isError: boolean
}

const CELLS_TO_REMOVE: Record<Difficulty, number> = {
  easy: 36,
  medium: 46,
  hard: 54,
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateSolvedBoard(): number[][] {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0))

  function isValid(board: number[][], row: number, col: number, num: number): boolean {
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === num) return false
    }
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === num) return false
    }
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false
      }
    }
    return true
  }

  function solve(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solve(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  solve(board)
  return board
}

function createPuzzle(solved: number[][], difficulty: Difficulty): number[][] {
  const puzzle = solved.map((row) => [...row])
  const cellsToRemove = CELLS_TO_REMOVE[difficulty]
  const positions = shuffleArray(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number]),
  )

  let removed = 0
  for (const [row, col] of positions) {
    if (removed >= cellsToRemove) break
    puzzle[row][col] = 0
    removed++
  }

  return puzzle
}

export function useSudoku() {
  const difficulty = ref<Difficulty>('easy')
  const board = ref<CellData[][]>([])
  const solution = ref<number[][]>([])
  const selectedCell = ref<[number, number] | null>(null)
  const isNotesMode = ref(false)
  const timer = ref(0)
  const isRunning = ref(false)
  const isComplete = ref(false)
  const moveHistory = ref<{ row: number; col: number; prev: CellData }[]>([])

  let timerInterval: ReturnType<typeof setInterval> | null = null

  const mistakes = computed(() => {
    let count = 0
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board.value[r]?.[c]?.isError) count++
      }
    }
    return count
  })

  const filledCells = computed(() => {
    let count = 0
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board.value[r]?.[c]?.value !== 0) count++
      }
    }
    return count
  })

  const progress = computed(() => Math.round((filledCells.value / 81) * 100))

  function startTimer() {
    stopTimer()
    isRunning.value = true
    timerInterval = setInterval(() => {
      timer.value++
    }, 1000)
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    isRunning.value = false
  }

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function newGame(diff?: Difficulty) {
    if (diff) difficulty.value = diff
    const solved = generateSolvedBoard()
    const puzzle = createPuzzle(solved, difficulty.value)
    solution.value = solved
    moveHistory.value = []
    isComplete.value = false

    board.value = puzzle.map((row, r) =>
      row.map((val, c) => ({
        value: val,
        isGiven: val !== 0,
        notes: new Set<number>(),
        isError: false,
      })),
    )

    selectedCell.value = null
    timer.value = 0
    startTimer()
  }

  function selectCell(row: number, col: number) {
    if (isComplete.value) return
    selectedCell.value = [row, col]
  }

  function validateBoard() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = board.value[r][c]
        if (cell.value !== 0 && !cell.isGiven) {
          cell.isError = cell.value !== solution.value[r][c]
        }
      }
    }
  }

  function checkCompletion() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board.value[r][c].value !== solution.value[r][c]) return
      }
    }
    isComplete.value = true
    stopTimer()
  }

  function placeNumber(num: number) {
    if (!selectedCell.value || isComplete.value) return
    const [row, col] = selectedCell.value
    const cell = board.value[row][col]
    if (cell.isGiven) return

    if (isNotesMode.value) {
      const prev = {
        ...cell,
        notes: new Set(cell.notes),
      }
      moveHistory.value.push({ row, col, prev })

      if (cell.notes.has(num)) {
        cell.notes.delete(num)
      } else {
        cell.notes.add(num)
      }
    } else {
      const prev = {
        ...cell,
        notes: new Set(cell.notes),
      }
      moveHistory.value.push({ row, col, prev })

      cell.value = num
      cell.notes = new Set()
      cell.isError = num !== solution.value[row][col]
      validateBoard()
      checkCompletion()
    }
  }

  function eraseCell() {
    if (!selectedCell.value || isComplete.value) return
    const [row, col] = selectedCell.value
    const cell = board.value[row][col]
    if (cell.isGiven) return

    const prev = {
      ...cell,
      notes: new Set(cell.notes),
    }
    moveHistory.value.push({ row, col, prev })

    cell.value = 0
    cell.notes = new Set()
    cell.isError = false
  }

  function undo() {
    if (moveHistory.value.length === 0 || isComplete.value) return
    const last = moveHistory.value.pop()!
    board.value[last.row][last.col] = last.prev
  }

  function toggleNotes() {
    isNotesMode.value = !isNotesMode.value
  }

  function getHint() {
    if (isComplete.value) return
    // Find an empty or incorrect cell
    const emptyCells: [number, number][] = []
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = board.value[r][c]
        if (!cell.isGiven && (cell.value === 0 || cell.isError)) {
          emptyCells.push([r, c])
        }
      }
    }
    if (emptyCells.length === 0) return

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const cell = board.value[row][col]

    const prev = { ...cell, notes: new Set(cell.notes) }
    moveHistory.value.push({ row, col, prev })

    cell.value = solution.value[row][col]
    cell.isGiven = false
    cell.isError = false
    cell.notes = new Set()
    selectedCell.value = [row, col]

    checkCompletion()
  }

  // Count how many of each number are placed
  const numberCounts = computed(() => {
    const counts: Record<number, number> = {}
    for (let n = 1; n <= 9; n++) counts[n] = 0
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = board.value[r]?.[c]?.value
        if (v && v >= 1 && v <= 9) counts[v]++
      }
    }
    return counts
  })

  return {
    board,
    selectedCell,
    difficulty,
    isNotesMode,
    timer,
    isRunning,
    isComplete,
    mistakes,
    filledCells,
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
    stopTimer,
  }
}
