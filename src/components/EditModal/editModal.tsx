import React, { useState } from 'react';
import * as C from './styles';
import { Photo } from '../../utils/types/Photo';
import { category, brand, league, EditPhotoError } from '../../utils/types/Types';
import { editPhoto } from '../../services/photos';


type EditModalProps = {
  photo: Photo;
  onSave: (photo: Photo | EditPhotoError) => void;
  onCancel: () => void;
};


const EditModal: React.FC<EditModalProps> = ({ photo, onSave, onCancel }) => {
  const [name, setName] = useState(photo.name);
  const [description, setDescription] = useState(photo.description);
  const [selectedCategory, setSelectedCategory] = useState(photo.category);
  const [selectedLeague, setSelectedLeague] = useState(photo.league);
  const [selectedBrand, setSelectedBrand] = useState(photo.brand);

  const handleSaveClick = async () => {
    const updatedPhoto: Photo = {
      ...photo,
      name,
      description,
      category: selectedCategory,
      league: selectedLeague,
      brand: selectedBrand,
    };
  
    try {
      const savedPhoto = await editPhoto(updatedPhoto);
      onSave(savedPhoto);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalContent>
          <C.ModalHeader>Editar Foto</C.ModalHeader>
          <C.ImagePreview>
            <img src={photo.url} alt={photo.name}/>
          </C.ImagePreview>
          <C.Form>
            <C.FormGroup>
              <C.Label>Nome do Produto e Time</C.Label>
              <C.Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </C.FormGroup>
            <C.FormGroup>
              <C.Label>Descrição</C.Label>
              <C.Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </C.FormGroup>
            <C.FormGroup>
              <C.Label>Categoria</C.Label>
              <C.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option disabled value="">
                  Selecione a Categoria
                </option>
                {category.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </C.Select>
            </C.FormGroup>
            <C.FormGroup>
              <C.Label>Liga</C.Label>
              <C.Select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
              >
                <option disabled value="">
                  Selecione a Liga
                </option>
                {league.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </C.Select>
            </C.FormGroup>
            <C.FormGroup>
              <C.Label>Marca</C.Label>
              <C.Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option disabled value="">
                  Selecione a Marca
                </option>
                {brand.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </C.Select>
            </C.FormGroup>
          </C.Form>
          <C.Buttons>
            <C.Button onClick={handleSaveClick}>Salvar</C.Button>
            <C.Button onClick={onCancel}>Cancelar</C.Button>
          </C.Buttons>
        </C.ModalContent>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditModal;
