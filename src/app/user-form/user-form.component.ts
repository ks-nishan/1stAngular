import { HttpClient } from '@angular/common/http';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { findIndex } from 'rxjs';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  totalAmount = 0;
  values: any = [];
  record: any = [];
  newRecord: any = [];
  singleRecord: any = [];
  email: string = '';
  discAmo = 0;
  show_update_btn = false;
  employees: any;

  userForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(''),
    phone: new FormControl(''),
    amount: new FormControl(''),
    discAmount: new FormControl(''),
    discType: new FormControl(''),
  });
  edit_id: any;
  del_id: any;
  empObj: any;

  constructor(private testservercie: TestService){}
  


  getData() {
    this.testservercie.getAll().subscribe((data) => {
      this.values = data.employees;
      this.totalAmount = data.all_total;
    });

  }

  //total Amount
  calcTotal() {
    this.totalAmount += parseInt(this.userForm.value.amount);
    return this.totalAmount;
  }
 
  onSubmit() {


    //check email availibility
    var index = this.values.findIndex(
      (data: any) => data.email == this.userForm.value.email
    );

    if (index != -1) {
      //give an error msg
      console.log('Email  exists');
      alert('Duplicate Email');
      return;
    }

   // this.values.push(this.userForm.value);
    this.testservercie.addEmployee(this.userForm.value).subscribe((data) =>{
      if(data.status){
        this.getData();
        alert("Successfully added*");
      }
    });

    
    this.calcTotal();
    //reset the form
    this.userForm.reset();
    //sort according to amount
    this.values.sort((a: any, b: any) => a.amount - b.amount);
  }

  //delete record
  deleteRecord(recordNo: number, rate: number) {
    // this.values.splice(recordNo, 1);
    // this.totalAmount -= rate;
    this.empObj = this.values[recordNo];
    this.del_id = this.empObj.id;
    var obj : any= {id:this.del_id}
    this.testservercie.deleteEmployee(obj).subscribe((data)=>{
      if(data.status){
        alert("Record deleted successfully#!")
        this.getData();
      }
    })
  }

  //calculate discount
  calcDisc(amount: any, discAmount: any, discType: any) {
    if (discType == 'Amount') {
      this.discAmo =amount - discAmount;
    } else if (discType == 'Persentage') {
      let discuntAmout = (amount * discAmount) / 100;
      this.discAmo = amount - discuntAmout;
    }

    return this.discAmo;
  }

  //edit
  editRecord(recordIndex: any) {
    // this.record = this.values[recordIndex];
    // console.log(this.record);
    // return this.record;

    this.singleRecord = this.values[recordIndex];
     this.edit_id = this.singleRecord.id;

    // this.show_update_btn = true;

    //print the values to input fields
    this.userForm.patchValue({
      name: this.singleRecord.name,
      email: this.singleRecord.email,
      phone: this.singleRecord.phone,
      amount: this.singleRecord.amount,
      discAmount: this.singleRecord.discAmount,
      discType: this.singleRecord.discType,
    });
  }

  //save the updated values
  updateRecoed() {
    //this.values[this.edit_id] = this.userForm.value;
    var object = this.userForm.value;
    object.id = this.edit_id;
    this.testservercie.editEmployee(object).subscribe((data)=>{
      if(data.status){
       
        alert("Data updated successfully!!!");
        this.getData();
      }
      
    })
    this.userForm.reset();
  }

  ngOnInit(): void {
    this.getData();
  }
}
