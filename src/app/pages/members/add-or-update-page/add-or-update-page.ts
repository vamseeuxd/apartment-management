import { ChangeDetectorRef, Component, inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core'
import { LoaderService } from '../../../services/loader/loader.service'
import { Auth, User, user } from '@angular/fire/auth'
import { MembersService, IMember, MEMBER_ROLES } from '../service'
import {
  NgxScannerQrcodeService,
  ScannerQRCodeResult,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode'
import { IUser, UsersService } from '../../../services/users/users.service'
import { AlertController, ToastController } from '@ionic/angular'
import { IApartment } from '../../../interfaces/IApartment'
import { ApartmentBase } from '../../../base-classes/apartment-base'

@Component({
  selector: 'add-or-update-page-members',
  templateUrl: 'add-or-update-page.html',
  styleUrls: ['./add-or-update-page.scss'],
})
export class AddOrUpdateMembersPage extends ApartmentBase {
  private auth: Auth = inject(Auth)
  user$ = user(this.auth)
  isModalOpen = false
  dataToEdit: IMember = {
    uid: '',
    apartment: '',
    roles: [MEMBER_ROLES.FLAT_OWNER],
    id: '',
  }
  readonly pinCodeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  }
  readonly predicate: MaskitoElementPredicateAsync = async (
    el: HTMLIonInputElement,
  ) => el.getInputElement()

  newMemberDetails = null
  apartment: IApartment
  members: IMember[] = []

  constructor(
    public route: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private service: MembersService,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private qrcode: NgxScannerQrcodeService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
    super()
    this.service.members$.subscribe((members) => {
      this.members = members
    })
    this.apartment$.subscribe((apartment) => {
      this.apartment = apartment
      this.service.apartmentAction.next(apartment)
      this.dataToEdit.apartment = apartment.id
      this.getMember()
    })
  }

  getMember() {
    const id = this.loader.show()
    this.route.params.subscribe(async (params) => {
      if (params && params.id) {
        this.dataToEdit = await this.service.getMember(
          this.route.snapshot.params.id,
        )
        if (!this.dataToEdit.roles) {
          this.dataToEdit.roles = []
        }
        this.newMemberDetails = { ...this.dataToEdit.userDetails }
        this.loader.hide(id)
      } else {
        this.loader.hide(id)
      }
    })
  }

  async save(member: IMember, user: User) {
    const id = this.loader.show()
    try {
      await this.service.addMember(member, user.uid)
      this.loader.hide(id)
      this.router.navigate(['/app/tabs/members', this.apartment.id])
    } catch (error) {
      console.log(error.code)
      this.loader.hide(id)
    }
  }
  async update(member: IMember, user: User) {
    const id = this.loader.show()
    try {
      await this.service.updateMember(member, member.id, user.uid)
      this.loader.hide(id)
      this.router.navigate(['/app/tabs/members', this.apartment.id])
    } catch (error) {
      console.log(error.code)
      this.loader.hide(id)
    }
  }

  onModalDismiss() {
    this.isModalOpen = false
    this.cdr.markForCheck()
  }

  async onQrScannerEvent(e: ScannerQRCodeResult[], action?: any) {
    // e && action && action.pause();
    console.log(e)
    if (e.length > 0 && e[0].value) {
      const data = JSON.parse(e[0].value)
      if (data && data.uid) {
        // this.dataToEdit.uid = data.uid;
        // prettier-ignore
        const userDetails = await this.usersService.getUsersByUid( data.uid );
        this.newMemberDetails = userDetails.data()
      }
      if (action && action.stop) {
        action.stop()
        this.onModalDismiss()
      }
    }
  }

  closeConfirmModal() {
    this.newMemberDetails = false
    setTimeout(() => {
      this.cdr.markForCheck()
    }, 0)
  }

  async yesAddMemberToApartment() {
    const id = this.loader.show()
    this.dataToEdit.uid = this.newMemberDetails.uid
    this.newMemberDetails = false
    setTimeout(() => {
      this.cdr.markForCheck()
    }, 0)
    try {
      await this.service.addMember(this.dataToEdit, this.dataToEdit.uid)
      this.loader.hide(id)
      this.router.navigate(['/app/tabs/members', this.apartment.id])
    } catch (error) {
      console.log(error.code)
      this.loader.hide(id)
    }
  }

  onQrUploadSelects($event: any) {
    // console.log($event.target.files);
    this.qrcode
      .loadFilesToScan($event.target.files, {}, 0.5)
      .subscribe(async (res: ScannerQRCodeSelectedFiles[]) => {
        if (
          res &&
          res.length > 0 &&
          res[0].data &&
          res[0].data.length > 0 &&
          res[0].data[0].value &&
          JSON.parse(res[0].data[0].value).uid
        ) {
          const uid = JSON.parse(res[0].data[0].value).uid
          const userDetails = await this.usersService.getUsersByUid(uid)
          const data = userDetails.data()
          if (data) {
            const isExistingMember = this.members
              .map((member: IMember) => member.uid)
              .includes(uid)
            if (isExistingMember) {
              const alert = await this.alertController.create({
                header: `'${data.displayName}' Already a Member`,
                message:
                  `'${data.displayName}' is already a member of this apartment community.`,
                buttons: ['OK'],
              })
              await alert.present()
            } else {
              this.newMemberDetails = data
              this.dataToEdit.uid = uid
            }
          } else {
            const alert = await this.alertController.create({
              header: 'No User Found',
              message: 'The account may have been disabled or deleted',
              buttons: ['OK'],
            })
            await alert.present()
          }
        } else {
          const toast = await this.toastController.create({
            message: 'Invalid QR Code Image',
            duration: 1500,
            color: 'danger',
            position: 'bottom',
          })
          await toast.present()
        }
        $event.target.value = null
      })
  }
}
