export interface BlogAuthor {
  id: string
  name: string
  title: string
  bio: string
  avatar?: string
}

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  yasser: {
    id: 'yasser',
    name: 'Yasser Dorgham',
    title: 'Founder & Strategy Lead',
    bio: 'Yasser founded MediaBubble and leads strategy for tourism, hospitality, and growth brands across the UAE and wider Gulf region.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  sara: {
    id: 'sara',
    name: 'Sara El-Masry',
    title: 'Head of Performance Marketing',
    bio: 'Sara manages paid search and social campaigns for hospitality clients, with a focus on ROAS, attribution, and seasonal budget pacing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
  omar: {
    id: 'omar',
    name: 'Omar Hassan',
    title: 'SEO & Content Director',
    bio: 'Omar leads technical SEO, content strategy, and multilingual site architecture for UAE and Gulf tourism brands.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80&crop=faces',
  },
}

export function getBlogAuthor(authorId: string): BlogAuthor {
  return BLOG_AUTHORS[authorId] ?? BLOG_AUTHORS['yasser']
}
