import { Component } from '@angular/core';
import { User } from '../users-details';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsServiceService } from '../user-details-service.service';

@Component({
  selector: 'app-user-measurment',
  templateUrl: './user-measurment.component.html',
  styleUrl: './user-measurment.component.css'
})
export class UserMeasurmentComponent {
  user: User | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserDetailsServiceService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => this.user = user)
  }
}
