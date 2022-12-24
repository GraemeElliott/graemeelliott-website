import './404-page.scss';
import { Link } from 'react-router-dom';

export default function NotFound404() {
  return (
    <div className="error-page-container">
      <div className="text-container">
        <h1 className="page-title"> 404 </h1>
        <h2 className="page-subtitle">Page does not exist</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back.
        </p>
        <button className="go-back-button">
          <Link to={'..'}>Go back</Link>
        </button>
      </div>
      <img
        className="error-image"
        src={require('../../assets/image-404.jpg')}
        alt="car"
      />
    </div>
  );
}
