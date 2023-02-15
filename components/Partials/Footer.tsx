export default function Footer() {
  return (
    <div className="footer-container">
      <hr className="solid"></hr>

      <div className="footer-text">
        &copy; {new Date().getFullYear()} Graeme Elliott
      </div>
    </div>
  );
}
