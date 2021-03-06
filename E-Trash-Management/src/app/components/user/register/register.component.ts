import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from "../../../models/user.model.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registrationForm: NgForm;
  user: User;
  verifyPassword: String;
  errorFlag: Boolean;
  errorMsg: String;
  userRole: String;
  roles=['User','Organization','Employee','Buyer'];
  refinerAddress='';

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.user=new User('','','','','','','','','','','');
    this.userRole='User';
  }

  createUser() {
    console.log(this.userRole);
    if (this.registrationForm.valid) {
      this.user.username = this.registrationForm.value.userName;
      this.user.password = this.registrationForm.value.password;
      this.user.firstName = this.registrationForm.value.firstName;
      this.user.lastName = this.registrationForm.value.lastName;
      this.user.email = this.registrationForm.value.email;
      this.user.role= this.userRole.toString();
      this.user.employeeId=this.registrationForm.value.empId ;
      this.user.organizationName = this.registrationForm.value.orgName;
      this.user.buyerAddress = this.refinerAddress;
      this.user.buyerName = this.registrationForm.value.buyerName;
      console.log(JSON.stringify(this.user));
      this.userService.createUser(this.user)
        .subscribe(
          (data: any) => {
            if (this.user) {
              this.router.navigate(['/user', this.user._id]);
            } else {
              this.errorFlag = true;
              this.errorMsg = 'Failed to create the user';
            }
          },
          (error: any) => {
            this.errorFlag = true;
            this.errorMsg = 'Please enter the correct values';
          }
        );
    } else {
      this.errorFlag = true;
      this.errorMsg = 'Please enter the correct values';
    }
  }

  isPasswordVerified() {
    return (this.registrationForm.value.password === this.registrationForm.value.verifyPassword);
  }

}
