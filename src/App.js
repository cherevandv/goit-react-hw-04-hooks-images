import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Searchbar onSubmit={setQuery} />
      <ToastContainer autoClose={3000} />
      {query && <ImageGallery query={query} />}
    </div>
  );
}
