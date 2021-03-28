import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/post/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/posts';
  }

  getJSONPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url);
  }

  postJSONPost(newPost: IPost): Observable<void> {
    return this.http.post<void>(this.url, newPost);
  }

  deleteJSONPost(id: number | string): Observable<IPost> {
    return this.http.delete<IPost>(`${this.url}/${id}`);
  }

  editJSONPost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.url}/${post.id}`, post);
  }

  // setEditPermissions(username: string): void {
  //   let arrPosts: IPost[] = [];
  //   this.getJSONPosts().subscribe(
  //     data => {
  //       arrPosts = data;
  //     },
  //     error => {
  //       console.log(error);
        
  //     }
  //   )

  //   if (username === 'admin') {
  //     arrPosts.forEach((post: IPost) => (true ? (post.status = true) : null));
  //     return;
  //   }
  //   arrPosts.forEach((post: IPost) => {
  //     if (post.postedBy === username) {
  //       post.status = true;
  //       return;
  //     }
  //     post.status = false;
  //   });
  // }
}
