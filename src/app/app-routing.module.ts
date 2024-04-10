import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { checkTutorialGuard } from "./providers/check-tutorial.guard";
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { ApartmentsService } from "./pages/apartments/service";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    redirectTo: "/tutorial",
    pathMatch: "full",
  },
  {
    path: "account",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import("./pages/account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "apartments",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import("./pages/apartments/page.module").then((m) => m.ApartmentsModule),
  },
  {
    path: "support",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import("./pages/support/support.module").then((m) => m.SupportModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m) => m.SignUpModule),
  },
  {
    path: "app",
    canActivate: [...canActivate(redirectUnauthorizedToLogin).canActivate, ApartmentsService],
    data: canActivate(redirectUnauthorizedToLogin).data,
    loadChildren: () =>
      import("./pages/tabs-page/tabs-page.module").then((m) => m.TabsModule),
  },
  {
    path: "tutorial",
    loadChildren: () =>
      import("./pages/tutorial/tutorial.module").then((m) => m.TutorialModule),
    canMatch: [checkTutorialGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
