import React, { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import readingTime from 'reading-time';
import './styles.css';
import { darkTheme } from '../src/theme';
import { AppContextWrapper } from '../src/context/use-app-context';
import Header from '../src/components/header';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CMCMarketsApp({ Component, pageProps }: AppProps) {
  const [snackbar, setSnackbar] = useState<any>({
    autoHideDuration: 0,
    message: '',
    open: false,
    severity: 'info',
  });

  const openSnackbar = (
    message,
    autoHideDuration = 2,
    severity = 'info'
  ) => {
    setSnackbar({
      autoHideDuration: readingTime(message).time * autoHideDuration,
      message,
      open: true,
      severity,
    });
  };

  const closeSnackbar = (clearMessage = false) => {
    setSnackbar({
      message: clearMessage ? '' : snackbar.message,
      open: false,
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const modifiedPageProps = { ...pageProps, openSnackbar };

  return (
    <>
      <Head>
        <title>Welcome to CMC Markets Technical Test!</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Snackbar
          autoHideDuration={snackbar.autoHideDuration}
          open={snackbar.open}
          onClose={() => closeSnackbar()}
          action={action}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <AppContextWrapper>
          <Header showMessage={openSnackbar}/>
          <Component {...modifiedPageProps} />
        </AppContextWrapper>
      </ThemeProvider>
    </>
  );
}

export default CMCMarketsApp;
