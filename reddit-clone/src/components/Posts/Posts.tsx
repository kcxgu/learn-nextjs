import { Post } from '@/atoms/postAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { query, collection, orderBy, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import usePosts from './usePosts';

const Posts = () => {
    const [user] = useAuthState(auth);
    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts();

    const getPosts = async () => {
        try {
            const postsQuery = query(
                collection(firestore, "posts"),
                orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postsQuery);
            const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPostStateValue(prev => ({
                ...prev,
                posts: posts as Post[]
            }))

        } catch (error: any) {
            console.log("getPosts error", error.message)
        }
    };

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            {postStateValue.posts.map(item => (
                <PostItem
                    key={item.id}
                    post={item}
                    userIsCreator={user?.uid === item.creatorId}
                    userVoteValue={postStateValue.postVotes.find(vote => vote.postId === item.id)?.voteValue}
                    onVote={onVote}
                    onDeletePost={onDeletePost}
                    onSelectPost={onSelectPost}
                />
            ))}
        </div>
    )
}

export default Posts