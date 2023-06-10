import { sortBy } from '@/utils/array'

export class Command {
  constructor(model) {
    this.model = model
    this.instructions = []
    this.id = ''
  }

  add(ins) {
    this.instructions.push(ins)
    this.instructions.sort(sortBy('time', 1))
  }

  setId(id) {
    this.id = id
  }

  clear() {
    this.instructions.length = 0
  }

  getInstructions() {
    return this.instructions
  }

  getData() {
    return {
      id: this.id,
      model: this.model,
      instructions: this.instructions,
    }
  }
}

export function createSingleInstruction(
  type,
  target = 0,
  action,
  measure = 0,
  time = 0
) {
  return {
    type: type,
    target: target,
    action: action,
    measures: measure,
    time: time,
    key: Date.now(),
  }
}
