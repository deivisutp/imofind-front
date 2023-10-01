import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchAction = useCallback(async (term) => {
        try {
            if (term) {
                setLoading(true);
              
                const res = await api.get("/busca",  {
                    params: {
                        descricao: term,
                        page: 0,
                        size: 12
                    }
                });
               
                if (res.data.content.length > 0) {
                    setLoading(false);
                    setImoveis(res.data.content);               
                }
                setLoading(false);
            }
        } catch (error) {
            throw Error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <SearchContext.Provider value={{ users, loading, searchAction, setUsers, setLoading, imoveis, setImoveis}}>
            {children}
        </SearchContext.Provider>
    )
}

function useSearch() {
    const context = useContext(SearchContext);

    if (!context) throw new Error('useSearch must be used within an SearchProvider');

    return context;
}

export { SearchProvider, useSearch };