import './footer.scss';

export default function Footer() {
  return (
    <div className="footer">
      <hr className="solid"></hr>

      <p className="footer-text">
        &copy; {new Date().getFullYear()} Graeme Elliott All rights reserved.
      </p>
    </div>
  );
}
