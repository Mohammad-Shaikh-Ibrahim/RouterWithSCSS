import { Link} from "react-router-dom";
import './ErrorPage.scss';

export default function ErrorPage() {
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/students">Back</Link>
        </div>
    );
}