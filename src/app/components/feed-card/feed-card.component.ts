import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input()
  recipe: Recipe = new Recipe();

  imageUrl$: Observable<string | undefined> = of(undefined);
  hasImage$: Observable<boolean> = of(false);

  imagePath: string = '';
  constructor(private readonly imageService: ImageService) {}

  ngOnInit(): void {
    this.hasImage$ = this.imageService.hasImage(this.recipe.id);
    this.imagePath = `images/${this.recipe.id}`;
  }
}
