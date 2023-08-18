import {M_Toolbar} from "../../../Components/M_Toolbar/M_Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Button from "@mui/material/Button";
import {defaultNotes, Note} from "../../../services/Note";
import PostIt from "../../../Components/PostIt/PostIt";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {defaultAutori} from "../../../services/Autore";


const Home = () => {

  const [valorenota, setValorenota] = useState("");
  const [listanote, setListanote] = useState(defaultNotes);
  const [isopen, setIsopen] = useState(false);
  const [listaautori, setListaautori] = useState(defaultAutori);
  const [valoreautore, setAutore] = useState('');

  const apriDialogo = () => {
    setIsopen(true);
  }

  const salvaNota = (nuovaNota: Note) => {

    nuovaNota['data_create'] = new Date()
    nuovaNota['id'] = 1

    setListanote([...listanote, nuovaNota])

    setIsopen(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)

    salvaNota({
      title: data.get('name') as string,
      author: valoreautore,
      content: data.get('content') as string
    })

  };

  const handleChange = (event: SelectChangeEvent) => {
    setAutore(event.target.value);
  };

  return (
    <M_Toolbar>
      <Container>
        <Box>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <TextField
                id="TestoNota"
                fullWidth
                label="Nuova nota"
                variant="outlined"
                autoComplete={"Search"}
                value={valorenota}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValorenota(event.target.value);
                }}
              />
              <Button onClick={apriDialogo}>Crea nota</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {listanote.map((nota, index) => (
              <Grid item md={4} xs={12}>
                <PostIt index={index} nota={nota} alertA={() => {
                }}></PostIt>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Dialog open={isopen} onClose={() => {
      }}>
        <DialogTitle>Nuova nota</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box component="form" id="dialogForm" noValidate onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Nome"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="surname"
                name="surname"
                label="Cognome"
                fullWidth
                variant="standard"
              />

              <TextField
                autoFocus
                margin="dense"
                id="content"
                name="content"
                label="Contenuto"
                fullWidth
                variant="standard"
                multiline
                maxRows={2}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Autore</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valoreautore}
                  label="Autore"
                  onChange={handleChange}
                >
                  {listaautori.map((autore, index) => (
                    <MenuItem value={autore.id}>{autore.name + ' ' + autore.surname}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsopen(false)}>Chiudi</Button>
          <Button
            color="primary"
            type="submit"
            form="dialogForm"
          >
            <Box mx={2}>
              Crea
            </Box>
          </Button>
        </DialogActions>
      </Dialog>
    </M_Toolbar>
  )
}

export default Home;