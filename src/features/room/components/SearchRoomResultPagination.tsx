import { Pagination, PaginationItem } from "@mui/material";
import { VFC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Props = {
  count: number;
};

export const SearchRoomResultPagination: VFC<Props> = ({ count }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const offset = Number(queryParams.get("offset")) || 0;
  const limit = Number(queryParams.get("limit")) || 6;
  const sort = queryParams.get("sort") || "date";
  const order = queryParams.get("order") || "a";

  return (
    <>
      <Pagination
        page={Math.floor(offset / limit) + 1}
        count={Math.floor(count / limit) + 1}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`?query=${query}&offset=${item.page ? (item.page - 1) * limit : 0}&limit=${limit}&sort=${sort}&order=${order}`}
            {...item}
          />
        )}
      />
    </>
  );
};
