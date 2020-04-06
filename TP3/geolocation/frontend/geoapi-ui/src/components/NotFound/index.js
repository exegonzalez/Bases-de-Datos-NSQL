import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Link,
} from '@material-ui/core';

const image = require('../images/cards/contemplative-reptile.jpg')

export default function index() {
    return (
        <Fragment>
          <NotFound/>
        </Fragment>
    )
}

const useStyles = makeStyles({
root: {
    flexGrow: 1,
    },
  media: {
    height: 800,
  },
});

function NotFound() {
  const classes = useStyles();

  return (
    <Container fixed>
        <Box textAlign="center" mx="2%" my="2%">
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={image}
                title="404 Not Found"
                />
            </CardActionArea>
            <CardActions>
                <Link href="/home" color="primary">
                Volver al Home
                </Link>
            </CardActions>
            </Card>
        </Box>
    </Container>
  );
}