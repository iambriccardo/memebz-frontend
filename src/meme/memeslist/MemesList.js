import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import MemesCard from "../memecard/MemeCard";

const GET_MEMES = gql`
  {
    memes {
        title
        author
        imageUrl
    }
  }
`;

function MemesList() {
    const { loading, error, data } = useQuery(GET_MEMES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error}`;

    return (
        <>
            {data.memes.map(meme => <MemesCard meme={meme} />)}
        </>
    );
}

export default MemesList;