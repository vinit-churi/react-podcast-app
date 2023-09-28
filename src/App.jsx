import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@components/RootLayout";
import Dashboard from "@components/Dashboard";
import LandingPage from "@components/LandingPage";
import Podcasts from "@components/Podcasts";
import PodcastDetail from "@components/PodcastDetail";
import Favorites from "@components/Favorites";
import NotFound from "@components/NotFound";
import Protected from "@components/Protected";
import UserPodcasts from "@components/UserPodcasts";
import UserSubscriptions from "@components/UserSubscriptions";
import AddEpisode from "@components/AddEpisode";
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
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/podcasts",
        children: [
          {
            index: true,
            element: <Podcasts />,
          },
          {
            path: ":podcastId",
            children: [
              {
                index: true,
                element: <PodcastDetail />,
              },
              {
                path: "add-episode",
                element: (
                  <Protected>
                    <AddEpisode />
                  </Protected>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/favorites",
        element: (
          <Protected>
            <Favorites />
          </Protected>
        ),
      },
      {
        path: "/user",
        children: [
          {
            path: "podcasts",
            element: (
              <Protected>
                <UserPodcasts />
              </Protected>
            ),
          },
          {
            path: "subscriptions",
            element: (
              <Protected>
                <UserSubscriptions />
              </Protected>
            ),
          },
        ],
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
