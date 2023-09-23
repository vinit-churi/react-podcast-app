import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@components/RootLayout";
import Dashboard from "@components/Dashboard";
import LandingPage from "@components/LandingPage";
import Podcasts from "@components/Podcasts";
import PodcastDetail from "@components/PodcastDetail";
import Favorites from "@components/Favorites";
import NotFound from "@components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/podcasts",
        element: <Podcasts />,
        children: [
          {
            path: ":podcastId",
            element: <PodcastDetail />,
          },
        ],
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
