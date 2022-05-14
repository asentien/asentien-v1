import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { access, refresh } from "../../services/baseServicesHandler";
import { baseRoutes, loginRoutes, signupRoutes } from "../../routes";
import BaseItem from "../BaseItem/BaseItem";
import AuthenticationRoute from "../AuthenticationRoute/AuthenticationRoute";

const Home = lazy(() => import("../../pages/Home/Home"));
const Public = lazy(() => import("../../pages/Public/Public"));
const MostLikedPosts = lazy(() =>
  import("../../pages/MostLikedPosts/MostLikedPosts")
);
const Hashtag = lazy(() => import("../../pages/Hashtag/Hashtag"));
const Hashtags = lazy(() => import("../../pages/Hashtags/Hashtags"));
const UserPosts = lazy(() => import("../../pages/UserPosts/UserPosts"));
const PostDetail = lazy(() => import("../../pages/PostDetail/PostDetail"));
const Page404 = lazy(() => import("../../pages/Page404/Page404"));
const Search = lazy(() => import("../../pages/Search/Search"));
const Notifications = lazy(() =>
  import("../../pages/Notifications/Notifications")
);
const Settings = lazy(() => import("../../pages/Settings/Settings"));
const InfoPages = lazy(() => import("../../pages/InfoPages/InfoPages"));

const SignupForm = lazy(() =>
  import("../../components/Unauthenticated/SignupForm/SignupForm")
);
const LoginForm = lazy(() =>
  import("../../components/Unauthenticated/LoginForm/LoginForm")
);

const Routes = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Suspense fallback={<BaseItem base children={<>Loading...</>} />}>
        
        <Switch>
          <Route
            render={() => (
              <>{user || access || refresh ? <Home /> : <Public />}</>
            )}
            exact
            path={baseRoutes?.index}
          />
          <AuthenticationRoute component={Home} exact path={baseRoutes?.home} />
          <Route component={Public} exact path={baseRoutes?.public} />
          <Route
            component={MostLikedPosts}
            exact
            path={baseRoutes?.mostLikedPosts}
          />
          <AuthenticationRoute
            component={Hashtag}
            exact
            path={baseRoutes?.hashtags}
          />
          <AuthenticationRoute
            component={Hashtags}
            exact
            path={baseRoutes?.hashtagsAll}
          />
          <Route
            component={PostDetail}
            exact
            path={[
              baseRoutes?.postDetail(":postId"),
              baseRoutes?.postLikes(":postId"),
              baseRoutes?.postComments(":postId"),
              baseRoutes?.postShares(":postId"),
            ]}
          />
          <Route component={SignupForm} exact path={signupRoutes} />
          <Route component={LoginForm} exact path={loginRoutes} />

          <AuthenticationRoute
            component={Search}
            exact
            path={[baseRoutes?.users, baseRoutes?.popularUsers]}
          />
          <AuthenticationRoute
            component={Notifications}
            exact
            path={baseRoutes?.notifications}
          />
          <AuthenticationRoute
            component={Settings}
            exact
            path={baseRoutes?.settings}
          />
          <Route
            component={InfoPages}
            exact
            path={[
              baseRoutes?.faq,
              baseRoutes?.terms,
              baseRoutes?.privacy,
              baseRoutes?.privacyAndTerms,
            ]}
          />
          <Route
            component={UserPosts}
            exact
            path={baseRoutes?.userPosts(":username")}
          />
          <Route path={"*"} component={Page404} />
        </Switch>
      </Suspense>
    </>
  );
};

export default Routes;
