/**
 * Represents a type which could possibly be `null`.
 */
type Nullable<T> = T | null;

/**
 * Represents a positive integer.
 */
type PositiveInteger<TNumber extends number> = number extends TNumber
  ? never
  : `${TNumber}` extends `-${string}` | `${string}.${string}`
  ? never
  : TNumber;

// make sure the types above are entirely erased during compilation
export type { Nullable, PositiveInteger };
