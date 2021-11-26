import { FC } from "react";
import { Card } from "primereact/card";
import Post from "../interfaces/Post";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/reducers/userReducer";
import { Button } from "primereact/button";
import Category from "../interfaces/Category";

interface PostCardProps {
  post: Post;
  categories: Category[];
}

const PostCard: FC<PostCardProps> = ({ post, categories }) => {
  const user = useAppSelector(selectUser);

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
