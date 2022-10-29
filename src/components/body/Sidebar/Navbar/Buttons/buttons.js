import { Link } from 'react-router-dom';
import './buttons.css';

export default function buttons({text, path, children}) {

  return (
    <Link className='navbtnslink' to={path}>
      <button className='navbtns'>
      {text}
      {children}
      </button>
    </Link>
  )
}
