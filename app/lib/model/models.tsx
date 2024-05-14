export interface TestimonialModel {
  id: string;
  Name: string;
  Description?: string;
  Tags: TagModel[];
  Theme: ThemeModel;
  isForm: boolean;
  Active: boolean;
  Boards: BoardModel[];
  PermissionToShare?: boolean;
  ImageUploaded?: boolean;
  VideoUploaded?: boolean;
  ImageLink?: string;
  VideoLink?: string;
  createdByEmaail: string;
  SocialAccounts: SocialAccountModel[];
  Verified?: boolean;
  createdAt: string;
  updatedAt: string;
  themeId: string;
  userId: string;
}

export interface BoardModel {}

export interface TagModel {
  name: string;
}

export interface ThemeModel {}

export interface SocialAccountModel {}
