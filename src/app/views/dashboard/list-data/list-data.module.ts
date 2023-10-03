import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDataComponent } from './list-data.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: '',
    component: ListDataComponent
  }, {
    path: 'actions',
    loadChildren: () => import('./actions/actions.module').then(m => m.ActionsModule)
  }
];

@NgModule({
  declarations: [
    ListDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ListDataModule { }
