import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '@ptg/shared-types';

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  transform(role: UserRole): string {
    switch (role) {
      case 'super_admin':
        return 'Superadmin';
      case 'admin':
        return 'Adminstrator';
      case 'user':
        return 'Użytkownik';
    }
  }
}
