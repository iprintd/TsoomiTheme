import './Footer.scss'
import { Link } from '$routes'
import urlGenerator from '$ustoreinternal/services/urlGenerator'
/**
 * This component represents the footer in the store
 */
const Footer = () => {
  return (
    <div className="footer">
      <div className="main">
        <ul className="footer_menu">
        <li className="header">מידע כללי</li>
        <li>
         <Link to={urlGenerator.get({page:"termsconditions"})}><a>תנאי השימוש</a></Link>
        </li>        
        <li>
         <Link to={urlGenerator.get({page:"policy"})}><a>מדיניות הפרטיות</a></Link>
        </li>
        </ul>
        <div id="copy">
        © צומי - המרכז הישראלי לתשומת לב
        </div> 
      </div>
    </div>
  )
}

export default Footer
