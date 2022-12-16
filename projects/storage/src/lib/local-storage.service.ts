import { Injectable } from "@angular/core";
import { Storable } from "./storable";
import { StorageService } from "./storage.service";
import { Nullable, PositiveInteger } from "./storage.types";

@Injectable()
export class LocalStorage extends StorageService implements Storable {
  override get count(): number {
    return super.count;
  }

  override get keys(): string[] {
    return super.keys;
  }

  constructor() {
    super(window.localStorage);
  }

  override clear(): void {
    super.clear();
  }

  override exists(key: string): boolean {
    return super.exists(key);
  }

  override get<T = never>(key: string): Nullable<T> {
    return super.get(key);
  }
 
  override key<Nr extends number>(index: PositiveInteger<Nr>): Nullable<string> {
    return super.key(index);
  }
 
  override pop(key: string): boolean {
    return super.pop(key);
  }
 
  override set<T = never>(key: string, value: T): boolean {
    return super.set(key, value);
  }
}
