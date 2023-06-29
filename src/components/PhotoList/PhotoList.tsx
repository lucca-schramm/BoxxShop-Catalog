// PhotoList.tsx
import React from 'react';
import * as C from './styles';
import { PhotoItem } from '../PhotoItem';
import { Photo } from '../../utils/types/Photo';

interface PhotoListProps {
  photos: Photo[];
  filter: string;
  handleDeleteClick: (name: string) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, filter, handleDeleteClick }) => {
  return (
    <C.PhotoList>
      {photos
        .filter((item) =>
          item?.name.toLowerCase().includes(filter.toLowerCase()) ||
          item?.category.toLowerCase().includes(filter.toLowerCase()) ||
          item?.league.toLowerCase().includes(filter.toLowerCase())
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
  );
}

export default PhotoList;
