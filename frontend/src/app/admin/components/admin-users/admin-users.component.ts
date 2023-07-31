import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AdminUserService } from '../../servises/admin.user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = []; 
  newUser: User = {
    id: '', 
    email: '',
    name: '',
    address: '',
    token: '', 
    isAdmin: false 
  };
  editingUser: User | null = null;

  constructor(private userService: AdminUserService) {console.log(this.userService);}

  ngOnInit() {
    this.getUsers();
  }

  editUser(user: User) {
    if (user) {
      this.editingUser = { ...user };
    } else {
      this.editingUser = null;
    }
  }
  

  saveUserChanges() {
    if(this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(
        () => {
          const index = this.users.findIndex((user) => user._id === this.editingUser?._id);
          this.users[index] = { ...this.editingUser };
          this.editingUser = null;
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }

  deleteUser(user: User) {
    if (user._id) {
        this.userService.deleteUser(user._id).subscribe(
            () => {
                this.users = this.users.filter((u) => u._id !== user._id);
            },
            (error: any) => {
                console.error('Error deleting user:', error);
            }
        );
    } else {
        console.error('Error deleting user: _id is undefined');
    }
}


  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(
      (user: User) => {
        this.users.push(user);
        this.newUser = {
          id: '', 
          email: '',
          name: '',
          address: '',
          token: '', 
          isAdmin: false 
        };
      },
      (error:any) => {
        console.error('Error adding user:', error);
      }
    );
  }
}
