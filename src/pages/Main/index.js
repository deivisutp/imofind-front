import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../Components/Spinner';
import Loader from '../../Components/Loader';

import Layout from '../Layout';

import {
    ContainerFeeds,
    Container
} from './styles';
import { useFeed } from '../../hooks/feed';
import CardFeed from '../../Components/CardFeed';

const Main = () => {
    const [page, setPage] = useState(0);
    const { feeds, loading: totalFeeds, getFeeds, setFeeds, filterFeeds } = useFeed();
    const [paginate, setpaginate] = useState(20);

    useEffect(() => {
        getFeeds(page);

        return () => {
            setFeeds([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (filterFeeds && feeds.length > 1) {
            feeds.filter((item) => item.id === filterFeeds);
            setFeeds(state => state.filter((item) => item.id === filterFeeds));
        } 

        if (page > 0 && feeds.length < totalFeeds) getFeeds(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterFeeds]);

    const observer = useRef(
        new IntersectionObserver(
            async entries => {
                const first = entries[0];

                if (first.isIntersecting) {
                    setPage((state) => state + 1);
                }
            },
            {
                threshold: 0.8
            }
        )
    );

    const [element, setElement] = useState(null);

    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 20);
      };

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [element]);

    return (
        <Layout>
            <Container>
                <ContainerFeeds>
                    {feeds &&
                        filterFeeds ? (
                            feeds
                                .filter((item) => item.id === filterFeeds)
                                .slice(0, paginate)
                                .map(feed => <CardFeed key={feed.id} feed={feed} />)
                        ) : (
                            feeds
                                .slice(0, paginate)
                                .map(feed => <CardFeed key={feed.id} feed={feed} />))
                        }

                    {!!feeds && feeds.length > 0 && (
                        <button
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100px",
                                marginBottom: "10px",
                                display: "block",
                                background: "transparent",
                                border: "none"
                            }}
                            ref={setElement}
                            type="button" />
                    )}
  
                    {   //Adjust
                       1 == 2 && (//feedLoading && (
                        <Spinner />
                    )}

                    <button onClick={load_more}>Carregar mais</button>
              
                    
                </ContainerFeeds>
            </Container>
        </Layout>
    );
}

export default Main;