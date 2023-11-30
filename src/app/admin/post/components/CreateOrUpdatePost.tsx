"use client";
import { FormInputText } from "@/components/form-components/input-text/FormInputText";
import Modal from "@/components/modal/Modal";
import { CreateOrUpdatePostModel } from "@/models/post";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface CreateOrUpdatePostProps {
  show?: boolean;
  handleClose: () => void;
  handleSave: (data: CreateOrUpdatePostModel) => void;
  handleDeletePost: (id: string) => void;
  defaultValues?: CreateOrUpdatePostModel;
}

function CreateOrUpdatePost({
  show,
  handleClose,
  defaultValues,
  handleDeletePost,
  handleSave,
}: CreateOrUpdatePostProps) {
  const { handleSubmit, control, reset } = useForm<CreateOrUpdatePostModel>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit = async (data: CreateOrUpdatePostModel) => {
    console.log(data);
    handleSave(data);
  };

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      footer={
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          {defaultValues && defaultValues._id && (
            <div>
              <button
                onClick={() => handleDeletePost(defaultValues._id || "")}
                type="button"
                className="ml-2 text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Delete
              </button>
             
              <button
                onClick={() => window.location.href = `/admin/post/${defaultValues._id}`}
                type="button"
                className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit content
              </button>
            </div>
          )}
        </div>
      }
    >
      <FormInputText
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        name="title"
        control={control}
        label="Title"
        required={true}
      />
      <FormInputText
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        name="shortContent"
        control={control}
        label="Short content"
      />
      <FormInputText
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        name="metaTitle"
        control={control}
        label="Meta title"
      />
      <FormInputText
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        name="metaKeywords"
        control={control}
        label="Meta keywords"
      />
      <FormInputText
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        name="metaDescription"
        control={control}
        label="Meta description"
      />
    </Modal>
  );
}

export default CreateOrUpdatePost;
