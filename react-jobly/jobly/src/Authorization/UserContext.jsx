
// to prevent prop drilling we'll use context to pass state/ values across the component tree.
import { createContext } from 'react';

const UserContext = createContext();

export default UserContext;
