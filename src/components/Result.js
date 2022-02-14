import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Result = (props) => {
  const {
    v_value,
    v_seq,
    result
  } = props;
  
  return (
      <Body>
        <div>
          {v_value}
        </div>
        <div className="operations-sequence">
          {v_seq}
        </div>
        <div className="calc-result">
          {result}
        </div>
      </Body>
  )
};

Result.propTypes = {
  v_value:PropTypes.string.isRequired,
  v_seq:PropTypes.array.isRequired,
  result:PropTypes.number.isRequired,
};

export default Result;

const Body = styled.div`
  background-color: rgb(188, 199, 159);
  color:black;
  user-select:text;
  overflow: hidden;
  border-radius: 10px;
  padding:2px 8px;
  text-align: right;
  direction: ltr;
  white-space: nowrap;
  box-sizing: border-box;
  width:100%;
  border:15px inset #444;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5em;
  line-height: 1;
  box-sizing:border-box;
  .operations-sequence{
    font-size: 0.6em;
    margin:5px 0;
    direction: ltr;
  }
  .calc-result{
    font-size: 0.8em;
    overflow: hidden;
  }
`;