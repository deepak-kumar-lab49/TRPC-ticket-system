import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public form!: FormGroup;
  public successMsg: any;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.apiService.createTicket(this.form.value).subscribe((res) => {
        this.successMsg = res;
        this.form.reset();
      });
    }
  }

  public close(): void {
    this.successMsg = null;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
