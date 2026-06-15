export interface Testimonial {
  quoteKey: string
  authorKey: string
  roleKey: string
  quoteFallback: string
  authorFallback: string
  roleFallback: string
  avatar: string
  color: string
  photo?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quoteKey:  'testimonials.1.quote',
    authorKey: 'testimonials.1.author',
    roleKey:   'testimonials.1.role',
    quoteFallback:  '"MediaBubble took our Dubai hotel from near-invisible online to consistently strong direct bookings. The SEO and paid ads strategy they built drives 68% of our direct reservations now."',
    authorFallback: 'Ahmed Hassan',
    roleFallback:   'General Manager, Palm Vista Hotel',
    avatar: 'AH',
    color:  '#2196F3',
    photo:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.2.quote',
    authorKey: 'testimonials.2.author',
    roleKey:   'testimonials.2.role',
    quoteFallback:  '"In six months our organic traffic grew 340%. The team understands the UAE market: who searches, how, and when."',
    authorFallback: 'Nadia Saleh',
    roleFallback:   'Marketing Director, Gulf Adventures',
    avatar: 'NS',
    color:  '#072A6B',
    photo:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.3.quote',
    authorKey: 'testimonials.3.author',
    roleKey:   'testimonials.3.role',
    quoteFallback:  '"We rebranded with MediaBubble and launched a new site. Within three months our lead volume doubled. More importantly, those leads convert."',
    authorFallback: 'Khaled Mansour',
    roleFallback:   'CEO, Active Gulf Sports',
    avatar: 'KM',
    color:  '#1565C0',
    photo:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.4.quote',
    authorKey: 'testimonials.4.author',
    roleKey:   'testimonials.4.role',
    quoteFallback:  '"Our social media engagement went from 2% to 12% in just four months. They created content that resonates with visitors and residents across the UAE."',
    authorFallback: 'Fatima Al-Rashid',
    roleFallback:   'Owner, Marina Rose Hotel',
    avatar: 'FA',
    color:  '#2196F3',
    photo:  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.5.quote',
    authorKey: 'testimonials.5.author',
    roleKey:   'testimonials.5.role',
    quoteFallback:  '"The PPC campaigns they manage for us deliver a 4.2x return on ad spend. Every dollar we put in comes back with change. Best marketing investment we\'ve made."',
    authorFallback: 'Omar Khairy',
    roleFallback:   'Director, Marina View Residences',
    avatar: 'OK',
    color:  '#072A6B',
    photo:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.6.quote',
    authorKey: 'testimonials.6.author',
    roleKey:   'testimonials.6.role',
    quoteFallback:  '"From zero online presence to ranking #1 for our core service keywords in under a year. MediaBubble knows how to position UAE businesses for growth."',
    authorFallback: 'Youssef Hamed',
    roleFallback:   'Founder, Gulf Adventures',
    avatar: 'YH',
    color:  '#1565C0',
    photo:  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.7.quote',
    authorKey: 'testimonials.7.author',
    roleKey:   'testimonials.7.role',
    quoteFallback:  '"They redesigned our entire brand identity and built us a website that converts at 8.4%. Our previous site was under 1%. The difference is night and day."',
    authorFallback: 'Sarah Mitchell',
    roleFallback:   'COO, Dubai Luxury Stays',
    avatar: 'SM',
    color:  '#2196F3',
    photo:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.8.quote',
    authorKey: 'testimonials.8.author',
    roleKey:   'testimonials.8.role',
    quoteFallback:  '"We went from relying entirely on Booking.com to 60% direct bookings. Their strategy saved us thousands in commission fees every single month."',
    authorFallback: 'Hassan Ibrahim',
    roleFallback:   'GM, Sunset Plaza Hotel',
    avatar: 'HI',
    color:  '#072A6B',
    photo:  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.9.quote',
    authorKey: 'testimonials.9.author',
    roleKey:   'testimonials.9.role',
    quoteFallback:  '"The event activation they ran for our hotel launch brought in 200+ local influencers and filled our restaurant for three straight weeks. Unreal results."',
    authorFallback: 'Mona El-Sayed',
    roleFallback:   'Marketing Lead, Coral Reef Resort',
    avatar: 'ME',
    color:  '#1565C0',
    photo:  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.10.quote',
    authorKey: 'testimonials.10.author',
    roleKey:   'testimonials.10.role',
    quoteFallback:  '"Our Google Business Profile went from 3.2 stars to 4.8 stars in six months. They trained our staff and built a review system that works."',
    authorFallback: 'Tarek Fouda',
    roleFallback:   'Owner, Starfish Restaurant Group',
    avatar: 'TF',
    color:  '#2196F3',
    photo:  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.11.quote',
    authorKey: 'testimonials.11.author',
    roleKey:   'testimonials.11.role',
    quoteFallback:  '"They manage our entire digital presence now: SEO, ads, social, and email. One team, one invoice, and our revenue is up 47% year over year."',
    authorFallback: 'Laila Mostafa',
    roleFallback:   'CEO, Dubai Marina Rentals',
    avatar: 'LM',
    color:  '#072A6B',
    photo:  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  {
    quoteKey:  'testimonials.12.quote',
    authorKey: 'testimonials.12.author',
    roleKey:   'testimonials.12.role',
    quoteFallback:  '"The content calendar they built us means we never miss a peak booking season. We went from scrambling for guests to turning them away on weekends."',
    authorFallback: 'Karim Nabil',
    roleFallback:   'Director, Aqua Paradise Resort',
    avatar: 'KN',
    color:  '#1565C0',
    photo:  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
]

export type TestimonialItem = Testimonial

export const ROW_1 = TESTIMONIALS.slice(0, 6)
export const ROW_2 = TESTIMONIALS.slice(6, 12)
