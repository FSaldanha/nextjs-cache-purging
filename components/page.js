import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Page(props) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>
  }

  return <div>
    <h3>{props.mode}</h3>
    <h1>{props.name}</h1>
    <p>{props.description}</p>
    <p>&nbsp;</p>
    <p>Render time: {props.data}</p>
    <p><Link href="/"><a>Go to Home</a></Link></p>
  </div>
}