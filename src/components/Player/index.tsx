import { useContext, useEffect, useRef, useState } from 'react';
import './styles.css'
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);
    const {
            episodeList, 
            currentEpisodeIndex, 
            isPlaying, 
            togglePlay, 
            setPlayingState, 
            playNext, 
            playPrevious,
            hasNext,
            hasPrevious,
            toggleLoop,
            isLooping,
            toggleShuffle,
            clearPlayerState
        } = useContext(PlayerContext);

    useEffect(() => {
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying]) 

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', ()=> {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        if(hasNext){
            playNext();
        }else{
            clearPlayerState();
        }
    }
    const episode = episodeList[currentEpisodeIndex]
    return(
        <div className="playerContainer">
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora {episode?.title}</strong>
                <span>Capitulo {episode?.chapter}</span>
            </header>
            {
                episode ? (
                    <div className="currentEpisode">
                       <img src={episode.thumbnail} alt={episode.title}/>
                    </div>
                ) : (
                <div className="emptyPlayer">
                    <strong>Selecione um capítulo para ouvir</strong>
                </div>
                )
            }
            

            <footer className="empty">
                <div className="progress">
                <span>{convertDurationToTimeString(progress)}</span>
                    <div className="slider">
                        { episode? (
                            <Slider
                                max={episode.file.duration}
                                value={progress}
                                onChange={handleSeek} 
                                trackStyle={{ backgroundColor : '#c94848'}}
                                railStyle={{backgroundColor: 'yellow'}}
                                handleStyle={{borderColor: '#c94848', borderWidth: 4}}    
                            />
                        ) : (<div className="emptySlider" />)}
                        
                    </div>
                    <span>{convertDurationToTimeString(episode?.file.duration ?? 0)}</span>
                </div>

                {episode && (
                    <>
                    <audio
                        src={"/books/mazze-runner/correr-ou-morrer/"+episode.chapter+".mp3"}
                        ref={audioRef}
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        autoPlay
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisodeEnded}
                    />
                    </>
                )}
                <div className="buttons">
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffle}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className="playButton" disabled={!episode} onClick={togglePlay}>
                        {isPlaying ? <img src="pause.svg" alt="Tocar" /> : <img src="/play.svg" alt="Tocar" />}
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type="button" disabled={!episode} onClick={toggleLoop}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}