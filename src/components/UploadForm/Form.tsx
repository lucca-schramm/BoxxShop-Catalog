import React, { useState } from 'react';
import * as C from './styles';
import * as Photos from '../../services/photos'
import { Photo } from '../../utils/types/Photo';
import { category, brand, league } from '../../utils/types/Types';

interface FormProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photos: Photo[];
}

const Form: React.FC<FormProps> = ({ setPhotos, photos }) => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  };

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

  return (
    <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
      <C.Form_center>
        <C.StyledInput type="file" name="image" onChange={handleImageChange} />
        {previewImage && (
          <img src={previewImage} alt="Pré-visualização da imagem" style={{ width: '200px', height: 'auto' }} />
        )}
        <C.StyledInput type="text" name="fileName" placeholder="Insira o nome do produto e o time" />
        <C.StyledInput type="text" name="description" placeholder="Descreva o produto" />
      </C.Form_center>
      <C.Form_center>
        <C.StyledSelect name="category">
          <option disabled selected>
            Selecione a Categoria
          </option>
          {category.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </C.StyledSelect>
        <C.StyledSelect name="league">
          <option disabled selected>
            Selecione a Liga
          </option>
          {league.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </C.StyledSelect>
        <C.StyledSelect name="brand">
          <option disabled selected>
            Selecione a Marca
          </option>
          {brand.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </C.StyledSelect>
      </C.Form_center>
      <C.Form_center>
        <C.StyledSubmitButton type="submit" value="Enviar" />
      </C.Form_center>
      {uploading && "Enviando..."}
    </C.UploadForm>
  );
};

export default Form;
