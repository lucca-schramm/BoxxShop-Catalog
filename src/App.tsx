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
  const [filterName, setFilterName] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const category = ["Basquete", "Calça", "Casaco", "Calçado", "Casual", "Corta Vento", "Kit", "Futebol Jogador", "Futebol Torcedor", "Futebol Treino"];
  const league = ["Brasileirão (Brasileiro)",
    "Bundesliga (Alemão)",
    "Argentino",
    "Paraguaio",
    "Eredivisie (Holandês)",
    "LaLiga (Espanhol)",
    "Liga Portugal (Português)",
    "Ligue 1 (Francês)",
    "MLS - Major League Soccer (Americano - EUA)",
    "Liga Saudita",
    "Premier League (Inglês)",
    "Serie A (Italiano)",
    "NBA (Basquete Americano)"];
  const brand = ['Adidas', 'Balenciaga', 'Diadora', 'New Balance', 'Nike', 'Puma', 'Topper', 'Umbro', 'Under Armour']

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
    const brand = formData.get('brand') as string;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.sentPhotos(file, fileName, description, category, league, brand);
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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage('');
    }
  };

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
          <C.Form_center>
            <C.StyledInput type="file" name="image" onChange={handleImageChange}/>
            {previewImage && (
              <img src={previewImage} alt="Pré-visualização da imagem" style={{ width: '200px', height: 'auto' }} />
            )}
            <C.StyledInput type="text" name="fileName" placeholder='Insira o nome do produto e o time' />
            <C.StyledInput type="text" name="description" placeholder='Descreva o produto' />
          </C.Form_center>
          <C.Form_center>
            <C.StyledSelect name="category">
            <option disabled selected>Selecione a Categoria</option>
              {category.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </C.StyledSelect>
            <C.StyledSelect name="league">
              <option disabled selected>Selecione a Liga</option>
              {league.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </C.StyledSelect>
            <C.StyledSelect name="brand">
            <option disabled selected>Selecione a Marca</option>
              {brand.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </C.StyledSelect>
          </C.Form_center>
          <C.Form_center>
            <C.StyledSubmitButton type="submit" value="Enviar" />
          </C.Form_center>
          {uploading && "Enviando..."}
        </C.UploadForm>
        <C.Filters>
              <input
                type="text"
                value={filterName}
                placeholder="Filtrar por Nome"
                onChange={(i) => setFilterName(i.target.value)}
              />
              <input
                type="text"
                value={filter}
                placeholder="Filtrar por Categoria"
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

        {/*Área de upload*/}
        {loading && (
          <C.ScreenWarning>
            <div className='emoji'><img src="/loading.png" alt="Loading..." className="loading-image" /></div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <>
            <C.PhotoList>
              {photos
                .filter((item) =>
                  item?.name.toLowerCase().includes(filterName.toLowerCase())&&
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
                    brand={item.brand}
                    dataModificacao={item.dateModify}
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
