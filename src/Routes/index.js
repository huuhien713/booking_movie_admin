import { lazy } from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Login from '../modules/Login';
import UserProtected from '../components/UserProtected';
import Mainpage from '../modules/Mainpage';
import Loading from '../components/Loading';

const ManagerUser = lazy(() => import('../modules/Mainpage/Home/ManagerUser'));
const ManagerFilm = lazy(() => import('../modules/Mainpage/Home/ManagerFilm'));
const ManagerShowtimes = lazy(() => import('../modules/Mainpage/Home/ManagerShowtimes'))
const AddNew = lazy(() => import('../modules/Mainpage/Home/ManagerFilm/AddNew'));
const ListFilm = lazy(() => import('../modules/Mainpage/Home/ManagerFilm/ListFilm'));
const Showtime = lazy(() => import('../modules/Mainpage/Home/ManagerFilm/Showtime'));

export const router = createBrowserRouter([
    {
        path: '/', element: <Login />
    },
    {   
        path : 'admin', 
        element: 
            <UserProtected>
                <Mainpage />
            </UserProtected>, 
        children : [
            {index : true, element: <Loading />},
            {path: 'users', element: <ManagerUser />},
            {path: 'films', element: <ManagerFilm />, children: [
                {index: true, element: <ListFilm /> },
                {path: 'addnew', element: <AddNew /> },
                {path: 'edit/:idFilm', element: <AddNew /> },
                {path: 'showtime/:idFilm', element: <Showtime /> },
            ]}, 
            {path: 'showtimes', element: <ManagerShowtimes />},
        ]
    },
])
