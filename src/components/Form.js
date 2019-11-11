import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Form = props => (
  <form className="siimple-form">
    <div className="siimple-form-field">
      <TextField
        id="standard-full-width"
        label="タイトル"
        style={{ margin: 8 }}
        placeholder="歯磨き"
        helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={console.log(333)}>
        送信
      </Button>
    </div>
  </form>
);

export default Form;
