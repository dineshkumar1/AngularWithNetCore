import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Interface/EmpInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'AngularWithNetCoreWebAPI';
  public empData: Employee[] = [];
  public API_URL = 'http://localhost:5277/api/Employees';

  isShowSaveBtn = false;
  isShowUpdateBtn = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }
  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
    this.isShowSaveBtn = true;
    this.isShowUpdateBtn = false;
    (document.getElementById('EmployeeId') as HTMLInputElement).value = '';
    (document.getElementById('Name') as HTMLInputElement).value = '';
    (document.getElementById('EmailID') as HTMLInputElement).value = '';
    (document.getElementById('PhoneNumber') as HTMLInputElement).value = '';
    (document.getElementById('Salary') as HTMLInputElement).value = '';
    (document.getElementById('Gender') as HTMLInputElement).value = '';
    (document.getElementById('JoiningDate') as HTMLInputElement).value = '';

    (
      document.getElementById('EmployeeModalLabel') as HTMLInputElement
    ).innerHTML = 'Save Employee';
  }

  openPopupUpdate() {
    this.displayStyle = 'block';
    this.isShowSaveBtn = false;
    this.isShowUpdateBtn = true;
    (
      document.getElementById('EmployeeModalLabel') as HTMLInputElement
    ).innerHTML = 'Update Employee';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  getEmployees() {
    this.http.get<Employee[]>(this.API_URL).subscribe(
      (result) => {
        this.empData = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEmployee(val: any) {
    this.isShowSaveBtn = false;
    this.isShowUpdateBtn = true;
    this.http.get<Employee>(`${this.API_URL}/${val}`).subscribe(
      (result) => {
        (document.getElementById('EmployeeId') as HTMLInputElement).value =
          result.EmployeeId.toString();
        (document.getElementById('Name') as HTMLInputElement).value =
          result.Name;
        (document.getElementById('EmailID') as HTMLInputElement).value =
          result.EmailID;
        (document.getElementById('PhoneNumber') as HTMLInputElement).value =
          result.PhoneNumber;
        (document.getElementById('Salary') as HTMLInputElement).value =
          result.Salary.toString();
        (document.getElementById('Gender') as HTMLInputElement).value =
          result.Gender;
        (document.getElementById('JoiningDate') as HTMLInputElement).value =
        result.JoiningDate.toString().split('T')[0];
         
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateEmployee() {
    let employeeObj = {
      EmployeeId: (document.getElementById('EmployeeId') as HTMLInputElement)
        .value,
      Name: (document.getElementById('Name') as HTMLInputElement).value,
      EmailID: (document.getElementById('EmailID') as HTMLInputElement).value,
      PhoneNumber: (document.getElementById('PhoneNumber') as HTMLInputElement)
        .value,
      Gender: (document.getElementById('Gender') as HTMLInputElement).value,
      Salary: (document.getElementById('Salary') as HTMLInputElement).value,
      JoiningDate: (document.getElementById('JoiningDate') as HTMLInputElement)
        .value,
    };
    
    return this.http.put(this.API_URL, employeeObj).subscribe((response) => {
      if (response) {
        alert('Employee is Updated');
        this.closePopup();
        this.getEmployees();
      } else {
        alert('Employee is not updated');
      }
    });
  }

  deleteEmployee(val: any) {
    return this.http.delete(this.API_URL + '/' + val).subscribe((response) => {
      if (response) {
        alert('Employee Record is deleted');
        this.getEmployees();
      } else {
        alert('Employee is not deleted');
      }
    });
  }

  createEmployee() 
  {
    let empObject = {
      //EmployeeId: (document.getElementById("EmployeeId") as HTMLInputElement).value,
      Name: (document.getElementById('Name') as HTMLInputElement).value,
      EmailID: (document.getElementById('EmailID') as HTMLInputElement).value,
      PhoneNumber: (document.getElementById('PhoneNumber') as HTMLInputElement)
        .value,
      Gender: (document.getElementById('Gender') as HTMLInputElement).value,
      Salary: (document.getElementById('Salary') as HTMLInputElement).value,
      JoiningDate: (document.getElementById('JoiningDate') as HTMLInputElement)
        .value,
    };

    this.http.post(this.API_URL, empObject).subscribe((response) => {
      if (response) {
        alert('Employee Data  is Saved');
        this.closePopup();
        this.getEmployees();
      } else {
        alert('Employee is not saved');
      }
    });
  }
}
