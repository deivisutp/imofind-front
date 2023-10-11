import React from 'react';

import ModalMoreOptions from '../Modal/ModalMoreOptions';

import {
    Card,
    CardHeader,
    ContainerPhoto,
    PhotoCard,
    CardDetails,
    CardFooter,
    TimeAgo as StyleTimeAgo,
} from './styles';

const CardFeed = ({ feed }) => {

    const { extra, id, image, link, origem, price_varchar, titulo } = feed;

    return (
        <Card>
            <CardHeader>
                <ModalMoreOptions
                    isAuthor={false}
                    photo={feed}
                />
                <span
                    style={{
                        marginLeft: 5,
                        fontWeight: "normal",
                        marginBottom: 10,
                        display: "inline-block",
                    }}
                >
                    {titulo}
                </span>
                <span
                    style={{
                        marginLeft: 2,
                        fontSize: 14,
                        fontWeight: "bold",
                        marginBottom: 10,
                        display: "inline-block",
                    }}
                >
                    {`R$ ${price_varchar}`}
                </span>
                
            </CardHeader>

            <ContainerPhoto>
                <PhotoCard src={image} alt={image} />
            </ContainerPhoto>

            <CardDetails>   

                <div key={id} 
                    style={{
                        fontSize: 12,
                        fontWeight: 100
                    }}>
                    <span>
                        {extra}
                    </span>
               
                </div> 
             
                <StyleTimeAgo>
                    <div>
                        <span>{origem}</span>
                    </div>
                </StyleTimeAgo>

                <CardFooter>
                    <form>
                        <a type="button" href={link} target="_blank">Ver imóvel</a>
                    </form>
              
                    
                </CardFooter>
            </CardDetails>
        </Card>
    );
}

export default React.memo(CardFeed);