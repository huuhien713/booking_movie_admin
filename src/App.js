import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './Routes';
import Loading from './components/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
