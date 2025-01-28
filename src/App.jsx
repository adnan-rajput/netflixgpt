import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Browse from './components/Browse'

function App() {

  const approuter = createBrowserRouter(
    [
      {
        path: '/',
        element : <Login/>
      },
      {
        path : 'browse',
        element : <Browse/>
      }
    ]
  )
  return (
    <>
    <RouterProvider router={approuter}/>
    </>
  )
}

export default App
