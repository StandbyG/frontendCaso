import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

//Services.
import { UsuarioService } from '../../services/usuario.service';

//Alerts.
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  isLoading = false;

  public loginForm = this.fb.group({
    username: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['', Validators.required],
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService) {


    }

  ngOnInit(): void {

  }


  login() {
    this.isLoading = true;
    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        this.isLoading = false;
        if (resp.jwttoken) {
          // Navigate to Dashboard.
          this.router.navigateByUrl('/');
        }
        else {
          Swal.fire('Error', resp.error, 'error');

        }

      }, (err) => {
        this.isLoading = false;
        console.log(err);
        // If an error happens.
        Swal.fire('Error', err.error.msg, 'error');
      });

  }






}
