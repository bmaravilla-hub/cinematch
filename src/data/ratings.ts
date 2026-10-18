import type { Rating } from '../types';

export const initialRatings: Rating[] = [
  {
    id: 'r001',
    userId: 'u001',
    movieId: 'm101',
    score: 5,
    createdAt: '2024-02-15',
    review: 'Una experiencia visual y emocional insuperable. La banda sonora de Hans Zimmer eleva cada escena a otra dimensión.'
  },
  {
    id: 'r002',
    userId: 'u001',
    movieId: 'm102',
    score: 5,
    createdAt: '2024-01-20',
    review: 'Guión brillante y cinematografía revolucionaria. Cada visionado revela nuevas capas de significado.'
  },
  {
    id: 'r003',
    userId: 'u001',
    movieId: 'm104',
    score: 4,
    createdAt: '2023-11-10',
    review: 'La mejor interpretación del Guasón en la historia del cine. Tensa de principio a fin.'
  },
  {
    id: 'r004',
    userId: 'u001',
    movieId: 'm103',
    score: 4,
    createdAt: '2024-03-05',
    review: 'Una escala colosal con un diseño sonoro que vibra en cada fotograma.'
  }
];
