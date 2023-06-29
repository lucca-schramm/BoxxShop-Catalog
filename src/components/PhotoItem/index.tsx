import React, { useState } from 'react';
import * as C from './styles';
import ProductButton from './buttonWhatsapp';
import EditModal from '../EditModal/editModal';

type Props = {
  url: string;
  name: string;
  description: string;
  category: string;
  league: string;
  brand: string;
  dataModificacao: Date;
  onDelete: (name: string) => void;
};

export const PhotoItem: React.FC<Props> = ({
  url,
  name,
  description,
  category,
  league,
  dataModificacao,
  brand,
  onDelete
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir " + name + ' ' + description + ' ?')) {
      onDelete(name);
    }
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  return (
    <C.Container>
      <img src={url} alt={name} />
      <div>
        Produto:<span> {name} </span>
        <br />
        Descrição:<span> {description} </span>
        <br />
        Categoria:<span> {category} </span>
        <br />
        Liga: <span> {league} </span>
        <br />
        Marca: <span>{brand}</span>
        <br />
        Adicionado:{' '}
        <span>
          {dataModificacao?.getDate() +
            '/' +
            dataModificacao?.getMonth() +
            '/' +
            dataModificacao?.getFullYear()}
        </span>
      </div>
      <button onClick={handleDelete}>Excluir</button>
      <button onClick={handleEditClick}>Editar</button>
      {editModalOpen && (
        <EditModal
          photo={{
            url,
            name,
            description,
            category,
            league,
            brand,
            dateModify: dataModificacao,
          }}
          onSave={(updatedPhoto) => {
            console.log(updatedPhoto);
            setEditModalOpen(false);
          }}
          onCancel={() => setEditModalOpen(false)}
        />
      )}
      <ProductButton name={name} description={description} url={url} />
    </C.Container>
  );
};
