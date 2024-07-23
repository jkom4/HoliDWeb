import emailjs from "@emailjs/browser";
import {isExpired} from "react-jwt";
import {Navigate, Outlet} from "react-router-dom";



//const apiUrl = "https://studapps.cg.helmo.be:5011/REST_VERD_WABO"
const API_keyCurrentWeather = '82f4768ca7650d896603a5eb038218c6'

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
function storedToken() {
    const token = localStorage.getItem('token')
    if( isExpired(token)){
       return <Navigate to="/login" replace />
    }

    return  token;
}

/**
 * Classe permettant de gerer les requetes vers l'API Web
 */
class API {


    /**
     * Requete vers l'Api permettant le l'inscription
     * @param signUpFields  les champs pour accompagner la requête (email, name, password, firstname)
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static  SignUp(signUpFields) {
        const datalogin = {
            "email": signUpFields.email,
            "nom": signUpFields.name,
            "passwd": signUpFields.password,
            "prenom": signUpFields.firstname
        }
        console.log(datalogin)
        return  fetch(`/user/signup`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datalogin)
            }).then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.message}! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data => data)
            .catch(error => { throw error})

    }

    /**
     * Requete vers l'Api permettant le login
     * @param signinFields  les champs pour accompagner la requête (email, password)
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static SignIn(signinFields) {
        const datalogin = {
            "email": signinFields.email,
            "passwd": signinFields.password
        }
        console.log(datalogin)
        return fetch(`/user/signin`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    datalogin)
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during sign-in:', e);
                throw e; // Propagate the error for further handling
            })

    }

    /**
     * Requete vers l'Api permettant le login avec un provider
     * @param signinFields  les champs pour accompagner la requête (email, family_name, given_name)
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static SignInWithProvider(signinFields) {
        const dataFetch = {
            "email": signinFields.email,
            "nom": signinFields.family_name,
            "prenom": signinFields.given_name
        }
        console.log(dataFetch)
        return fetch(`/user/signinWithProvider`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    dataFetch)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })

            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during sign-in Google:', e);
                throw e; // Propagate the error for further handling
            })

    }

    /**
     * Requête permettant d'obtenir le nombre de user inscrit et le nombre de user en vacance pour une date donnée
     * @param formFields  les champs pour accompagner la requête (dateDebut)
     * @returns {Promise<Response | void>}  retourne une promesse avec le résultat de la requête
     */
    static nbrUser(formFields) {

        return fetch(`/user/nbrUserAndNbrUserInHolidayForADate?dateTime=${convertToOffsetDateTime(formFields.dateDebut)}`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data => data)
            .catch(error => console.log(error))

    }


    /**
     * Requête permet d'envoyer un contact a l'administrateur
     * @param contactState les données pour accompagner la requête (name, email, message, to_email)
     * @returns {Promise<EmailJSResponseStatus>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static SendContact(contactState) {
        //Ajouter les parametres au templates
        const templateParams = {
            from_name: contactState.name,
            from_email: contactState.email,
            to_name: "HolidWeb",
            message: contactState.message,
            to_email : contactState.to_email
        }
        return emailjs.send('service_j0c53oa', 'template_snvzy7p', templateParams, 'u6h54fqSWVWd4Tc1e');

    }


    /**
     * Requête qui permet d'ajouter une période de vacance
     * @param fiedls champs de données qui devra accompagner la requête (dateDebut, dateFin, description, nom)
     * @param lieu objet contenant le lieu de la periode de vacance ({codePostal, latitude, longitude, pays, rue, rueNumero, ville,})
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static AddVacance(fiedls,lieu) {


        const datafiels = {
            "dateDebut": convertToOffsetDateTime(fiedls.dateDebut),
            "dateFin": convertToOffsetDateTime(fiedls.dateFin),
            "description": fiedls.description,
            "lieu": lieu,
            "nom": fiedls.nom,
        }
        return fetch(`/vacance`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Vacance:', e);
                throw e; // Propagate the error for further handling
            })

    }

    /**
     *  Requête permetttant d'ajouter un participant a une période de vacance
     * @param email l'email du participant
     * @param idVacance l'id du participant
     * @returns {Promise<Response>}retourne une promesse avec le resultat de la requête
     */
    static async addParticipant(email,idVacance) {

        const datafields = {
            "email": email
        }
        console.log(datafields)
        return fetch(`/vacance/${idVacance}/participant`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`

                },
                body: JSON.stringify(
                    datafields)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Participant:', e);
                throw e; // Propagate the error for further handling
            })
    }

    /**
     * Requête qui permet d'ajouter un participant a une activité
     * @param email l'email du participant
     * @param idVacance  l'id vacance de l'activité
     * @param idActivite  l'id de l'activité
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     */
    static async addParticipantActivite(email, idVacance, idActivite) {

        const datafields = {
            "email": email
        }
        console.log(datafields)
        return fetch(`/vacance/${idVacance}/activite/${idActivite}/participant`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`

                },
                body: JSON.stringify(
                    datafields)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Participant Activité:', e);
                throw e; // Propagate the error for further handling
            })
    }

    /**
     * Requête qui permet de recuperer la metéo courante
     * @param latlng objet contenant la latitude et la longitude
     * @returns {Promise<any>} retoune une promesse avec le resultat de la requête
     */
    static  currentweather(latlng){
        return  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng.lat}&lon=${latlng.lon}&cnt=30&units=metric&lang=fr&appid=${API_keyCurrentWeather}`)
            .then(response => response.json())

    }


    /**
     *
     * @param fiedls les données pour accompagner la requête (dateDebut, dateFin, description, nom)
     * @param lieu objet contenant le lieu de la periode de vacance ({codePostal, latitude, longitude, pays, rue, rueNumero, ville,})
     * @param idVac l'id vacance
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static AddActivite(fiedls,lieu,idVac) {

        const datafiels = {
            "dateDebut": convertToOffsetDateTime(fiedls.dateDebut),
            "dateFin": convertToOffsetDateTime(fiedls.dateFin),
            "description": fiedls.description,
            "lieu": lieu,
            "nom": fiedls.nom,
        }
        console.log(datafiels)
        return fetch(`/vacance/${idVac}/activite`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`
                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during add-Activite:', e);
                throw e; // Propagate the error for further handling
            })

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

        const datafiels = {
            "dateDebut": convertToOffsetDateTime(dateDebut),
            "dateFin": convertToOffsetDateTime(dateFin),
        }
        console.log(datafiels)
        return fetch(`/vacance/${idVacance}/activite/${idActivite}/`,
            {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during add-Activite:', e);
                throw e; // Propagate the error for further handling
            })
    }

    /**
     * Requête qui permet d'envoyer un message
     * @param idVacance l'id vacance
     * @param content le contenu du message
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async SendMessage(idVacance, content) {

        const datafiels = {
            "content": content,
        }
        return fetch(`/vacance/${idVacance}/message`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during sendMessage:', e);
                throw e; // Propagate the error for further handling
            })
    }

    /**
     * Requête qui permet d'obtenir les 100 derniers messages
     * @param idVacance l'id vacance concernée
     * @returns {Promise<Response>} retourne une promesse avec le resultat de la requête
     * @constructor
     */
    static async GetTheTop100Messages(idVacance) {

        return fetch(`/vacance/${idVacance}/message`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken()}`
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during getMessage:', e);
                throw e; // Propagate the error for further handling
            })
    }
}




export default API
