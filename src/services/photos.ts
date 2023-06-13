import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject, updateMetadata, getMetadata } from 'firebase/storage';

export const getAll = async (): Promise<Photo[]> => {
  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  const list: Photo[] = [];

  for (const photoItem of photoList.items) {
    const photoRef = photoItem;
    const [photoUrl, metadata] = await Promise.all([getDownloadURL(photoItem),
                                                    getMetadata(photoRef)
                                                  ]);

    const { updated, customMetadata } = metadata;
    const { description = "", category = "", league = "", brand = "" } = customMetadata || {};

    const dateModify = new Date(updated);
    list.push({
                name: photoItem.name,
                url: photoUrl,
                description,
                category,
                league,
                brand,
                dateModify,
              });
            }

  list.sort((a, b) => b.dateModify.getTime() - a.dateModify.getTime());
  return list;
};

export const getFilteredPhotos = async (filters: { description?: string, category?: string, league?: string }): Promise<Photo[]> => {
  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  const filteredList: Photo[] = [];

  for (const photoItem of photoList.items) {
    const photoRef = photoItem;
    const metadata = await getMetadata(photoRef);
    const { customMetadata } = metadata;
    const { description = "", category = "", league = "", brand = "" } = customMetadata || {};

    const matchesDescription = filters.description ? description.includes(filters.description) : true;
    const matchesCategory = filters.category ? category === filters.category : true;
    const matchesLeague = filters.league ? league === filters.league : true;

    if (matchesDescription && matchesCategory && matchesLeague) {
      const photoUrl = await getDownloadURL(photoItem);
      const dateModify = new Date(metadata.updated);
      filteredList.push({name: photoItem.name,
                         url: photoUrl,
                         description,
                         category,
                         league,
                         dateModify,
                         brand,
                         });
                      }
                    }

  return filteredList;
};

export const sentPhotos = async (file: File, fileName: string, description: string, category: string, league: string, brand: string): Promise<Photo | Error> => {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    const newFile = ref(storage, `images/${fileName}`);
    const upload = await uploadBytes(newFile, file);
    const photoUrl = await getDownloadURL(upload.ref);

    const metadata = {
      customMetadata: {
        description,
        category,
        league,
        brand,
      },
    };

    await updateMetadata(upload.ref, metadata);

    return { name: upload.ref.name, url: photoUrl, description, category, league, brand } as Photo;
  } else {
    return new Error('Tipo de arquivo não permitido.');
  }
};

export const deletePhoto = async (name: string): Promise<void> => {
  const photoRef = ref(storage, `images/${name}`);
  await deleteObject(photoRef);
};
