import {useEvent, useStore} from 'effector-react';
import PostList from "../components/PostList";
import {fetchPosts, url} from "../utils/utils";
import {useRouter} from "next/router";

const App = () => {
    const router = useRouter()
    const createHandler = () => {
        router.push({
            pathname: '/[pid]',
            query: {
                pid: 'create',
            }
        })
    }

    const pending = useStore(fetchPosts.pending)
    const fetchEvent = useEvent(fetchPosts)
    return (
        <div className='p-4 bg-cyan-300 min-h-screen flex flex-col place-items-center'>
            <button type="button" className=" border border-solid rounded mb-2 bg-pink-300 w-40" disabled={pending}
                    onClick={() => fetchEvent(url)}>
                Load posts
            </button>
            <button type="button" className=" border border-solid rounded mb-2 bg-pink-300 w-40" onClick={() => {
                createHandler()
            }}>CreatePost
        </button>
    <PostList/>
</div>
)
}
export default App;
