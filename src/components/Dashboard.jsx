import { useState, useRef } from "react";
import notify from "@utils/notify";
import { BiImageAdd } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
const Dashboard = () => {
  const imageRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    tagLine: "",
    category: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPreviewImg(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      setPreviewImg(dataURL);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!previewImg) {
      notify("Please select an image", "❗");
      return;
    }
    console.log(formData);
  }

  function handleRemoveButtonClick(e) {
    e.preventDefault();
    // stop the click event from bubbling up to the parent label
    e.stopPropagation();
    imageRef.current.value = "";
    setPreviewImg(null);
  }

  return (
    <div className="bg-primary">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[90%] gap-2 mx-auto p-6 max-w-[500px] bg-white rounded-md shadow-md"
      >
        <label
          htmlFor="image"
          className={`h-52 w-52 flex items-center justify-center relative before:hidden hover:before:flex bg-greenTint rounded-md cursor-pointer ${
            previewImg &&
            "before:bg-secondary/75 before:absolute before:bg-primaryDark before:text-white before:font-bold before:text-2xl before:items-center before:justify-center before:rounded-md before:h-full before:w-full before:cursor-pointer before:font-primary before:content-['']"
          } `}
        >
          {previewImg && (
            <button
              type="button"
              className="absolute top-0 right-0 bg-primaryDark/75 rounded-full p-1 m-1"
              onClick={handleRemoveButtonClick}
            >
              <RiDeleteBin6Fill className="text-white text-2xl" />
            </button>
          )}
          <input
            className="hidden"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageRef}
          />
          {previewImg ? (
            <img
              src={previewImg}
              alt="Preview"
              className="h-full w-full object-cover object-center rounded-md"
            />
          ) : (
            <BiImageAdd className="text-9xl" />
          )}
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="tagLine">
          Tag Line
          <input
            type="text"
            id="tagLine"
            name="tagLine"
            value={formData.tagLine}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="category">
          Category
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
