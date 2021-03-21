import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input()
  recipe!: Recipe;

  imageUrl$: Observable<string | undefined> = of(undefined);
  hasImage$: Observable<boolean> = of(false);

  imagePath: string = '';
  constructor(private imageService: ImageService) {}

  async ngOnInit(): Promise<void> {
    this.hasImage$ = this.imageService.hasImage(this.recipe.id);
    this.imagePath = `images/${this.recipe.id}`;
  }
}
