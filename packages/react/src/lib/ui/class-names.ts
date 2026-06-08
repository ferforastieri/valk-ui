export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = []

  const add = (input: ClassValue): void => {
    if (!input) return

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
      return
    }

    if (Array.isArray(input)) {
      input.forEach(add)
      return
    }

    if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  }

  inputs.forEach(add)
  return classes.join(' ')
}

export const classNames = cn
export const mergeClasses = cn
