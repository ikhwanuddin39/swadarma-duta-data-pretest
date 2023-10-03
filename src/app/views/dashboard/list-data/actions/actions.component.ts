import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/core/api/posts.service';
import { UsersService } from 'src/app/core/api/users.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  pageTitle = 'Add Data';
  form!: FormGroup;
  queryParam = this.activatedRoute.snapshot.queryParams;

  constructor(
    private formBuilder: FormBuilder,
    private service: UsersService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: [null, Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // cek query param
    if (this.queryParam['m'] != 'add' && this.queryParam['m'] != 'edit') {
      this.toast('error', 'Terjadi kesalahan')
      window.history.back();
    }
    // cek query param add atau edit
    if (this.queryParam['m'] == 'edit') {
      this.pageTitle = 'Edit Data';
      this.service.getById(this.queryParam['id']).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  // cek error form
  hasError(form: FormGroup, control: string, error: string): boolean {
    return (
      (form.get(control)?.invalid &&
        (form.get(control)?.dirty || form.get(control)?.touched) &&
        form.get(control)?.hasError(error)) ||
      false
    );
  }

  // submit form
  submit() {
    console.log(this.form.value);
    if (this.queryParam['m'] == 'edit') {
      this.service.update(this.queryParam['id'], this.form.value).subscribe((res) => {
        this.onBack();
        this.toast('success', 'Data berhasil diubah')
      }
      )
      return;
    } else if (this.queryParam['m'] == 'add') {
      this.service.insert(this.form.value).subscribe((res) => {
        this.onBack();
        this.toast('success', 'Data berhasil ditambahkan')
      }
      )
      return;
    }
  }

  onBack() {
    window.history.back();
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
