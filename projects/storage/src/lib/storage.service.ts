import { Injectable } from "@angular/core";
import { Nullable, PositiveInteger } from "./storage.types";

/**
 * Provides a type-secure wrapper for the `localStorage` and for the
 * `sessionStorage` of the Storage API.
 */
@Injectable()
export class StorageService {
  /**
   * Contains the total number of dictionary items stored in the
   * browser storage.
   */
  protected get count(): number {
    return this.storage.length;
  }

  /**
   * Contains the keys of the dictionary items stored in the browser
   * storage.
   */
  protected get keys(): string[] {
    const keysSet = new Set<string>();
    for (let i = 0; i < this.count; i++) {
      const key = this.key(i as PositiveInteger<number>);
      if (key == null) {
        continue;
      }

      keysSet.add(key);
    }

    return Array.from(keysSet);
  }

  /**
   * Initializes a new instance of the `StorageBase` class.
   *
   * @param storage Contains the storage API.
   */
  protected constructor(private readonly storage: Storage) {
  }

  /**
   * Gets all the items stored in the storage.
   *
   * @returns the dictionary of key-value pairs stored in the storage.
   */
  protected all<TValue = never>(): Map<string, TValue> {
    const dictioary = new Map<string, TValue>();
    for (let i = 0; i < this.count; i++) {
      const key = this.key(i as PositiveInteger<number>);
      if (key) {
        const value = this.get<TValue>(key);
        if (value) {
          dictioary.set(key, value);
        }
      }
    }

    return dictioary;
  }

  /**
   * Clears all the dictionary items stored in the storage.
   */
  protected clear(): void {
    this.storage.clear();
  }

  /**
   * Checks whether a dictionary item with the given key exists
   * in the storage of the browser.
   *
   * @param key Contains the key of the dictionary item to be
   * checked whether it exists in the storage.
   * @returns whether a dictioary item with the given key exists.
   */
  protected exists(key: string): boolean {
    return !!this.get(key);
  }

  /**
   * Gets the value of the item stored in the browser's storage with
   * the given key.
   *
   * @param key Contains the key of the dictionary item the value of
   * which should be returned.
   * @returns the value stored with the given key there is one; other-
   * wise `null`.
   */
  protected get<T = never>(key: string): Nullable<T> {
    const item = this.storage.getItem(key);
    if (item == null) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      throw new Error(`Cannot parse the value stored with key '${key}'.`);
    }
  }

  /**
   * Gets the key of the dictionary item at the given index.
   *
   * @param index Contains the index of the item in the dictionary of the
   * browser's storage.
   * @returns the key of the item at the given index in the dictionary of
   * the browser's storage.
   */
  protected key<Nr extends number>(index: PositiveInteger<Nr>): Nullable<string> {
    if (index < 0 || index >= this.count) {
      return null;
    }

    return this.storage.key(index);
  }

  /**
   * Removes the storage item with the given key.
   *
   * @param key Contains the key of the storage item to be removed.
   * @returns `true` if the item with the given key was deleted successfully
   * or `false` in case that item doesn't exist in the browser's storage.
   */
  protected pop(key: string): boolean {
    if (this.keys.some(k => k === key)) {
      this.storage.removeItem(key);
      return true;
    }

    return false;
  }

  /**
   * Adds a new key-value pair to the browser's storage.
   *
   * @param key Contains the key of the new item to be stored in the browser's
   * storage.
   * @param value Contains the value to be stored in the browser's storage.
   * @returns whether storing the new key-value pair in the browser's storage
   * was successful.
   */
  protected set<T = never>(key: string, value: T): boolean {
    try {
      // stringify the value under consideration of its circular object refs
      const stringifiedValue = JSON.stringify(value, this.replacer());
      this.storage.setItem(key, stringifiedValue);
      return true;
    } catch (e) {
      // instead of throwing, just return `false` to inform that the item
      // was not added to the storage.
      return false;
    }
  }

  /**
   * Creates a replacer predicate for excluding circular object references
   * from the given value.
   *
   * @returns the JSON replacer. 
   * @private
   */
  private replacer<T extends object>() {
    const cacheSet = new WeakSet<T>();
    return (_: string, value: T) => {
      const isObjectLike = value !== null && typeof value === 'object';
      if (isObjectLike && !cacheSet.has(value)) {
        cacheSet.add(value);
      }

      return value;
    }
  }
}
