import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddVehiclePage from "./pages/AddVehicle";
import DetailsPage from "./pages/DetailsPage";
import EditVehiclePage from "./pages/EditVehiclePage";
import HomePage from "./pages/HomePage";
import Maintenance from "./pages/Maintenance";
import NotFoundPage from "./pages/NotFoundPage";
import VehicleProfilesPage from "./pages/VehicleProfilesPage";
import Root from "./layout/Root";

export default function App() {
  // Routes for each page

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "/Profiles",
          element: <VehicleProfilesPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/AddVehicle",
          element: <AddVehiclePage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/editVehicle",
          element: <EditVehiclePage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/DetailsPage",
          element: <DetailsPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: "/Maintenance",
          element: <Maintenance />,
          errorElement: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
