import PostListItem from "./PostListItem";
import {useStore} from "effector-react";
import {$posts} from "../utils/utils";

const PostList = () => {
    const posts = useStore($posts)

    if (!posts.length) {
        return <div>Empty list</div>
    }
    return (
        <ul>
            {
                posts.map((item) => <PostListItem key={item.id.toString()} data={item}/>)
            }
        </ul>
    );
}
export default PostList
