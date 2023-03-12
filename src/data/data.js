import Image1 from './images/1.jpg';
import Image2 from './images/2.jpg';
import Image3 from './images/3.jpg';
import Image4 from './images/4.jpg';
import Image5 from './images/5.jpg';
import Image6 from './images/6.jpg';
import Image7 from './images/7.jpg';
import Image9 from './images/9.jpg';
import Image10 from './images/10.jpg';

export const albums = [
  {
    id: 1,
    title: 'Amna Hanif',
    type: 'people',
    photos: [
      {
        id: 1,
        name: 'IMG_123',
        path: Image1,
      },
      {
        id: 2,
        name: 'IMG_122',
        path: Image2,
      },
      {
        id: 3,
        name: 'IMG_124',
        path: Image3,
      },
      {
        id: 4,
        name: 'IMG_125',
        path: Image4,
      },
    ],
  },
  {
    id: 2,
    title: 'Hassan Hanif',
    type: 'people',
    photos: [
      {
        id: 1,
        name: 'IMG_123',
        path: Image5,
      },
      {
        id: 2,
        name: 'IMG_122',
        path: Image6,
      },
      {
        id: 3,
        name: 'IMG_124',
        path: Image7,
      },
      {
        id: 4,
        name: 'IMG_125',
        path: Image2,
      },
    ],
  },
  {
    id: 3,
    title: 'F9 Park',
    type: 'location',
    photos: [
      {
        id: 1,
        name: 'IMG_123',
        path: Image6,
      },
      {
        id: 2,
        name: 'IMG_122',
        path: Image4,
      },
      {
        id: 3,
        name: 'IMG_124',
        path: Image7,
      },
      {
        id: 4,
        name: 'IMG_125',
        path: Image1,
      },
    ],
  },
  {
    id: 4,
    title: "Alesha's Birthday",
    type: 'event',
    photos: [
      {
        id: 1,
        name: 'IMG_123',
        path: Image10,
      },
      {
        id: 2,
        name: 'IMG_122',
        path: Image9,
      },
      {
        id: 3,
        name: 'IMG_124',
        path: Image7,
      },
      {
        id: 4,
        name: 'IMG_125',
        path: Image2,
      },
    ],
  },
];
