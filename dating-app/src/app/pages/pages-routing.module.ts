import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { authGuard } from "../guards/auth.guard";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { ServerErrorComponent } from "./errors/server-error/server-error.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { preventUnsavedChangesGuard } from "../guards/prevent-unsaved-changes.guard";
import { memberDetailedResolver } from "../resolvers/member-detailed.resolver";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { adminGuard } from "../guards/admin.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'members',
                component: MemberListComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard]
            },
            {
                path: 'members/:userName',
                component: MemberDetailComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard],
                resolve: {member: memberDetailedResolver}
            },
            {
                path: 'member/edit',
                component: MemberEditComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard],
                canDeactivate: [preventUnsavedChangesGuard]
            },
            {
                path: 'lists',
                component: ListsComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard]
            },
            {
                path: 'messages',
                component: MessagesComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard]
            },
            {
                path: 'admin',
                component: AdminPanelComponent,
                runGuardsAndResolvers: "always",
                canActivate: [authGuard, adminGuard]
            },
            // {
            //     path: '**',
            //     component: HomeComponent, pathMatch: 'full'
            // },
            {
              path:'not-found',
              component: NotFoundComponent
            },
            {
              path:'server-error',
              component: ServerErrorComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}