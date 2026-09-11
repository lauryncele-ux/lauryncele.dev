import goldMediaLabShot from '../assets/previews/gold-media-lab.jpg'
import imagineThatShot from '../assets/previews/imagine-that.jpg'
import mhcShot from '../assets/previews/mhc.jpg'
import sunbetShot from '../assets/previews/sunbet.jpg'

export type WorkPreview = {
  href: string
  image: string
  domain: string
  role: string
  period: string
  glimpse: string
  metric: string
  // Imagine That's live site is currently down, so that shot comes from the Internet Archive.
  archived?: boolean
}

export const workPreviews: Record<string, WorkPreview> = {
  SunBet: {
    href: 'https://www.sunbet.co.za/en',
    image: sunbetShot,
    domain: 'sunbet.co.za',
    role: 'Senior Frontend Developer',
    period: 'Mar 2025 – Present',
    glimpse: 'Gaming platform front end for 100K+ daily users, with live betting data.',
    metric: '40% faster page loads',
  },
  'Gold Media Lab': {
    href: 'https://www.goldmedialab.com/',
    image: goldMediaLabShot,
    domain: 'goldmedialab.com',
    role: 'Senior Frontend Developer',
    period: 'Mar 2024 – Mar 2025',
    glimpse: '10+ brand sites on a custom CMS, plus wallet and checkout UX.',
    metric: '35% more completed transactions',
  },
  'Imagine That Design & Print': {
    href: 'https://imagine-that.co.za/',
    image: imagineThatShot,
    domain: 'imagine-that.co.za',
    role: 'Web Developer',
    period: 'Feb 2022 – Mar 2024',
    glimpse: 'Bespoke WordPress builds and storefronts for 50+ design and print clients.',
    metric: '200% more organic traffic',
    archived: true,
  },
  MHC: {
    href: 'https://www.mhcworld.co.za/',
    image: mhcShot,
    domain: 'mhcworld.co.za',
    role: 'Junior Web Developer',
    period: 'Jan 2018 – Feb 2021',
    glimpse: 'E-commerce platform, payment gateways and filterable landing pages.',
    metric: '1000+ daily transactions',
  },
}
