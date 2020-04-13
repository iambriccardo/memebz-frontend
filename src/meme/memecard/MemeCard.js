import React from 'react';
import './MemeCard.css'
import {Button, Card, Elevation,Text} from "@blueprintjs/core";

function MemesCard({meme}) {
    return (
        <Card className="card" interactive={true} elevation={Elevation.TWO}>
            {console.log(meme)}
            <Text tagName="h3" ellipsize={true}>
                {meme.title}
            </Text>
            <Text tagName="p" ellipsize={true}>
                {meme.author}
            </Text>
            <img src={meme.imageUrl} />
        </Card>);
}

export default MemesCard;