export interface ProvinceItemInterface {
  id: string;
  name: string;
}

export interface RegencyItemInterface extends ProvinceItemInterface {
  province_id?: string;
}

export interface SubdistrictItemInterface extends ProvinceItemInterface {
  regency_id?: string;
}

export interface WardItemInterface extends ProvinceItemInterface {
  district_id?: string;
}
