import * as C from './styles';

type Props = {
    url: string;
    name: string;
    description: string;
    category: string;
    onDelete: (name: string) => void;
}

export const PhotoItem =  ({url, name, description, category, onDelete }: Props) => {
    return (
        <C.Container>
            <img src={url} alt={name}/>
            Produto: {name}
            <br/>
            Descrição: { description }
            <br />
            Categoria: { category }
            <button onClick={()=> onDelete(name)}> Excluir </button>
        </C.Container>
    );
}
