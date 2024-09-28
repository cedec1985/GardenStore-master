import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: UntypedFormGroup;
  submitted = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  items ={name: '',
  email:'',
  subject:'',
  message:''}
  
  onSubmit() {
    if (this.contactForm.valid) {
      // Envoyer les données du formulaire à votre service ou traiter les données ici
      console.log(this.contactForm.value);
      // Réinitialiser le formulaire
      this.contactForm.reset();
    } else {
      // Marquer les champs invalides comme touchés pour afficher les messages d'erreur
      this.markFormGroupTouched(this.contactForm);
    }
    this.submitted = true;
  }

  markFormGroupTouched(formGroup: UntypedFormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof UntypedFormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
