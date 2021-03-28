import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/interfaces/post/post.interface';
import { IUser } from '../shared/interfaces/user/user.interface';
import { User } from '../shared/models/user/user.model';
import { UserService } from '../shared/services/user/user.service';
import { PostService } from '../shared/services/post/post.service';
import { Post } from '../shared/models/post/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  isModalOpen: boolean;
  isAddPost: boolean;
  isEditPost: boolean;
  isSignUp: boolean;
  popUpTitle: string;
  accountName: string;
  isSign: boolean = true;
  isLogged: boolean;
  isEditButtonVisible: boolean;
  currentPost: IPost;

  username: string = '';
  email: string = '';
  password: string = '';
  title: string;
  text: string;
  date: Date;

  arrUsers: IUser[] = [];
  arrPosts: IPost[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getPosts();
  }

  private getUsers(): void {
    this.userService.getJSONUsers().subscribe(
      (data) => {
        this.arrUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getPosts(): void {
    this.postService.getJSONPosts().subscribe(
      (data) => {
        this.arrPosts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Modal =========================>
  openSignUpModal(): void {
    this.popUpTitle = 'Sign Up';
    this.isModalOpen = true;
    this.isSignUp = true;
  }

  openSignInModal(): void {
    this.popUpTitle = 'Sign In';
    this.isModalOpen = true;
  }

  openAddPostModal(): void {
    this.popUpTitle = 'Add post';
    this.isModalOpen = true;
    this.isAddPost = true;
    this.isEditPost = false;
    this.isSign = false;
  }

  openEditPostModal(post: IPost): void {
    this.openAddPostModal();

    this.currentPost = post;
    this.title = post.topic;
    this.text = post.message;
    this.date = post.date;
    this.isEditPost = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetModalField();
  }

  resetModalField(): void {
    this.popUpTitle = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.title = '';
    this.text = '';
    this.isSignUp = false;
    this.isSign = true;
    this.isAddPost = false;
  }
  // End Modal =========================>

  // Sign User =========================>
  signUpUser(): void {
    this.checkEmptyInput('up');

    const NEW_USER: IUser = new User(this.email, this.password, this.username);

    if (this.isUserExist(NEW_USER)) {
      throw new SyntaxError('This username or email already exist.');
    }

    this.userService.postJSONUser(NEW_USER).subscribe(
      () => {
        this.getUsers();
      },
      (error) => {
        console.log(error);
      }
    );

    this.loginUser(NEW_USER);
  }

  signInUser(): void {
    this.checkEmptyInput('in');

    let user = new User(this.email, this.password);

    if (!this.isUserExist(user)) {
      throw new SyntaxError('Cannot sign-in, user not found.');
    }

    const INDEX = this.arrUsers.findIndex(
      (u) => user.email === u.email && user.password === u.password
    );

    user = this.arrUsers[INDEX];

    if (typeof user === 'undefined') {
      throw new SyntaxError('Check your login or password.');
    }

    this.loginUser(user);
  }

  loginUser(user: IUser): void {
    this.isLogged = true;
    this.isEditButtonVisible = true;
    this.accountName = user.username;
    // this.postService.setEditPermissions(user.username);
    this.closeModal();
  }

  signOutUser(): void {
    this.accountName = '';
    this.isLogged = false;
    this.isEditButtonVisible = false;
  }
  // End Sign User =========================>

  // Post ====================================>
  addPost(): void {
    this.checkEmptyInput('post');

    const NEW_POST = new Post(
      this.accountName,
      this.title,
      new Date(),
      this.text
    );

    this.postService.postJSONPost(NEW_POST).subscribe(
      () => {
        this.getPosts();
      },
      (error) => {
        console.log(error);
      }
    );

    // this.postService.setEditPermissions(NEW_POST.postedBy);
    this.closeModal();
  }

  deletePost(id: number | string): void {
    this.postService.deleteJSONPost(id).subscribe(
      () => {
        this.getPosts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editPost(): void {
    this.checkEmptyInput('post');

    let EDITED_POST = new Post(
      this.currentPost.postedBy,
      this.title,
      this.date,
      this.text
    );

    EDITED_POST.id = this.currentPost.id;
    this.postService.editJSONPost(EDITED_POST).subscribe(
      () => {
        this.getPosts();
      },
      (error) => {
        console.log(error);
      }
    );

    // this.postService.setEditPermissions(EDITED_POST.postedBy);
    this.closeModal();
  }
  // End Post ====================================>

  checkEmptyInput(signStatus: string) {
    if (signStatus === 'in') {
      if (!this.email || !this.password) {
        throw new SyntaxError('SIGN-IN Enter all inputs');
      }
      return;
    }

    if (signStatus === 'up') {
      if (!this.email || !this.password || !this.username) {
        throw new SyntaxError('SIGN-UP Enter all inputs');
      }
      return;
    }

    if (signStatus === 'post') {
      if (!this.title || !this.text) {
        throw new SyntaxError('POST Enter all inputs');
      }
      return;
    }
  }

  isUserExist(checkedUser: IUser): boolean {
    const IS_USERNAME_EXIST: boolean = this.arrUsers.some(
      (user) => user.username == checkedUser.username
    );

    const IS_EMAIL_EXIST: boolean = this.arrUsers.some(
      (user) => user.email == checkedUser.email
    );

    if (IS_USERNAME_EXIST || IS_EMAIL_EXIST) {
      return true;
    }
    return false;
  }
}
