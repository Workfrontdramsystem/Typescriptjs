export function cloneDate(date: Date): Date;

export function addDays(date: Date, days: number): number;

export interface Flat {
  id: number;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: Date[];
  price: number;
}

export interface FormattedFlat {
  id: number;
  title: string;
  details: string;
  photos: string[];
  bookDates: Date[];
  totalPrice: number;
}

export interface SearchParameters {
  checkInDate: Date;
  checkOutDate: Date;
  city: string;
  priceLimit?: number;
}

export class FlatRentSdk {
  database: Flat[];
  constructor();

  book(flatId: number, checkIDate: Date, checkOutDate: Date): number;
  get(id: string): Promise<Flat>;
  search(parameters: SearchParameters): Promise<FormattedFlat[]>;

  _areAllDatesAvailable(flat: Flat, dateRange: Date[]): boolean;
  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;
  _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  _formatFlatObject(flat: Flat, nightNumber: number): FormattedFlat;
  _generateDateRange(from: Date, to: Date): Date[];
  _generateTransactionId(): number;
  _readDatabase(): Flat[];
  _resetTime(date: Date): void;
  _syncDatabase(database: Flat[]): void;
  _writeDatabase(database: Flat[]): void;
}
