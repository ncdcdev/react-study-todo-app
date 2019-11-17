import React, { useState } from 'react';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding 20px;
`;

const TextareaAutosizeStyled = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  max-height: 500px;
  padding: 8px;
  resize: vertical;
  margin-bottom: 20px;
`;

const Add = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { handleAdd } = props;

  const reqHandleAdd = () => {
    handleAdd({ title: title, description: description });
    setTitle('');
    setDescription('');
  };

  const isDisabledHandleAdd = () => {
    handleAdd({ title: title, description: description });
    setTitle('');
    setDescription('');
    return false;
  };

  return (
    <Wrapper>
      <TextField
        id="standard-full-width"
        label="タイトル"
        style={{ margin: 8 }}
        placeholder="歯磨き"
        fullWidth
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextareaAutosizeStyled
        rows={3}
        placeholder="毎朝磨きます"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => reqHandleAdd()}
        disabled={title.length === 0 || description.length === 0}
      >
        追加
      </Button>
    </Wrapper>
  );
};

export default Add;
