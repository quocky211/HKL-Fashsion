import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import icon from './icon.png'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import {changeLayout} from "../../redux/layoutSlide";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    backgroundColor:'black',
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
  boxShadow:'1px 1px 1px gray',

      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(./icon_red.png)`,
        backgroundSize:'70%',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'white',
  boxShadow:'-1px 1px 1px gray',

      },
    },
  },
  '& .MuiSwitch-thumb ': {
    backgroundColor: '#39a853',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(./icon_white.png)` ,
      backgroundSize:'70%',
      }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#8796A5' ,
  boxShadow:'1px 1px 1px gray',
    borderRadius: 20 / 2,
  },
}));

export default function MUICustomSwitch() {
  const layout = useSelector((state) => state.layoutState.layout);
  const dispatch=useDispatch();
  const [layoutS,setLayoutS]=useState(layout)
  // Handle change
  const handleChange = (event) => {
    setLayoutS(event.target.checked)
    dispatch(changeLayout(event.target.checked))

  };
  return (
      <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch size='small' sx={{ marginTop:'15px' }} 
        checked={layoutS} 
        defaultValue={layoutS}
        
        onChange={handleChange} />}
      />
    </FormGroup>
  );
}