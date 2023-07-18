import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';


import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRegistrationComponent } from '../employee-registration/employee-registration.component';




@Component({

  selector: 'app-employee-list',

  templateUrl: './employee-list.component.html',

  styleUrls: ['./employee-list.component.css']

})

export class EmployeeListComponent implements OnInit {

  employeeList: any[] = [];

  displayedColumns: string[] = ['emp_id', 'emp_name', 'salary', 'date_of_joining', 'actions'];




  dataSource: MatTableDataSource<any> | null = null;

  pageSizeOptions: number[] = [5, 10, 20];

  pageSize = 5;

  pageIndex = 0;




  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(private http: HttpClient, private dialog: MatDialog) {}




  ngOnInit(): void {

    this.fetchEmployees();

  }




  ngAfterViewInit(): void {

    this.dataSource!.paginator = this.paginator;

  }




  onPageChange(event: PageEvent): void {

    this.pageSize = event.pageSize;

    this.pageIndex = event.pageIndex;




    this.dataSource!.paginator!.pageSize = this.pageSize;

    this.dataSource!.data = this.employeeList.slice(

      this.pageIndex * this.pageSize,

      (this.pageIndex + 1) * this.pageSize

    );

  }




  fetchEmployees(): void {

    this.http.get<any[]>('http://localhost:3000/employees').subscribe((res) => {

      this.employeeList = res;

      this.dataSource = new MatTableDataSource<any>(this.employeeList);

      this.dataSource!.paginator = this.paginator;

    });

  }




  openEditDialog(employee: any): void {

    const dialogRef = this.dialog.open(EmployeeRegistrationComponent, {

      width: '400px',

      data: { employee, isEdit: true }

    });




    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.fetchEmployees();

      }

    });

  }




  openAddEmployeeDialog(): void {

    const dialogRef = this.dialog.open(EmployeeRegistrationComponent, {

      width: '400px',

    });




    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.fetchEmployees();

      }

    });

  }




  deleteEmployee(id: number): void {

    const confirmed = confirm('Are you sure you want to delete this employee?');

    if (confirmed) {

      this.http.delete(`http://localhost:3000/employees/${id}`).subscribe(() => {

        this.fetchEmployees();

      });

    }

  }

}