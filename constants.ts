
import type { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'A professional corporate headshot with a solid, light grey studio backdrop. The lighting is soft and even, creating a clean and classic look.',
    thumbnailUrl: 'https://picsum.photos/seed/corporate/300/300',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'A professional headshot set in a modern tech office environment. The background is slightly blurred, showing hints of glass walls and minimalist furniture. The lighting is bright and natural.',
    thumbnailUrl: 'https://picsum.photos/seed/tech/300/300',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'An outdoor professional headshot with lush, green foliage in a soft-focus background. The subject is illuminated by warm, natural sunlight.',
    thumbnailUrl: 'https://picsum.photos/seed/outdoor/300/300',
  },
  {
    id: 'black-white-classic',
    name: 'Classic B&W',
    prompt: 'A timeless, classic black and white headshot with dramatic, high-contrast lighting (Rembrandt lighting). The background is a solid dark grey or black.',
    thumbnailUrl: 'https://picsum.photos/seed/bw/300/300',
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    prompt: 'A vibrant headshot in a creative studio setting. The background is a bold, solid color like teal or mustard yellow. The lighting is bright and energetic.',
    thumbnailUrl: 'https://picsum.photos/seed/creative/300/300',
  },
  {
    id: 'warm-cafe',
    name: 'Warm & Approachable',
    prompt: 'An approachable headshot taken in a cozy, warm-toned setting like a cafe. The background is softly blurred, with warm ambient lights (bokeh effect).',
    thumbnailUrl: 'https://picsum.photos/seed/cafe/300/300',
  },
];
