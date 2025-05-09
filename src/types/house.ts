export interface House {
  id: number;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
}

export interface HouseResponse {
  houses: House[];
  ok: boolean;
}
