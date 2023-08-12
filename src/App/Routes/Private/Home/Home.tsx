import {M_Toolbar} from "../../../Components/M_Toolbar/M_Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Button from "@mui/material/Button";
import {defaultNotes, Note} from "../../../services/Note";
import PostIt from "../../../Components/PostIt/PostIt";


const Home = () => {

  const [valorenota, setValorenota] = useState("");
  const [listanote, setListanote] = useState(defaultNotes);


  const salvaNota = () => {

    const newNote: Note = {
      title: "Nuovo titolo",
      author: "Massimo",
      content: valorenota,
      data_create: new Date()
    }

    setListanote([...listanote, newNote])
  }

  const AlertIndex=(index:number) => {
/*    var a = prompt("Please enter your name", index.toString());
    const newListNote = listanote.map((note, i)=>{
      if(index === i){
        note.title = note?.title + a
      }
    })
    setListanote([...newListNote])*/
  }


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

              <Button onClick={salvaNota}>Salva nota</Button>

            </Grid>

          </Grid>

          <Grid container spacing={2}>
            {listanote.map((nota, index) => (
              <Grid item md={4} xs={12}>
                <PostIt index={index} nota={nota} alertA={()=>AlertIndex(index)}></PostIt>
              </Grid>
            ))}
          </Grid>


        </Box>
      </Container>

    </M_Toolbar>


  )


}

export default Home;