export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  author: {
    name: string;
    role: string;
  };
  productIds: string[];
}
