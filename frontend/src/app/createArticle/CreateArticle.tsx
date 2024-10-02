import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "../components/Article"; // Ensure Article types are defined
import Link from "next/link";
import '../globals.css';

const CreateArticleComponent = () => {
  const navigate = useRouter();
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track if there's an error
  const [isLoggedIn, setLoggedInStatus] = useState<boolean | null>(true);
  const [isUserAdmin, setAdminStatus] = useState<boolean | null>(false);
  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // For date inputs, keep the value as a string in 'YYYY-MM-DD' format
    setArticle({ ...article, [name]: value });
  };

  const submitArticle = async (articleData: Partial<Article>) => {
    try {
      const response = await fetch('http://localhost:8082/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Article created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct the article data to submit
    const articleToSubmit: Partial<Article> = {
        ...article,
        updated_date: new Date(), // Directly assign Date object
    };

    console.log("Submitting Article:", articleToSubmit); // Log article data
    try {
        await submitArticle(articleToSubmit);
        setFeedbackMessage('Article created successfully!');
        setIsError(false); // Reset error state
        setArticle(DefaultEmptyArticle); // Reset the form
    } catch (error) {
        setFeedbackMessage('Error creating article: ');
        setIsError(true); // Set error state
    }
};

const logOutClicked = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("is_admin");
    setLoggedInStatus(false);
    setAdminStatus(false);
    router.push("/");
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <Link href="/">
          <button aria-label="Home" className="mr-2">
            Home
          </button>
        </Link>
        {!isLoggedIn && (
          <Link href="/login">
            <button aria-label="Login" className="mr-2">
              Login
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <>
            <button aria-label="Logout" className="mr-2" onClick={logOutClicked}>
              Logout
            </button>
            <Link href="/search">
              <button aria-label="Search" className="mr-2">
                Search
              </button>
            </Link>
            <Link href="/createArticle">
              <button aria-label="Submit Article" className="mr-2">
                Submit Article
              </button>
            </Link>
            {isUserAdmin && (
              <Link href="/admin">
                <button aria-label="Admin Panel" className="mr-2">
                  Admin Panel
                </button>
              </Link>
            )}
          </>
        )}
      </nav>
      <div className="CreateArticle flex justify-center items-center min-h-screen">
        <div className="container max-w-lg p-6 bg-white rounded shadow-md">
          <h1 className="text-center text-2xl font-bold mb-6">Add Article</h1>
          {feedbackMessage && (
            <p className={`text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {feedbackMessage}
            </p>
          )}
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Title of the Article"
                name="title"
                className="form-control w-full"
                value={article.title || ''}
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Authors (comma-separated)"
                name="authors"
                className="form-control w-full"
                value={article.authors || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Publisher"
                name="publisher"
                className="form-control w-full"
                value={article.publisher || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="number"
                placeholder="Year of Publication"
                name="year_of_publication"
                className="form-control w-full"
                value={article.year_of_publication || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Volume"
                name="volume"
                className="form-control w-full"
                value={article.volume || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Number"
                name="number"
                className="form-control w-full"
                value={article.number || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="Pages"
                name="pages"
                className="form-control w-full"
                value={article.pages || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="DOI"
                name="doi"
                className="form-control w-full"
                value={article.doi || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="date"
                placeholder="Publication Date"
                name="published_date"
                className="form-control w-full"
                value={article.published_date || ''} // Fallback for undefined
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
