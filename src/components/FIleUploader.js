import React from 'react';
import styled from 'styled-components';
import {inject, observer} from "mobx-react";

const FileUploader = inject('ufStore')(observer(({ufStore}) => {
    return (
        <UploadInput>
            <Label>
                <Input type="file"
                       onChange={e => {
                           e.preventDefault();
                           const file = e.target.files[e.target.files.length-1];
                           ufStore.setFile(file, file.name);
                       }}/>
                <span>Choose file</span>
            </Label>
            <FileName>{ufStore.fileName}</FileName>
        </UploadInput>
    )
}));

export default FileUploader;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: grid;
  cursor: pointer;
  width: 200px;
  height: 40px;
  margin-right: 20px;
  background: #fff;
  border-radius: 5px;
  justify-items: center;
  align-items: center;
  &:hover{
      background: #fff;
  }
  span {
    color: black;
    font-size: 16pt;
    font-family: Tomorrow;
    text-transform: uppercase;
  }  
`;

const UploadInput = styled.div`
  display: grid;
  grid-template-columns: repeat(2,  max-content);
  justify-content: center;
  align-items: center;  
  font-size: 12pt;
  color: black;
`;

const FileName = styled.p`
    font-size: 1.4em;
    color: white;
    font-family: Tomorrow;
`;