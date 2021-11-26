import { Button } from "primereact/button";
import { FC, useEffect, useState } from "react";
import Loading from "../components/Loading";
import NewPostDialog from "../components/NewPostDialog";
import PostCard from "../components/PostCard";
import Category from "../interfaces/Category";
import Post from "../interfaces/Post";
import client from "../utils/client";

const Home: FC = () => {
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadPosts = async () => {
    setLoading(true);
    const postsResponse = await client.get<Post[]>("posts");
    const categoriesResponse = await client.get<Category[]>("categories");

    setCategories(categoriesResponse.data);
    setPosts(postsResponse.data);
    setLoading(false);
  };

  const addNewPostButtonHandler = () => {
    setShowNewPostDialog(true);
  };
  const pushNewPostHandler = (post: Post) => {
    setPosts([...posts, post]);
  };
  const hideDialogHandler = () => {
    setShowNewPostDialog(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <Loading />;

  if (!posts.length)
    return (
      <>
        <p className="p-text-center">no post yet...</p>{" "}
      </>
    );

  return (
    <>
      <div>
        <Button
          label="Refresh"
          className="p-ml-3 p-mt-2"
          icon="pi pi-refresh"
          onClick={loadPosts}
        />
        <Button
          label="Add new post"
          className="p-ml-3 p-mt-2"
          icon="pi pi-plus-circle"
          onClick={addNewPostButtonHandler}
        />
      </div>
      <div className="p-grid p-m-0">
        {posts.map((p) => (
          <div className="p-col-12 p-md-6 p-lg-4" key={p._id}>
            <div className="p-p-2">
              <PostCard post={p} categories={categories} />
            </div>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      <NewPostDialog
        categories={categories}
        addNewPost={pushNewPostHandler}
        visible={showNewPostDialog}
        onHide={hideDialogHandler}
      />
    </>
  );
};

export default Home;
