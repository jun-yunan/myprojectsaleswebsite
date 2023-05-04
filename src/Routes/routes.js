// Layouts
import { HeaderOnly } from '~/Layout';

// Pages
import Home from '~/Pages/Home/Home';
import Profile from '~/Pages/Profile/Profile';
import Upload from '~/Pages/Upload/Upload';
import Search from '~/Pages/Search/Search';
import Products from '~/Pages/Products/Products';
import ProductDetails from '~/Pages/ProductDetails/ProductDetails';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/following', component: Following },
    { path: '/products', component: Products },
    { path: '/product-details', component: ProductDetails },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
