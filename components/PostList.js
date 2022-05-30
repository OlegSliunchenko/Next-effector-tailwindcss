import PostListItem from "./PostListItem";
import {useStore} from "effector-react";
import {$posts} from "../utils/utils";

const PostList = () => {
    const posts = useStore($posts)

    if (!posts.length) {
        return <div>Empty list</div>
    }
    return (
        <div className={'w-sreen'}>
            <ul role="list" className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500 w-screen">
                {
                    posts.map((item) => <PostListItem key={item.id.toString()} data={item}/>)
                }
            </ul>
        </div>
    );
}
export default PostList
