//То что отправляем на бек
export interface BirdDataForm {
    id?: number;
    count: number | null;
    dateTime: Date | null;
    birdId: number;
    breed?: string;
    description?: string;
}