export interface PrescriberAddressModel {
  primary: Address;
  secondary: Address;
}

export interface Address {
  type: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  workingHours: { day: string; time: string }[];
  county: string;
  country: string;
  languages: string[];
}
