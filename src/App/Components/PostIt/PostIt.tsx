import * as React from 'react';
import {FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Nota} from "../../services/Nota";


type PostItNota = {
  nota?:Nota,
  index?:Number,
  alertA?:(index: number) => void
}

const PostIt:FC<PostItNota> = ({nota,index, alertA}) => {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {nota?.title +' '+nota?.content}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {nota?.author?.name+' '+nota?.author?.surname}
        </Typography>
        <Typography variant="body2">
          {nota?.date_created?.toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>alertA} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


export default PostIt;