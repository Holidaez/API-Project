import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotGetter from "./components/GetAllSpots";
import SpotInput from "./components/CreateASpot";
import SpotUpdater from "./components/UpdateASpot";
import CurrentSpotDetails from "./components/SpotDetails";
import DeleteASpot from "./components/DeleteASpot";
import LeaveAReview from "./components/LeaveAReview";
import DeleteAReview from "./components/DeleteAReview";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SpotGetter />
          </Route>
          <Route path='/spot/new'>
            <SpotInput />
          </Route>
          <Route path='/currentSpot/:spotId'>
            <CurrentSpotDetails />
          </Route>
          <Route path='/update/:spotId'>
            <SpotUpdater />
          </Route>
          <Route path='/delete/:spotId'>
            <DeleteASpot />
          </Route>
          <Route path='/create/review/:spotId'>
            <LeaveAReview />
          </Route>
          <Route path='/review/delete/:spotId/:reviewId'>
            <DeleteAReview/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
