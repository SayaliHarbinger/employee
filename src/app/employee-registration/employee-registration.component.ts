import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  registerForm = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    salary: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    email: ['', Validators.email]
  });

  proceedregister() {
    if (this.registerForm.valid) {
      const employeeData = this.registerForm.value;
      this.employeeService.RegisterUser(employeeData).subscribe(() => {
        console.log('Employee registered successfully!');
        this.router.navigate(['/employee-list']);
      });
    } else {
      console.log('Invalid Form Data');
    }
  }
}
