export interface WorkPositionModel {
    place: number;
    departament: number;
    room: number;
    table: number;
    totalWorkPositions: number;
}

export interface ReservationModel {
    company: string;
    departament: string;
    room: string;
    table: string;
    total: number;
    startDate: string;
    endDate: string;
}