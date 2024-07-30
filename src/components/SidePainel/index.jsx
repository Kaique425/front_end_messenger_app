import {react} from "react"
import "./style.css"
import { Link } from "react-router-dom"
export const SidePainel = () => {

    return (
        <nav className="side-painel">
              <ul>
                <li><Link to="/chat">Atendimentos</Link></li>
                <li><Link to="/sector">Setores</Link></li>
                <li><Link to="/channels">Canais WhatsApp</Link></li>
                <li><Link to="/templates">Templates</Link></li>
                <li>Historico</li>
                <li>Regras de negócio</li>
              </ul>
        </nav>
    )
}