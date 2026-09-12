import casiyou from '../assets/clients/casiyou.png'
import imagineThat from '../assets/clients/imagine-that.png'
import jokaclub from '../assets/clients/jokaclub.png'
import mhc from '../assets/clients/mhc.png'
import pokiepop from '../assets/clients/pokiepop.png'
import privecity from '../assets/clients/privecity.png'
import stellarspins from '../assets/clients/stellarspins.png'
import sunInternational from '../assets/clients/sun-international.svg'
import sunbet from '../assets/clients/sunbet.svg'
import wolfwinner from '../assets/clients/wolfwinner.png'

export type ClientLogo = {
  name: string
  href: string
  src: string
  // 'mark' is a square brand icon, 'word' is a horizontal wordmark.
  kind: 'mark' | 'word'
  invertDark?: boolean
}

export const clients: ClientLogo[] = [
  {
    name: 'Sun International',
    href: 'https://www.suninternational.com/',
    src: sunInternational,
    kind: 'word',
  },
  {
    name: 'SunBet',
    href: 'https://www.sunbet.co.za/',
    src: sunbet,
    kind: 'word',
    invertDark: true,
  },
  {
    name: 'Privé City',
    href: 'https://www.privecity.com',
    src: privecity,
    kind: 'mark',
  },
  {
    name: 'CasiYou',
    href: 'https://www.casiyou.com',
    src: casiyou,
    kind: 'mark',
  },
  {
    name: 'Stellar Spins',
    href: 'https://www.stellarspins.com',
    src: stellarspins,
    kind: 'mark',
  },
  {
    name: 'Wolf Winner',
    href: 'https://www.wolfwinner.fun',
    src: wolfwinner,
    kind: 'mark',
  },
  {
    name: 'Pokie Pop',
    href: 'https://www.pokiepop.com/en',
    src: pokiepop,
    kind: 'mark',
  },
  {
    name: 'Casino Joka Club',
    href: 'https://www.casinojokaclub.info',
    src: jokaclub,
    kind: 'mark',
  },
  {
    name: 'MHC',
    href: 'https://www.mhcworld.co.za/',
    src: mhc,
    kind: 'word',
  },
  {
    name: 'Imagine That',
    href: 'https://imagine-that.co.za/',
    src: imagineThat,
    kind: 'word',
  },
]
