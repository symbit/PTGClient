import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@ptg/shared-types';

@Pipe({
  name: 'userStatus',
})
export class UserStatusPipe implements PipeTransform {
  transform(user: User): string {
    if (user.isVerified) {
      return 'Aktywny';
    }

    if (user.isInvited) {
      return 'Zaproszony';
    }

    if (!user.isActive) {
      return 'Zablokowany';
    }

    return 'Nieaktywny';
  }
}
