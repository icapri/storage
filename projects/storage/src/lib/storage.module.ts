import { NgModule } from "@angular/core";
import { LocalStorage } from "./local-storage.service";
import { SessionStorage } from "./session-storage.service";

/**
 * Defines a module for providing the storage services.
 */
@NgModule({
  providers: [
    LocalStorage,
    SessionStorage
  ]
})
export class StorageModule {
}
