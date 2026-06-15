// AI Logic with 3 difficulty levels
import { getWinner, getAvailableMoves, makeMove } from './gameLogic'

export function getComputerMove(board, difficulty) {
  const availableMoves = getAvailableMoves(board)

  if (availableMoves.length === 0) return -1

  switch (difficulty) {
    case 'easy':
      return getEasyMove(availableMoves)
    case 'medium':
      return getMediumMove(board, availableMoves)
    case 'hard':
      return getHardMove(board, availableMoves)
    default:
      return getEasyMove(availableMoves)
  }
}

// Easy: Random move
function getEasyMove(availableMoves) {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

// Medium: Try to win, block player win, or pick random
function getMediumMove(board, availableMoves) {
  // Try to win
  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'O')
    if (getWinner(testBoard) === 'O') return move
  }

  // Block player from winning
  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'X')
    if (getWinner(testBoard) === 'X') return move
  }

  // Prefer center
  if (availableMoves.includes(4)) return 4

  // Prefer corners
  const corners = [0, 2, 6, 8].filter(m => availableMoves.includes(m))
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)]

  // Random
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

// Hard: Minimax algorithm
function getHardMove(board, availableMoves) {
  let bestScore = -Infinity
  let bestMove = availableMoves[0]

  for (let move of availableMoves) {
    const newBoard = makeMove(board, move, 'O')
    const score = minimax(newBoard, 0, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

function minimax(board, depth, isMaximizing) {
  const winner = getWinner(board)

  // Terminal states
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (getAvailableMoves(board).length === 0) return 0

  const availableMoves = getAvailableMoves(board)

  if (isMaximizing) {
    // Computer (O) is maximizing
    let bestScore = -Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'O')
      const score = minimax(newBoard, depth + 1, false)
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    // Player (X) is minimizing
    let bestScore = Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'X')
      const score = minimax(newBoard, depth + 1, true)
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}
