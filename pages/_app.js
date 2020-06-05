import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app';
import '../src/styles/style.css'
import { wrapper } from '../src/store/store';

class WrappedApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(WrappedApp);
