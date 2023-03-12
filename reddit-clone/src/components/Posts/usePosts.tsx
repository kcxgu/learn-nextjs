import { Post, postState, PostVote } from "@/atoms/postAtom"
import { auth, firestore } from "@/firebase/clientApp";
import { doc, deleteDoc, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil"

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const [user] = useAuthState(auth);
    const onVote = async (post: Post, vote: number) => {
        //Check for user, if no user, open auth modal

        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id)

            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            const updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            if (user && !existingVote) {
                //Add or subtract 1 to or from post.voteStatus
                const newVote: PostVote = {
                    id: user?.uid + Math.floor(Math.random()),
                    postId: post.id,
                    voteValue: vote,
                }

                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];

            } else {
                //Removing Vote (up to neutral or down to neutral)
                if (existingVote!.voteValue === vote) {
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter(
                        (vote) => vote.id !== existingVote!.id
                    );
                    voteChange += -1;
                } else {
                    //Flipping Vote (up to down or down to up)
                    updatedPost.voteStatus = voteStatus + 2 * vote;
                    const voteIdx = postStateValue.postVotes.findIndex(
                        (vote) => vote.id === existingVote!.id
                    );
                    if (voteIdx !== -1) {
                        updatedPostVotes[voteIdx] = {
                            ...existingVote!,
                            voteValue: vote,
                        };
                    }
                    voteChange = 2 * vote;

                    const postRef = doc(firestore, "posts", post.id!);
                    batch.update(postRef, { voteStatus: voteStatus + voteChange })
                    await batch.commit();

                    const postIdx = postStateValue.posts.findIndex(item => item.id === post.id)
                    updatedPosts[postIdx] = updatedPost;
                    setPostStateValue(prev => ({
                        ...prev,
                        posts: updatedPosts,
                        postVotes: updatedPostVotes,
                    }))
                }
            }
        } catch (error) {
            console.log("onVote Error", error)
        }

    }

    const onSelectPost = () => {

    }

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            const postDocRef = doc(firestore, "posts", post.id!);
            await deleteDoc(postDocRef);

            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id)
            }))

            return true;
        } catch (error) {
            return false;
        }
    }

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    }
}

export default usePosts