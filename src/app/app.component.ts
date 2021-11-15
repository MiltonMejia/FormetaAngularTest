import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { ApiService } from './services/api.service';
import { AppState } from './store/app.state';
import { UserState } from './store/user/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularTest';
  users: Observable<UserState>;
  user: FormGroup;
  userIndex = -1;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.showAPIData();
    this.createFormGroup();
  }

  public createFormGroup() {
    this.user = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl('Hombre'),
      document: new FormControl(''),
    })
  }

  public showAPIData() {
    this.users = this.api.getDataAPI();
  }

  public createNewUser() {
    this.api.createNewUser(this.user.value);
    this.user.reset();
    this.inputFile.nativeElement.value = '';
  }

  public selectFile(event: any) {
    this.user.controls['document'].setValue(event.target.files[0].name);
  }

  public deleteUser(id: number) {
    this.api.deleteUser(id);
  }
  
  public updateUser() {
    this.api.updateUser(this.user.value, this.userIndex);
    this.userIndex = -1;
  }

  public setFormUserCreated(user: User, index: number) {
    this.userIndex = index;
    this.user.setValue(user);
  }

  public saveUser() {
    this.userIndex === -1 ? this.createNewUser() : this.updateUser();
    this.user.reset();
  }

  public resetForm() {
    this.user.reset();
    this.inputFile.nativeElement.value = '';
  }
}
