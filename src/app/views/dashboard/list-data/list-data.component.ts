import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostsService } from 'src/app/core/api/posts.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  displayedColumns: string[] = ['no', 'id', 'title', 'body', 'action'];
  dataSource: Post[] = []

  constructor(
    private service: PostsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
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
    this.service.delete(id).subscribe((res) => {
      this.service.getData().subscribe((res) => {
        this.dataSource = res
      })
    })
  }

}
