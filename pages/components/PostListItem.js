import {useState} from 'react';
import {useRouter} from "next/router";
import {useEvent, useStore} from "effector-react";
import {deletePost, partEditPost} from "../utils/utils";

const PostListItemItem = ({data}) => {
    const router = useRouter();
    const deletePostEvent = useEvent(deletePost);
    const patchPost = useEvent(partEditPost);
    const pendingPatch = useStore(partEditPost.pending);
    const patchHandler = () => {
        patchPost({
            id: data.id,
            title: value,
        })
    }
    const [value, setValue] = useState(data.title ?? '');

    const deletePostHandler = () => {
        deletePostEvent({
            id: data.id,
        })
    }

    return <li>
        <input
            disabled={pendingPatch}
            type="text"
            id="title"
            name="title"
            required
            maxLength="255"
            value={value}
            onBlur={() => patchHandler()}
            onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => {
            console.log(data);
            router.push({
                pathname: '/[pid]',
                query: {
                    pid: data.id,
                    title: data.title,
                    body: data.body
                }
            })
        }}>Edit
        </button>
        <button onClick={deletePostHandler}>Delete</button>
    </li>
}

export default PostListItemItem
