import type { User } from '../types';

export const initialUser: User = {
  id: 'u001',
  name: 'Usuario CineMatch',
  email: 'usuario@cinematch.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  myListMovieIds: ['m101', 'm102', 'm103', 'm105'],
  preferences: {
    notifications: true,
    autoplayTrailers: false,
    adultContent: false
  }
};
