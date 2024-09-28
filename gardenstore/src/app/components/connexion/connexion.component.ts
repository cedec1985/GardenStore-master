import { CommonModule } from '@angular/common';
import {Form,UntypedFormBuilder,UntypedFormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  standalone: true
})

export class ConnexionComponent {
  
  loginForm! :UntypedFormGroup;
  data!: Form;
  role: string = '';
  password: string = '';
  cookieService: any;
  email: string ='';

  constructor(
    
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private service: AuthService
  ) {{
    this.Formulaire();
  }}
  
  Formulaire(): void {

   this.loginForm=this.formBuilder.group({
     
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    });
  }

  login() { 

      if
        (this.loginForm.value.password === 'Test1234@' && this.loginForm.value.email === 'cedricdecraim@msn.com')
       {

      console.log(this.maskPassword(this.loginForm.value.password));
      const jsonData = JSON.stringify(this.email);
      localStorage.setItem('user', this.email);
      console.log('Login réussi');
      alert('vous êtes connecté');
      this.service.login(this.email, this.password)
      this.router.navigate(['/']);
      this.loginForm.reset();
      
       }}
       seDeconnecter(){

        (this.router.navigate(['/connexion']), //rediriger vers la page 'connexion' si admin pas connecté
        console.log('vous êtes déconnecté!'),
        alert("vous êtes déconnecté")
      );
    }
      // Fonction pour masquer le mot de passe avec des étoiles
      maskPassword(password: string | undefined): string {
        // Vous pouvez ajuster le nombre d'étoiles en fonction de vos besoins
        return password ? '*'.repeat(password.length) : '';
      }
               
    }
    