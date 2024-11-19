import { API_URL } from '@env';
// const API_URL = 'http://192.168.1.21:3000'

// Hàm để lấy tất cả các bài hát
export const getAllSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Hàm để lấy tất cả các nghệ sĩ
export const getAllArtists = async () => {
  try {
    const response = await fetch(`${API_URL}/artists`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

// Hàm để lấy tất cả các album
export const getAllAlbums = async () => {
  try {
    const response = await fetch(`${API_URL}/albums`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

// Hàm để lấy top 10 bài hát có nhiều lượt thích nhất
export const getTopLikedSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/top-liked-songs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top liked songs:', error);
    throw error;
  }
};

// Hàm để lấy top 10 bài hát có nhiều chia sẻ nhất
export const getTopSharedSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/top-shared-songs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top shared songs:', error);
    throw error;
  }
};

// Hàm để lấy top 10 bài hát có nhiều lượt nghe nhất
export const getTopListenedSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/top-listened-songs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top listened songs:', error);
    throw error;
  }
};

// Hàm để lấy 3 bài hát đầu tiên
export const getFirstThreeSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/first-three-songs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching first three songs:', error);
    throw error;
  }
};

// Hàm để lấy bài hát theo albumId
export const getSongsByAlbum = async (albumId) => {
  try {
    const response = await fetch(`${API_URL}/songs-by-album/${albumId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs by album:', error);
    throw error;
  }
};

// Hàm để lấy nghệ sĩ theo id
export const getArtistById = async (artistId) => {
  try {
    const response = await fetch(`${API_URL}/artist/${artistId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artist by ID:', error);
    throw error;
  }
};

// Hàm để lấy các bài hát theo ID nghệ sĩ
export const getSongsByArtist = async (artistId) => {
  try {
    const response = await fetch(`${API_URL}/songs-by-artist/${artistId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs by artist ID:', error);
    throw error;
  }
};

// Hàm để lấy các album theo ID nghệ sĩ
export const getAlbumsByArtist = async (artistId) => {
  try {
    const response = await fetch(`${API_URL}/albums-by-artist/${artistId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching albums by artist ID:', error);
    throw error;
  }
};