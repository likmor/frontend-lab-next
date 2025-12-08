"use client";

import { useAuth } from "@/app/_lib/AuthContext";
import { db } from "@/app/_lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingBar } from "@/app/_components/Loading";

export default function UserProfile() {
  const [info, setInfo] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: "",
      photoURL: "",
      street: "",
      city: "",
      zipCode: "",
    },
  });
  useEffect(() => {
    async function getData() {
      const snapshot = await getDoc(doc(db, "users", user?.uid));
      try {
        const address = snapshot.data().address;
        setValue("city", address.city);
        setValue("zipCode", address.zipCode);
        setValue("street", address.street);
        setValue("displayName", user?.displayName);
        setValue("photoURL", user?.photoURL);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [user, setValue]);

  async function SaveProfile(data) {
    setError("");
    setInfo("");
    const displayName = data.displayName;
    const photoURL = data.photoURL;
    const street = data.street;
    const city = data.city;
    const zipCode = data.zipCode;

    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      const docRef = await setDoc(doc(db, "users", user?.uid), {
        address: {
          city: city,
          street: street,
          zipCode: zipCode,
        },
      });
      setInfo("Profile saved!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e.message);
    }
  }

  return (
    <div className="flex items-center justify-center bg-base-200 w-full">
      <form onSubmit={handleSubmit(SaveProfile)} className="md:w-xl">
        <fieldset className="fieldset bg-base-100 rounded-box p-6 shadow-xl border border-base-300">
          <legend className="fieldset-legend text-lg">Profile</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            disabled
          />

          <label className="label">Display name</label>
          <input
            {...register("displayName")}
            className="input input-bordered w-full"
            disabled={loading}
          />

          <label className="label">Photo URL</label>
          <input
            {...register("photoURL")}
            className="input input-bordered w-full"
            disabled={loading}
          />

          <label className="label">City</label>
          <input
            {...register("city")}
            className="input input-bordered w-full"
            disabled={loading}
          />

          <label className="label">Street</label>
          <input
            {...register("street")}
            className="input input-bordered w-full"
            disabled={loading}
          />

          <label className="label">Zip code</label>
          <input
            {...register("zipCode")}
            className="input input-bordered w-full"
            disabled={loading}
          />

          <button
            disabled={isSubmitting || loading}
            className="btn btn-accent mt-4 w-full"
          >
            {isSubmitting ? <LoadingBar /> : "Save profile"}
          </button>
        </fieldset>

        {info && (
          <div role="alert" className="alert alert-success mt-4">
            <span>Profile saved</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error shadow-sm mt-4">
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
