import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './pages/LandingPage';
import { createBrowserRouter } from 'react-router-dom';
import Article from './pages/Article';
import Articles from './pages/Articles';
import About from './pages/About';
// import Article from './pages/Article';
const App = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <><div className='h1 text-warning'>Page Not Found Error 404 !</div></>
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <><div className='h1 text-warning'>Page Not Found Error 404 !</div></>
  },
  {
    path: "/videos",
    element: <About />,
    errorElement: <><div className='h1 text-warning'>Page Not Found Error 404 !</div></>
  },
  {
    path: "/article/:id",
    element: <Article />,
    errorElement: <><div className='h1 text-warning'>Page Not Found Error 404 !</div></>
  },
  {
    path: "/reflections",
    element: <Articles />,
    errorElement: <><div className='h1 text-warning'>Page Not Found Error 404 !</div></>
  }
])

export default App;
