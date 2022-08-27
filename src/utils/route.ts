import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to) => {
  if (to?.meta?.title)
    document.title = to.meta.title as string
})
