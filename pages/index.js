import Link from 'next/link'
import { getCurrentDate } from '../components/apis'

export async function getStaticProps() {
  const props = { data: getCurrentDate() };
  return { props };
}

export default function Home(props) {
  return (<>
    <h3><Link href="/ssg"><a>SSG</a></Link></h3>
    <h3><Link href="/ssr"><a>SSR</a></Link></h3>
    <h3><Link href="/isr"><a>ISR <i>(revalidate: 30)</i></a></Link></h3>
    <h3><Link href="/isg/1"><a>ISG <i>(fallback: auto; revalidate: 1)</i></a></Link></h3>
    <p>&nbsp;</p>
    <p>Build time: {props.data}</p>
  </>)
}