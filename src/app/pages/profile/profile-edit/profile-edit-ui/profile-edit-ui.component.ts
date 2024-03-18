import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Input, OnInit,
  Output,
} from '@angular/core'
import {
  FormBuilder,
  FormControl, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatCard, MatCardContent} from '@angular/material/card'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatIcon} from '@angular/material/icon'
import {MatInput} from '@angular/material/input'
import {NgClass} from '@angular/common'
import {AvatarEditComponent} from '../../../../shared/ui/avatar-edit/avatar-edit.component'
import {GetCurrentUser, UpdateUser} from '../../../../core/api-types/user'
import {Observable} from "rxjs";

@Component({
  selector: 'profile-edit-ui',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgClass,
    AvatarEditComponent,
  ],
  templateUrl: './profile-edit-ui.component.html',
  styleUrl: './profile-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditUiComponent implements OnInit {
  @Input() currentUser!: GetCurrentUser | null | undefined
  @Output() updateCurrentUser = new EventEmitter<UpdateUser>()

  public formGroup!: FormGroup


  ngOnInit() {
    this.formGroup = new FormBuilder().group({
      link: new FormControl(this.currentUser?.user.image, [Validators.required]),
      username: new FormControl(this.currentUser?.user.username, [Validators.required]),
      bio: new FormControl(this.currentUser?.user.bio),
      email: new FormControl(this.currentUser?.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
  onUpdate() {
    console.log(this.formGroup.getRawValue())
    if (this.formGroup.valid) {
      const data: UpdateUser = {
        user: {
          username: this.formGroup.value.username as string,
          email: this.formGroup.value.email as string,
          bio: this.formGroup.value.bio as string,
          password: this.formGroup.value.password as string,
          image: this.formGroup.value.link as string,
        },
      }
      this.updateCurrentUser.emit(data)
    }
  }
}
