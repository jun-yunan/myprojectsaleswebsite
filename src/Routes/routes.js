// Layouts
import { HeaderOnly } from '~/Layout';

// Pages
import Home from '~/Pages/Home/Home';
import Profile from '~/Pages/Profile/Profile';
import Upload from '~/Pages/Upload/Upload';
import Search from '~/Pages/Search/Search';
import Products from '~/Pages/Products/Products';
import ProductDetails from '~/Pages/ProductDetails/ProductDetails';
import UserAuthentication from '~/Pages/UserAuthentication/UserAuthentication';
import Ex from '~/components/Ex/Ex';
import Cart from '~/Pages/Cart/Cart';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/following', component: Following },

    { path: '/products', component: Products },
    { path: '/product-details', component: ProductDetails },
    { path: '/authentication', component: UserAuthentication },
    { path: '/cart', component: Cart },
    { path: '/ex', component: Ex },
    { path: '/profile', component: Profile },
    { path: '/profile/users', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    // { path: '/users', component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
