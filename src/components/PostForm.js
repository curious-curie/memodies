import React from 'react';

const PostForm = ({track, artist, album, artwork, onCreate, onChange}) => {

    
    return (
        <div>
            <form autoComplete="off" onSubmit = {onCreate}>
                <input type="image" value ={artwork || ''} alt="artwork"/>

                <img src = {artwork} alt="img"/>
    
                <input type="text" name = "track" value={track || ''}  readOnly/>
                <input type="text" name = "artist" value={artist || ''} readOnly/>
                <input type="text" name = "album" value={album || ''} readOnly/>
                <input type="text" name = "memo" onChange = {onChange} placeholder ="write your memo here"/>
                <button className="add" type = "submit">post!</button>
            </form>
            
        </div>
    );
};

export default PostForm;