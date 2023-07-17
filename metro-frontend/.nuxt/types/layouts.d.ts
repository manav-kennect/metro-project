import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "blank" | "default" | "error"
declare module "C:/Users/manav_cmcfada/Kennect/metro-project/metro-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}