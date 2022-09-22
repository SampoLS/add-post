import { useState } from "react";
import styled from "styled-components";
import { useGetPostsQuery, useAddPostMutation } from "./api/posts";

import SharedPost from "./components/SharedPost";
import Post from "./components/Post";

interface TPost {
  id: number;
  name: string;
  quotes: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [quotes, setQuotes] = useState("");

  const [addPost] = useAddPostMutation();
  const { data: posts, refetch } = useGetPostsQuery("");

  const onAddPost = async () => {
    await addPost({
      name,
      quotes,
    });
    refetch();
    setName("");
    setQuotes("");
  };

  let renderPost;

  if (posts) {
    renderPost = posts.map((post: TPost, idx: number) => {
      return (
        <Post
          post={post}
          key={post.id}
          idx={idx}
          setName={setName}
          setQuotes={setQuotes}
          refetch={refetch}
        />
      );
    });
  }

  return (
    <Root className="App">
      <section>
        <div className="input name">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input quotes">
          <label htmlFor="quotes">quotes:</label>
          <textarea
            id="quotes"
            value={quotes}
            onChange={(e) => setQuotes(e.target.value)}
          />
        </div>
        <div className="box-button">
          <button className="add-button" onClick={onAddPost}>
            Add Post
          </button>
        </div>
      </section>
      <Wrapper>{renderPost}</Wrapper>
      <Wrapper>
        <SharedPost />
      </Wrapper>
    </Root>
  );
}

const Root = styled.div`
  width: 900px;
  margin: 0 auto;
  .input {
    display: flex;
    width: 300px;
    font-family: roboto;

    label {
      width: 100px;
    }

    input,
    textarea {
      flex: 1;
      outline: none;
      border: 5px solid #eee;
    }

    input {
      height: 30px;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }
  .box-button {
    width: 300px;
    text-align: center;

    .add-button {
      border: none;
      width: 100px;
      height: 45px;
      color: orange;
      font-size: 1rem;
      font-weight: bold;
      background: black;
      border-radius: 3px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Wrapper = styled.section`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
  overflow: hidden;

  .card {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #255c52c2, #021815d1);
    text-align: center;
    color: #eee;
    border-radius: 5px;
    box-shadow: 0 1px 5px #888;
    position: relative;

    p {
      padding: 0 25px;
    }

    .btns {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0;
    }
  }
`;
