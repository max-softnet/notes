import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Note} from "../../services/Note";
import {FC} from "react";


type PostItNota = {
  nota?:Note,
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
          {nota?.author}
        </Typography>
        <Typography variant="body2">
          {nota?.data_create?.toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>alertA} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


export default PostIt;