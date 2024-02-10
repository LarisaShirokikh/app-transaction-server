export type ProductCsv = {
  title: string;
  inStock: 'true' | 'false';
  category: Category;
  construction: string;
  sealingContours: string;
  thicknessWeight: string;
  weight: string;
  insulation: string;
  mainLock: string;
  additionalLock: string;
  exteriorFinish: string;
  interiorFinish: string;
  hinges: string;
  doorProtection: string;
  oldPrice: string;
  newPrice: string;
  isOnSale: string;
  description: string;
  photo: string;
};

export type Category = {
  id: string;
  name: string;
};
