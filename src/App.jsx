import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Browse from './components/Browse'
import { Provider } from 'react-redux'
import store from './utils/store'

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
    <Provider store={store}>
    <RouterProvider router={approuter}/>
    </Provider>
  )
}

export default App
