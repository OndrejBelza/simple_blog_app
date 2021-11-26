import { FC } from "react";
import { Card } from "primereact/card";
import Post from "../interfaces/Post";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/reducers/userReducer";
import { Button } from "primereact/button";
import Category from "../interfaces/Category";
import client from "../utils/client";

interface PostCardProps {
  post: Post;
  categories: Category[];
  removePost: (id: string) => void;
  updatePost: (id: string) => void;
}

const PostCard: FC<PostCardProps> = ({
  post,
  categories,
  removePost,
  updatePost,
}) => {
  const user = useAppSelector(selectUser);

  const deletePost = async () => {
    await client.delete(`posts/${post._id}`);
    removePost(post._id);
  };

  const category = (
    <>{categories.find((c) => c._id === post.categoryId)?.name}</>
  );

  const footer = (
    <>
      {user && (
        <>
          <div>
            <Button
              label="Delete"
              icon="pi pi-times"
              className="p-button-danger"
              onClick={deletePost}
            />
            <Button
              label="Update"
              icon="pi pi-pencil"
              className="p-ml-2"
              onClick={() => updatePost(post._id)}
            />
          </div>
        </>
      )}
    </>
  );
  return (
    <>
      <Card title={post.title} subTitle={category} footer={footer}>
        <p className="p-m-0" style={{ lineHeight: "1.5" }}>
          {post.description}
        </p>
      </Card>
    </>
  );
};

export default PostCard;
