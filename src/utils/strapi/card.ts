export type CreatorAttributes = {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Creator = {
  data: {
    id: number;
    attributes: CreatorAttributes;
  };
};

export type Attributes = {
  title: string;
  creatorName: string;
  layout: object[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  creator: Creator;
};

export type Card = {
  id: number;
  attributes: Attributes;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type CardResponse = {
  data: Card[];
  meta: Meta;
};

export type cardLayout = {
  container: {
    x: number
    y: number
    scale: number
  }
  content:
    | {
        type: 'text'
        text: string
      }
    | {
        type: 'userImage'
        uid: string
      }
    | {
        type: 'sticker'
        stickerId: number
      }
}[]

export type AddCardParams = {
  title: string
  creatorName: string
  userImages: { blob: Blob; uid: string }[]
  layout: cardLayout
  creator: { id: string }
}
