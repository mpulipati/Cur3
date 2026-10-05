export type Gender = 'male' | 'female';
export type Weekday =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: Gender;
  days: Weekday[];
  country: string;
  colors: string[];
  animals: string[];
}

export const sampleUser: UserFormData = {
  name: 'Manoj Tester',
  email: 'manoj.tester@example.com',
  phone: '9876543210',
  address: '42 Automation Lane, Test City',
  gender: 'male',
  days: ['monday', 'wednesday', 'friday'],
  country: 'India',
  colors: ['blue', 'yellow'],
  animals: ['cat', 'dog'],
};

export const dateRange = {
  start: '2024-01-01',
  end: '2024-01-11',
  expectedDays: 10,
};

export const wikipediaQuery = 'Playwright';
