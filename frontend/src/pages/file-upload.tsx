import { FileUploadContainer } from '@containers/file-upload';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function FileUploadPage() {
  return (
    <Box>
      <Head>
        <title>File Upload</title>
      </Head>
      <FileUploadContainer />
    </Box>
  );
}
