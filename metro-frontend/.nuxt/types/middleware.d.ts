import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/manav_cmcfada/Kennect/metro-project/metro-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}