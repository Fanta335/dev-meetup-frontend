import { MainLayout } from "../components/Layouts/MainLayout";
import { Home } from "../features/misc/Home";
import { Room } from "../features/room/components/Room";
import { RoomDiscovery } from "../features/room/components/RoomDiscovery";
import { SearchRoomResult } from "../features/room/components/SearchRoomResult";
import { RouteGuard } from "./RouteGuard";

export const protectedRoutes = [
  {
    path: "/app",
    element: <RouteGuard component={MainLayout} />,
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
