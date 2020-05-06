import React from 'react';
import Dropbox from 'dropbox';
import TextInput from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import s from './style.module.scss';

const DropboxUpload= () => {
    
    const ACCESS_TOKEN = "";//TODO set from configuration

    const uploadFile = () => {
        
        var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
        var fileInput = document.getElementById('file-upload');

        if(!fileInput.files || fileInput.files.length == 0){
            alert("No file selected.");
            return;
        }

        var file = fileInput.files[0];
        dbx.filesUpload({ path: '/' + file.name, contents: file })
            .then(function (response) {
            alert(file.name + " uploaded!");
            console.log(response);
        })
            .catch(function (error) {
            console.error(error);
        });
        return false;
    }

    return (
        <>
        <div className={s.loginContainer}>
                <h1>Upload File</h1>
                <TextInput
                    type="file"
                    id="file-upload"
                    margin="normal"
                />
                <Button  type="button" onClick={() => uploadFile()} variant="contained" color="primary">
                    Upload
                </Button>
            </div>
        </>
    );
  }

  export default DropboxUpload;