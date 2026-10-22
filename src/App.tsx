import React from 'react';
import { CineMatchProvider, useCineMatch } from './context/CineMatchContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { RecommendationsView } from './views/RecommendationsView';
import { MovieDetailView } from './views/MovieDetailView';
import { MyListView } from './views/MyListView';
import { ProfileView } from './views/ProfileView';

const ViewRenderer: React.FC = () => {
  const { activeView } = useCineMatch();

  switch (activeView) {
    case 'home':
      return <HomeView />;
    case 'catalog':
      return <CatalogView />;
    case 'recommendations':
      return <RecommendationsView />;
    case 'movie-detail':
      return <MovieDetailView />;
    case 'my-list':
      return <MyListView />;
    case 'profile':
      return <ProfileView />;
    default:
      return <HomeView />;
  }
};

export function App() {
  return (
    <CineMatchProvider>
      <AppLayout>
        <ViewRenderer />
      </AppLayout>
    </CineMatchProvider>
  );
}

export default App;
