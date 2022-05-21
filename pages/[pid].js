import {useRouter} from 'next/router'
import {useState} from "react";
import {createPost, editPost, partEditPost} from "./utils/utils";
import {useEvent, useStore} from "effector-react";

const DetailPage = () => {
    const router = useRouter()
    const {title, body, pid} = router.query
    const [newTitle, setTitle] = useState(title)
    const [newBody, setBody] = useState(body)

    const pendingPut = useStore(editPost.pending)
    const createPostEvent = useEvent(createPost)
    const createPostHandler = (e) => {
        e.preventDefault();

        if (!newTitle) {
            alert('Please enter Post Title.')
            return false
        }
        if (newBody.length < 5) {
            alert('Put some post')
            return false
        }
        if (pid === 'create') {
            createPostEvent(
                {
                    title: newTitle,
                    body: newBody,
                    userId: 1,
                }
            )
        } else {
            editPostHandler()
        }
    }
    const editPostEvent = useEvent(editPost)
    const editPostHandler = () => {
        editPostEvent({
            id: pid,
            title: newTitle,
            body: newBody,
            userId: 1
        })
    }


    return (
        <>
            <form onSubmit={createPostHandler} method="post">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    maxLength="255"
                    value={newTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="body">Post:</label>
                <input type="text" id="body" name="body" value={newBody} onChange={
                    (e) => setBody(e.target.value)}/>
                <button disabled={pendingPut} type="Save">Save</button>
            </form>
        </>
    )
}

export default DetailPage
