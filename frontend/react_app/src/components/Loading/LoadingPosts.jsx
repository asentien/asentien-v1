import BaseItem from "../BaseItem/BaseItem";

import "./Loading.css";
import "../../styles/components.css";

const LoadingPosts = () => {
  const loader = (
    <BaseItem isPostItem loader>
      <div id='header'>
        <div id='loadingAnimationPostAvatar' />
        <div id='loadingAnimationPostFullNameUsername'>
          <br />
          <div id='loadingAnimationPostOccupationEducation' />
        </div>
      </div>
    </BaseItem>
  );
  return (
    <>
      {loader}
      {loader}
    </>
  );
};

export default LoadingPosts;
