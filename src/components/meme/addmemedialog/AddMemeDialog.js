import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import DropzoneArea from 'react-dropzone-material-ui';
import { uploadPhoto } from '../../../util/cloudinary';

const ADD_MEME = gql`
  mutation addMeme($input: AddMemeInput!) {
    addMeme(input: $input) {
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

function AddMemeDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [meme, setMeme] = useState({});
  const [files, setFiles] = useState([]);
  const [isUploadingImage, setUploadingImage] = useState(false);

  const [addMeme, { loading: addingMeme }] = useMutation(ADD_MEME, {
    onCompleted: (data) => {
      props.onDialogClose(true);
    },
  });

  return (
    <Dialog open={props.isOpen} fullScreen={fullScreen}>
      <DialogTitle>Upload a new meme</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To upload a new meme, please fill in the form below and let the fun begin!
        </DialogContentText>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          {isUploadingImage || addingMeme ? (
            <CircularProgress className={classes.progress} item xs={12} />
          ) : (
            <>
              <Grid item xs={12}>
                <Typography className={classes.header} variant="body1">
                  Give a cool title to your meme:
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    setMeme({
                      ...meme,
                      title: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.header} variant="body1">
                  Choose your (possibly funny) name:
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    setMeme({
                      ...meme,
                      author: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.header} variant="body1" component="h2">
                  Choose your meme image (pls not too many cats):
                </Typography>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={'Choose your meme file'}
                  filesLimit={1}
                  onChange={setFiles}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        {!isUploadingImage && !addingMeme ? (
          <>
            <Button color="primary" onClick={() => props.onDialogClose(false)}>
              Cancel
            </Button>
            {files.length > 0 && (
              <Button
                color="primary"
                onClick={() => {
                  setUploadingImage(true);
                  uploadPhoto(files[0], (response) => {
                    setUploadingImage(false);
                    addMeme({
                      variables: {
                        input: {
                          ...meme,
                          imageUrl: response.secure_url,
                        },
                      },
                    });
                    setMeme({});
                    setFiles([]);
                  });
                }}
              >
                Add meme
              </Button>
            )}
          </>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AddMemeDialog;
