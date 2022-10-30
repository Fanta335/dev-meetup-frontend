import { Pagination, PaginationItem } from '@mui/material';
import { FC, memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  count: number;
};

export const SearchRoomResultPagination: FC<Props> = memo(({ count }: Props) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 6;
  const sort = searchParams.get('sort') || 'date';
  const order = searchParams.get('order') || 'a';
  const tagId = searchParams.get('tagId') || '';

  return (
    <Pagination
      page={Math.floor(offset / limit) + 1}
      count={Math.ceil(count / limit)}
      renderItem={(item) => {
        return (
          <PaginationItem
            component={Link}
            to={`?query=${query}&offset=${
              item.page ? (item.page - 1) * limit : 0
            }&limit=${limit}&sort=${sort}&order=${order}&tagId=${tagId}`}
            {...item}
          />
        );
      }}
    />
  );
});

SearchRoomResultPagination.displayName = 'SearchRoomResultPagination';
