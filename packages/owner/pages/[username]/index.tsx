import React from "react";

import { StyledPosts } from "../explore";
import { Explore, ProfileHeader } from "../../components";
import { useRouter } from 'next/router'

const username = () => {
    const fakePostData = [
        {
            id: 321,
            like: 413,
            comment: 1,
        },
        {
            id: 232,
            like: 65,
            comment: 5,
        },
        {
            id: 123,
            like: 534,
            comment: 3,
        },
        {
            id: 12,
            like: 344,
            comment: 3,
        },
        {
            id: 13,
            like: 244,
            comment: 32,
        },
        {
            id: 11,
            like: 212,
            comment: 34,
        },
    ];

    const router = useRouter()
    const { username } = router.query
    const user_data = {
        username: username,
        full_name: "I am user",
        total_posts: 84,
        followers: 279,
        following: 267,
        bio: "Dont understimet me",
        link: null,
        link_name: null,
        followed_by: [],
        dp: `https://picsum.photos/300/300?random=${username}`
    }

    return (
        <>
            <ProfileHeader
                username={user_data.username}
                full_name={user_data.full_name}
                total_posts={user_data.total_posts}
                followers={user_data.followers}
                following={user_data.following}
                bio={user_data.bio}
                followed_by={user_data.followed_by}
                dp={user_data.dp}
            />
            {fakePostData.length > 0 ? (
                <StyledPosts>
                    {fakePostData.map((post) => (
                        <Explore key={post.id} post={post} />
                    ))}
                </StyledPosts>
            ) : (
                <span className="info-text">Post not found!</span>
            )}
        </>
    );
};

export default username;
