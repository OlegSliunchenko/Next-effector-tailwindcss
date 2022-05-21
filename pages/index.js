import {useEvent, useStore} from 'effector-react';
import PostList from "./components/PostList";
import {$posts, fetchPosts, url} from "./utils/utils";
import {useRouter} from "next/router";

const App = () => {
    const router = useRouter()

    const pending = useStore(fetchPosts.pending)
    const fetchEvent = useEvent(fetchPosts)
    return (
        <div>
            <button disabled={pending} onClick={() => fetchEvent(url)}>
                load posts
            </button>
            <button onClick={() => {
                router.push({
                    pathname: '/[pid]',
                    query: {
                        pid: 'create',
                    }
                })
            }}>CreatePost
            </button>
            <PostList />
        </div>
    )
}
export default App;
