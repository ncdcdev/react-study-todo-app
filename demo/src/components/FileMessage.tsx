import React from 'react';
import styled from 'styled-components';
import Icon from '@@/storyBook/src/atoms/Icon';

const Link = styled.a`
  display: block;
  position: relative;
  padding-left: 42px !important;
  padding-right: 30px !important;
  word-break: break-all;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const FileIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  width: 23px;
  height: 30px;
  transform: translateY(-50%);
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

export const FileMessage = ({ fileName, onBaloonClick }) => {
  return (
    <Link onClick={onBaloonClick}>
      <FileIcon>
        <Icon variant="file" deviceType="PC" />
      </FileIcon>
      {fileName}
      <Arrow>
        <Icon variant="arrow" deviceType="PC" />
      </Arrow>
    </Link>
  );
};

export default FileMessage;
