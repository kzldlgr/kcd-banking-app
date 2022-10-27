import { Link } from 'react-router-dom';
import './buttons.css';

export default function buttons({text, path, children}) {

  return (
    <Link className='navbtns' to={path}>
      {text}
      {children}
    </Link>
  )
}
