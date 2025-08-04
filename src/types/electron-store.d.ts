// electron-store 类型定义扩展
declare module "electron-store" {
  interface ElectronStore<T = any> {
    get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
    set<K extends keyof T>(key: K, value: T[K]): void;
    has(key: keyof T): boolean;
    delete(key: keyof T): boolean;
    clear(): void;
    size: number;
    store: T;
  }

  class Store<T = any> {
    constructor(options?: {
      name?: string;
      defaults?: T;
      encryptionKey?: string;
      fileExtension?: string;
      clearInvalidConfig?: boolean;
      serialize?: (value: any) => string;
      deserialize?: (value: string) => any;
    });

    get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
    set<K extends keyof T>(key: K, value: T[K]): void;
    has(key: keyof T): boolean;
    delete(key: keyof T): boolean;
    clear(): void;
    size: number;
    store: T;
  }

  export = Store;
}
