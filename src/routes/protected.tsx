import { MainLayout } from "../components/Layouts/MainLayout";
import { Home } from "../features/misc/routes/Home";
import { InvitationRedirectPage } from "../features/misc/routes/InvitationRedirectPage";
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
        element: <RoomDiscovery />,
      },
      {
        path: "profile",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchRoomResult />,
      },
      {
        path: "rooms/:id",
        element: <Room />,
      },
    ],
  },
  {
    path: "/invite/:uuid",
    element: <RouteGuard component={InvitationRedirectPage} />,
  },
];
