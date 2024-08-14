import emailjs from "@emailjs/browser";
import { isExpired } from "react-jwt";
import { Navigate } from "react-router-dom";

// Utilisation de variables d'environnement pour les URL et les clés API
const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://studapps.cg.helmo.be:5011/REST_VERD_WABO';
const API_KEY_CURRENT_WEATHER = process.env.REACT_APP_API_KEY_CURRENT_WEATHER || '82f4768ca7650d896603a5eb038218c6';

/**
 * Permet de convertir une date en offsetDateTime
 * @param date la date qu'on souhaite convertir
 * @returns {string} retourne la date en offsetDateTime
 */
function convertToOffsetDateTime(date) {
    return new Date(date).toISOString();
}

/**
 * Cette fonction permet de recuperer le token dans le local storage et de rediriger vers le login si jamais le token a  expiré
 * @returns {JSX.Element|string} soit la redirection si il a expiré soit le token (string)
 */
function getToken() {
    const token = localStorage.getItem('token');
    if (token && isExpired(token)) {
        localStorage.removeItem('token'); // Supprimer le token expiré
        return <Navigate to="/login" replace />;
    }
    return token;
}

// Gestionnaire pour les réponses fetch, afin de centraliser le traitement des erreurs
async function handleFetchResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.message} (Status: ${response.status})`);
    }
    return response.json();
}
/**
 * Classe permettant de gerer les requetes vers l'API Web
 */
class API {

    // Méthode pour l'inscription des utilisateurs
    static async SignUp(signUpFields) {
        const data = {
            email: signUpFields.email,
            nom: signUpFields.name,
            passwd: signUpFields.password,
            prenom: signUpFields.firstname,
        };
        try {
            const response = await fetch(`${BASE_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error during sign-up:', error);
            throw error;
        }
    }

    /**
     * Requete vers l'Api permettant le login
     * @param signinFields  les champs pour accompagner la requête (email, password)
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async SignIn(signinFields) {
        const data = {
            email: signinFields.email,
            passwd: signinFields.password,
        };
        try {
            const response = await fetch(`${BASE_URL}/user/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error during sign-in:', error);
            throw error;
        }
    }

    /**
     * Requete vers l'Api permettant le login avec un provider
     * @param signinFields  les champs pour accompagner la requête (email, family_name, given_name)
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async SignInWithProvider(signinFields) {
        const data = {
            email: signinFields.email,
            nom: signinFields.family_name,
            prenom: signinFields.given_name,
        };
        try {
            const response = await fetch(`${BASE_URL}/user/signinWithProvider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error during sign-in with provider:', error);
            throw error;
        }
    }

    /**
     * Requête permettant d'obtenir le nombre de user inscrit et le nombre de user en vacance pour une date donnée
     * @param formFields  les champs pour accompagner la requête (dateDebut)
     * @returns {Promise<Response | void>}  retourne une promesse avec le résultat de la requête
     */
    static async nbrUser(formFields) {
        try {
            const response = await fetch(`${BASE_URL}/user/byHoliday?dateTime=${convertToOffsetDateTime(formFields.dateDebut)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    /**
     * Requête permet d'envoyer un contact a l'administrateur
     * @param contactState les données pour accompagner la requête (name, email, message, to_email)
     * @returns {Promise<EmailJSResponseStatus>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async SendContact(contactState) {
        const templateParams = {
            from_name: contactState.name,
            from_email: contactState.email,
            to_name: "HolidWeb",
            message: contactState.message,
            to_email: contactState.to_email,
        };
        try {
            return await emailjs.send('service_j0c53oa', 'template_snvzy7p', templateParams, 'u6h54fqSWVWd4Tc1e');
        } catch (error) {
            console.error('Error sending contact email:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet d'ajouter une période de vacance
     * @param fiedls champs de données qui devra accompagner la requête (dateDebut, dateFin, description, nom)
     * @param lieu objet contenant le lieu de la periode de vacance ({codePostal, latitude, longitude, pays, rue, rueNumero, ville,})
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async AddVacance(fields, lieu) {
        const data = {
            dateDebut: convertToOffsetDateTime(fields.dateDebut),
            dateFin: convertToOffsetDateTime(fields.dateFin),
            description: fields.description,
            lieu: lieu,
            nom: fields.nom,
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error adding vacation:', error);
            throw error;
        }
    }

    /**
     *  Requête permetttant d'ajouter un participant a une période de vacance
     * @param email l'email du participant
     * @param idVacance l'id du participant
     * @returns {Promise<Response>}retourne une promesse avec le resultat de la requête
     */
    static async addParticipant(email, idVacance) {
        const data = {
            email: email,
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVacance}/participant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error adding participant:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet d'ajouter un participant a une activité
     * @param email l'email du participant
     * @param idVacance  l'id vacance de l'activité
     * @param idActivite  l'id de l'activité
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     */
    static async addParticipantActivite(email, idVacance, idActivite) {
        const data = {
            email: email,
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVacance}/activite/${idActivite}/participant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error adding participant to activity:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet de recuperer la metéo courante
     * @param latlng objet contenant la latitude et la longitude
     * @returns {Promise<any>} retoune une promesse avec le resultat de la requête
     */
    static async currentWeather(latlng) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng.lat}&lon=${latlng.lon}&cnt=30&units=metric&lang=fr&appid=${API_KEY_CURRENT_WEATHER}`);
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    }

    /**
     *
     * @param fiedls les données pour accompagner la requête (dateDebut, dateFin, description, nom)
     * @param lieu objet contenant le lieu de la periode de vacance ({codePostal, latitude, longitude, pays, rue, rueNumero, ville,})
     * @param idVac l'id vacance
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async AddActivite(fields, lieu, idVac) {
        const data = {
            dateDebut: convertToOffsetDateTime(fields.dateDebut),
            dateFin: convertToOffsetDateTime(fields.dateFin),
            description: fields.description,
            lieu: lieu,
            nom: fields.nom,
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVac}/activite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error adding activity:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet de modifier une activité pour l'oganiser dans son emploi de temps
     * @param dateDebut nouvelle date de debut
     * @param dateFin nouvelle date de fin
     * @param idVacance l'id vacance contenant l'activité
     * @param idActivite l'id de l'activité a modifier
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async ModifActivite(dateDebut, dateFin, idVacance, idActivite) {
        const data = {
            dateDebut: convertToOffsetDateTime(dateDebut),
            dateFin: convertToOffsetDateTime(dateFin),
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVacance}/activite/${idActivite}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error modifying activity:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet d'envoyer un message
     * @param idVacance l'id vacance
     * @param content le contenu du message
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async SendMessage(idVacance, content) {
        const data = {
            content: content,
        };
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVacance}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    /**
     * Requête qui permet d'obtenir les 100 derniers messages
     * @param idVacance l'id vacance concernée
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async getMessage(idVacance) {
        try {
            const response = await fetch(`${BASE_URL}/vacance/${idVacance}/message`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${getToken()}`,
                },
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    static async getDocuments(idVacance) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${idVacance}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${getToken()}`,
                },
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    static async uploadDocument(formData, idVacance) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${idVacance}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: formData,
            });

            // Vérifiez si la réponse est OK (status 200-299)
            if (!response.ok) {
                console.log('Upload successful');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            throw error;
        }
    }

    static async trackDocumentDownload(vacanceId, filename) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${vacanceId}/${filename}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });

            // Gérer la réponse
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            return await response
        } catch (error) {
            console.error('Error tracking document download:', error);
            throw error;
        }
    }

    static async getDocumentsForActivity(vacanceId,activityId) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${vacanceId}/activite/${activityId}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${getToken()}`,
                },
            });
            return await handleFetchResponse(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    static async uploadDocumentForActivity(formData, vacanceId,activityId) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${vacanceId}/activite/${activityId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: formData,
            });

            // Vérifiez si la réponse est OK (status 200-299)
            if (!response.ok) {
                console.log('Upload successful:');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            throw error;
        }
    }

    static async trackDocumentDownloadForActivity(vacanceId, activityId, filename) {
        try {
            const response = await fetch(`${BASE_URL}/document/vacance/${vacanceId}/activite/${activityId}/${filename}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });

            // Gérer la réponse
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            return await response
        } catch (error) {
            console.error('Error tracking document download:', error);
            throw error;
        }
    }

}

export default API;
