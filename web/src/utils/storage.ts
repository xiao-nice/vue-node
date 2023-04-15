import { StorageEnum } from "@/enums/storageEnum"

type BasicStore = keyof typeof StorageEnum

export const getStorage = (key: BasicStore) => {
  return window.localStorage.getItem(StorageEnum[key])
}

export const setStorage = (key: BasicStore, data: any) => {
  return window.localStorage.setItem(StorageEnum[key], data)
}

export const removeStorage = (key: BasicStore) => {
  return window.localStorage.removeItem(StorageEnum[key])
}

