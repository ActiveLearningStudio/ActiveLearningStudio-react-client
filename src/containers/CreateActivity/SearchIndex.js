import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';

import ResourceCard from 'components/ResourceCard';
import { reorderPlaylistsAction, loadProjectPlaylistsAction } from 'store/actions/playlist';
import SearchActivity from './SearchActivity';

function SearchIndex(props) {
  const { match } = props;
  const playlistBuilder = useSelector((state) => state.playlist.selectedPlaylist);
  const origPlaylist = useSelector((state) => state.playlist.playlists);
  const searchBuilder = useSelector((state) => state.search);
  const [playlist, setPlaylist] = useState();
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  useEffect(() => {
    setPlaylist(playlistBuilder);
  }, [playlistBuilder]);

  useEffect(() => {
    dispatch(loadProjectPlaylistsAction(match.params.projectId));
  }, []);

  useEffect(() => {
    setSearch(searchBuilder.searchResult);
    Swal.close();
  }, [searchBuilder.searchResult]);

  const onDragEnd = (result) => {
    // dropped outside the list
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'droppable2') {
        const items = reorder(
          playlist.activities,
          source.index,
          destination.index,
        );
        const updatedOrder = origPlaylist.map((play) => {
          if (String(play.id) === match.params.playlistId) {
            return { ...play, activities: items };
          }
          return play;
        });
        dispatch(reorderPlaylistsAction(match.params.projectId, origPlaylist, updatedOrder));
        setPlaylist({ ...playlist, activities: items });
      // eslint-disable-next-line
      } }
    else if (source.droppableId === 'droppable') {
      const resultHorizantal = move(
        search,
        playlist.activities,
        source,
        destination,
      );
      const updatedOrder = origPlaylist.map((play) => {
        if (String(play.id) === match.params.playlistId) {
          return { ...play, activities: resultHorizantal.droppable2 };
        }
        return play;
      });
      dispatch(reorderPlaylistsAction(match.params.projectId, origPlaylist, updatedOrder));
      setPlaylist({ ...playlist, activities: resultHorizantal.droppable2 });
      // setSearch(resultHorizantal.droppable);
    }
  };
  return (
    <div className="search-wizard">
      <h2>Search For Activity</h2>
      <div className="formik-form">
        <SearchActivity />
      </div>
      <div className="drag-activity-search">
        <div className="active-playlist">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" className="search-class">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                >
                  {searchBuilder.searchQuery ? (
                    <>
                      <h2>
                        Your Search Result for
                        {' '}
                        {searchBuilder.searchQuery}
                      </h2>
                      <p>Drag & drop activity to build your playlist.</p>
                    </>
                  ) : <p>Search Activity from above to use Existing.</p>}
                  {!!search.length > 0
                    ? search.map((res, index) => (
                      <Draggable
                        key={res.id}
                        draggableId={String(res.id)}
                        index={index}
                      >
                        {(provided_) => (
                          <div
                            ref={provided_.innerRef}
                            {...provided_.draggableProps}
                            {...provided_.dragHandleProps}
                          >
                            <div className="box">
                              <div className="imgbox">
                                {res.thumb_url ? (
                                  <div
                                    style={{
                                      backgroundImage: res.thumb_url.includes('pexels.com')
                                        ? `url(${res.thumb_url})`
                                        : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      // eslint-disable-next-line max-len
                                      backgroundImage: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                    }}
                                  />
                                )}
                              </div>
                              <div className="content">
                                <div className="search-content">
                                  <a
                                    href={
                                      res.model === 'Activity'
                                        ? `/activity/${res.id}/shared`
                                        : res.model === 'Playlist'
                                          ? `/playlist/${res.id}/preview/lti`
                                          : `/project/${res.id}/shared`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <h2>{res.title || res.name}</h2>
                                  </a>
                                  <ul>
                                    {res.user && (
                                      <li>
                                        by
                                        {' '}
                                        <span className="author">
                                          {res.user.first_name}
                                        </span>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )) : <h2>{!!searchBuilder.searchQuery && <> No result found!</>}</h2>}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2" className="playlist-class">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                >
                  <div className="playlist-host">
                    <h6>{!!playlist && playlist.title}</h6>
                    {!!playlist && playlist.activities.map((resource, index) => (
                      <ResourceCard
                        resource={resource}
                        key={resource.id}
                        index={index}
                        playlist={playlist}
                        wizard
                      />
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

SearchIndex.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(SearchIndex);
