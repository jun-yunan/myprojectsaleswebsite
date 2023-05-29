import { useState } from 'react';
import { searchService } from '~/services';

function Search() {
    const [result, setResult] = useState({});
    const data = {
        username: 'admin',
    };
    const handleClick = () => {
        const fetchApi = async () => {
            const response = await searchService.result(data);
            setResult(response);
            return response;
        };
        fetchApi();
    };
    console.log(result);
    return (
        <div>
            <h2>Search</h2>
            <button
                style={{ backgroundColor: '#444', color: '#fff', padding: '15px', fontSize: '18px' }}
                onClick={handleClick}
            >
                Get Result
            </button>
        </div>
    );
}

export default Search;
