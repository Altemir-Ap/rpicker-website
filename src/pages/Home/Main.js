import React from 'react';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import useStyles from '../../components/Drawer/useStyles';
import { useAuth } from '../../context/AuthContext';

const Main = () => {
  const classes = useStyles();
  const { photos, getData } = useAuth();
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography>
          {photos?.map((photo, key) => (
            <Card className={classes.rootCard} key={key}>
              <CardActionArea>
                <CardMedia
                  className={classes.mediaCard}
                  image={`data:image/jpeg;base64,${photo.photo.base64}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {photo.logo}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {photo.label === 0
                      ? 'No label was identified for this photo'
                      : photo.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Typography>
      </main>
    </>
  );
};

export default Main;
