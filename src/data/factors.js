'use client'

import Blood from '../components/icons/factor/Blood';
import Lightning from '../components/icons/factor/Lightning';
import Range from '../components/icons/factor/Range';
import Tier from '../components/icons/factor/Tier';

export const factors = [
  {
    id: 1,
    icon: Lightning,
    title: 'Users',
    color: 'primary.main',
    value: NaN,
  },
  {
    id: 2,
    icon: Range,
    title: 'Products',
    color: 'error.light',
    value: NaN,
    // max: 300,
  },
  {
    id: 3,
    icon: Blood,
    title: 'Value',
    color: 'secondary.main',
    value: NaN,
  },
  {
    id: 4,
    icon: Tier,
    title: 'Reports',
    color: 'warning.darker',
    value: NaN,
  },
];
