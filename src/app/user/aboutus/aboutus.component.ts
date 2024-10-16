import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  currentSlide = 0;
  slides = [
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img2.jpg', title: 'Slide 1' },
    { image: '../../../assets/wp-content/uploads/2023/12/nature-gallery-img4.jpg', title: 'Slide 2' },
    { image: '../../../assets/wp-content/uploads/2023/12/nature-gallery-img8.jpg', title: 'Slide 3' },
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img1.jpg', title: 'Slide 4' },
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img2.jpg', title: 'Slide 5' },
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img3.jpg', title: 'Slide 6' },
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img1.jpg', title: 'Slide 7' },
    { image: '../../../assets/wp-content/uploads/2023/12/nature-gallery-img8.jpg', title: 'Slide 8' },
    { image: '../../../assets/wp-content/uploads/2024/02/about-us-gallery-img3.jpg', title: 'Slide 9' },

  ];
  slideInterval: any;

  ngOnInit() {
    // Automatically slide every 3 seconds
    this.slideInterval = setInterval(() => {
      this.next();
    }, 6000);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      // Stop the interval once the last slide is reached
      clearInterval(this.slideInterval);
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
  
}
