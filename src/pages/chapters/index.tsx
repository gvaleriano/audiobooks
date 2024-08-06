import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { api } from "../../services/api";
import './chapter.css'
import { usePlayer } from "../../contexts/PlayerContext";

type Chapter = {
  id: string;
  title: string;
  chapter: string;
  thumbnail: string;
  author: string;
  published_at: string;
  duration: number;
  book: {
    text: string
  }
  file: {
    duration: string;
  },
  url: string;
}

export function ChaptersPage() {
  const [listChapters, setListChapters] = useState<Chapter[]>([])
  const [books, setBooksData] = useState([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter | undefined>()
  const [paragraphs, setParagraphs] = useState<string[] | undefined>([])

  const { playList } = usePlayer();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => api.get('/chapters').then((response) => {
      const newData = response.data;
      setListChapters(newData);
      setBooksData(newData);
    })
    fetchData()
  }, [])
  console.log(listChapters)

  useEffect(() => {
    function selectChapter(chapterId: string | undefined) {
      const chapterSelected = listChapters.find(chapter => chapter.id === chapterId)
      const bookParagraphs = chapterSelected?.book.text.split("\n");
      setParagraphs(bookParagraphs);
      setSelectedChapter(chapterSelected)
      playList(books, Number(chapterSelected?.chapter)-1)
    }
    selectChapter(id)
  }, [id, listChapters])


  return (
    <>
      <div className="container">
        <div className="headerChapter">
          <h1>{selectedChapter?.title}</h1>
          <span>{selectedChapter?.id}</span>
        </div>
        <div className="imageContainer">
          <img className="bannerImg" src={selectedChapter?.thumbnail} alt="" />
        </div>

        <div className="chapterMain">
          {paragraphs?.map( (paragraph, index) => {
            return(
              <p key={index} className="chapterParagraph">
                {paragraph}
              </p>
            )
          })}
          
        </div>
      </div>
    </>
  )
}