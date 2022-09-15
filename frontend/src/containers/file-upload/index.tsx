import Layout from '@components/layouts/layout.component';
import Strip from '@components/strips/strip.component';
import { useWarnBeforeClosing } from '@hooks/warn-before-closing';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { BaseSyntheticEvent } from 'react';

export default function FileUploadContainer() {
  useWarnBeforeClosing({ isClosable: false });

  return (
    <Layout pt={40} pb={60}>
      <Strip>
        <Box flex="col" alignItems="center" justifyContent="center" py={32}>
          <Typography>File upload</Typography>
          <form
            onSubmit={(event: BaseSyntheticEvent) => {
              event.preventDefault();
              const file = event.target.file?.files[0];

              if (!file) {
                alert('Please select a file');
                return;
              }

              const formData = new FormData();
              formData.append('file', file);

              axios
                .post('/api/file-upload-s3', formData)
                .then(() => {
                  alert('Uploaded');
                })
                .catch((error) => {
                  alert(error);
                });
            }}
          >
            <input id="file" type="file" required />
            <Button type="submit">Upload</Button>
          </form>
        </Box>
      </Strip>
    </Layout>
  );
}
