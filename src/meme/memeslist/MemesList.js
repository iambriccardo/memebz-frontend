import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import MemesCard from "../memecard/MemeCard";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";

const GET_MEMES = gql`
  {
    memes {
        title
        author
        imageUrl
        dateCreated
        upVotes
        downVotes
    }
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 16
    }
}));

function MemesList() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_MEMES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error}`;

    return (
        <Grid className={classes.root} container direction="row" justify="center" alignItems="center" spacing={2}>
            {data.memes.map(meme => <Grid item xs={6}><MemesCard meme={meme}/></Grid>)}
        </Grid>
    );
}

export default MemesList;