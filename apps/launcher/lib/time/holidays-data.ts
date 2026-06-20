// Canonical holiday seed data for Egypt and UAE market offices.

export interface HolidaySeedRow {
  date: string
  name: string
  country: 'Egypt' | 'UAE'
  is_working_day: boolean
}

/** National holidays for seeded launcher data (2026 calendar year). */
export const HOLIDAY_SEED_2026: HolidaySeedRow[] = [
  // Egypt
  { date: '2026-01-07', name: 'Coptic Christmas', country: 'Egypt', is_working_day: false },
  { date: '2026-01-25', name: 'Revolution Day (2011)', country: 'Egypt', is_working_day: false },
  { date: '2026-03-20', name: 'Eid Al-Fitr (Day 1)', country: 'Egypt', is_working_day: false },
  { date: '2026-03-21', name: 'Eid Al-Fitr (Day 2)', country: 'Egypt', is_working_day: false },
  { date: '2026-04-25', name: 'Sinai Liberation Day', country: 'Egypt', is_working_day: false },
  { date: '2026-05-01', name: 'Labour Day', country: 'Egypt', is_working_day: false },
  { date: '2026-05-27', name: 'Eid Al-Adha (Day 1)', country: 'Egypt', is_working_day: false },
  { date: '2026-05-28', name: 'Eid Al-Adha (Day 2)', country: 'Egypt', is_working_day: false },
  { date: '2026-06-30', name: 'June 30 Revolution', country: 'Egypt', is_working_day: false },
  { date: '2026-07-23', name: 'Revolution Day (1952)', country: 'Egypt', is_working_day: false },
  { date: '2026-10-06', name: 'Armed Forces Day', country: 'Egypt', is_working_day: false },
  // UAE
  { date: '2026-01-01', name: "New Year's Day", country: 'UAE', is_working_day: false },
  { date: '2026-03-20', name: 'Eid Al-Fitr (Day 1)', country: 'UAE', is_working_day: false },
  { date: '2026-03-21', name: 'Eid Al-Fitr (Day 2)', country: 'UAE', is_working_day: false },
  { date: '2026-05-27', name: 'Arafah Day', country: 'UAE', is_working_day: false },
  { date: '2026-05-28', name: 'Eid Al-Adha (Day 1)', country: 'UAE', is_working_day: false },
  { date: '2026-05-29', name: 'Eid Al-Adha (Day 2)', country: 'UAE', is_working_day: false },
  { date: '2026-06-16', name: 'Islamic New Year', country: 'UAE', is_working_day: false },
  { date: '2026-12-01', name: 'Commemoration Day', country: 'UAE', is_working_day: false },
  { date: '2026-12-02', name: 'National Day', country: 'UAE', is_working_day: false },
  { date: '2026-12-03', name: 'National Day (observed)', country: 'UAE', is_working_day: false },
]

export const HOLIDAY_SEED_NAMES = HOLIDAY_SEED_2026.map((h) => h.name)
