/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, key, selectProfileUser } from "../redux/profile";

import useUI from "./useUI";

const useProfileUser = (username) => {
  const dispatch = useDispatch();

  const profileUser = useSelector((s) => selectProfileUser(s, username));

  const { fetched, loading: profileUserLoading } = useUI(
    key.profileUser(username)
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(getUser(username));
    }
  }, [username]);

  return { profileUser, profileUserLoading };
};

export default useProfileUser;
