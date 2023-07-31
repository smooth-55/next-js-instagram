import styled from "styled-components";
import { ProfileHeader } from "../../components";
import { useRouter } from 'next/router'

const StyledSaved = styled.div`
  .info {
    display: block;
    color: #8e8e8e;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin: 30px 0;
  }
  .not-saved {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      margin-top: 45px;
      border: 2px solid #000;
      border-radius: 50%;
      padding: 13px 18px;
      svg {
        margin-top: 5px;
      }
    }
    p {
      margin-top: 15px;
      font-size: 28px;
      font-weight: 300;
      color: #262626;
    }
    span {
      margin-top: 10px;
      color: #262626;
      font-size: 14px;
      max-width: 350px;
    }
  }
`;

const Saved = () => {
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

            <StyledSaved>
                <span className="info">Only you can see what you've saved</span>
                <div className="not-saved">
                    <div>
                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                        </svg>
                    </div>
                    <p>Save</p>
                    <span>
                        Save photos and videos that you want to see again. No one is
                        notified, and only you can see what you've saved.
                    </span>
                </div>
            </StyledSaved>
        </>
    );
};


export default Saved;
