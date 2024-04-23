import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/core/entities/person';
import { PersonService } from 'src/app/core/services/person.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent {
  persons: any = [];

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons() {
    this.personService.getAllPersons().subscribe((data) => {
      console.log(
        '🚀 ~ ListUsersComponent ~ this.personService.getAllPersons ~ data:',
        data
      );
      this.persons = data;
    });
  }

  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe(() => {
      alert('deleted user');
      this.loadPersons();
    });
  }

  editPerson(id: number) {
    this.router.navigate(['person/edit', id]);
  }
}
