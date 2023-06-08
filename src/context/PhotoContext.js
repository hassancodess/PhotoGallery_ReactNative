import React, {
  useState,
  createContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import {getAllEventsOfPhoto, getPeopleInPhoto} from '../database/helpers';

export const PhotoContext = createContext(null);

export const PhotoContextProvider = ({children}) => {
  const [albumName, setAlbumName] = useState();
  const [photo, setPhoto] = useState();
  const [photoType, setPhotoType] = useState();
  const [photoName, setPhotoName] = useState();
  const [people, setPeople] = useState([]);
  const [events, setEvents] = useState([]);
  const [person, setPerson] = useState({});
  const [isPersonTextDisabled, setIsPersonTextDisabled] = useState(true);
  const [contacts, setContacts] = useState();

  useEffect(() => {
    if (photo) {
      // SET Photo Type & Name
      const name = photo.path.split('/').pop().split('.')[0];
      const type = photo.title.split('.').pop();
      console.log('name', name, 'type', type);
      setPhotoName(name);
      setPhotoType(type);
      // RESET Person States
      resetPersonStates();
      // SET Photo People & Events
      fetchPeopleAndEvents();
    }
  }, [photo]);

  const fetchPeopleAndEvents = async () => {
    const eventsList = await getAllEventsOfPhoto(photo.id);
    const personsList = await getPeopleInPhoto(photo.id);

    console.log('People List from Context', personsList);
    console.log('Events List from Context', eventsList);

    setPeople(personsList);
    setEvents(eventsList);
  };

  const resetPersonStates = async () => {
    setPerson({});
    setIsPersonTextDisabled(true);
  };
  const setPersonStates = async person => {
    setIsPersonTextDisabled(false);
    setPerson({id: person.id, name: person.name});
  };

  const values = {
    photo,
    albumName,
    person,
    isPersonTextDisabled,
    photoName,
    photoType,
    people,
    events,
    setPhoto,
    setAlbumName,
    setPerson,
    setIsPersonTextDisabled,
    setPeople,
    setEvents,
    resetPersonStates,
    fetchPeopleAndEvents,
    setPersonStates,
  };
  return (
    <PhotoContext.Provider value={values}>{children}</PhotoContext.Provider>
  );
};
export default PhotoContext;
