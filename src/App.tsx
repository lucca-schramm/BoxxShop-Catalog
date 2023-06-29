import { useState, useEffect } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './utils/types/Photo';
import PhotoList from './components/PhotoList/PhotoList';
import Form from './components/UploadForm/Form';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    const updatedPhotos = photos.filter((photo) => photo.name !== name);
    setPhotos(updatedPhotos);
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Produtos BoxxShop</C.Header>

        <Form setPhotos={setPhotos} photos={photos} />

        <C.Filters>
          <input
            type="text"
            value={filter}
            placeholder="Filtrar Produtos"
            onChange={(e) => setFilter(e.target.value)}
          />
        </C.Filters>
        <br />

        {loading && (
          <C.ScreenWarning>
            <div className='emoji'><img src="/loading.png" alt="Loading..." className="loading-image" /></div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <PhotoList
            photos={photos}
            filter={filter}
            handleDeleteClick={handleDeleteClick}
          />
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className='emoji'>😡</div>
            <div>Não há produtos cadastrados.</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
}

export default App;
