import { createContext, type Context } from '@aria-ui/core'
import { createCollectionStore, type CollectionStore } from '@aria-ui/utils'

import type { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export interface MenuStore extends CollectionStore {
  overlayStore: OverlayStore
  getParentStore(): MenuStore | undefined
}

/**
 * @internal
 */
export function createMenuStore(
  overlayStore: OverlayStore,
  getParentStore?: () => MenuStore | undefined,
): MenuStore {
  return {
    ...createCollectionStore(),
    overlayStore,
    getParentStore: getParentStore || (() => undefined),
  }
}

/**
 * @internal
 */
export const MenuStoreContext: Context<MenuStore> = createContext<MenuStore>('MenuStoreContext')

/**
 * @internal
 */
export function closeMenuTree(store: MenuStore): void {
  store.overlayStore.requestOpenChange(false)
  const parentStore = store.getParentStore()
  if (parentStore) {
    closeMenuTree(parentStore)
  }
}
