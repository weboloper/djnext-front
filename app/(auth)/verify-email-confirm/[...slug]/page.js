"use client";
import React, { useEffect } from "react";
import { verify_email_confirm, set_error } from "@/store/auth/authActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VerifyEmailConfirm = ({ params: { slug } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const uidb64 = slug[0];
  const token = slug[1];

  useEffect(() => {
    async function verify_email() {
      // You can await here
      const data = await dispatch(verify_email_confirm(uidb64, token));
      if (data?.message) {
        toast.success("E-posta doğrulama başarılı. Yönlendiriliyorsunuz.");
        router.push("/");
      }
      if (data?.detail) {
        toast.error(data?.detail);
        router.push("/");
      }
    }
    verify_email();
  }, [dispatch, router, uidb64, token]);

  return <></>;
};

export default VerifyEmailConfirm;
