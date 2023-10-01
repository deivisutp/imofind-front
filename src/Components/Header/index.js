import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import logo3 from '../../assets/logo3.png';
import {
    Nav,
    Container,
    Img,
    ContainerSearch,
    Input,
    ContainerOptions
} from './styles';

import { useSearch } from '../../hooks/search';
import { useFeed } from '../../hooks/feed';

let time = null;

const Header = () => {
    const { searchAction, setLoading, imoveis } = useSearch();
    const [term, setTerm] = useState('');
    const { setFeeds } = useFeed();

    useEffect(() => {
        clearTimeout(time);

        if (term.trim()) {
            setLoading(true);
            time = setTimeout(() => {
                searchAction(term);
            }, 1000);
        }

        return () => {
        }
    }, [searchAction, term, setLoading]);

    useEffect(() => {
        if (imoveis.length > 0) {
            setFeeds(imoveis);
        }
        
    }, [imoveis, setFeeds]);

    const filterImoveis = () => {
       // setFilter(imoveis);
    }

    return (
        <Nav>
            <Container>
                <Link to="/">
                    <Img src={logo3} alt="logo" onClick={(e) => filterImoveis()} />
                </Link>


                <ContainerSearch>
                    <FaSearch color="#ccc" size={15} />
                    <Input placeholder="Search" onBlur={(e) => setTerm(e.target.value)} />

                    
                </ContainerSearch>

                <ContainerOptions>
                </ContainerOptions>
            </Container>
        </Nav>
    );
}

export default Header;