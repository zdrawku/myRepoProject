import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildViewComponent } from './child-view/child-view.component';
import { IgxNavbarModule, IgxButtonModule, IgxRippleModule, IgxIconModule, IgxAvatarModule, IgxExpansionPanelModule, IgxCardModule, IgxInputGroupModule, IgxSimpleComboModule, IgxGridModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChildViewComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxNavbarModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxIconModule,
    IgxAvatarModule,
    IgxExpansionPanelModule,
    IgxCardModule,
    IgxInputGroupModule,
    FormsModule,
    IgxSimpleComboModule,
    IgxGridModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
