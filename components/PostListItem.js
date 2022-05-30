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
    const editHandler = () => {
        router.push({
            pathname: '/[pid]',
            query: {
                pid: data.id,
                title: data.title,
                body: data.body
            }
        })
    }

    return <li className={"flex space-x-4 place-content-center"}>
        <input
            className={"basis-2/3 border border-solid rounded bg-teal-100"}
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
        <div className={"basis-1/12 flex flex-row justify-between ..."}>
            <button onClick={() => {
                editHandler()
            }} className={'bg-pink-300  rounded'} >Edit
            </button>
            <button onClick={deletePostHandler} className={'bg-gray-300  rounded'}>Delete</button>
        </div>
    </li>
}

export default PostListItemItem
