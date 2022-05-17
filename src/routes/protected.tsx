import { MainLayout } from "../components/Layouts/MainLayout";
import { Home } from "../features/misc/Home";
import { Room } from "../features/room/components/Room";
import { RoomDiscovery } from "../features/room/components/RoomDiscovery";
import { SearchRoomResult } from "../features/room/components/SearchRoomResult";
import { RouteAuthGuard } from "./RouteAuthGuard";

export const protectedRoutes = [
  {
    path: "/app",
    element: <RouteAuthGuard component={<MainLayout />} redirect='/' />,
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
        path: "room-discovery/search",
        element: <SearchRoomResult />,
      },
      {
        path: "rooms/:id",
        element: <Room />,
      },
    ],
  },
];
