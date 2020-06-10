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
        <li className="header">General info</li>
        <li>
         <Link to={urlGenerator.get({page:"termsconditions"})}><a>Terms and Conditions</a></Link>
        </li>        
        <li>
         <Link to={urlGenerator.get({page:"policy"})}><a>Privacy Policy</a></Link>
        </li>
        </ul>
        <div id="copy">
        © 2020 Intel Corporation
        </div>
      </div>
    </div>
  )
}

export default Footer
