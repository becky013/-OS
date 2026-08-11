import { createMemoryRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomeScreen } from "./components/screens/HomeScreen";
import { FeedingGuideScreen } from "./components/screens/FeedingGuideScreen";
import { ShopScreen } from "./components/screens/ShopScreen";
import { CommunityScreen } from "./components/screens/CommunityScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { PreparationScreen } from "./components/screens/PreparationScreen";
import { TrainingScreen } from "./components/screens/TrainingScreen";

export const router = createMemoryRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "feeding", Component: FeedingGuideScreen },
      { path: "shop", Component: ShopScreen },
      { path: "community", Component: CommunityScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
  {
    path: "/preparation",
    Component: PreparationScreen,
  },
  {
    path: "/training",
    Component: TrainingScreen,
  },
], { initialEntries: ["/"] });
