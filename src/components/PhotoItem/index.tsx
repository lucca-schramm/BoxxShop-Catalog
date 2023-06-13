import * as C from './styles';

type Props = {
    url: string;
    name: string;
    description: string;
    category: string;
    league: string;
    dataModificacao: Date,
    onDelete: (name: string) => void;
}

export const PhotoItem =  ({url, name, description, category, league, dataModificacao, onDelete }: Props) => {
    return (
        <C.Container>
            <img src={url} alt={name}/>
            <div>
                Produto:<span> { name } </span>
                <br/>
                Descrição:<span> { description } </span>
                <br />
                Categoria:<span> { category } </span>
                <br />
                Liga: <span> { league } </span>
                <br />
            </div>
                <button onClick={()=> onDelete(name)}> Excluir </button>
        </C.Container>
    );
}
