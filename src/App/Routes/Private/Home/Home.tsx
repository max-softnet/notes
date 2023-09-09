import {M_Toolbar} from "../../../Components/M_Toolbar/M_Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {defaultNotes, Nota, noteAll} from "../../../services/Nota";
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
import {defaultAutori} from "../../../services/Author";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';


const Home = () => {

  const [valorenota, setValorenota] = useState("");
  const [loading, setLoading] = useState (true);
  const [listanote, setListanote] = useState(defaultNotes);
  const [isopen, setIsopen] = useState(false);
  const [listaautori, setListaautori] = useState(defaultAutori);
  const [valoreautore, setAutore] = useState('');


  useEffect( () => {
     getNotes().then(() => {
       setLoading(false)

     })
  }, [])

  const getNotes= async () => {
    const res = await noteAll();
    setListanote(res)
  }


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Titolo',
      flex:1,
      editable: true,
    },
    {
      field: 'author',
      headerName: 'Autore',
      flex:1,
      editable: true,
    },
    {
      field: 'content',
      headerName: 'Contenuto',
      flex:1,
      editable: true,
    },
    {
      field: 'data_create',
      headerName: 'Data Creazione',
      type:"dateTime",
      sortable: false,
      flex:1,
    },
    {
      field: 'view',
      headerName: 'Visualizza',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (

          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => console.log(params.row.id)}
          >
            Open
          </Button>

      ),
    },
  ];

  const getRows =(notes:Nota[]) => {

   return notes.map((note,index) => ({
      id:index,
      title:note.title,
      author:note.author?.name+' '+note.author?.surname,
      content:note.content,
      data_create:note.date_created
    }))

  }

  const listaRows = getRows(listanote)
  console.log(listaRows)

  const apriDialogo = () => {
    setIsopen(true);
  }

  const salvaNota = (nuovaNota: Nota) => {

    nuovaNota["date_created"] = new Date()
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
      author: listaautori.find(autore => autore?.id === Number(valoreautore) ),
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

      {/*  GRIGLIA */}


        <Box paddingTop={2} sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={listaRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>


      {/*  GRIGLIA FINE */}


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
                id="content"
                name="content"
                label="Contenuto"
                fullWidth
                variant="standard"
                multiline
                maxRows={2}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valoreautore}
                  label="Author"
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