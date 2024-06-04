import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Accueil } from './view/Accueil';
import { FilmDetail } from './view/FilmDetail';
import { Navbar } from './components/Navbar';

function App() {

  const router = createBrowserRouter ([
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          path: '',
          element: <Accueil/>
        },
        {
          path: 'films/:id',
          element: <FilmDetail/>
        },
        {
          path: "*",
          element: <h1>Page not found</h1>
        }
      ]
    }
]);

function Root() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
