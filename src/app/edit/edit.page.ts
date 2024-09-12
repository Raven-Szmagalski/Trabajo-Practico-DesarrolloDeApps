import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  registerForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['Fernando', Validators.required],
      surname: ['Gómez', Validators.required],
      dni: ['12345678', [Validators.required, Validators.pattern('^\\d{8}$')]],
      phone: ['0112345678', [Validators.required, Validators.pattern('^\\d{10}$')]],
      email: ['ejemplo@correo.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
