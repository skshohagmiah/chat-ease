"use client";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { User } from "@prisma/client";
import ImageUpload from "./ImageUpload";
import Button from "./Button";
import { RxCross1 } from "react-icons/rx";


interface GroupModalProps{
  user:User,
  onClose:() => void
}

const GroupModal = ({ user, onClose }:GroupModalProps) => {
  const formSchema = z.object({
    text: z.string().min(3, "text should be more than 3"),
    imageUrl: z.string().optional(),
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      imageUrl: "",
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/group", {
        ...values,
        userId: user?.id,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const onComplete = (url: string) => {
    setValue("imageUrl", url);
  };

  return (
    <div className="absolute backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" flex flex-col md:w-[50%] items-center justify-center gap-2 bg-slate-800 overflow-hidden p-4 rounded-md "
      >
        <div className="flex items-center justify-between w-full p-2">
          <label className="text-2xl" htmlFor="text">
            Group Name
          </label>
          <button onClick={(onClose)} className="hover:opacity-50">
            <RxCross1 />
          </button>
        </div>
        <input
          disabled={isSubmitting}
          placeholder="enter group name"
          type="text"
          {...register("text", { required: true })}
          className="p-3 bg-slate-600 rounded-md text-lg md:text-sm w-full focus:outline-none text-slate-200"
        />
        <ImageUpload
          endpoint="textImage"
          oncomplete={onComplete}
          onClose={() => {}}
        />
        <Button
          type="submit"
          disable={isSubmitting}
          icon={<IoSend className="w-8 h-8" />}
          label="Send"
          outline
          fullWidth
        />
      </form>
    </div>
  );
};

export default GroupModal;
