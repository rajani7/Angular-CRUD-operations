import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  heroesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _heroesService: HeroesService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.heroesForm = this._fb.group({
      nameLabel: '',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: '',
      genderLabel: '',
    });
  }

  ngOnInit(): void {
    this.heroesForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.heroesForm.valid) {
      if (this.data) {
        this._heroesService
          .updateHero(this.data.id, this.heroesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Hero detail updated!!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._heroesService.addHero(this.heroesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Hero Added Sucessfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
