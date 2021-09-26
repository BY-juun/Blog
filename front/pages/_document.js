import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try{
            ctx.renderPage = () => originalRenderPage({
                enhanceApp : (App) => (props) => sheet.collectStyles(<App {...props}/>)
            })
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles : (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        }catch(err){
            console.error(err);
        }finally{
            sheet.seal();
        }
    }
    render() {
        return (
            <Html>
              <Head>
              <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5441996260068044"
     crossorigin="anonymous"></script>
              </Head>
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
          );
    }
}