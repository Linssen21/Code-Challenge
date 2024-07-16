import { RouterProvider, createRouter } from '@tanstack/react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
