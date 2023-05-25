import logo from '../resources/unplug.png'

export default function NoPage(props: {message?: string}) {
    let msg = props.message ?? "Something went wrong"; 

    return <div>
        <img src={logo} />
        <h2>{msg}</h2>
    </div> 
}