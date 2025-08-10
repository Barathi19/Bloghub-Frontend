import { useEffect, useState } from "react";
import type { IBlog } from "../../interface/blog.interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { GetAllBlogs } from "../../services/blog.service";
import Loader from "../../components/loader/Loader";
import "./Blog.css";

function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const fetchBlogData = async () => {
    try {
      const response = await GetAllBlogs();
      setBlogs(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return isLoading ? (
    <div className="auth-loader">
      <Loader />
    </div>
  ) : (
    <div className="blog-main-container">
      {blogs.length > 0 ? (
        <div className="blog-container">
          {blogs.map((data) => (
            <div className="blog-item">
              <div className="blog-header">
                <span>{data.author.charAt(0)}</span>
                <b>{data.author}</b>
              </div>
              <div className="blog-content">
                <h4>{data.title}</h4>
                <p>{data.content}</p>
                <p className="posted-at">
                  Posted at: {new Date(data.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-containe">No Data</div>
      )}
    </div>
  );
}

export default Blog;
