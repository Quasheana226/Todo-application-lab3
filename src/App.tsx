import Dashboard from './components/Dashboard/Dashboard';
import { AppProviders } from './contexts/AppProviders';

function App() {
  return (
    <AppProviders>
      <Dashboard />;

    </AppProviders>

  );
}

export default App