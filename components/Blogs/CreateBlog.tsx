"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/utils/interfaces";
import { getCategories } from "@/utils/api";
import styles from "./Blogs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";

const CreateBlog = () => {
  const [hackDetails, setHackDetails] = useState({
    title: "",
    content: "",
    image: null as File | null,
    imageUrl: "",
    tags: "",
    category: "",
  });

  const { edgestore } = useEdgeStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imgLoading, setImgLoading] = useState(false)
  const [abortController, setAbortController] = useState<AbortController>();
  
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setHackDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHackDetails((prevState) => ({
        ...prevState,
        image: file,
      }));
      uploadImg(file);
      
    }
  };

  const uploadImg = async (file: File) => {
    let uploadedImageUrl = "";
    setImgLoading(true)
    const abortController = new AbortController();
    setAbortController(abortController);
    try{
      const res = await edgestore.publicFiles.upload({
        file: file,
        signal: abortController.signal,
        onProgressChange: (progress) => {
          setProgress(progress);
          console.log("Upload progress:", progress);
        },
      });
      uploadedImageUrl = res.url; 
    }
  catch (error) {
      console.log("Failed to upload ", error)
  } finally{
    setImgLoading(false)
  }    
  console.log("uploadedImageUrl");
  setHackDetails((prevState) => ({
    ...prevState,
    imageUrl: uploadedImageUrl,
  }));
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
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
      uploadImg(file);
    } else {
      alert("Please upload an image file (*.jpg, jpeg, png, svg).");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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
      formData.append("imageUrl", hackDetails.imageUrl);
    }
    if (hackDetails.tags) {
      formData.append("tags", hackDetails.tags);
    }

    try {
      // let uploadedImageUrl = "";

      // if (hackDetails.image) {
      //   const res = await edgestore.publicFiles.upload({
      //     file: hackDetails.image,
      //     onProgressChange: (progress) => {
      //       setProgress(progress);
      //       console.log("Upload progress:", progress);
      //     },
      //   });
      //   uploadedImageUrl = res.url; // Get the uploaded image URL
      // }
      // formData.append("imageUrl", uploadedImageUrl);
      // console.log("uploadedImageUrl");
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

  const removeImage = async () => {
    try{
      await edgestore.publicFiles.delete({
        url: hackDetails.imageUrl,
      });
  
      setHackDetails((prev) =>({
        ...prev, 
        image:null, 
        imageUrl:""
      }))
    }catch(error){
      console.log("Failed to delete image: ", error)
    }

  }
  return (
    <div className={styles.createPage}>
      {/* {loading ? (
        <div className={styles.progress}>
          <p>Loading {progress}%</p>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress_running}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ) : ( */}
        <div>
          <div className={styles.burger}>
            <Image src="/logo2.png" alt="logo" fill />
          </div>
          <div className={styles.burger_border}></div>
          <h1>Create a new Hack</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                aria-label="title"
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
              <div>
              <textarea
                aria-label="content"
                placeholder="Describe your life hack"
                id="content"
                name="content"
                value={hackDetails.content}
                onChange={handleChange}
                required
              /></div>
                        {hackDetails.image ? (
                        <div className={styles.img_loaded}>
                          <div className={styles.circle}
                           style={{
                            background: `conic-gradient(
                             #ffb23e ${progress}%, 
                              #e6e6e6 ${progress}%
                            )`,
                            display: `${hackDetails.imageUrl 
                            ? "none"
                            : "block"}`
                          }}
                          ></div>
                        
                          <div className={styles.remove_img} onClick={() => {
                              if (hackDetails.imageUrl) {
                                removeImage(); 
                              } else {
                                abortController?.abort();
                                setHackDetails((prev) => ({ ...prev, image: null }));
                              }
                            }}
                            >x</div>
                        <Image  src={
                          hackDetails.imageUrl 
                            ? hackDetails.imageUrl
                            : URL.createObjectURL(hackDetails.image) 
                        } style={{
                         opacity: `${hackDetails.imageUrl 
                            ? "100%"
                            : "50%"}`,
                          filter:  `${hackDetails.imageUrl 
                            ? "grayscale(0) blur(0)"
                            : "grayscale(60%) blur(1.5px"}`
                        }}
                         width={100} height={100} alt="Uploaded image" /></div>
                      ): (
              <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <label htmlFor="image">
                  Image
                  <div className={styles.file}>

                    <p> Upload an image </p>
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
              </div>)}
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
                    <input
                      aria-label="tags"
                      placeholder="Can add tags here!"
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
      {/* )} */}
    </div>
  );
};

export default CreateBlog;
