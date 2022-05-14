import { useSelector } from "react-redux";

import {
  selectErrors,
  selectFetched,
  selectLoading,
  selectFetchedSecondary,
  selectLoadingSecondary,
} from "../redux/ui";

const useUI = (key, keyNext, initialLoading = true) => {
  const errors = useSelector((s) => selectErrors(s, key));
  const fetched = useSelector((s) => selectFetched(s, key));
  const fetchedSecondary = useSelector((s) => selectFetchedSecondary(s, key));
  const loading = useSelector((s) =>
    selectLoadingSecondary(s, key, initialLoading)
  );
  const loadingSecondary = useSelector((s) =>
    selectLoading(s, key, initialLoading)
  );
  const nextLoading = useSelector((s) => selectLoading(s, keyNext));
  const nextLoadingSecondary = useSelector((s) => selectLoading(s, keyNext));

  return {
    errors,
    fetched,
    loading,
    fetchedSecondary,
    loadingSecondary,
    nextLoading,
    nextLoadingSecondary,
  };
};

export default useUI;
