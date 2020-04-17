import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { fromNow } from '../../../util/date';

const GET_COMMENTS = gql`
  query comments($input: CommentInput!) {
    comments(input: $input) {
      id
      content
      dateCommented
    }
  }
`;

const COMMENT_MADE = gql`
  subscription commentMade($input: CommentInput!) {
    commentMade(input: $input) {
      id
      content
      dateCommented
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addCommentOnMeme($input: AddCommentInput!) {
    addCommentOnMeme(input: $input) {
      id
      memeId
      content
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentField: {
    marginStart: theme.spacing(1),
    marginEnd: theme.spacing(1),
  },
}));

function MemeCommentsDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');

  const { loading, error } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        memeId: props.memeId,
      },
    },
    onCompleted: (data) => {
      setComments([...comments, ...data.comments]);
    },
  });

  const [addComment, { loading: addingComment }] = useMutation(ADD_COMMENT);

  useSubscription(COMMENT_MADE, {
    variables: { input: { memeId: props.memeId } },
    onSubscriptionData: ({
      subscriptionData: {
        data: { commentMade },
      },
    }) => {
      setComments([...comments, commentMade]);
    },
  });

  return (
    <Dialog open={true} fullScreen={fullScreen} fullWidth={true}>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Typography variant="h6">Comments</Typography>
        <IconButton color="inherit" aria-label="close" onClick={() => props.onDialogClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          {loading ? (
            <CircularProgress className={classes.progress} item xs={12} />
          ) : (
            <>
              {comments.map((comment) => (
                <Grid item xs={12}>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end">
                    <Grid item>
                      <Chip label={comment.content} variant="outlined" />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">{fromNow(comment.dateCommented)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          value={newCommentContent}
          variant="outlined"
          fullWidth
          onChange={(e) => setNewCommentContent(e.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              addComment({
                variables: {
                  input: {
                    memeId: props.memeId,
                    content: newCommentContent,
                  },
                },
              });
              setNewCommentContent('');
            }
          }}
        />
      </DialogActions>
    </Dialog>
  );
}

export default MemeCommentsDialog;
