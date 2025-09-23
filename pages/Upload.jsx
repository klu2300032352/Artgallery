import React, {useState} from 'react'
import axios from '../services/axios'
export default function Upload(){
  const [title,setTitle]=useState(''); const [artist,setArtist]=useState(''); const [imageUrl,setImageUrl]=useState(''); const [description,setDescription]=useState('');
  const submit = async (e) => {
    e.preventDefault();
    try{
      await axios.post('/api/artworks', { title, artist, imageUrl, description });
      alert('Uploaded');
      setTitle(''); setArtist(''); setImageUrl(''); setDescription('');
    }catch(e){ console.error(e); alert('Error'); }
  }
  return (
    <div style={{fontFamily:'Arial', padding:20}}>
      <h2>Upload Artwork (simple)</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:480}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <input value={artist} onChange={e=>setArtist(e.target.value)} placeholder="Artist" required />
        <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Image URL (or leave)" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
