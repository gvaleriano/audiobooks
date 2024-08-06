import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main";
import { ChaptersPage } from "./pages/chapters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "/chapters/:id",
    element: <ChaptersPage/>,
  }
]);

export function App() {
  return(
    <RouterProvider router={router} />
  )
}
