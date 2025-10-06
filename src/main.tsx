import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './firebase'
import App from './App.tsx'
import Home from './pages/Home'
import Works from './pages/Works'
import WorkDetail from './pages/WorkDetail'
import Apply from './pages/Apply'
import logoAKA from './assets/logo_aka.png'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'works', element: <Works /> },
      { path: 'works/:id', element: <WorkDetail /> },
      { path: 'apply', element: <Apply /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// set favicon to local logo asset
const setFavicon = () => {
  const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
  if (link) link.href = logoAKA
}
setFavicon()
