import { MainLayout } from "../components/Layouts/MainLayout";
import { Home } from "../features/misc/Home";
import { Landing } from "../features/misc/Landing";
import { Room } from "../features/room/components/Room";
import { RoomDiscovery } from "../features/room/components/RoomDiscovery";

export const protectedRoutes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "room-discovery",
        element: <RoomDiscovery />,
      },
      {
        path: "rooms/:id",
        element: <Room />,
      },
    ],
  },
  {
    // path: "/",
    index: true,
    element: <Landing />,
  },
];
