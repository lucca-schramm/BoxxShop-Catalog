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
  const applyFilters = (item: Photo) => {
    const { name, category, description, league } = item;
    const lowercaseFilter = filter.toLowerCase();

    const filters = lowercaseFilter.split(" ");

    const filterMatches = filters.every(filter => {
      const itemString = `${name.toLowerCase()} ${description.toLowerCase()} ${category.toLowerCase()} ${league.toLowerCase()}`;
      return itemString.includes(filter);
    });
  
    return filterMatches;
  };

  const filteredPhotos = photos.filter(applyFilters);

  return (
    <C.PhotoList>
      {filteredPhotos.map((item, index) => (
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
        />
      ))}
    </C.PhotoList>
  );
}

export default PhotoList;
