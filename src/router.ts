import { Express } from 'express';
import { isAuthenticated, isOwner } from './middleware';
import { getAllUsers, deleteUser, updateUser } from './controllers/user';
import { login, register } from './controllers/auth';
import { bookHotel, hotelList } from './controllers/hotel';

export default function registerRoutes(app: Express) {
    app.get('/users', isAuthenticated, getAllUsers);
    app.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    app.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    app.post('/auth/register', register);
    app.post('/auth/login', login);
    app.get('/hotels', isAuthenticated, hotelList);
    app.post('/hotels/book', isAuthenticated, bookHotel);
}