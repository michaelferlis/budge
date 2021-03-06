import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import venues from './venueReducer'
import venueInfo from './venueInfoReducer';
import selectedVenue from './selectedVenueReducer';
import userWaitlist from './userWaitlistReducer';
import selectedSpot from './selectedSpotReducer';
import sellerConfirmation from './sellerConfirmationReducer';
import customerRating from './customerRatingReducer';
import userComments from './adminReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id, username, most recent location, and distance from selected venue if someone is logged in
  venues, // contains array of participating venues from the database
  venueInfo, //venue info + waitlist for this venue - in array format
  userWaitlist, //store user's waitlist info for one venue -> in object format
  selectedVenue, // venue object that the user selects to view
  selectedSpot, // object of data for the single waitList spot the user is viewing
  sellerConfirmation, //store info one seller confirmation page
  customerRating, //store customer rating for a given customer
  userComments,
});

export default rootReducer;
