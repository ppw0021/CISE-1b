import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "../components/Article"; // Ensure Article types are defined

const CreateArticleComponent = () => {
  const navigate = useRouter();
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // For date inputs, convert the string to a Date object
    if (name === "published_date") {
      setArticle({ ...article, [name]: new Date(value) });
    } else {
      setArticle({ ...article, [name]: value });
    }
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

    const articleToSubmit = {
      ...article,
      updated_date: new Date(), // Set the updated date to now as a Date object
    };

    try {
      await submitArticle(articleToSubmit);
      setFeedbackMessage('Article created successfully!');
      setArticle(DefaultEmptyArticle); // Reset the form
    } catch (error) {
      setFeedbackMessage('Error creating article: ');
    }
  };

  return (
    <div className="CreateArticle flex justify-center items-center min-h-screen">
      <div className="container max-w-lg p-6 bg-white rounded shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">Add Article</h1>
        {feedbackMessage && <p className="text-center text-red-600">{feedbackMessage}</p>} {/* Feedback message */}
        <form noValidate onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <input
              type="text"
              placeholder="Title of the Article"
              name="title"
              className="form-control w-full"
              value={article.title}
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              className="form-control w-full"
              value={article.isbn}
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              placeholder="Author"
              name="author"
              className="form-control w-full"
              value={article.author}
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              placeholder="Describe this Article"
              name="description"
              className="form-control w-full"
              value={article.description}
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="date"
              name="published_date"
              className="form-control w-full"
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              placeholder="Publisher"
              name="publisher"
              className="form-control w-full"
              value={article.publisher}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
