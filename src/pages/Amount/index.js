import React from 'react';
import useStyles from '../../components/Drawer/useStyles';
import { useAuth } from '../../context/AuthContext';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const Amount = () => {
  const classes = useStyles();
  const { photos, getData } = useAuth();

  React.useEffect(() => {
    getData();
  });

  for (let i = 0; i < photos.length; i++) {
    var cocaAmount = 0;

    if (photos[i].logo === 'Coca-Cola') {
      cocaAmount++;
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                C
              </Avatar>
            }
            title="Coca Cola"
            subheader={`Total Amount: ${cocaAmount}`}
          />
        </Card>
      </div>
    </main>
  );
};

export default Amount;
