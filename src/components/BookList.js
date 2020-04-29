import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`;

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ id, name }) => (
    <div>
      <p>
        {id}:{name}
      </p>
    </div>
  ));
}

export default BookList;
