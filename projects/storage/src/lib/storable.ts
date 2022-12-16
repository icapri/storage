import { Nullable, PositiveInteger } from "./storage.types";

/**
 * Defines an interface for the services which wrap the storage API.
 *
 * @export
 * @interface Storable
 */
export interface Storable {

  /**
   * Contains the total of dictionary item stored in the storage.
   */
  get count(): number;

  /**
   * Contains the keys of the entire items stored in the storage.
   */
  get keys(): string[];

  /**
   * Clears all the storage.
   */
  clear(): void;

  /**
   * Checks whether a dictionary item with the given key exists already
   * in the storage.
   *
   * @param key Contains the key of the item to be checked whether it
   * exists in the storage dictionary.
   */
  exists(key: string): boolean;

  /**
   * Gets the value stored in the storage dictionary with the given key
   * in case such one exists; otherwise returns `null`.
   *
   * @param key Contains the key of the storage item to be gotten.
   * @returns the dictionary value stored with the given key.
   */
  get<T = never>(key: string): Nullable<T>;

  /**
   * Gets the key with the given index in the storage dictionary.
   *
   * @param index Contains the index of the given key in the storage.
   */
  key<Nr extends number>(index: PositiveInteger<Nr>): Nullable<string>;

  /**
   * Removes the dictionary item stored with the given key and returns
   * `true` in case such one exists; otherwise returns `false`.
   *
   * @param key Contains the key of the storage item to be pop out.
   */
  pop(key: string): boolean;

  /**
   * Stores the given value with the given key in the storage.
   *
   * @param key Contains the key of the dictionary item to be stored in the
   * storage.
   * @param value Contains the value stored with the given key in the storage. 
   */
  set<T = never>(key: string, value: T): boolean;
}
