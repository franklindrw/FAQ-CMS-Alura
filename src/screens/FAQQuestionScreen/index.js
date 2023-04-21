import Head from 'next/head';
import { Footer } from '../../components/commons/Footer';
import { Menu } from '../../components/commons/Menu';
import { Box, Text, theme } from '../../theme/components';
import cmsService from '../../infra/cms/cmsService';
import { StructuredText } from 'react-datocms';

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const contentQuery = `
    query {
      contentFaqQuestion {
        title
        content {
          value
        }
      }
    } 
  `;

  const { data } = await cmsService({
    query: contentQuery,
  });

  return {
    props: {
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    }
  }
}

export default function FAQQuestionScreen(props) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            gap: theme.space.x4,
            flexDirection: 'column',
            width: '100%',
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: 'auto',
          }}
        >
          <Text tag="h1" variant="heading1">
            {props.title}
          </Text>

          <StructuredText data={props.content} />
        </Box>
      </Box>

      <Footer />
    </>
  )
}
