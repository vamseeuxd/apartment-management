import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IUser } from '../../../services/users/users.service'
import { IMember, MEMBER_ROLES } from '../service'
import { IApartment } from '../../../interfaces/IApartment'

@Component({
  selector: 'app-edit-member-details',
  templateUrl: './edit-member-details.component.html',
  styleUrls: ['./edit-member-details.component.scss'],
})
export class EditMemberDetailsComponent {
  @Input() userDetails: IUser
  @Input() apartment: IApartment
  @Input() dataToEdit: IMember = {
    uid: '',
    apartment: '',
    roles: [MEMBER_ROLES.FLAT_OWNER],
    id: '',
  }
  @Output() save: EventEmitter<IMember> = new EventEmitter()
  onRoleChange($event): void {
    const valueIndex = this.dataToEdit.roles.indexOf($event.detail.value)
    if (valueIndex >= 0) {
      this.dataToEdit.roles.splice(valueIndex, 1)
    } else {
      this.dataToEdit.roles.push($event.detail.value)
    }
  }
}
