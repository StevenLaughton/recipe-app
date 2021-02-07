import { Component, Input, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { ImageService } from "../../core/services/image.service";
import { Recipe } from "../../shared/models/recipe.model";

@Component({
  selector: "app-feed-card",
  templateUrl: "./feed-card.component.html",
  styleUrls: ["./feed-card.component.scss"],
})
export class FeedCardComponent implements OnInit {
  @Input()
  recipe: Recipe | undefined;

  imageUrl$: Observable<string | undefined> = of(undefined);

  constructor(private imageService: ImageService) {}

  async ngOnInit(): Promise<void> {
    if (this.recipe?.id) {
      this.imageUrl$ = this.imageService.get(this.recipe.id);
    }
  }
}
