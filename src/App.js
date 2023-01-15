import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Lists from './components/List';
import Bookmark from './components/Bookmark';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Lists/>
    ),
  },
  {
    path: "create_bookmark",
    element: <Bookmark/>,
  },
]);

function App() {
  return (
  <>
  <RouterProvider router={router} />
  <ToastContainer />
  </>
  );
}

export default App;
