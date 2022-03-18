import { Card, CardActions, CardContent, Typography } from "@mui/material";

export default function PokeCard(props){
    return <Card sx={{ minWidth: 275, margin:"5% 0%" }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        NAME
      </Typography>
      <Typography variant="h5" component="div">
        Nickname
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        gender
      </Typography>
      <Typography variant="body2">
       moves
      </Typography>
    </CardContent>

    <CardActions>
    </CardActions>
  </Card>
}