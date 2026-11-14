import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="ABSU Connect home">
      <img
        src="/absu-connect-logo.svg"
        alt="ABSU Connect"
        className="brand-logo"
      />
      <span className="brand-copy">
        <strong>ABSU Connect</strong>
        <small>Excellence, together.</small>
      </span>
    </Link>
  );
}

export default Logo;
