export interface Data {
  id: string;
  description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    last_name: string;
  };
  links: {
    download: string;
  };
}

export interface ResponseData {
  results: Data[];
  total_pages: number;
}
