import { TextField } from '@mui/material';
import React from 'react'

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: Props) => {
  return (
    <TextField name={props.name} label={props.label} type={props.type}  slotProps={{
    inputLabel: { style: { color: "white" } },
    input: { style: { width: "400px", borderRadius: 10, fontSize: 20, color: "white"}}
  }} />
  );
};

export default CustomizedInput