import { useEffect, useState } from "react";
import type { IBlog, IBlogForm } from "../../interface/blog.interface";
import { LOCAL_CONSTANT } from "../../constant/app.constant";
import "./Profile.css";
import { GetUserDetail } from "../../services/user.service";
import type { IUser } from "../../interface/auth.interface";
import Modal from "../../components/modal/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { Form, Formik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CreateBlog,
  DeleteBlog,
  UpdateBlog,
} from "../../services/blog.service";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const initialValues: IBlogForm = {
  content: "",
  title: "",
};

function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedId, setSelectedId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchUserBlogs = async () => {
    try {
      const { blogs, ...user } = await GetUserDetail();
      setUser(user);
      setBlogs(blogs);
    } catch (err) {
      console.error("Failed to fetch user blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: IBlog) => {
    const { title, content } = blog;
    setSelectedId(blog._id);
    setFormValues({ title, content });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalclose = () => {
    setIsDeleteModalOpen(false);
    setSelectedId("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormValues(initialValues);
    setSelectedId("");
  };

  const confirmDelete = async () => {
    try {
      await DeleteBlog(selectedId);
      toast.success("Blog deleted successfully");
      fetchUserBlogs();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      handleDeleteModalclose();
    }
  };

  const handleSubmit = async (value: IBlogForm) => {
    try {
      if (selectedId) {
        await UpdateBlog(value, selectedId);
        toast.success("Blog updated successfully");
      } else {
        await CreateBlog(value);
        toast.success("Blog added  successfully");
      }
      fetchUserBlogs();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      handleModalClose();
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_CONSTANT.user);
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchUserBlogs();
  }, []);

  if (!user) return <div className="profile-container">User not found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.email}</p>
      </div>

      <div className="profile-blogs">
        <div className="profile-blogs-header">
          <h3>Your Blogs</h3>
          <button className="add-blog-btn" onClick={() => setIsModalOpen(true)}>
            + Add New Blog
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          <ul className="blog-list">
            {blogs.map((blog) => (
              <li key={blog._id}>
                <h4>
                  {blog.title}{" "}
                  <div>
                    <MdEdit onClick={() => handleEdit(blog)} />
                    <MdDelete
                      className="delete"
                      onClick={() => handleDelete(blog._id)}
                    />
                  </div>
                </h4>
                <p>{blog.content}</p>
                <p className="posted-at">
                  Posted at: {new Date(blog.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't written any blogs yet.</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={`${selectedId ? "Edit" : "Add New"} Blog`}
      >
        <Formik initialValues={formValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form className="blog-form">
              <div className="form-field">
                <label>Title</label>
                <input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Content</label>
                <textarea
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </Modal>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
      />
    </div>
  );
}

export default Profile;
