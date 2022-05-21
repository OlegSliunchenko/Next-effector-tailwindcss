import {useRouter} from 'next/router'
import {useState} from "react";
import {createPost, editPost} from "./utils/utils";
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
        <div className={'flex flex-row justify-center bg-red-300 h-screen place-items-center'}>
            <div className={'h-80'}>
                <form onSubmit={createPostHandler} method="post" className={'bg-teal-100 border border-solid rounded'}>
                    <div className={'flex flex-col place-items-center'}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <textarea
                                className={'border border-solid rounded border-blue-300 w-80 max-h-16 h-16 resize-none'}
                                type="text"
                                id="title"
                                name="title"
                                required
                                maxLength="255"
                                value={newTitle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="body">Post:</label>
                            <textarea className={'border border-solid rounded border-blue-300 w-80 max-h-60 h-60 resize-none'}
                                      type="text" id="body"
                                      name="body" value={newBody} onChange={
                                (e) => setBody(e.target.value)}/>
                        </div>
                        <div>
                            <button className={'ml-6 bg-gray-400 border rounded w-36'} disabled={pendingPut}
                                    type="Save">Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DetailPage
