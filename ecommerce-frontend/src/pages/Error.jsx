import { Header } from "../components/Header"
import './Error.css';

export function Error({ cart }){
    return(
        <>
            <title>Page not Found</title>
            <link rel="icon" href="/home-favicon.png" />
            <Header cart={cart} />

            <div className="not-found">
                page not found
            </div>
        </>
    )
}