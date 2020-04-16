import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import React from 'react';
import MemesCard from '../memecard/MemeCard';

const GET_MEMES = gql`
  {
    memes {
      id
      title
      author
      imageUrl
      dateCreated
      upVotes
      downVotes
      comments {
        content
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: 16
  }
}));

function MemesList(props) {
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_MEMES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  if (props.refetch) refetch();

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center" spacing={2}>
      {data.memes.map(meme => (
        <Grid item key={meme.id} xs={12} sm={6}>
          <MemesCard meme={meme} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MemesList;
