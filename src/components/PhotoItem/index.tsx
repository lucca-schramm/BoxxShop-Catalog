import * as C from './styles';
import ProductButton from './buttonWhatsapp';

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

export const PhotoItem = ({
  url,
  name,
  description,
  category,
  league,
  dataModificacao,
  brand,
  onDelete
}: Props) => {
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir " + name +' '+ description+ ' ?')) {
      onDelete(name);
    }
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
      <ProductButton name={name} description={description} url={url} />
    </C.Container>
  );
};
