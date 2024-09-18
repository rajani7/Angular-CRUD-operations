import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { HeroesService } from './services/heroes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  displayedColumns: string[] = [
    'nameLabel',
    'genderLabel',
    'citizenshipLabel',
    'skillsLabel',
    'occupationLabel',
    'memberOfLabel',
    'creatorLabel',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  value = [];

  constructor(
    private _dialog: MatDialog,
    private _heroService: HeroesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getHeroesList();
  }

  openAddEditHeroForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getHeroesList();
        }
      },
    });
  }

  getHeroesList() {
    this._heroService.getHeroes().subscribe({
      next: (res) => {
        this.value = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHero(id: number) {
    this._heroService.deleteHero(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Hero deleted!', 'done');
        this.getHeroesList();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateHero(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getHeroesList();
        }
      },
    });
  }
}
