import { Button, Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function AdminProfile() {
  const dispatch = useDispatch();

  const {
    currentUser,
    isLoggedIn,
    error: serverError,
    loading,
  } = useSelector((state) => state.user);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadngProgress, setUploadngProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, image);

  const uploadImage = async () => {
    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime().toString() + image.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadngProgress(progress);
        // console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
        toast.error("Could not upload image");
        -setUploadError("Could not upload image");
        setImage(null);
        setImagePreview(null);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImagePreview(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        toast.error(data.message);
        return dispatch(updateFailure(data.message));
      }

      if (data.success === true) {
        toast.success("Profile updated successfully");
        dispatch(updateSuccess(data.user));
        setFormData({});
      }
    } catch (error) {}
  };

  return (
    <div className="flex gap-5 flex-col p-10 3000">
      <h1 className="self-center text-5xl font-semibold">Profile</h1>

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div
          className="h-32 relative w-32 cursor-pointer "
          onClick={() => filePickerRef.current.click()}
        >
          {uploadngProgress && (
            <CircularProgressbar
              value={uploadngProgress}
              text={`${uploadngProgress}%`}
              strokeWidth={4}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: "#E91E63",
                },
              }}
            />
          )}
          <img
            src={imagePreview || currentUser?.profilePicture}
            alt="Profile picture"
            className={`rounded-full w-full h-full border-8 bordew-blue-gray-900 object-cover ${
              uploadngProgress && uploadngProgress < 100 && "opacity-50"
            }`}
          />
        </div>

        <div className="flex  justify-center  items-center flex-col gap-5 my-5  ">
          <input
            type="file"
            accept="image/*"
            size="lg"
            className="outline-none border-none md:w-[600px] w-[300px] hidden my-auto"
            onChange={handleImage}
            ref={filePickerRef}
          />
        </div>

        <div className="flex w-full justify-center  items-center flex-col gap-5 my-5  ">
          <div className="md:w-[600px] w-[300px] ">
            <Input
              type="text"
              size="lg"
              className="outline-none border-black/30 border-3 dark:bg-gray-500/20"
              placeholder="username"
              id="username"
              defaultValue={currentUser?.username}
              onChange={handleChange}
            />
          </div>

          <div className="md:w-[600px]  w-[300px]">
            <Input
              type="email"
              size="lg"
              className="outline-none border-black/30 border-3 dark:bg-gray-500/20"
              id="email"
              defaultValue={currentUser?.email}
              onChange={handleChange}
            />
          </div>

          <div className="md:w-[600px]  w-[300px]">
            <Input
              type="password"
              size="lg"
              className="outline-none border-black/30 border-3 dark:bg-gray-500/20"
              id="password"
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            color="cyan"
            className="md:w-[600px]  w-[300px]"
            disabled={uploading}
          >
            Update
          </Button>
        </div>
      </form>

      <div className="flex justify-between">
        <span
          className="text-red-500 font-medium text-lg bg-slate-800/30 p-2 rounded-lg"
          onClick={() => {
            showModal(true);
          }}
        >
          Delete Account
        </span>
        <span className="text-red-500 font-medium text-lg bg-slate-800/30 p-2 rounded-lg">
          Sign Out
        </span>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AdminProfile;
