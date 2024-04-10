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
          },
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
        path: "owners",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owners/page.module").then((m) => m.OwnersModule),
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
        path: "visitors",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../visitors/page.module").then((m) => m.VisitorsModule),
          },
        ],
      },

      {
        path: "members",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../members/page.module").then((m) => m.MembersModule),
          },
        ],
      },

      {
        path: "notices",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../notices/page.module").then((m) => m.NoticesModule),
          },
        ],
      },

      {
        path: "rules",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../rules/page.module").then((m) => m.RulesModule),
          },
        ],
      },

      {
        path: "vehicles",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../vehicles/page.module").then((m) => m.VehiclesModule),
          },
        ],
      },

      {
        path: "tenants",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tenants/page.module").then((m) => m.TenantsModule),
          },
        ],
      },

      {
        path: "inventory",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../inventory/page.module").then(
                (m) => m.InventorysModule
              ),
          },
        ],
      },
      {
        path: "notifications",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../notifications/page.module").then(
                (m) => m.NotificationsModule
              ),
          },
        ],
      },
      {
        path: "staff",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../staff/page.module").then((m) => m.StaffsModule),
          },
        ],
      },
      {
        path: "events",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../events/page.module").then((m) => m.EventsModule),
          },
        ],
      },
      {
        path: "accounts",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../accounts/page.module").then((m) => m.AccountsModule),
          },
        ],
      },

      {
        path: "",
        redirectTo: "apartments",
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
