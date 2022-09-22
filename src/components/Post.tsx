import { useState, memo } from 'react';
import styled from "styled-components";
import {
  useDeletePostMutation,
  useUpdatePostMutation
} from "../api/posts"

function Post(props: any) {
  const { post, setName, setQuotes, refetch } = props;
  const { id, name, quotes } = post;

  const [isEditing, setIsEditing] = useState(false);

  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const onDeletePost = async (id: number) => {
    await deletePost(id)
    refetch()
  }
  const onEditPost = (post: any) => {
    const { name, quotes } = post
    setIsEditing(true)
    setName(name)
    setQuotes(quotes)
  }
  const onUpdatePost = async (post: any) => {
    const { id } = post
    const input = document.getElementById('quotes') as HTMLInputElement
    const nameInput = document.getElementById('name') as HTMLInputElement
    const quotes = input.value
    const name = nameInput.value

    setIsEditing(false)
    await updatePost({id, name, quotes})
    refetch()
    setName('')
    setQuotes('')
  }

  return (
    <article className="card">
      <h3>{name}</h3>
      <p>{quotes}</p>
      <div className='btns'>
        <Delete onClick={() => onDeletePost(id)}>Delete</Delete>
        {isEditing ? (
          <Update onClick={() => onUpdatePost(post)}>
            Update
          </Update>
        ) : (
          <Edit className="edit-btn" onClick={() => onEditPost(post)}>
            Edit
          </Edit>
        )}
      </div>
    </article>
  )
}

export default memo(Post);

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
const Update = styled(Delete)`
  color: orange;
`
