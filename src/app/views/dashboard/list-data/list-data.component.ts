import { Component, OnInit } from '@angular/core';
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
    private service: PostsService
  ) { }

  ngOnInit(): void {
    this.service.getData().subscribe((res) => {
      this.dataSource = res
    })
  }
}
