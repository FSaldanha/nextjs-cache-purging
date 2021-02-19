import Page from '../../components/page'
import { getCurrentDate } from '../../components/apis'

export default Page;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const json = await res.json()
  const props = {
    name: json.title,
    description: json.body,
    mode: "ISG (try changing end of URL)",
    data: getCurrentDate()
  }
  return { props };
}