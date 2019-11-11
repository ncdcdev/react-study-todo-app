import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WrappCenter = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  min-height: 448px;
  max-width: 480px;
  border: 1px solid #e5ddcb;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 64px 95px;
  text-align: center;
`;

class Sample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>bbbb</p>;
  }
}

export default Sample;
