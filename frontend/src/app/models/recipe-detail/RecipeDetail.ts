import { AuthorDetail } from "../author-detail/AuthorDetail";
import { IngredientsDetail } from "../ingredients-detail/IngredientsDetail";

export interface RecipeDetail {
    id: number;
    authorId: number;
    author: AuthorDetail;
    createdAt: string;
    ingredients: IngredientsDetail[];
    process: string;
    title: string;
}