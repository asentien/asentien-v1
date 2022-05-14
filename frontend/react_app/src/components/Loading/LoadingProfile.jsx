import BaseContainer from "../BaseContainer/BaseContainer";
import "./Loading.css";

const LoadingProfile = () => {
  return (
    <>
      <BaseContainer isProfile isProfileLoader>
        <div alt='Cover' id='profileCoverImageLoading' />
        <div id='profileAvatarWrapperLoading'>
          <div alt='Avatar' id='profileAvatarImageLoading' />
        </div>
      </BaseContainer>
    </>
  );
};

export default LoadingProfile;
