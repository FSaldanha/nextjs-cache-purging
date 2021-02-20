import Link from 'next/link'

export default function Page(props) {
  return <div>
    <h3>{props.mode}</h3>
    <h1>{props.name}</h1>
    <p>{props.description}</p>
    <p>&nbsp;</p>
    <p>Render time: {props.data}</p>
    <p><Link href="/"><a>Go to Home</a></Link></p>
    <p>&nbsp;</p>
    <p><strong>TIP:</strong> append <code>?purge=1</code> to a URL of a incrementally (re)generated static page for forcing revalidation.</p>
  </div>
}