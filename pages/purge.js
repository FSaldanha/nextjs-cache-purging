import Link from 'next/link'
import { purgePage } from '../components/apis'

export default function Page(props) {
  return <div>
    <p>{props.status}</p>
    <p>&nbsp;</p>
    <p><Link href="/"><a>Go to Home</a></Link></p>
  </div>
}

export async function getServerSideProps({ query }) {
  const { route } = query;
  const props = await purgePage(route);
  return { props }
}