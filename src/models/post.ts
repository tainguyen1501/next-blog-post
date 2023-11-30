export interface CreateOrUpdatePostModel {
  _id?: string;
  title: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  shortContent?: string;
  image?: string;
}

export interface PostModel {
  _id: string;
  title: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  content?: string;
  shortContent?: string;
  image?: string;
}
