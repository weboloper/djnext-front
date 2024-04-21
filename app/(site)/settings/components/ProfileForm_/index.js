"use client";
import React, { useState, useEffect } from "react";
import Avatar from "@/components/layout/Avatar";
import toast from "react-hot-toast";

const ProfileForm = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [bio, setBio] = useState(user.profile.bio);
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.set("bio", bio);
    form.set("avatar", avatar);

    const res = await fetch(`http://127.0.0.1:8000/api/users/me/update/`, {
      method: "PUT",
      body: form,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-start pb-3 border-bottom">
          <Avatar user={user} size={60} />

          <div className="ms-sm-4 ms-2" id="img-section">
            <b>Profile Photo</b>
            <p>Accepted file type .png. Less than 1MB</p>

            <input
              type="file"
              id="avatarInput"
              name="avatar"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>

        <div className="py-2">
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="firstname">Adınız</label>
              <input
                className="form-control"
                id="nameInput"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="lastname">Soyadınız</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-12">
              <label htmlFor="bio">Hakkınızda</label>
              <textarea
                className="form-control"
                name="bio"
                id="bioInput"
                rows="3"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>
          </div>

          <div className="py-3 pb-4 border-bottom">
            <button type="submit" className="btn btn-primary ">
              Kaydet
            </button>
            {/* <LoadingButton
        isLoading={isLoading}
        classes="btn btn-primary "
        text="Değişiklikleri kaydet"
      ></LoadingButton> */}
          </div>
          <div className="d-sm-flex align-items-center pt-3" id="deactivate">
            <div>
              <b>Deactivate your account</b>
              <p>Details about your company account and password</p>
            </div>
            <div className="ms-auto">
              <button className="btn btn-danger">Deactivate</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
