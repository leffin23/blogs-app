"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/utils/interfaces";
import { getCategories } from "@/utils/api";
import styles from "./Blogs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const CreateBlog = () => {
  const [hackDetails, setHackDetails] = useState({
    title: "",
    content: "",
    image: null as File | null,
    tags: "",
    category: ""
  })
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHackDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHackDetails((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();  
    e.stopPropagation(); 
    console.log("File dropped", e.dataTransfer.files);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      console.log("Image file detected:", file);
      setHackDetails((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      alert("Please upload an image file (*.jpg, jpeg, png, svg).");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    console.log("Dragging over drop zone...");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", hackDetails.title);
    formData.append("content", hackDetails.content);
    formData.append("category", hackDetails.category);
    if (hackDetails.image) {
      formData.append("image", hackDetails.image);
    }
    if (hackDetails.tags) {
      formData.append("tags", hackDetails.tags);
    }


    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      await response.json();
      router.push("/blogs");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.createPage}>
      <div className={styles.burger}><Image src="/logo2.png" alt="logo" fill/></div>
      <div className={styles.burger_border}></div>
      <h1>Create a new Hack</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <input aria-label="title"
          placeholder="Enter a title"
            type="text"
            id="title"
             name="title"
            value={hackDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.create_content}>
          <textarea
          aria-label="content"
            placeholder="Describe your life hack"
            id="content"
             name="content"
            value={hackDetails.content}
            onChange={handleChange}
            required
          />
        <div>
          <label htmlFor="image"               onDrop={handleDrop}
              onDragOver={handleDragOver}>
            Image
            <div
              className={styles.file}

            >
              <p>
                {hackDetails.image
                  ? hackDetails.image.name
                  : "Upload an image"}
              </p>
              <div>
                <FontAwesomeIcon icon={faUpload} />
              </div>
            </div>
          </label>

          <input
            type="file"
            id="image"
             name="image"
            accept="image/*"

            onChange={handleFileChange}

          />
          <span></span>
        </div>
        </div>
        <div className={styles.create_content}>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
             name="category"
            value={hackDetails.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.create_tags}>
            <label htmlFor="tags">Tags</label>
            <input aria-label="tags"
            placeholder="Enter tags"
            type="text"
            id="tags"
            name="tags"
            value={hackDetails.tags}
            onChange={handleChange}
      
          />
            </div>
          
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
