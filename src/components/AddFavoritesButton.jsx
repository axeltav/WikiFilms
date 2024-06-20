/* eslint-disable react/prop-types */
export const AddFavoritesButton = ({isFavorite = false, movie = {}}) => {

    let user =JSON.parse(localStorage.getItem('currentUser'));

    const addFavorites = () => {
        let favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
        if (!favoritesList) {
            favoritesList = [];
        }
        if (!favoritesList.find(favorite => favorite.id === movie.id)) {
            favoritesList.push(
            {
                title: movie.title, 
                poster_path: movie.poster_path, 
                ideos: movie.id, 
                vote_average: movie.vote_average,
                vote_count: movie.vote_count, 
                release_date: movie.release_date, 
                user: user.email
            });
            localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
        }
    };

    const removeFavorites = () => {
        let favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
        if (favoritesList) {
            favoritesList = favoritesList.filter(favorite => favorite.id!== movie.id && favorite.user !== user.email);
            localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
        }
    };
  return (
    <>
        {isFavorite ?
        <button className="favoriteButton p-0" onClick={removeFavorites}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
        </button>
        :
        <button className="favoriteButton p-0" onClick={addFavorites}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
        </button>
        }
    </>
  );
}