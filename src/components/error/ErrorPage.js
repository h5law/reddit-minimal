import './ErrorPage.css';

const ErrorPage = ({ resource }) => {
  return (
    <div className="error-wrapper">
      <h2>Error fetching {resource} not found</h2>
    </div>
  );
};

export default ErrorPage;
