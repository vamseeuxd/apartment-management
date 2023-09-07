import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs-page";
import { SchedulePage } from "../schedule/schedule";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "schedule",
        children: [
          {
            path: "",
            component: SchedulePage,
          },
          {
            path: "session/:sessionId",
            loadChildren: () =>
              import("../session-detail/session-detail.module").then(
                (m) => m.SessionDetailModule
              ),
          },
        ],
      },
      {
        path: "speakers",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../speaker-list/speaker-list.module").then(
                (m) => m.SpeakerListModule
              ),
          },
          {
            path: "session/:sessionId",
            loadChildren: () =>
              import("../session-detail/session-detail.module").then(
                (m) => m.SessionDetailModule
              ),
          },
          {
            path: "speaker-details/:speakerId",
            loadChildren: () =>
              import("../speaker-detail/speaker-detail.module").then(
                (m) => m.SpeakerDetailModule
              ),
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../dashboard/dashboard.module").then(
                (m) => m.DashboardListModule
              ),
          }
        ],
      },
      {
        path: "map",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../map/map.module").then((m) => m.MapModule),
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../about/about.module").then((m) => m.AboutModule),
          },
        ],
      },
      {
        path: "apartments",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../apartments/page.module").then((m) => m.ApartmentsModule),
          },
        ],
      },
      {
        path: "wings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../wings/page.module").then((m) => m.WingsModule),
          },
        ],
      },
      {
        path: "flats",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../flats/page.module").then((m) => m.FlatsModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/app/tabs/schedule",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
