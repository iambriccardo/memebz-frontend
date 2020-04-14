import React, {useState} from 'react';
import './MemeCard.css'
import {makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function MemesCard({meme}) {
    const classes = useStyles();

    const [isExpanded, expand] = useState(false);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {meme.author[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={meme.title}
                subheader={meme.dateCreated}
            />
            <CardMedia
                className={classes.media}
                image={meme.imageUrl}
                title="Paella dish"
            />
            <CardContent>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="up vote meme">
                    {meme.upVotes}
                    <ArrowUpwardRoundedIcon/>
                </IconButton>
                <IconButton aria-label="down vote meme">
                    {meme.downVotes}
                    <ArrowDownwardRoundedIcon/>
                </IconButton>
                <IconButton
                    onClick={e => expand(!isExpanded)}
                    aria-label="show comments"
                >
                    <ChatRoundedIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body1">
                        Comments are still under implementation, sorry for the inconvenience.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>);
}

export default MemesCard;