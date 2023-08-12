import Button from "@mui/material/Button";
import {FC} from "react";
type MioCreateType = {
  label?:string;
  action?:() => void;
}
const MioCreate : FC<MioCreateType>= ({label,action}) => {
  return(

    <Button onClick={action}>{label}</Button>

  )


}

export default MioCreate;