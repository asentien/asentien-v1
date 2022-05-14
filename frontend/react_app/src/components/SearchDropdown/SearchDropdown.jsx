import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { key, selectSearch, selectSearchString } from "../../redux/search";
import useUI from "../../hooks/useUI";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import LoadingUserList from "../Loading/LoadingUserList";
import Dropdown from "../Dropdown/Dropdown";
import UserList from "../UserList/UserList";

const SearchDropdown = ({ onClose, displayNone }) => {
  const ref = useRef();
  const search = useSelector(selectSearch);
  const searchString = useSelector(selectSearchString);

  const { loading } = useUI(key?.search);

  const renderSearch = () => {
    let rendered;
    if (loading && !search?.results?.length) {
      rendered = (
        <div id='dropdownText'>
          Search <strong>first name</strong>, <strong>last name,</strong>
          <br /> and, <strong>username</strong>.
        </div>
      );
    } else if (loading) {
      rendered = <LoadingUserList isDropdown={true} />;
    } else if (search?.results?.length) {
      rendered = (
        <UserList
          isDropdown={true}
          isSearch={true}
          isMinified={false}
          list={search?.results}
        />
      );
    } else if (!loading) {
      rendered = (
        <div id='dropdownText'>
          <div>
            No results found for "<strong>{searchString}</strong>
            ".
          </div>
        </div>
      );
    }
    return rendered;
  };

  useOnClickOutside(ref, onClose);

  return (
    <>
      <Dropdown
        search
        searchDisplayNone={displayNone}
        linkTitle={"Search"}
        onClose={onClose}
        render={renderSearch()}
      />
    </>
  );
};

export default SearchDropdown;
