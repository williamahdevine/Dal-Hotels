import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public gender: string,
    public password: string,
    public passwordConfirm: string

  ) {  }
}
