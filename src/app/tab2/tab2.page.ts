import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab2Page implements OnInit {

  judul: string = '';
  jenis: string = '';
  pengarang: string = '';
  tahunterbit: string = '';
  isbn: string = '';
  keterangan: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
  ) {

  }

  ngOnInit() {
  }

  async addPerpustakaan() {
    if (this.judul == '') {
      const toast = await this.toastController.create({
        message: 'judul lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.jenis == '') {
      const toast = await this.toastController.create({
        message: 'jenis harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.pengarang == '') {
      const toast = await this.toastController.create({
        message: 'pengarang harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.tahunterbit == '') {
      const toast = await this.toastController.create({
        message: 'tahun terbit harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.isbn == '') {
      const toast = await this.toastController.create({
        message: 'isbn harus di isi',
        duration: 2000
      });
      toast.present();

      } else if (this.keterangan == '') {
      const toast = await this.toastController.create({
        message: 'keterangan harus di isi',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        judul: this.judul,
        jenis: this.jenis,
        pengarang: this.pengarang,
        tahunterbit: this.tahunterbit,
        isbn: this.isbn,
        keterangan: this.keterangan,
        aksi: 'add_perpustakaan'
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/tab4']);
          const toast = await this.toastController.create({
            message: 'Selamat! Pendataan Buku sukses.',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
          // YANG KURANG:
          toast.present(); // <-- ini harus ditambahkan
        }

      });

    }
  }
}