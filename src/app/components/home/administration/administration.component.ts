import { Component, OnInit } from '@angular/core';
import { UserAccountDTOService } from '../../../services/user-accounts/user-accounts.service';
import { UserAccountDTO } from '../../../models/userAccountDTO';
import swal from 'sweetalert2';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  private users: UserAccountDTO[];

  constructor(private userAccountDTOservice: UserAccountDTOService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userAccountDTOservice.getAllUsers().subscribe(
      (response: UserAccountDTO[]) => {
        this.users = response;
      },
      (error) => {
        console.log('error:' + error);
      }
    );
  }
  deleteUser(user: UserAccountDTO): void {
    swal({
      title: '¿Esta seguro de eliminar usuario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userAccountDTOservice.deleteUser(user.id).subscribe(
          (response: boolean) => {
            if (!response) {
              swal(
                'Eliminado',
                'El usuario seleccionado ha sido eliminado',
                'success'
              );
              this.getAllUsers();
            }
          }
        );
      }
    });
  }
}
