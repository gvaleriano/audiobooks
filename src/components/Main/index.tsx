import {App} from "../../App";
import { PlayerContextProvider } from "../../contexts/PlayerContext";
import { Header } from "../Header";
import { Player } from "../Player";

export function Main(){
    return(
        <PlayerContextProvider>
            <div className='wrapper'>
                <main>
                    <Header></Header>
                    <App />
                </main>
            <Player/>
            </div>
        </PlayerContextProvider>
    )
}
