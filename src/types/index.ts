export type Entry<T> = {
  [key in keyof T]: [key, T[key]]
}[keyof T]
