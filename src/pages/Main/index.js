import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../Components/Spinner';

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
                                .map(feed => <CardFeed key={feed.id} feed={feed} />)
                        ) : (feeds.map(feed => <CardFeed key={feed.id} feed={feed} />))
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
                </ContainerFeeds>
            </Container>
        </Layout>
    );
}

export default Main;