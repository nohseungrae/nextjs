import Document, {DocumentContext, Html} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import Head from "next/head";
import React from "react";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        <Html lang="ko">
                            <Head>
                                <title>helllll</title>
                                <meta charSet='utf-8'/>
                            </Head>
                            {initialProps.styles}
                            {sheet.getStyleElement()}
                        </Html>
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}