import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostsService } from 'src/app/core/api/posts.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/api/users.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'address', 'phone', 'action'];
  dataSource: Post[] = []

  constructor(
    private service: UsersService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.service.getData().subscribe((res) => {
      this.dataSource = res
    })
  }

  add() {
    this.router.navigate(['./actions'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        m: 'add',
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['./actions'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        m: 'edit',
        id: id
      },
    });
  }

  delete(id: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Konfirmasi',
        message: 'Apakah anda yakin ingin menghapus data ini?'
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.toast('success', 'Data berhasil dihapus')
        this.deleteData(id)
      }
    })

  }

  deleteData(id: number) {
    this.service.delete(id).subscribe((res) => {
      this.service.getData().subscribe((res) => {
        this.dataSource = res
      })
    })
  }

  // toast
  toast(type: string, message: string) {
    if (type === "success") {
      this.toastr.success(message);
    } else if (type === "error") {
      this.toastr.error(message);
    } else {
      this.toastr.info(message);
    }
  }

}
