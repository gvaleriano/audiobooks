/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import './main.css';
import {useEffect, useState } from 'react';
import { usePlayer } from "../../contexts/PlayerContext";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { api } from "../../services/api";

type Episode = {
  id: string;
  title: string;
  chapter: string;
  thumbnail: string;
  author: string;
  published_at: string;
  duration: number;
  file: {
    duration: string;
  };
  url: string;
}

export default function MainPage() {

  const [books, setBooksData] = useState([]);
  useEffect(() => {
    const fetchData = () => api.get('/chapters').then((response) => {
      const newData = response.data;
      setBooksData(newData);
    })
    fetchData()
    
  }, [])

  const { playList } = usePlayer();

  console.log(books)
  return (
    <div className="homepage">
      <a>
        <title>Home | Podcastr</title>
      </a>
      <section className="latestEpisodes">
        <h2>Últimos lançamentos</h2>

        <ul>
        {books.map((episode:Episode, index:number) => {
            return (
              <li key={episode.id}>
                <img
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                />

                <div className="episodeDetails">
                <a href={`/chapters/${episode.id}`}>
                  {episode.title} - Capítulo: {episode.chapter}
                </a>
                  <p>{episode.author}</p>
                  <span>{format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR })}</span>
                  <span>{convertDurationToTimeString(Number(episode.file.duration))}</span>
                </div>

                <button type="button" onClick={() => playList(books, index)}>
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>

      </section>

      <section className="allEpisodes">
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Livro</th>
              <th>Capitulo</th>
              <th>Autor</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {books.map((episode:Episode, index: number) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <img
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                    />
                  </td>
                  <td>
                      {episode.title}
                  </td>
                  <td><a href={`/chapters/${episode.id}`}>{episode.chapter}</a></td>
                  <td>{episode.author}</td>
                  <td style={{ width: 100 }}>{format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR })}</td>
                  <td>{convertDurationToTimeString(Number(episode.file.duration))}</td>
                  <td>
                    <button type="button" onClick={() => playList(books, index)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}



