import Page from '../components/page'
import { getRandomAPI, getCurrentDate } from '../components/apis'

export default Page;

export async function getServerSideProps() {
  const props = await getRandomAPI();
  props.mode = "SSR";
  props.data = getCurrentDate();
  return { props };
}