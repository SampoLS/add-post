import { useState } from "react"
import styled from "styled-components"
import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} from "./api/posts"

import SharedPost from "./components/SharedPost"

interface Post {
  id: number;
  name: string;
  quotes: string;
}

interface IsEditing {
  [id: number]: boolean
}

export default function App() {
  const [name, setName] = useState('')
  const [quotes, setQuotes] = useState('')
  const [isEditing, setIsEditing] = useState<IsEditing>({0: false})

  const { data: posts, refetch } = useGetPostsQuery('')
  const [addPost] = useAddPostMutation()
  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const onAddPost = async () => {
    await addPost({
      name,
      quotes,
    })
    refetch()
    setName('')
    setQuotes('')
  }

  const onDeletePost = async (id: number) => {
    await deletePost(id)
    refetch()
  }

  const onEditPost = (id: number, post: Post) => {
    const { name, quotes } = post
    setIsEditing(() => {
      return {
        [id]: true
      }
    })
    setName(name)
    setQuotes(quotes)
  }

  const onUpdatePost = async (post: Post) => {
    const { id } = post
    setIsEditing(() => {
      return {
        [id]: false
      }
    })
    await updatePost({id, name, quotes})
    refetch()
    setName('')
    setQuotes('')
  }

  let renderPost

  if (posts) {
    renderPost = posts.map((post: Post) => {
      const { id, name, quotes } = post
      return (
        <article key={post.id} className="card">
          <h3>{name}</h3>
          <p>{quotes}</p>
          <div className='btns'>
            <Delete onClick={() => onDeletePost(id)}>Delete</Delete>
            {isEditing[id] ? (
              <Update onClick={() => onUpdatePost(post)}>
                Update
              </Update>
            ) : (
              <Edit onClick={() => onEditPost(id, post)}>
                Edit
              </Edit>
            )}
          </div>
        </article>
      )
    })
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
        <div className='box-button'>
          <button className='add-button' onClick={onAddPost}>Add Post</button>
        </div>
      </section>
      <Wrapper>{renderPost}</Wrapper>
      <Wrapper>
        <SharedPost />
      </Wrapper>
    </Root>
  )
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

    input, textarea {
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
`

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
    background: linear-gradient(to top,#255c52c2,#021815d1);
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
      bottom: 0
    }
  }
`

const Delete = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 3px;
  background: black;
  color: red;
  font-weight: bold;
  margin-right: 5px;
  &:hover {
    cursor: pointer
  }
`
const Edit = styled(Delete)`
  color: green;
`
const Update = styled(Edit)``
