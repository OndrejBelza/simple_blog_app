import { FC, useState } from "react";
import Category from "../interfaces/Category";
import Post from "../interfaces/Post";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import client from "../utils/client";

interface NewPostDialogProps {
  categories: Category[];
  addNewPost: (post: Post) => void;
  onHide: () => void;
  visible: boolean;
}
interface FormData {
  title: string;
  description: string;
  categoryId: string;
}
const NewPostDialog: FC<NewPostDialogProps> = ({
  categories,
  visible,
  addNewPost,
  onHide,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    categoryId: "",
  });
  const addPostHandler = async () => {
    console.log("cat", formData.categoryId);

    const response = await client.post<Post>("posts", {
      ...formData,
    });
    addNewPost(response.data);
    onHide();
    setFormData({
      title: "",
      description: "",
      categoryId: "",
    });
  };

  const options = categories.map((c) => ({ name: c.name, code: c._id }));
  const footer = (
    <>
      <Button
        label="Close"
        onClick={() => onHide()}
        className="p-button-danger"
      />
      <Button
        label="Add post"
        className="p-button-success"
        onClick={addPostHandler}
      />
    </>
  );
  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        footer={footer}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="title">Title</label>
            <InputText
              id="title"
              type="text"
              value={formData.title}
              name="title"
              placeholder="enter a title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="categoryId">Category</label>
            <Dropdown
              id="categoryId"
              value={formData.categoryId}
              options={options}
              optionLabel="name"
              optionValue="code"
              name="categoryId"
              placeholder="Select a category"
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              rows={4}
              value={formData.description}
              name="description"
              placeholder="Please enter description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewPostDialog;
