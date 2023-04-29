import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Stage } from 'src/app/models/stage.model';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css'],
})
export class FormTripComponent implements OnInit {
  tripForm: FormGroup;
  imagesCollection: string[];
  stagesCollection: Stage[];

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      manager_id: [''],
      title: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      requirements: [''],
      images: [''],
    });

    this.stagesCollection = [];
    this.imagesCollection = [];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertBase64(file).then((encodedImage) => {
        this.imagesCollection.push(encodedImage as string);
      });
    }
  }

  removeImage(image: string) {
    this.imagesCollection = this.imagesCollection.filter(
      (i: string) => i != image
    );
  }

  private convertBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
