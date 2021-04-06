import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next'

import Layout from '../../components/layout';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    throw new Error('undefined params.id')
  }
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
