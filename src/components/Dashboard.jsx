import { useState, useRef } from "react";
import notify from "@utils/notify";
import { BiImageAdd } from "react-icons/bi";
import { uploadFile } from "@utils/storage";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useCreatePodcastMutation } from "@app/features/podcastApi";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import LoadingModal from "@components/LoadingModal";
import { createPortal } from "react-dom";
const Dashboard = () => {
  const user = useSelector(selectUser);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [createPodcast, { isLoading }] = useCreatePodcastMutation();
  console.log(formSubmitting, isLoading);
  const imageRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [formData, setFormData] = useState({
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

  function handleRemoveButtonClick(e) {
    e.preventDefault();
    // stop the click event from bubbling up to the parent label
    e.stopPropagation();
    imageRef.current.value = "";
    setPreviewImg(null);
  }
  function clearForm() {
    setFormData({
      name: "",
      description: "",
      tagLine: "",
      category: "",
    });
    imageRef.current.value = "";
    setPreviewImg(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!previewImg) {
      notify("Please select an image", "❗");
      return;
    }
    try {
      setFormSubmitting(true);
      const imgUrl = await uploadFile(imageRef.current.files[0]);
      console.log(imgUrl);
      console.log(formData);
      try {
        await createPodcast({
          name: formData.name,
          description: formData.description,
          tagLine: formData.tagLine,
          category: formData.category,
          image: imgUrl,
          createdBy: user.uid,
        });
      } catch (err) {
        console.log(err);
      }
      clearForm();
      setFormSubmitting(false);
    } catch (err) {
      console.log(err);
      setFormSubmitting(false);
      notify("Error while uploading image", "❗");
      clearForm();
      return;
    }
  }

  return (
    <div className="bg-primary px-4">
      {formSubmitting &&
        createPortal(<LoadingModal />, document.getElementById("portal-root"))}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[90%] gap-2 mx-auto p-6 max-w-[500px] bg-white rounded-md shadow-md font-primary text-lg text-secondary"
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
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="rounded-lg border-2 border-primaryDark p-2"
        />
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="rounded-lg border-2 border-primaryDark p-2"
        />
        <label htmlFor="tagLine" className="block">
          Tag Line
        </label>
        <input
          type="text"
          id="tagLine"
          name="tagLine"
          value={formData.tagLine}
          onChange={handleInputChange}
          required
          className="rounded-lg border-2 border-primaryDark p-2"
        />
        <label htmlFor="category" className="block">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="rounded-lg border-2 border-primaryDark p-2"
        >
          <option value="">Select a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        <button
          className="rounded-lg border-2 border-primaryDark p-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
