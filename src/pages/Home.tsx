import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FC, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostDialog from "../components/PostDialog";
import PostCard from "../components/PostCard";
import Category from "../interfaces/Category";
import Post from "../interfaces/Post";
import client from "../utils/client";

const Home: FC = () => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [postDialogAction, setPostDialogAction] = useState<"create" | "edit">(
    "create"
  );
  const [postDialogPost, setPostDialogPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    setLoading(true);
    const postsResponse = await client.get<Post[]>("posts");
    const categoriesResponse = await client.get<Category[]>("categories");

    setCategories(categoriesResponse.data);
    setPosts(postsResponse.data);
    setLoading(false);
  };

  const addNewPostButtonHandler = () => {
    setPostDialogAction("create");
    setShowPostDialog(true);
  };

  const updatePostHandler = (post: Post) => {
    setPosts([...posts.filter((p) => p._id !== post._id), post]);
  };

  const editPostButtonHandler = (postId: string) => {
    const post = posts.find((p) => p._id === postId);
    console.log(post);
    setPostDialogPost(post);
    setPostDialogAction("edit");
    setShowPostDialog(true);
  };

  const pushNewPostHandler = (post: Post) => {
    setPosts([...posts, post]);
  };

  const hideDialogHandler = () => {
    setPostDialogPost(undefined);
    setShowPostDialog(false);
  };

  const removePostHandler = (id: string) => {
    setPosts(posts.filter((p) => p._id !== id));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, posts]);

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

        <InputText
          id="search"
          type="text"
          value={search}
          name="search"
          className="p-ml-3"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="p-grid p-m-0">
        {filteredPosts.length ? (
          filteredPosts.map((p) => (
            <div className="p-col-12 p-md-6 p-lg-4" key={p._id}>
              <div className="p-p-2">
                <PostCard
                  post={p}
                  categories={categories}
                  removePost={removePostHandler}
                  updatePost={editPostButtonHandler}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <p className="p-text-center">No post found...</p>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <PostDialog
        categories={categories}
        addNewPost={pushNewPostHandler}
        visible={showPostDialog}
        onHide={hideDialogHandler}
        action={postDialogAction}
        post={postDialogPost}
        editPost={updatePostHandler}
      />
    </>
  );
};

export default Home;
