'use client'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = [
      'application/zip',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      console.log("Uploaded file:", file);
    } else {
      setSelectedFile(null);
      alert("Invalid file type. Please select a zip, excel, or csv file.");
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    const allowedTypes = [
      'application/zip',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      console.log("Uploaded file:", file);
    } else {
      setSelectedFile(null);
      alert("Invalid file type. Please drop a zip, excel, or csv file.");
    }
  };

  const handleClick = () => {
    console.log("ddddddddddddddddddddd",fileInputRef);
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
          onUploadProgress: (progressEvent) => {
            console.log("ssss", progressEvent.loaded, progressEvent.total)
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            console.log(`Upload Progress: ${progress}%`);
            setUploadProgress(progress <= 100 ? progress : 100);
          },
        });

        if (response.status === 201) {
          console.log("File uploaded successfully!");
          alert("File uploaded successfully!");
        } else {
          console.error("Failed to upload file");
          alert("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error.message);
        alert("Error uploading file");
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleDownload = () => {
    if (selectedFile) {
      router.push(`/grid`)
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <div className={`file-upload-container items-center border-r-2 w-60 py-10  p-4 border-dashed border-4 border-gray-400 ${isDragging ? 'border-blue-500' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        // ref={fileInputRef}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          // style={{ display: 'none' }}
        />
        <p className='text-center'>{selectedFile ? `${selectedFile.name}` : "Drop File Here"}</p>
      </div>
      <div className='flex flex-row justify-center items-center'>
      <button className="file-upload-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-6 rounded mt-4" onClick={handleClick}>Choose File</button>
      <button className="file-upload-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleUpload}>Submit</button>
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-container mt-4">
          <progress value={uploadProgress} max="100" className="upload-progress"></progress>
          <span className="progress-text">{uploadProgress}%</span>
        </div>
      )}
      <div className='Node mt-4'>
        <label htmlFor="rememberMe">Node Login</label>
        <input
          type="checkbox"
          id="Node"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="ml-2"
        />
      </div>
      <button className="file-upload-button items-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleDownload}>Prepare Command</button>
    </div>
  );
};

export default FileUpload;
