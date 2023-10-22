import {react} from "react"
import "./style.css"
import { Link } from "react-router-dom"
export const SidePainel = () => {

    return (
        <nav className="side-painel">
              <ul>
                <li><Link to="/Chat">Atendimentos</Link></li>
                <li><Link to="/Sector">Setores</Link></li>
                <li>Historico</li>
                <li>Canais de Entrada</li>
                <li>Regras de negócio</li>
              </ul>
        </nav>
    )
}