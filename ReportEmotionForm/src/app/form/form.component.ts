import { Component } from "@angular/core";
// import { User } from "../models/user";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  // protected userModal = new User();

  protected onSubmit() {
    alert(
      "Form Submitted succesfully!!!\n Check the values in browser console."
    );
    // console.table(this.userModal);
  }

  // protected resetForm(): void {
  //   this.userModal = new User();
  // }
}
