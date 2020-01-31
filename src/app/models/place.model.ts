export interface PlaceModel {
    id: string;
    name: string;
    email: string;
    telephone: string;
    streetName: string;
    addressNumber: number;
    complement: string;
    region: string;
    postalCode: string;
    city: string;
    state: string;
    latitude?: number;
    longitude?: number;
}
