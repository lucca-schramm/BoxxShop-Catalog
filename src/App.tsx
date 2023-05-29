import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    const fileName = formData.get('fileName') as string;
    const description = formData.get('description') as string;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.sentPhotos(file, fileName, description);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    const updatedPhotos = photos.filter((photo) => photo.name !== name);
    setPhotos(updatedPhotos);
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de Produtos BoxxShop </C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="text" name="fileName" />
          <input type="text" name="description" />
          <input type="submit" value="Enviar"/>
          {uploading && "Enviando..."}
        </C.UploadForm>

        {/*Área de upload*/}
        {loading &&
          <C.ScreenWarning>
            <div className='emoji'>🤚</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem
                key={index}
                url={item.url}
                name={item.name}
                onDelete={handleDeleteClick}
              ></PhotoItem>
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className='emoji'>😡</div>
            <div>Não há produtos cadastrados.</div>
          </C.ScreenWarning>
        }
      </C.Area>
    </C.Container>
  );
}

export default App;
