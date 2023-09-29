import { useState, useRef } from "react";
import notify from "@utils/notify";
import { FaFileAudio } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { uploadFile } from "@utils/storage";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAddEpisodeToPodcastMutation } from "@app/features/podcastApi";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import LoadingModal from "@components/LoadingModal";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
const AddEpisode = () => {
  const { podcastId } = useParams();
  const user = useSelector(selectUser);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [addEpisode, { isLoading }] = useAddEpisodeToPodcastMutation();
  console.log(formSubmitting, isLoading);
  const audioRef = useRef(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  const imageRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleAudioInput(e) {
    console.log("is handleAudioINput method running?");
  }

  function handleAudioChange(e) {
    console.log("is handleAudioChange method running?");
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      setPreviewAudio(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      setPreviewAudio(dataURL);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveButtonClick(e) {
    console.log("is this method running?");
    e.preventDefault();
    // stop the click event from bubbling up to the parent label
    e.stopPropagation();
    audioRef.current.value = "";
    setPreviewAudio(null);
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

  function handleImageRemoveButtonClick(e) {
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
    });
    audioRef.current.src = "";
    setPreviewAudio(null);
    imageRef.current.value = "";
    setPreviewImg(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!previewAudio) {
      notify("Please select an audio file", "❗");
      return;
    }
    if (!previewImg) {
      notify("Please select an image", "❗");
      return;
    }
    try {
      setFormSubmitting(true);
      const audioUrl = await uploadFile(audioRef.current.files[0]);
      const imageUrl = await uploadFile(imageRef.current.files[0]);
      console.log(audioUrl);
      console.log(formData);
      try {
        await addEpisode({
          podcastId: podcastId,
          name: formData.name,
          description: formData.description,
          audio: audioUrl,
          createdBy: user.uid,
          image: imageUrl,
        });
      } catch (err) {
        console.log(err);
      }
      clearForm();
      setFormSubmitting(false);
    } catch (err) {
      console.log(err);
      setFormSubmitting(false);
      notify("Error while uploading audio", "❗");
      clearForm();
      return;
    }
  }

  return (
    <div className="bg-primary px-4 min-h-[calc(100vh-290px)]">
      {formSubmitting &&
        createPortal(
          <LoadingModal message={"few more seconds"} />,
          document.getElementById("portal-root")
        )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[90%] gap-2 mx-auto p-6 max-w-[500px] bg-white rounded-md shadow-md font-primary text-lg text-secondary"
      >
        <div className="flex flex-wrap gap-2">
          <label
            htmlFor="audio"
            className={`h-52 flex items-center justify-center relative before:hidden hover:before:flex bg-greenTint rounded-md cursor-pointer ${
              previewAudio
                ? "before:bg-secondary/75 flex-[1_0_100%] mb-2  h-[56px] self-end rounded-bl-3xl rounded-br-3xl before:absolute before:bg-primaryDark before:text-white before:font-bold before:text-2xl before:items-center before:justify-center before:rounded-md before:h-full before:w-full before:cursor-pointer before:font-primary before:content-['']"
                : "flex-[1_1_45%]"
            } `}
          >
            {previewAudio && (
              <button
                type="button"
                className={`absolute top-0 bottom-0 my-auto right-[-50px] bg-primaryDark/75 rounded-full p-1 m-1 ${"cursor-pointer"}`}
                onClick={handleRemoveButtonClick}
              >
                <RiDeleteBin6Fill className="text-red-500 text-2xl" />
              </button>
            )}
            <input
              className="hidden"
              type="file"
              id="audio"
              name="audio"
              accept="audio/*"
              onChange={handleAudioChange}
              onInput={handleAudioInput}
              ref={audioRef}
            />
            {previewAudio ? (
              <audio
                src={previewAudio}
                controls
                preload="auto"
                className="h-full w-full object-cover object-center rounded-md"
              ></audio>
            ) : (
              <div className="text-9xl">
                <FaFileAudio className="text-9xl" />
              </div>
            )}
          </label>
          <label
            htmlFor="image"
            className={`h-52  flex items-center justify-center relative before:hidden hover:before:flex bg-greenTint rounded-md cursor-pointer ${
              previewImg
                ? "before:bg-secondary/75 flex-[1_0_100%] before:absolute before:bg-primaryDark before:text-white before:font-bold before:text-2xl before:items-center before:justify-center before:rounded-md before:h-full before:w-full before:cursor-pointer before:font-primary before:content-['']"
                : "flex-[1_1_45%]"
            }`}
          >
            {previewImg && (
              <button
                type="button"
                className="absolute top-0 right-0 bg-primaryDark/75 rounded-full p-1 m-1"
                onClick={handleImageRemoveButtonClick}
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
        </div>
        <label htmlFor="name" className="block">
          Episode name
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
          Show notes
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="rounded-lg border-2 border-primaryDark p-2"
        />
        <button
          className="rounded-lg border-2 border-primaryDark p-2"
          type="submit"
        >
          add episode to podcast
        </button>
      </form>
    </div>
  );
};

export default AddEpisode;
