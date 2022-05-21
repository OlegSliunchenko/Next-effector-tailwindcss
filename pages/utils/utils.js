import {createEffect, createStore} from "effector";

export const fetchPosts = createEffect(url => fetch(url).then(req => req.json()))//get
export const createPost = createEffect(async (data) => {
    const req = await fetch(
        url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
    return req.json()
});
export const editPost = createEffect(async (data) => {
    const req = await fetch(url + `/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: data.id,
            title: data.title,
            body: data.body,
            userId: data.userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return req.json()
})
export const deletePost = createEffect(async (data) => {
    const req = await fetch(url + `/${data.id}`, {
        method: 'DELETE'
    })
    return data.id
})
export const partEditPost = createEffect(async (data) => {
    const req = await fetch(url + `/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title: 'KOZA',
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    return {
        id: data.id,
        title: data.title
    }
})

export const $posts = createStore([])
    .on(fetchPosts.doneData, (state, result) => result)
    .on(createPost.doneData, (state, result) => {
        return [...state, result]
    })
    .on(editPost.doneData, (state, result) => {
        const newState = [...state];
        const ind = newState.findIndex((e) => e.id === result.id);
        console.log(ind)
        if (ind !== -1) {
            newState[ind] = result;
        }
        return newState

    })
    .on(partEditPost.doneData, (state, result) => {
        const newState = [...state];
        const ind = newState.findIndex((e) => e.id === result.id);
        if (ind !== -1) {
            newState[ind] = {...newState[ind], ...result};
        }
        return newState

    })
    .on(deletePost.doneData, (state, result) => {
        return state.filter((data) => data.id !== result)
    })


export const url = 'https://jsonplaceholder.typicode.com/posts'
