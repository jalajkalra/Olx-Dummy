import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TempMainPage from './container/mainPage/TempMainPage' ;
import {createStore,applyMiddleware,combineReducers} from 'redux';
import UserReducer from './entities/home/Reducer'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignUp from './container/signUp/SignUp';
import Login from './container/login/login';
import ChatBox from './components/chatApp/chatApp';
import EventLink from './container/createAd/eventLink';
import UidReducer from './entities/home2/Reducer';
import SearchedAd from './components/SearchedAd/SearchedAd';
import CategorySearch from './components/categorySearch/categorySearch';
import AdminChatPage from './container/AdminChatPage/AdminChatPage';

const AppReducer = combineReducers({ user : UserReducer,uid : UidReducer});
const store = createStore(AppReducer,applyMiddleware(thunk))
const app=(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={TempMainPage}/>
                <Route exact path='/signUp' component={SignUp}/> 
                <Route exact path='/login' component={Login}/>
                <Route exact path='/chatapp' component={ChatBox}/>
                <Route exact path='/createAd' component={EventLink}/>
                <Route exact path='/searchAd/:category' component={CategorySearch}/>  
                <Route exact path='/searchAd/:category/:item' component={SearchedAd}/>
                <Route exact path="/adminChat" component={AdminChatPage}/> 
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
