import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab4Page implements OnInit {

  perpustakaans: any[] = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    // Jika Anda ingin memuat data langsung saat inisialisasi, bisa panggil loadAlumni() di sini
  }

  ionViewWillEnter() {
    this.perpustakaans = [];
    this.start = 0;
    this.loadPerpustakaan();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadPerpustakaan().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  loadPerpustakaan(): Promise<boolean> {
    return new Promise(resolve => {
      const body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start
      };

      this.postPvdr.postData(body, 'action.php').subscribe(data => {
        for (let perpustakaan of data.result) {
          this.perpustakaans.push(perpustakaan);
        }
        resolve(true);
      });
    });
  }
}