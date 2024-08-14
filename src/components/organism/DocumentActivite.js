import React, { useState, useEffect } from 'react';
import API from '../../services/API';

export default function DocumentActivite({ item , activity }) {
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les documents depuis l'API
    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const response = await API.getDocumentsForActivity(item.id, activity.id);
            setDocuments(response || []);
        } catch (err) {
            console.error('Error fetching documents:', err);
            setError('Erreur lors de la récupération des documents');
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour gérer la sélection de fichier
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Fonction pour ajouter un document via l'API
    const handleUploadClick = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                setLoading(true);
                await API.uploadDocumentForActivity(formData, item.id,activity.id);
                setSelectedFile(null);
                // Recharger les documents
                fetchDocuments();
            } catch (err) {
                console.error('Error uploading document:', err);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Veuillez sélectionner un fichier à télécharger');
        }
    };

    // Fonction pour gérer le téléchargement d'un document
    const handleDownload = async (filename) => {
        try {
            const response =  await API.trackDocumentDownloadForActivity(item.id,activity.id,filename); // Appel API pour enregistrer le téléchargement
             // Télécharger le document
            // Extraire le blob du fichier
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            // Créer un lien temporaire pour déclencher le téléchargement
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Libérer l'URL de l'objet pour éviter les fuites de mémoire
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error('Error tracking document download:', err);
            setError('Erreur lors du téléchargement du document');
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [item]);

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Liste des Documents</h1>
            {loading && <p className="text-blue-500">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="list-none mb-4">
                {documents.map(doc => (
                    <li
                        key={doc}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                        <p className="flex-1 truncate">{doc}</p>
                        <button
                            onClick={() => handleDownload(doc)}
                            className="text-blue-500 hover:text-blue-700 ml-4"
                        >
                            <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/downloading-updates.png" alt="downloading-updates"/>
                        </button>
                    </li>
                ))}
            </ul>

            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
            />
            <button
                onClick={() => document.getElementById('file-input').click()}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
                Sélectionner un Document
            </button>
            <button
                onClick={handleUploadClick}
                className="ml-2 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
            >
                Ajouter Document
            </button>
        </div>
    );
}
