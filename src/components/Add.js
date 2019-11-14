import React from 'react';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';

const Add = props => {
  const { handleAdd } = props;
  return (
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
      <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Minimum 3 rows" />
      <Button variant="contained" color="primary" onClick={e => handleAdd(2)}>
        追加
      </Button>
    </div>
  );
};

export default Add;
