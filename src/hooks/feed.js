import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const FeedContext = createContext();

const FeedProvider = ({ children }) => {
    const [feeds, setFeeds] = useState([]);
    const [totalFeeds, setTotalFeeds] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterFeeds, setFilterFeeds] = useState("");

    const getFeedImoveis = async (page = 0) => { 
        const res = await api.get("/busca",  {
            params: {
                page,
                size: 12
            }
        });
        if (res.status === 200) {
            setFeeds((state) => [...state, ...res.data.content]);
            setTotalFeeds(res.totalPages);
        }
    };

    const getFeeds = useCallback(async (page = 0) => {
        try {
            setLoading(true);
            getFeedImoveis();
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    }, []);

    const addFeed = useCallback((data) => {
        setFeeds((state) => [data, ...state]);
    }, []);

    const setFilter = useCallback((imovel) => {
        setFilterFeeds(imovel);
    },[]);

    return (
        <FeedContext.Provider value={{ feeds, totalFeeds, loading, getFeeds, addFeed, setFeeds, setFilter, filterFeeds }}>
            {children}
        </FeedContext.Provider>
    )
}

function useFeed() {
    const context = useContext(FeedContext);

    if (!context) throw new Error('useFeed must be used within an FeedProvider');

    return context;
}

export { FeedProvider, useFeed };