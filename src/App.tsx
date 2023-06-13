import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filter, setFilter] = useState('');
  const [filter_league, setFilter_league] = useState('');

  const category = ["Selecione o Produto", "Calça", "Casaco","Basquete", "Calçado", "Casual", "Kit", "Futebol Jogador", "Futebol Torcedor", "Futebol Treino"];
  const league = ["Selecione a Liga",
  "Brasileirão (Campeonato Brasileiro)",
  "Bundesliga (Campeonato Alemão)",
  "Campeonato Argentino",
  "Campeonato Paraguaio",
  "Eredivisie (Campeonato Holandês)",
  "LaLiga (Campeonato Espanhol)",
  "Liga Portugal (Campeonato Português)",
  "Ligue 1 (Campeonato Francês)",
  "MLS - Major League Soccer (Campeonato Americano - EUA)",
  "Liga Saudita",
  "Premier League (Campeonato Inglês)",
  "Serie A (Campeonato Italiano)",
  "NBA (Campeonato de Basquete Americano)"];

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
    const category = formData.get('category') as string;
    const league = formData.get('league') as string;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.sentPhotos(file, fileName, description, category, league);
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
        <C.Header>Galeria de Produtos BoxxShop</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <div>  
            <input type="file" name="image" />
            <input type="text" name="fileName" placeholder='Nome' />
            <input type="text" name="description" placeholder='Descrição' />
            <br />
            <select name="category">
              {category.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select name="league">
              {league.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input type="submit" value="Enviar" />
          </div>
          {uploading && "Enviando..."}
        </C.UploadForm>

        {/*Área de upload*/}
        {loading && (
          <C.ScreenWarning>
            <div className='emoji'>🤚</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <>
          <C.Filters>
            <input
                id="category"
                type="text"
                value={filter}
                placeholder="Filtrar por categoria"
                onChange={(e) => setFilter(e.target.value)}
              />
              <input
                type="text"
                value={filter_league}
                placeholder="Filtrar por Liga"
                onChange={(i) => setFilter_league(i.target.value)}
              />
          </C.Filters>
          <br />
            

            <C.PhotoList>
              {photos
                .filter((item) =>
                  item?.category.toLowerCase().includes(filter.toLowerCase()) &&
                  item?.league.toLowerCase().includes(filter_league.toLowerCase())
                  )
                .map((item, index) => (
                  <PhotoItem
                    key={index}
                    url={item.url}
                    name={item.name}
                    description={item.description}
                    category={item.category}
                    league={item.league}
                    dataModificacao={item.dataModificacao}
                    onDelete={handleDeleteClick}
                  ></PhotoItem>
                ))}
            </C.PhotoList>
          </>
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
