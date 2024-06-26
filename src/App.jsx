import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Accueil } from './view/Accueil';
import { FilmDetail } from './view/FilmDetail';
import { FilmRecherche } from './view/FilmRecherche';
import { Navbar } from './components/Navbar';
import { Inscription } from './view/Inscription';
import { Connexion } from './view/Connexion';
import { Favoris } from './view/Favoris';
import { Search } from './components/Search';
import { ActorDetail } from './view/ActorDetail';

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
          path: 'films/recherche',
          element: <FilmRecherche/>
        },
        {
          path: '/inscription',
          element: <Inscription/>
        },
        {
          path: '/connexion',
          element: <Connexion/>
        },
        {
          path: '/favoris',
          element: <Favoris/>
        },
        {
          path: '/acteurs/:id',
          element: <ActorDetail/>
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
      <div className="d-block d-md-none m-5">
        <Search/>
      </div>
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
