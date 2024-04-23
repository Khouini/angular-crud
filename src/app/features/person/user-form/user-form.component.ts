import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/core/entities/person';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  newPerson: Person = {
    name: '',
  };

  isUpdate = false;
  constructor(
    private personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const personId = this.activatedRoute.snapshot.params['id'];
    if (personId) {
      this.personService.getPersonById(personId).subscribe((data) => {
        console.log(
          '🚀 ~ UserFormComponent ~ this.personService.getPersonById ~ data:',
          data
        );
        this.newPerson = data;
        this.isUpdate = true;
      });
    }
  }

  onSubmit() {
    if (this.isUpdate) {
      this.updatePerson();
    } else {
      this.createPerson();
    }
  }

  createPerson() {
    this.personService.addPerson(this.newPerson).subscribe(
      () => {
        alert('added user');
        this.router.navigate(['/person']);
      },
      (error) => {
        console.error('Error adding person: ', error);
      }
    );
  }
  updatePerson() {
    this.personService.updatePerson(this.newPerson).subscribe(
      () => {
        alert('updated user');
        this.router.navigate(['/person']);
      },
      (error) => {
        console.error('Error updating person: ', error);
      }
    );
  }
}
