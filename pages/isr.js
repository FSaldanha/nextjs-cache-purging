import Page from '../components/page'
import { getRandomAPI, getCurrentDate } from '../components/apis'

export default Page;

export async function getStaticProps() {
  const props = await getRandomAPI();
  props.mode = "ISR";
  props.data = getCurrentDate();
  return { props, revalidate: 30 };
}