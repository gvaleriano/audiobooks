import { format } from 'date-fns/format';
import { ptBR } from 'date-fns/locale/pt-BR';

import './styles.css'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <header className="headerContainer">
            <a href="/">
                <div className='logo'>
                    <img src="/audiobooks.svg" alt="Audiobooks"></img>
                    <span>AudioBooks</span>
                </div>
            </a>
            <p>Os melhores livros para você ouvir, curtir e sentir.</p>
            <span>{currentDate}</span>
        </header>
    );
}