import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject, updateMetadata, getMetadata } from 'firebase/storage';

export const getAll = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    let photoRef = photoList.items[i];
    let photoUrl = await getDownloadURL(photoList.items[i]);
    let metadata = await getMetadata(photoRef);
    let dataModificacao = new Date(metadata.updated);
    let description = metadata.customMetadata?.description || "";
    let category = metadata.customMetadata?.category || "";
    let league = metadata.customMetadata?.league || "";
    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
      description: description,
      category: category,
      league: league,
      dataModificacao: dataModificacao,
    });
  }
  list.sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime());
  return list;
};

export const getFilteredPhotos = async (filters: { description?: string, category?: string, league?: string }) => {
  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  const filteredList: Photo[] = [];

  for (let i in photoList.items) {
    let photoRef = photoList.items[i];
    let metadata = await getMetadata(photoRef);
    let description = metadata.customMetadata?.description || "";
    let category = metadata.customMetadata?.category || "";
    let league = metadata.customMetadata?.league || "";

    const matchesDescription = filters.description ? description.includes(filters.description) : true;
    const matchesCategory = filters.category ? category === filters.category : true;
    const matchesLeague = filters.league ? league === filters.league : true;

    if (matchesDescription && matchesCategory && matchesLeague) {
      let photoUrl = await getDownloadURL(photoList.items[i]);
      let dataModificacao = new Date(metadata.updated);
      filteredList.push({
        name: photoList.items[i].name,
        url: photoUrl,
        description: description,
        category: category,
        league: league,
        dataModificacao: dataModificacao,
      });
    }
  }
  

  return filteredList;
};

export const sentPhotos = async (file: File, fileName: string, description: string, category: string, league: string) => {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    let newFile = ref(storage, `images/${fileName}`);
    let upload = await uploadBytes(newFile, file);
    let photoUrl = await getDownloadURL(upload.ref);

    const metadata = {
      customMetadata: {
        description: description,
        category: category,
        league: league,
      }
    };

    await updateMetadata(upload.ref, metadata);

    return { name: upload.ref.name, url: photoUrl, description: description, category: category, league: league } as Photo;
  } else {
    return new Error('Tipo de arquivo não permitido.');
  }
};

export const deletePhoto = async (name: string) => {
  let photoRef = ref(storage, `images/${name}`);
  await deleteObject(photoRef);
};
