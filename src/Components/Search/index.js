import React from 'react';
import { useSearch } from '../../hooks/search';
import Profile from '../Profile';

import Spinner from '../Spinner';

import {
    Container,
    ContainerResult,
    ContainerProfile,
    ContainerEmpty
} from './styles';

const SearchContainer = ({ toggleClose }) => {
    const { loading, imoveis } = useSearch();


    return (
        <Container>
            {loading ? (
                <Spinner style={{ marginTop: "10px" }} />
            ) : (
                <ContainerResult>
                    {imoveis.length > 0 ? (
                        imoveis.map((imovel) => (
                            <ContainerProfile key={imovel.id + "searchid"} onClick={toggleClose}>
                                <Profile
                                    direction="row"
                                    img={imovel.image}
                                    username={imovel.id}
                                    name={imovel.titulo}
                                />
                            </ContainerProfile>
                        ))
                    ) : (
                        <ContainerEmpty>
                            <p>Have no results</p>
                        </ContainerEmpty>
                    )}
                </ContainerResult>
            )}
        </Container>
    );
}

export default React.memo(SearchContainer);