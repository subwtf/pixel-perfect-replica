import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './styles.css'
import { initializeTheme } from './lib/theme'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  context: { queryClient },
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

initializeTheme()
const root = document.getElementById('root')
if (!root) throw new Error('Не найден корневой элемент приложения')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
